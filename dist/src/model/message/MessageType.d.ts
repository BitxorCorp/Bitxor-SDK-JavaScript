/**
 * The Message type. Supported supply types are:
 * -1: RawMessage (no type appended)
 * 0: PlainMessage
 * 1: EncryptedMessage.
 * 254: Persistent harvesting delegation.
 */
export declare enum MessageType {
    RawMessage = -1,
    PlainMessage = 0,
    EncryptedMessage = 1,
    PersistentHarvestingDelegationMessage = 254
}
