/**
 * Receipt type enums.
 *
 * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/ReceiptType.h
 * @see https://github.com/bitxorcorp/bitxorcore-server/blob/main/src/bitxorcore/model/ReceiptType.cpp
 */
export declare enum ReceiptType {
    /**
     * The recipient, account and amount of fees received for harvesting a block. It is recorded when a block is harvested.
     */
    Harvest_Fee = 8515,
    /**
     * The unresolved and resolved alias. It is recorded when a transaction indicates a valid address alias instead of an address.
     */
    Address_Alias_Resolution = 61763,
    /**
     * The unresolved and resolved alias. It is recorded when a transaction indicates a valid token alias instead of a tokenId.
     */
    Token_Alias_Resolution = 62019,
    /**
     * A collection of state changes for a given source. It is recorded when a state change receipt is issued.
     */
    Transaction_Group = 57667,
    /**
     * The tokenId expiring in this block. It is recorded when a token expires.
     */
    Token_Expired = 16717,
    /**
     * The sender and recipient of the levied token, the tokenId and amount. It is recorded when a transaction has a levied token.
     */
    Token_Levy = 4685,
    /**
     * The sender and recipient of the tokenId and amount representing the cost of registering the token.
     * It is recorded when a token is registered.
     */
    Token_Rental_Fee = 4685,
    /**
     * The identifier of the namespace expiring in this block. It is recorded when the namespace lifetime elapses.
     */
    Namespace_Expired = 16718,
    /**
     * The sender and recipient of the tokenId and amount representing the cost of extending the namespace.
     * It is recorded when a namespace is registered or its duration is extended.
     */
    Namespace_Rental_Fee = 4942,
    /**
     * The identifier of the namespace deleted in this block. It is recorded when the namespace grace period elapses.
     */
    Namespace_Deleted = 16974,
    /**
     * The lockhash sender, tokenId and amount locked. It is recorded when a valid HashLockTransaction is announced.
     */
    LockHash_Created = 12616,
    /**
     * The haslock sender, tokenId and amount locked that is returned.
     * It is recorded when an aggregate bonded transaction linked to the hash completes.
     */
    LockHash_Completed = 8776,
    /**
     * The account receiving the locked token, the tokenId and the amount. It is recorded when a lock hash expires.
     */
    LockHash_Expired = 9032,
    /**
     * The secretlock sender, tokenId and amount locked. It is recorded when a valid SecretLockTransaction is announced.
     */
    LockSecret_Created = 12626,
    /**
     * The secretlock sender, tokenId and amount locked. It is recorded when a secretlock is proved.
     */
    LockSecret_Completed = 8786,
    /**
     * The account receiving the locked token, the tokenId and the amount. It is recorded when a secretlock expires
     */
    LockSecret_Expired = 9042,
    /**
     * The amount of native currency tokens created. The receipt is recorded when the network has inflation configured,
     * and a new block triggers the creation of currency tokens.
     */
    Inflation = 20803
}
