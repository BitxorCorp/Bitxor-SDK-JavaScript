import { NamespaceId } from '../namespace/NamespaceId';
import { UInt64 } from '../UInt64';
import { Token } from './Token';
import { TokenId } from './TokenId';
import { UnresolvedTokenId } from './UnresolvedTokenId';
/**
 * An object that knows how to create Tokens based on the Token Info and Namespace configuration.
 */
export declare class Currency {
    /**
     * Currency for public / Public_test network.
     *
     * This represents the per-network currency token. This tokenId is aliased with namespace name `bitxor`.
     *
     * This simplifies offline operations but general applications should load the currency from the repository factory and network currency service.
     *
     * If you are creating a private network and you need offline access, you can create a Currency in memory.
     *
     */
    static readonly PUBLIC: Currency;
    /**
     * The selected unresolved token id used when creating {@link Token}. This could either be the
     * Namespace or the Token id.
     */
    readonly unresolvedTokenId: UnresolvedTokenId;
    /**
     * Token id of this currency. This value is optional if the user only wants to provide the token
     * id. This value will be set if it's loaded by rest.
     */
    readonly tokenId?: TokenId;
    /**
     * The Namespace id of this currency. This value is option if the user only wants to provide the
     * namespace id. This value will be set if it's loaded by rest.
     */
    readonly namespaceId?: NamespaceId;
    /** Divisibility of this currency, required to create Token from relative amounts. */
    readonly divisibility: number;
    /** Is this currency transferable. */
    readonly transferable: boolean;
    /** Is this currency supply mutable. */
    readonly supplyMutable: boolean;
    /** Is this currency restrictable. */
    readonly restrictable: boolean;
    constructor({ unresolvedTokenId, tokenId, namespaceId, divisibility, transferable, supplyMutable, restrictable, }: {
        unresolvedTokenId?: UnresolvedTokenId;
        tokenId?: TokenId;
        namespaceId?: NamespaceId;
        divisibility: number;
        transferable: boolean;
        supplyMutable: boolean;
        restrictable: boolean;
    });
    /**
     * Creates a Token from this relative amount.
     *
     * @param amount
     * @returns {Token}
     */
    createRelative(amount: UInt64 | number): Token;
    /**
     * Creates a Token from this relative amount.
     *
     * @param amount
     * @returns {Token}
     */
    createAbsolute(amount: UInt64 | number): Token;
}
