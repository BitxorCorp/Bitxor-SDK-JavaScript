import { PublicAccount } from '../account';
import { Message } from './Message';
import { PlainMessage } from './PlainMessage';
/**
 * Encrypted Message model
 */
export declare class EncryptedMessage extends Message {
    readonly recipientPublicAccount?: PublicAccount;
    constructor(payload: string, recipientPublicAccount?: PublicAccount);
    /**
     *
     * @param message - Plain message to be encrypted
     * @param recipientPublicAccount - Recipient public account
     * @param privateKey - Sender private key
     * @return {EncryptedMessage}
     */
    static create(message: string, recipientPublicAccount: PublicAccount, privateKey: string): EncryptedMessage;
    /**
     *
     * @param encryptMessage - Encrypted message to be decrypted
     * @param privateKey - Recipient private key
     * @param recipientPublicAccount - Sender public account
     * @return {PlainMessage}
     */
    static decrypt(encryptMessage: EncryptedMessage, privateKey: any, recipientPublicAccount: PublicAccount): PlainMessage;
}
