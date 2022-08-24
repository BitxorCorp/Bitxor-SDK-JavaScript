import { Message } from './Message';
/**
 * Objects that knows how to create messages from serialized payloads.
 *
 * Note: this could be in the Message class but the circular dependency breaks Typescript.
 */
export declare class MessageFactory {
    /**
     * It creates a message from the byte array payload
     * @param payload the payload as byte array
     */
    static createMessageFromBuffer(payload?: Uint8Array): Message;
    /**
     * It creates a message from the hex payload
     * @param payload the payload as hex
     */
    static createMessageFromHex(payload?: string): Message;
}
/**
 * Raw message containing an empty string without any type or prefix.
 * @type {PlainMessage}
 */
export declare const EmptyMessage: Message;
