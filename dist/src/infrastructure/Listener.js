"use strict";
/*
 * Copyright 2022 Kriptxor Corp, Microsula S.A.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.Listener = exports.ListenerChannelName = void 0;
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const WebSocket = require("ws");
const Utilities_1 = require("../core/format/Utilities");
const utils_1 = require("../core/utils");
const Address_1 = require("../model/account/Address");
const PublicAccount_1 = require("../model/account/PublicAccount");
const FinalizedBlock_1 = require("../model/blockchain/FinalizedBlock");
const NewBlock_1 = require("../model/blockchain/NewBlock");
const CosignatureSignedTransaction_1 = require("../model/transaction/CosignatureSignedTransaction");
const Deadline_1 = require("../model/transaction/Deadline");
const TransactionStatusError_1 = require("../model/transaction/TransactionStatusError");
const UInt64_1 = require("../model/UInt64");
const MultisigHttp_1 = require("./MultisigHttp");
const CreateTransactionFromDTO_1 = require("./transaction/CreateTransactionFromDTO");
var ListenerChannelName;
(function (ListenerChannelName) {
    ListenerChannelName["block"] = "block";
    ListenerChannelName["confirmedAdded"] = "confirmedAdded";
    ListenerChannelName["unconfirmedAdded"] = "unconfirmedAdded";
    ListenerChannelName["unconfirmedRemoved"] = "unconfirmedRemoved";
    ListenerChannelName["partialAdded"] = "partialAdded";
    ListenerChannelName["partialRemoved"] = "partialRemoved";
    ListenerChannelName["cosignature"] = "cosignature";
    ListenerChannelName["modifyMultisigAccount"] = "modifyMultisigAccount";
    ListenerChannelName["status"] = "status";
    ListenerChannelName["finalizedBlock"] = "finalizedBlock";
})(ListenerChannelName = exports.ListenerChannelName || (exports.ListenerChannelName = {}));
/**
 * Listener service
 */
class Listener {
    /**
     * Constructor
     * @param url - Listener websocket server url. default: rest-gateway's url with ''/ws'' suffix. (e.g. http://localhost:3000/ws).
     * @param namespaceRepository - NamespaceRepository interface for resolving alias.
     * @param websocketInjected - (Optional) WebSocket injected when using listeners in client.
     */
    constructor(
    /**
     * Listener websocket server url. default: rest-gateway's url with ''/ws'' suffix. (e.g. http://localhost:3000/ws)
     */
    url, 
    /**
     * Namespace repository for resolving account alias
     */
    namespaceRepository, 
    /**
     * WebSocket injected when using listeners in client.
     */
    websocketInjected, 
    /**
     * Multisig repository for resolving multisig accounts
     */
    multisigRepository) {
        this.url = url;
        this.namespaceRepository = namespaceRepository;
        this.websocketInjected = websocketInjected;
        this.multisigRepository = multisigRepository;
        this.SIGINT = false;
        this.url = url.replace(/\/$/, '');
        this.messageSubject = new rxjs_1.Subject();
        this.multisigRepository = this.multisigRepository ? this.multisigRepository : new MultisigHttp_1.MultisigHttp(this.namespaceRepository.getUrl());
    }
    /**
     * Open web socket connection.
     * @returns Promise<Void>
     */
    open(onUnsolicitedCloseCallback) {
        return new Promise((resolve, reject) => {
            if (this.webSocket === undefined || this.webSocket.readyState === this.webSocket.CLOSED) {
                if (this.websocketInjected) {
                    this.webSocket = new this.websocketInjected(this.url);
                }
                else {
                    this.webSocket = new WebSocket(this.url);
                }
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                this.webSocket.onopen = () => { };
                this.webSocket.onerror = (err) => {
                    reject(err);
                };
                this.webSocket.onclose = (closeEvent) => {
                    if (this.SIGINT) {
                        return;
                    }
                    if (closeEvent) {
                        const event = {
                            client: this.uid,
                            code: closeEvent.code,
                            reason: closeEvent.reason,
                        };
                        if (onUnsolicitedCloseCallback) {
                            onUnsolicitedCloseCallback(event);
                        }
                        else {
                            reject(event);
                        }
                    }
                };
                this.webSocket.onmessage = (msg) => {
                    const message = JSON.parse(msg.data);
                    this.handleMessage(message, resolve);
                };
            }
            else {
                resolve();
            }
        });
    }
    /**
     * @internal
     *
     * This method handles one incoming message from the web socket and it dispatches it to the message subject listener.
     *
     * @param message the object payload.
     * @param resolve the method to notify when the uid has been resolved and the listener connection has been stablished.
     */
    handleMessage(message, resolve) {
        if (message.uid) {
            this.uid = message.uid;
            resolve();
            return;
        }
        const topic = message.topic;
        const channelName = topic.indexOf('/') >= 0 ? topic.substr(0, topic.indexOf('/')) : topic;
        const channelParam = topic.indexOf('/') >= 0 ? topic.split('/')[1] : '';
        switch (channelName) {
            case ListenerChannelName.confirmedAdded:
            case ListenerChannelName.unconfirmedAdded:
            case ListenerChannelName.partialAdded:
                this.messageSubject.next({
                    channelName: ListenerChannelName[channelName],
                    channelParam: channelParam,
                    message: (0, CreateTransactionFromDTO_1.CreateTransactionFromDTO)(message.data),
                });
                break;
            case ListenerChannelName.block:
                this.messageSubject.next({
                    channelName: ListenerChannelName[channelName],
                    channelParam: channelParam,
                    message: this.toNewBlock(message.data),
                });
                break;
            case ListenerChannelName.status:
                this.messageSubject.next({
                    channelName: ListenerChannelName[channelName],
                    channelParam: channelParam,
                    message: new TransactionStatusError_1.TransactionStatusError(Address_1.Address.createFromRawAddress(channelParam), message.data.hash, message.data.code, Deadline_1.Deadline.createFromDTO(message.data.deadline)),
                });
                break;
            case ListenerChannelName.cosignature:
                this.messageSubject.next({
                    channelName: ListenerChannelName[channelName],
                    channelParam: channelParam,
                    message: new CosignatureSignedTransaction_1.CosignatureSignedTransaction(message.data.parentHash, message.data.signature, message.data.signerPublicKey),
                });
                break;
            case ListenerChannelName.partialRemoved:
            case ListenerChannelName.unconfirmedRemoved:
                this.messageSubject.next({
                    channelName: ListenerChannelName[channelName],
                    channelParam: channelParam,
                    message: message.data.meta.hash,
                });
                break;
            case ListenerChannelName.finalizedBlock:
                this.messageSubject.next({
                    channelName: ListenerChannelName[channelName],
                    channelParam: channelParam,
                    message: new FinalizedBlock_1.FinalizedBlock(UInt64_1.UInt64.fromNumericString(message.data.height), message.data.hash, message.data.finalizationPoint, message.data.finalizationEpoch),
                });
                break;
            default:
                throw new Error(`Channel: ${channelName} is not supported.`);
        }
    }
    /**
     * returns a boolean that repressents the open state
     * @returns a boolean
     */
    isOpen() {
        if (this.webSocket) {
            return this.webSocket.readyState === this.webSocket.OPEN;
        }
        return false;
    }
    /**
     * Close web socket connection.
     * @returns void
     */
    close() {
        if (this.webSocket &&
            (this.webSocket.readyState === this.webSocket.OPEN || this.webSocket.readyState === this.webSocket.CONNECTING)) {
            this.SIGINT = true;
            this.webSocket.close();
        }
    }
    /**
     * Returns an observable stream of BlockInfo.
     * Each time a new Block is added into the blockchain,
     * it emits a new BlockInfo in the event stream.
     *
     * @return an observable stream of BlockInfo
     */
    newBlock() {
        this.subscribeTo('block');
        return this.messageSubject.asObservable().pipe((0, operators_1.share)(), (0, operators_1.filter)((_) => _.channelName === ListenerChannelName.block), (0, operators_1.map)((_) => _.message));
    }
    /**
     * Returns an observable stream of finalized block info.
     * Each time a new Block is finalized into the blockchain,
     * it emits a new FinalizedBlock in the event stream.
     *
     * @return an observable stream of BlockInfo
     */
    finalizedBlock() {
        this.subscribeTo('finalizedBlock');
        return this.messageSubject.asObservable().pipe((0, operators_1.share)(), (0, operators_1.filter)((_) => _.channelName === ListenerChannelName.finalizedBlock), (0, operators_1.map)((_) => _.message));
    }
    /**
     * Returns an observable stream of Transaction for a specific address.
     * Each time a transaction is in confirmed state an it involves the address,
     * it emits a new Transaction in the event stream.
     *
     * @param unresolvedAddress unresolved address we listen when a transaction is in confirmed state
     * @param transactionHash transactionHash for filtering multiple transactions
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Transaction with state confirmed
     */
    confirmed(unresolvedAddress, transactionHash, subscribeMultisig = false) {
        return this.transactionSubscription(ListenerChannelName.confirmedAdded, unresolvedAddress, transactionHash, subscribeMultisig);
    }
    /**
     * Returns an observable stream of Transaction for a specific address.
     * Each time a transaction is in unconfirmed state an it involves the address,
     * it emits a new Transaction in the event stream.
     *
     * @param unresolvedAddress unresolved address we listen when a transaction is in unconfirmed state
     * @param transactionHash transactionHash for filtering multiple transactions
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Transaction with state unconfirmed
     */
    unconfirmedAdded(unresolvedAddress, transactionHash, subscribeMultisig = false) {
        return this.transactionSubscription(ListenerChannelName.unconfirmedAdded, unresolvedAddress, transactionHash, subscribeMultisig);
    }
    /**
     * Return an observable of {@link AggregateTransaction} for specific address.
     * Each time an aggregate bonded transaction is announced,
     * it emits a new {@link AggregateTransaction} in the event stream.
     *
     * @param unresolvedAddress unresolved address we listen when a transaction with missing signatures state
     * @param transactionHash transactionHash for filtering multiple transactions
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of AggregateTransaction with missing signatures state
     */
    aggregateBondedAdded(unresolvedAddress, transactionHash, subscribeMultisig = false) {
        return this.transactionSubscription(ListenerChannelName.partialAdded, unresolvedAddress, transactionHash, subscribeMultisig);
    }
    /**
     * Basic subscription for all the transactions status.
     * @param channel the transaction based channel
     * @param unresolvedAddress the unresolved address
     * @param transactionHash the transaction hash filter.
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Transactions
     */
    transactionSubscription(channel, unresolvedAddress, transactionHash, subscribeMultisig = false) {
        return this.subscribeWithMultig(unresolvedAddress, channel, subscribeMultisig).pipe((0, operators_1.switchMap)((subscribers) => {
            return this.messageSubject.asObservable().pipe((0, operators_1.filter)((listenerMessage) => listenerMessage.channelName === channel), (0, operators_1.distinctUntilChanged)((prev, curr) => {
                const currentHash = curr.message.transactionInfo.hash;
                const previousHash = prev.message.transactionInfo.hash;
                return (currentHash && previousHash && previousHash === currentHash) || !currentHash || !previousHash;
            }), (0, operators_1.switchMap)((_) => {
                const transactionObservable = (0, rxjs_1.of)(_.message).pipe((0, operators_1.filter)((transaction) => this.filterHash(transaction, transactionHash)));
                if (subscribers.includes(_.channelParam.toUpperCase())) {
                    return transactionObservable;
                }
                else {
                    return transactionObservable.pipe((0, operators_1.filter)((transaction) => transaction.isSigned(unresolvedAddress) || transaction.shouldNotifyAccount(unresolvedAddress)));
                }
            }));
        }));
    }
    /**
     * Returns an observable stream of Transaction Hashes for specific address.
     * Each time a transaction with state unconfirmed changes its state,
     * it emits a new message with the transaction hash in the event stream.
     *
     * @param unresolvedAddress unresolved address we listen when a transaction is removed from unconfirmed state
     * @param transactionHash the transaction hash filter.
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Strings with the transaction hash
     */
    unconfirmedRemoved(unresolvedAddress, transactionHash, subscribeMultisig = false) {
        return this.transactionHashSubscription(ListenerChannelName.unconfirmedRemoved, unresolvedAddress, transactionHash, subscribeMultisig);
    }
    /**
     * Returns an observable stream of Transaction Hashes for specific address.
     * Each time an aggregate bonded transaction is announced,
     * it emits a new message with the transaction hash in the event stream.
     *
     * @param unresolvedAddress unresolved address we listen when a transaction is confirmed or rejected
     * @param transactionHash the transaction hash filter.
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Strings with the transaction hash
     */
    aggregateBondedRemoved(unresolvedAddress, transactionHash, subscribeMultisig = false) {
        return this.transactionHashSubscription(ListenerChannelName.partialRemoved, unresolvedAddress, transactionHash, subscribeMultisig);
    }
    /**
     * Generic subscription for all the transaction hash based channels.
     * @param channel the channel
     * @param unresolvedAddress the unresolved address
     * @param transactionHash the transaction hash (optional)
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Strings with the transaction hash
     */
    transactionHashSubscription(channel, unresolvedAddress, transactionHash, subscribeMultisig = false) {
        return this.subscribeWithMultig(unresolvedAddress, channel, subscribeMultisig).pipe((0, operators_1.switchMap)((subscribers) => {
            return this.messageSubject.asObservable().pipe((0, operators_1.filter)((_) => _.channelName === channel), (0, operators_1.filter)((_) => typeof _.message === 'string'), (0, operators_1.filter)((_) => subscribers.includes(_.channelParam.toUpperCase())), (0, operators_1.map)((_) => _.message), (0, operators_1.filter)((_) => !transactionHash || _.toUpperCase() === transactionHash.toUpperCase()), (0, operators_1.distinctUntilChanged)());
        }));
    }
    /**
     * Returns an observable stream of {@link TransactionStatusError} for specific address.
     * Each time a transaction contains an error,
     * it emits a new message with the transaction status error in the event stream.
     *
     * @param unresolvedAddress unresolved address we listen to be notified when some error happened
     * @param transactionHash transactionHash for filtering multiple transactions
     * @return an observable stream of {@link TransactionStatusError}
     */
    status(unresolvedAddress, transactionHash) {
        return this.getResolvedAddress(unresolvedAddress).pipe((0, operators_1.mergeMap)((address) => {
            this.subscribeTo(`status/${address.plain()}`);
            return this.messageSubject.asObservable().pipe((0, operators_1.filter)((_) => _.channelName === ListenerChannelName.status), (0, operators_1.filter)((_) => _.channelParam.toUpperCase() === address.plain()), (0, operators_1.map)((_) => _.message), (0, operators_1.filter)((_) => !transactionHash || _.hash.toUpperCase() == transactionHash.toUpperCase()));
        }));
    }
    /**
     * Filters the transaction by hash if provided.
     * @param transaction the transaction
     * @param transactionHash the hash.
     */
    filterHash(transaction, transactionHash) {
        if (transactionHash === undefined) {
            return true;
        }
        else {
            const metaHash = transaction.transactionInfo.hash;
            return metaHash !== undefined ? metaHash.toUpperCase() === transactionHash.toUpperCase() : false;
        }
    }
    /**
     * Returns an observable stream of {@link CosignatureSignedTransaction} for specific address.
     * Each time a cosigner signs a transaction the address initialized,
     * it emits a new message with the cosignatory signed transaction in the even stream.
     *this.subscribeTo(`cosignature/${address.plain()}`;
     * @param unresolvedAddress unresolved address we listen when a cosignatory is added to some transaction address sent
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of {@link CosignatureSignedTransaction}
     */
    cosignatureAdded(unresolvedAddress, subscribeMultisig = false) {
        return this.subscribeWithMultig(unresolvedAddress, ListenerChannelName.cosignature, subscribeMultisig).pipe((0, operators_1.switchMap)((subscribers) => {
            return this.messageSubject.asObservable().pipe((0, operators_1.filter)((_) => _.channelName.toUpperCase() === ListenerChannelName.cosignature.toUpperCase()), (0, operators_1.filter)((_) => subscribers.includes(_.channelParam.toUpperCase())), (0, operators_1.map)((_) => _.message));
        }));
    }
    /**
     * @internal
     * Subscribes to a channelName.
     * @param channel - Channel subscribed to.
     */
    subscribeTo(channel) {
        const subscriptionMessage = {
            uid: this.uid,
            subscribe: channel,
        };
        this.webSocket.send(JSON.stringify(subscriptionMessage));
    }
    /**
     * @internal
     * Get resolved address from namespace repository
     * @param unresolvedAddress unresolved address
     * @returns {Address}
     */
    getResolvedAddress(unresolvedAddress) {
        if (unresolvedAddress.isAddress()) {
            return (0, rxjs_1.of)(unresolvedAddress);
        }
        const namespaceId = unresolvedAddress;
        return this.namespaceRepository.getLinkedAddress(namespaceId).pipe((0, operators_1.map)((address) => {
            if (!address) {
                throw new Error(`Invalid unresolvedAddress: ${namespaceId.toHex()}`);
            }
            return address;
        }));
    }
    /**
     * This method maps a BlockInfoDTO from rest to the SDK's BlockInfo model object.
     *
     * @internal
     * @param {BlockInfoDTO} dto the dto object from rest.
     * @returns {NewBlock} a BlockInfo model
     */
    toNewBlock(dto) {
        const networkType = dto.block.network.valueOf();
        return new NewBlock_1.NewBlock(dto.meta.hash, dto.meta.generationHash, dto.block.signature, PublicAccount_1.PublicAccount.createFromPublicKey(dto.block.signerPublicKey, networkType), networkType, dto.block.version, dto.block.type, UInt64_1.UInt64.fromNumericString(dto.block.height), UInt64_1.UInt64.fromNumericString(dto.block.timestamp), UInt64_1.UInt64.fromNumericString(dto.block.difficulty), dto.block.feeMultiplier, dto.block.previousBlockHash, dto.block.transactionsHash, dto.block.receiptsHash, dto.block.stateHash, dto.block.proofGamma, dto.block.proofScalar, dto.block.proofVerificationHash, dto.block.beneficiaryAddress ? utils_1.DtoMapping.toAddress(dto.block.beneficiaryAddress) : undefined);
    }
    /**
     * Subscribe cosigner's multisig addresses
     * @param cosigner cosigner address
     * @param channel channel name to subscribe
     * @param multisig subscribe multisig account
     * @returns {string[]}
     */
    subscribeWithMultig(cosigner, channel, multisig = false) {
        if (!multisig) {
            this.subscribeTo(`${channel.toString()}/${cosigner.plain()}`);
            return (0, rxjs_1.of)([cosigner.plain()]);
        }
        return this.getResolvedAddress(cosigner).pipe((0, operators_1.mergeMap)((address) => {
            return this.multisigRepository.getMultisigAccountGraphInfo(address).pipe((0, operators_1.map)((multisigInfo) => {
                const multisigGraphInfo = utils_1.MultisigGraphUtils.getMultisigInfoFromMultisigGraphInfo(multisigInfo);
                const multisigChildren = utils_1.MultisigGraphUtils.getMultisigChildren(multisigGraphInfo);
                const subscribers = [address];
                if (!!multisigChildren.length && multisigChildren[0].children) {
                    (0, Utilities_1.parseObjectProperties)(multisigChildren[0].children, (k, prop) => {
                        subscribers.push(Address_1.Address.createFromRawAddress(prop));
                    });
                }
                subscribers.forEach((m) => {
                    this.subscribeTo(`${channel.toString()}/${m.plain()}`);
                });
                return subscribers.map((m) => m.plain());
            }), (0, operators_1.catchError)(() => {
                this.subscribeTo(`${channel.toString()}/${cosigner.plain()}`);
                return (0, rxjs_1.of)([cosigner.plain()]);
            }));
        }));
    }
}
exports.Listener = Listener;
//# sourceMappingURL=Listener.js.map