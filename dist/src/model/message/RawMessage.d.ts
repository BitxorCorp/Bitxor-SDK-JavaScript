import { Message } from './Message';
/**
 * The a raw message that doesn't assume any prefix.
 */
export declare class RawMessage extends Message {
    /**
     * Create plain message object.
     * @returns PlainMessage
     */
    static create(payload: Uint8Array): RawMessage;
}
