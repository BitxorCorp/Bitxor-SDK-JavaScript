import { NetworkType } from '../network';
import { Message } from './Message';
export declare class PersistentHarvestingDelegationMessage extends Message {
    static readonly HEX_PAYLOAD_SIZE = 264;
    constructor(payload: string);
    /**
     * @param remoteLinkedPrivateKey - Remote harvester signing private key linked to the main account
     * @param vrfPrivateKey - VRF private key linked to the main account
     * @param nodePublicKey - Node certificate public key
     * @param {NetworkType} networkType - Bitxorcore network type
     * @return {PersistentHarvestingDelegationMessage}
     */
    static create(remoteLinkedPrivateKey: string, vrfPrivateKey: string, nodePublicKey: string, networkType: NetworkType): PersistentHarvestingDelegationMessage;
    /**
     *
     * @param encryptMessage - Encrypted message to be decrypted
     * @param privateKey - Node certificate private key
     * @return {string}
     */
    static decrypt(encryptMessage: PersistentHarvestingDelegationMessage, privateKey: string): string;
}
