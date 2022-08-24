import { MessageType } from './MessageType';
/**
 * An abstract message class that serves as the base class of all message types.
 */
export declare abstract class Message {
    /**
     * Message type
     */
    readonly type: MessageType;
    /**
     * Message payload, it could be the message hex, encryped text or plain text depending on the message type.
     */
    readonly payload: string;
    /**
     * Create DTO object
     */
    toDTO(): string;
}
