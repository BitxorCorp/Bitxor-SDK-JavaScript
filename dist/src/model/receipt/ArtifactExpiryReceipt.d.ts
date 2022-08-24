import { UnresolvedTokenId } from '../token';
import { Receipt } from './Receipt';
import { ReceiptType } from './ReceiptType';
import { ReceiptVersion } from './ReceiptVersion';
/**
 * Artifact Expiry: An artifact (e.g. namespace, token) expired.
 */
export declare class ArtifactExpiryReceipt extends Receipt {
    readonly artifactId: UnresolvedTokenId;
    /**
     * Artifact expiry receipt
     * @param artifactId -The id of the artifact (eg. namespace, token).
     * @param version - The receipt version
     * @param type - The receipt type
     * @param size - the receipt size
     */
    constructor(artifactId: UnresolvedTokenId, version: ReceiptVersion, type: ReceiptType, size?: number);
}
