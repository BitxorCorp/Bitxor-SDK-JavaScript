import { PublicAccount } from '../account/PublicAccount';
import { NetworkType } from '../network/NetworkType';
import { UInt64 } from '../UInt64';
import { Deadline } from './Deadline';
import { TransferTransaction } from './TransferTransaction';
export declare class PersistentDelegationRequestTransaction extends TransferTransaction {
    /**
     * Create a PersistentDelegationRequestTransaction with special message payload
     * for presistent harvesting delegation unlocking
     * @param deadline - The deadline to include the transaction.
     * @param remoteLinkedPrivateKey - Remote harvester signing private key linked to the main account
     * @param vrfPrivateKey - VRF private key linked to the main account
     * @param nodePublicKey - Node certificate public key
     * @param networkType - The network type.
     * @param maxFee - (Optional) Max fee defined by the sender
     * @param signature - (Optional) Transaction signature
     * @param signer - (Optional) Signer public account
     * @returns {TransferTransaction}
     */
    static createPersistentDelegationRequestTransaction(deadline: Deadline, remoteLinkedPrivateKey: string, vrfPrivateKey: string, nodePublicKey: string, networkType: NetworkType, maxFee?: UInt64, signature?: string, signer?: PublicAccount): PersistentDelegationRequestTransaction;
}
