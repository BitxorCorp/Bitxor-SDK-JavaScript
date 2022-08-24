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
import { Convert } from '../..';
import { UnresolvedMapping } from '../../core/utils';
import { MessageFactory, TokenSupplyRevocationTransaction, UInt64 } from '../../model';
import { Address, PublicAccount } from '../../model/account';
import { NamespaceId } from '../../model/namespace';
import { Token, TokenFlags, TokenId, TokenNonce } from '../../model/token';
import {
    AccountAddressRestrictionTransaction,
    AccountKeyLinkTransaction,
    AccountMetadataTransaction,
    AccountOperationRestrictionTransaction,
    AccountTokenRestrictionTransaction,
    AddressAliasTransaction,
    AggregateTransaction,
    AggregateTransactionCosignature,
    AggregateTransactionInfo,
    Deadline,
    LockFundsTransaction,
    MultisigAccountModificationTransaction,
    NamespaceMetadataTransaction,
    NamespaceRegistrationTransaction,
    NodeKeyLinkTransaction,
    SecretLockTransaction,
    SecretProofTransaction,
    SignedTransaction,
    TokenAddressRestrictionTransaction,
    TokenAliasTransaction,
    TokenDefinitionTransaction,
    TokenGlobalRestrictionTransaction,
    TokenMetadataTransaction,
    TokenSupplyChangeTransaction,
    Transaction,
    TransactionInfo,
    TransactionType,
    TransferTransaction,
    VotingKeyLinkTransaction,
    VrfKeyLinkTransaction,
} from '../../model/transaction';

/**
 * Extract recipientAddress value from encoded hexadecimal notation.
 *
 * If bit 0 of byte 0 is not set (e.g. 0x90), then it is a regular address.
 * Else (e.g. 0x91) it represents a namespace id which starts at byte 1.
 *
 * @param recipientAddress {string} Encoded hexadecimal recipientAddress notation
 * @return {Address | NamespaceId}
 */
export const extractRecipient = (recipientAddress: any): Address | NamespaceId => {
    if (typeof recipientAddress === 'string') {
        return UnresolvedMapping.toUnresolvedAddress(recipientAddress);
    } else if (typeof recipientAddress === 'object') {
        // Is JSON object
        if (recipientAddress.hasOwnProperty('address')) {
            return Address.createFromRawAddress(recipientAddress.address);
        } else if (recipientAddress.hasOwnProperty('id')) {
            return NamespaceId.createFromEncoded(recipientAddress.id);
        }
    }
    throw new Error(`Recipient: ${recipientAddress} type is not recognised`);
};

/**
 * Extract tokens from encoded UInt64 notation.
 *
 * If most significant bit of byte 0 is set, then it is a namespaceId.
 * If most significant bit of byte 0 is not set, then it is a tokenId.
 *
 * @param tokens {Array | undefined} The DTO array of tokens (with UInt64 Id notation)
 * @return {Token[]}
 */
export const extractTokens = (tokens: any): Token[] => {
    if (tokens === undefined) {
        return [];
    }
    return tokens.map((tokenDTO) => {
        const id = UnresolvedMapping.toUnresolvedToken(tokenDTO.id);
        return new Token(id, UInt64.fromNumericString(tokenDTO.amount));
    });
};

/**
 * Extract deadline from json payload.
 * @param deadline - deadline dto
 */
const extractDeadline = (deadline?: string): Deadline => {
    if (!deadline) {
        return Deadline.createEmtpy();
    }
    return Deadline.createFromDTO(deadline);
};

/**
 * @internal
 * Extract transaction meta data
 *
 * @param meta - Transaction meta data
 * @param id - TransactionId
 * @return {TransactionInfo | AggregateTransactionInfo | undefined}
 */
const extractTransactionMeta = (meta: any, id: string): TransactionInfo | AggregateTransactionInfo | undefined => {
    if (!meta) {
        return undefined;
    }
    if (meta.aggregateHash || meta.aggregateId) {
        return new AggregateTransactionInfo(UInt64.fromNumericString(meta.height), meta.index, id, meta.aggregateHash, meta.aggregateId);
    }
    return new TransactionInfo(UInt64.fromNumericString(meta.height), meta.index, id, meta.hash, meta.merkleComponentHash);
};
/**
 * @internal
 * @param transactionDTO
 * @param isEmbedded
 * @returns {any}
 * @constructor
 */
const CreateStandaloneTransactionFromDTO = (transactionDTO, transactionInfo): Transaction => {
    const type: TransactionType = transactionDTO.type;
    const version: number = transactionDTO.version;
    const signature = Transaction.resolveSignature(transactionDTO.signature, false);
    const maxFee = UInt64.fromNumericString(transactionDTO.maxFee || '0');
    const deadline = extractDeadline(transactionDTO.deadline);
    const networkType = transactionDTO.network;
    const signer = transactionDTO.signerPublicKey
        ? PublicAccount.createFromPublicKey(transactionDTO.signerPublicKey, networkType)
        : undefined;
    switch (type) {
        case TransactionType.TRANSFER:
            return new TransferTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                extractRecipient(transactionDTO.recipientAddress),
                extractTokens(transactionDTO.tokens),
                MessageFactory.createMessageFromHex(transactionDTO.message),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);

        case TransactionType.NAMESPACE_REGISTRATION:
            return new NamespaceRegistrationTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.registrationType,
                transactionDTO.name,
                NamespaceId.createFromEncoded(transactionDTO.id),
                transactionDTO.registrationType === 0 ? UInt64.fromNumericString(transactionDTO.duration) : undefined,
                transactionDTO.registrationType === 1 ? NamespaceId.createFromEncoded(transactionDTO.parentId) : undefined,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.TOKEN_DEFINITION:
            return new TokenDefinitionTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                TokenNonce.createFromNumber(transactionDTO.nonce),
                new TokenId(transactionDTO.id),
                new TokenFlags(transactionDTO.flags),
                transactionDTO.divisibility,
                UInt64.fromNumericString(transactionDTO.duration),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.TOKEN_SUPPLY_CHANGE:
            return new TokenSupplyChangeTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId),
                transactionDTO.action,
                UInt64.fromNumericString(transactionDTO.delta),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.TOKEN_SUPPLY_REVOCATION:
            return new TokenSupplyRevocationTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                extractRecipient(transactionDTO.sourceAddress),
                new Token(new TokenId(transactionDTO.tokenId), UInt64.fromNumericString(transactionDTO.amount)),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.MULTISIG_ACCOUNT_MODIFICATION:
            return new MultisigAccountModificationTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.minApprovalDelta,
                transactionDTO.minRemovalDelta,
                transactionDTO.addressAdditions ? transactionDTO.addressAdditions.map((addition) => extractRecipient(addition)) : [],
                transactionDTO.addressDeletions ? transactionDTO.addressDeletions.map((deletion) => extractRecipient(deletion)) : [],
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.HASH_LOCK:
            return new LockFundsTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                new Token(new TokenId(transactionDTO.tokenId), UInt64.fromNumericString(transactionDTO.amount)),
                UInt64.fromNumericString(transactionDTO.duration),
                new SignedTransaction('', transactionDTO.hash, '', TransactionType.AGGREGATE_BONDED, networkType),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.SECRET_LOCK:
            const recipientAddress = transactionDTO.recipientAddress;
            const tokenId = UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId);
            return new SecretLockTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                new Token(tokenId, UInt64.fromNumericString(transactionDTO.amount)),
                UInt64.fromNumericString(transactionDTO.duration),
                transactionDTO.hashAlgorithm,
                transactionDTO.secret,
                extractRecipient(recipientAddress),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.SECRET_PROOF:
            return new SecretProofTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.hashAlgorithm,
                transactionDTO.secret,
                extractRecipient(transactionDTO.recipientAddress),
                transactionDTO.proof,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.TOKEN_ALIAS:
            return new TokenAliasTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.aliasAction,
                NamespaceId.createFromEncoded(transactionDTO.namespaceId),
                new TokenId(transactionDTO.tokenId),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.ADDRESS_ALIAS:
            return new AddressAliasTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.aliasAction,
                NamespaceId.createFromEncoded(transactionDTO.namespaceId),
                extractRecipient(transactionDTO.address) as Address,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.ACCOUNT_ADDRESS_RESTRICTION:
            return new AccountAddressRestrictionTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.restrictionFlags,
                transactionDTO.restrictionAdditions
                    ? transactionDTO.restrictionAdditions.map((addition) => extractRecipient(addition))
                    : [],
                transactionDTO.restrictionDeletions
                    ? transactionDTO.restrictionDeletions.map((deletion) => extractRecipient(deletion))
                    : [],
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.ACCOUNT_OPERATION_RESTRICTION:
            return new AccountOperationRestrictionTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.restrictionFlags,
                transactionDTO.restrictionAdditions ? transactionDTO.restrictionAdditions : [],
                transactionDTO.restrictionDeletions ? transactionDTO.restrictionDeletions : [],
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.ACCOUNT_TOKEN_RESTRICTION:
            return new AccountTokenRestrictionTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.restrictionFlags,
                transactionDTO.restrictionAdditions
                    ? transactionDTO.restrictionAdditions.map((addition) => UnresolvedMapping.toUnresolvedToken(addition))
                    : [],
                transactionDTO.restrictionDeletions
                    ? transactionDTO.restrictionDeletions.map((deletion) => UnresolvedMapping.toUnresolvedToken(deletion))
                    : [],
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.ACCOUNT_KEY_LINK:
            return new AccountKeyLinkTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.linkedPublicKey,
                transactionDTO.linkAction,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.TOKEN_GLOBAL_RESTRICTION:
            return new TokenGlobalRestrictionTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId),
                UnresolvedMapping.toUnresolvedToken(transactionDTO.referenceTokenId),
                UInt64.fromHex(transactionDTO.restrictionKey),
                UInt64.fromNumericString(transactionDTO.previousRestrictionValue),
                transactionDTO.previousRestrictionType,
                UInt64.fromNumericString(transactionDTO.newRestrictionValue),
                transactionDTO.newRestrictionType,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.TOKEN_ADDRESS_RESTRICTION:
            return new TokenAddressRestrictionTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                UnresolvedMapping.toUnresolvedToken(transactionDTO.tokenId),
                UInt64.fromHex(transactionDTO.restrictionKey),
                extractRecipient(transactionDTO.targetAddress),
                UInt64.fromNumericString(transactionDTO.previousRestrictionValue),
                UInt64.fromNumericString(transactionDTO.newRestrictionValue),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.ACCOUNT_METADATA:
            return new AccountMetadataTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                extractRecipient(transactionDTO.targetAddress),
                UInt64.fromHex(transactionDTO.scopedMetadataKey),
                transactionDTO.valueSizeDelta,
                Convert.hexToUint8(transactionDTO.value),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.TOKEN_METADATA:
            return new TokenMetadataTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                extractRecipient(transactionDTO.targetAddress),
                UInt64.fromHex(transactionDTO.scopedMetadataKey),
                UnresolvedMapping.toUnresolvedToken(transactionDTO.targetTokenId),
                transactionDTO.valueSizeDelta,
                Convert.hexToUint8(transactionDTO.value),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.NAMESPACE_METADATA:
            return new NamespaceMetadataTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                extractRecipient(transactionDTO.targetAddress),
                UInt64.fromHex(transactionDTO.scopedMetadataKey),
                NamespaceId.createFromEncoded(transactionDTO.targetNamespaceId),
                transactionDTO.valueSizeDelta,
                Convert.hexToUint8(transactionDTO.value),
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.VRF_KEY_LINK:
            return new VrfKeyLinkTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.linkedPublicKey,
                transactionDTO.linkAction,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.NODE_KEY_LINK:
            return new NodeKeyLinkTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.linkedPublicKey,
                transactionDTO.linkAction,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        case TransactionType.VOTING_KEY_LINK:
            return new VotingKeyLinkTransaction(
                networkType,
                version,
                deadline,
                maxFee,
                transactionDTO.linkedPublicKey,
                transactionDTO.startEpoch,
                transactionDTO.endEpoch,
                transactionDTO.linkAction,
                signature,
                signer,
                transactionInfo,
            ).setPayloadSize(transactionDTO.size);
        default:
            throw new Error(`Unimplemented transaction with type ${type} for version ${version}`);
    }
};

/**
 * @internal
 * @param transactionDTO
 * @returns {Transaction}
 * @constructor
 */
export const CreateTransactionFromDTO = (transactionDTO): Transaction => {
    if (
        transactionDTO.transaction.type === TransactionType.AGGREGATE_COMPLETE ||
        transactionDTO.transaction.type === TransactionType.AGGREGATE_BONDED
    ) {
        const innerTransactions = transactionDTO.transaction.transactions
            ? transactionDTO.transaction.transactions.map((innerTransactionDTO) => {
                  const aggregateTransactionInfo = extractTransactionMeta(innerTransactionDTO.meta, innerTransactionDTO.id);
                  innerTransactionDTO.transaction.maxFee = transactionDTO.transaction.maxFee;
                  innerTransactionDTO.transaction.deadline = transactionDTO.transaction.deadline;
                  innerTransactionDTO.transaction.signature = transactionDTO.transaction.signature;
                  return CreateStandaloneTransactionFromDTO(innerTransactionDTO.transaction, aggregateTransactionInfo);
              })
            : [];
        return new AggregateTransaction(
            transactionDTO.transaction.network,
            transactionDTO.transaction.type,
            transactionDTO.transaction.version,
            extractDeadline(transactionDTO.transaction.deadline),
            UInt64.fromNumericString(transactionDTO.transaction.maxFee || '0'),
            innerTransactions,
            transactionDTO.transaction.cosignatures
                ? transactionDTO.transaction.cosignatures.map((aggregateCosignatureDTO) => {
                      return new AggregateTransactionCosignature(
                          aggregateCosignatureDTO.signature,
                          PublicAccount.createFromPublicKey(aggregateCosignatureDTO.signerPublicKey, transactionDTO.transaction.network),
                          UInt64.fromNumericString(aggregateCosignatureDTO.version),
                      );
                  })
                : [],
            Transaction.resolveSignature(transactionDTO.transaction.signature, false),
            transactionDTO.transaction.signerPublicKey
                ? PublicAccount.createFromPublicKey(transactionDTO.transaction.signerPublicKey, transactionDTO.transaction.network)
                : undefined,
            extractTransactionMeta(transactionDTO.meta, transactionDTO.id),
        ).setPayloadSize(transactionDTO.transaction.size);
    } else {
        return CreateStandaloneTransactionFromDTO(
            transactionDTO.transaction,
            extractTransactionMeta(transactionDTO.meta, transactionDTO.id),
        );
    }
};
