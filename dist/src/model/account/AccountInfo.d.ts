import { Token } from '../token';
import { UInt64 } from '../UInt64';
import { AccountType } from './AccountType';
import { ActivityBucket } from './ActivityBucket';
import { Address } from './Address';
import { PublicAccount } from './PublicAccount';
import { SupplementalPublicKeys } from './SupplementalPublicKeys';
/**
 * The account info structure describes basic information for an account.
 */
export declare class AccountInfo {
    /**
     * Version
     */
    readonly version: number;
    /**
     * The database record id;
     */
    readonly recordId: string;
    /**
     * Address of the account.
     */
    readonly address: Address;
    /**
     * Height when the address was published.
     */
    readonly addressHeight: UInt64;
    /**
     * Public key of the account.
     */
    readonly publicKey: string;
    /**
     * Height when the public key was published.
     */
    readonly publicKeyHeight: UInt64;
    /**
     * Account type
     */
    readonly accountType: AccountType;
    /**
     * Account keys
     */
    readonly supplementalPublicKeys: SupplementalPublicKeys;
    /**
     * Account activity bucket
     */
    readonly activityBucket: ActivityBucket[];
    /**
     * Tokens held by the account.
     */
    readonly tokens: Token[];
    /**
     * Importance of the account.
     */
    readonly importance: UInt64;
    /**
     * Importance height of the account.
     */
    readonly importanceHeight: UInt64;
    constructor(
    /**
     * Version
     */
    version: number, 
    /**
     * The database record id;
     */
    recordId: string, 
    /**
     * Address of the account.
     */
    address: Address, 
    /**
     * Height when the address was published.
     */
    addressHeight: UInt64, 
    /**
     * Public key of the account.
     */
    publicKey: string, 
    /**
     * Height when the public key was published.
     */
    publicKeyHeight: UInt64, 
    /**
     * Account type
     */
    accountType: AccountType, 
    /**
     * Account keys
     */
    supplementalPublicKeys: SupplementalPublicKeys, 
    /**
     * Account activity bucket
     */
    activityBucket: ActivityBucket[], 
    /**
     * Tokens held by the account.
     */
    tokens: Token[], 
    /**
     * Importance of the account.
     */
    importance: UInt64, 
    /**
     * Importance height of the account.
     */
    importanceHeight: UInt64);
    /**
     * Returns account public account.
     * @returns {PublicAccount}
     */
    get publicAccount(): PublicAccount;
    /**
     * Generate buffer
     * @return {Uint8Array}
     */
    serialize(): Uint8Array;
    private isHighValue;
    /**
     * Get the token flags.
     *
     * @return Token flags
     */
    private getAccountKeyTypeFlags;
    private static toPinnedVotingKeyBuilder;
    private static toTokenBuilder;
    private static toPublicKeyDto;
    private static toHeightActivityBucketsBuilder;
}
