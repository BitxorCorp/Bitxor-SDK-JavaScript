import { AccountLinkNetworkProperties } from './AccountLinkNetworkProperties';
import { AccountRestrictionNetworkProperties } from './AccountRestrictionNetworkProperties';
import { AggregateNetworkProperties } from './AggregateNetworkProperties';
import { HashLockNetworkProperties } from './HashLockNetworkProperties';
import { MetadataNetworkProperties } from './MetadataNetworkProperties';
import { MultisigNetworkProperties } from './MultisigNetworkProperties';
import { NamespaceNetworkProperties } from './NamespaceNetworkProperties';
import { SecretLockNetworkProperties } from './SecretLockNetworkProperties';
import { TokenNetworkProperties } from './TokenNetworkProperties';
import { TokenRestrictionNetworkProperties } from './TokenRestrictionNetworkProperties';
import { TransferNetworkProperties } from './TransferNetworkProperties';
/**
 * Network related configuration properties.
 */
export declare class PluginProperties {
    readonly accountlink?: AccountLinkNetworkProperties | undefined;
    readonly aggregate?: AggregateNetworkProperties | undefined;
    readonly lockhash?: HashLockNetworkProperties | undefined;
    readonly locksecret?: SecretLockNetworkProperties | undefined;
    readonly metadata?: MetadataNetworkProperties | undefined;
    readonly token?: TokenNetworkProperties | undefined;
    readonly multisig?: MultisigNetworkProperties | undefined;
    readonly namespace?: NamespaceNetworkProperties | undefined;
    readonly restrictionaccount?: AccountRestrictionNetworkProperties | undefined;
    readonly restrictiontoken?: TokenRestrictionNetworkProperties | undefined;
    readonly transfer?: TransferNetworkProperties | undefined;
    /**
     * @param accountlink - Network identifier.
     * @param aggregate - Genesis public key.
     * @param lockhash - Genesis generation hash.
     * @param locksecret - Genesis epoch time adjustment.
     * @param metadata -
     * @param token -
     * @param multisig -
     * @param namespace -
     * @param restrictionaccount -
     * @param restrictiontoken -
     * @param transfer -
     */
    constructor(accountlink?: AccountLinkNetworkProperties | undefined, aggregate?: AggregateNetworkProperties | undefined, lockhash?: HashLockNetworkProperties | undefined, locksecret?: SecretLockNetworkProperties | undefined, metadata?: MetadataNetworkProperties | undefined, token?: TokenNetworkProperties | undefined, multisig?: MultisigNetworkProperties | undefined, namespace?: NamespaceNetworkProperties | undefined, restrictionaccount?: AccountRestrictionNetworkProperties | undefined, restrictiontoken?: TokenRestrictionNetworkProperties | undefined, transfer?: TransferNetworkProperties | undefined);
}
