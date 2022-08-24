import { Observable } from 'rxjs';
import { UnresolvedAddress } from '../model';
import { FinalizedBlock } from '../model/blockchain/FinalizedBlock';
import { NewBlock } from '../model/blockchain/NewBlock';
import { AggregateTransaction } from '../model/transaction/AggregateTransaction';
import { CosignatureSignedTransaction } from '../model/transaction/CosignatureSignedTransaction';
import { Transaction } from '../model/transaction/Transaction';
import { TransactionStatusError } from '../model/transaction/TransactionStatusError';
import { IListener, OnWsCloseCallback } from './IListener';
import { MultisigRepository } from './MultisigRepository';
import { NamespaceRepository } from './NamespaceRepository';
export declare enum ListenerChannelName {
    block = "block",
    confirmedAdded = "confirmedAdded",
    unconfirmedAdded = "unconfirmedAdded",
    unconfirmedRemoved = "unconfirmedRemoved",
    partialAdded = "partialAdded",
    partialRemoved = "partialRemoved",
    cosignature = "cosignature",
    modifyMultisigAccount = "modifyMultisigAccount",
    status = "status",
    finalizedBlock = "finalizedBlock"
}
/**
 * Listener service
 */
export declare class Listener implements IListener {
    /**
     * Listener websocket server url. default: rest-gateway's url with ''/ws'' suffix. (e.g. http://localhost:3000/ws)
     */
    readonly url: string;
    /**
     * Namespace repository for resolving account alias
     */
    private namespaceRepository;
    /**
     * WebSocket injected when using listeners in client.
     */
    private websocketInjected?;
    /**
     * Multisig repository for resolving multisig accounts
     */
    private multisigRepository?;
    private SIGINT;
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
    url: string, 
    /**
     * Namespace repository for resolving account alias
     */
    namespaceRepository: NamespaceRepository, 
    /**
     * WebSocket injected when using listeners in client.
     */
    websocketInjected?: any, 
    /**
     * Multisig repository for resolving multisig accounts
     */
    multisigRepository?: MultisigRepository | undefined);
    /**
     * Open web socket connection.
     * @returns Promise<Void>
     */
    open(onUnsolicitedCloseCallback?: OnWsCloseCallback): Promise<void>;
    /**
     * returns a boolean that repressents the open state
     * @returns a boolean
     */
    isOpen(): boolean;
    /**
     * Close web socket connection.
     * @returns void
     */
    close(): void;
    /**
     * Returns an observable stream of BlockInfo.
     * Each time a new Block is added into the blockchain,
     * it emits a new BlockInfo in the event stream.
     *
     * @return an observable stream of BlockInfo
     */
    newBlock(): Observable<NewBlock>;
    /**
     * Returns an observable stream of finalized block info.
     * Each time a new Block is finalized into the blockchain,
     * it emits a new FinalizedBlock in the event stream.
     *
     * @return an observable stream of BlockInfo
     */
    finalizedBlock(): Observable<FinalizedBlock>;
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
    confirmed(unresolvedAddress: UnresolvedAddress, transactionHash?: string, subscribeMultisig?: boolean): Observable<Transaction>;
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
    unconfirmedAdded(unresolvedAddress: UnresolvedAddress, transactionHash?: string, subscribeMultisig?: boolean): Observable<Transaction>;
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
    aggregateBondedAdded(unresolvedAddress: UnresolvedAddress, transactionHash?: string, subscribeMultisig?: boolean): Observable<AggregateTransaction>;
    /**
     * Basic subscription for all the transactions status.
     * @param channel the transaction based channel
     * @param unresolvedAddress the unresolved address
     * @param transactionHash the transaction hash filter.
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Transactions
     */
    private transactionSubscription;
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
    unconfirmedRemoved(unresolvedAddress: UnresolvedAddress, transactionHash?: string, subscribeMultisig?: boolean): Observable<string>;
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
    aggregateBondedRemoved(unresolvedAddress: UnresolvedAddress, transactionHash?: string, subscribeMultisig?: boolean): Observable<string>;
    /**
     * Generic subscription for all the transaction hash based channels.
     * @param channel the channel
     * @param unresolvedAddress the unresolved address
     * @param transactionHash the transaction hash (optional)
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of Strings with the transaction hash
     */
    private transactionHashSubscription;
    /**
     * Returns an observable stream of {@link TransactionStatusError} for specific address.
     * Each time a transaction contains an error,
     * it emits a new message with the transaction status error in the event stream.
     *
     * @param unresolvedAddress unresolved address we listen to be notified when some error happened
     * @param transactionHash transactionHash for filtering multiple transactions
     * @return an observable stream of {@link TransactionStatusError}
     */
    status(unresolvedAddress: UnresolvedAddress, transactionHash?: string): Observable<TransactionStatusError>;
    /**
     * Filters the transaction by hash if provided.
     * @param transaction the transaction
     * @param transactionHash the hash.
     */
    private filterHash;
    /**
     * Returns an observable stream of {@link CosignatureSignedTransaction} for specific address.
     * Each time a cosigner signs a transaction the address initialized,
     * it emits a new message with the cosignatory signed transaction in the even stream.
     *this.subscribeTo(`cosignature/${address.plain()}`;
     * @param unresolvedAddress unresolved address we listen when a cosignatory is added to some transaction address sent
     * @param subscribeMultisig When `true` cosigner's multisig account will also be subscribed to the channel
     * @return an observable stream of {@link CosignatureSignedTransaction}
     */
    cosignatureAdded(unresolvedAddress: UnresolvedAddress, subscribeMultisig?: boolean): Observable<CosignatureSignedTransaction>;
    /**
     * Subscribe cosigner's multisig addresses
     * @param cosigner cosigner address
     * @param channel channel name to subscribe
     * @param multisig subscribe multisig account
     * @returns {string[]}
     */
    private subscribeWithMultig;
}
