import { Address } from '../account/Address';
import { UnresolvedAddress } from '../account/UnresolvedAddress';
import { Token } from '../token/Token';
import { TokenId } from '../token/TokenId';
import { UnresolvedTokenId } from '../token/UnresolvedTokenId';
import { AddressResolutionStatement, TokenIdResolutionStatement } from './ResolutionStatement';
import { TransactionStatement } from './TransactionStatement';
export declare class Statement {
    /**
     * The transaction statements.
     */
    readonly transactionStatements: TransactionStatement[];
    /**
     * The address resolution statements.
     */
    readonly addressResolutionStatements: AddressResolutionStatement[];
    /**
     * The token resolution statements.
     */
    readonly tokenResolutionStatements: TokenIdResolutionStatement[];
    /**
     * Receipt - transaction statement object
     * @param transactionStatements - The transaction statements.
     * @param addressResolutionStatements - The address resolution statements.
     * @param tokenResolutionStatements - The token resolution statements.
     */
    constructor(
    /**
     * The transaction statements.
     */
    transactionStatements: TransactionStatement[], 
    /**
     * The address resolution statements.
     */
    addressResolutionStatements: AddressResolutionStatement[], 
    /**
     * The token resolution statements.
     */
    tokenResolutionStatements: TokenIdResolutionStatement[]);
    /**
     * Resolve unresolvedAddress from statement
     * @param unresolvedAddress Unresolved address
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {Address}
     */
    resolveAddress(unresolvedAddress: UnresolvedAddress, height: string, transactionIndex: number, aggregateTransactionIndex?: number): Address;
    /**
     * Resolve unresolvedTokenId from statement
     * @param unresolvedTokenId Unresolved token id
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {TokenId}
     */
    resolveTokenId(unresolvedTokenId: UnresolvedTokenId, height: string, transactionIndex: number, aggregateTransactionIndex?: number): TokenId;
    /**
     * Resolve unresolvedToken from statement
     * @param unresolvedToken Unresolved token
     * @param height Block height
     * @param transactionIndex Transaction index
     * @param aggregateTransactionIndex Aggregate transaction index
     * @returns {Token}
     */
    resolveToken(unresolvedToken: Token, height: string, transactionIndex: number, aggregateTransactionIndex?: number): Token;
}
