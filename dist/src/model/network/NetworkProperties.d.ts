import { NodeIdentityEqualityStrategy } from 'bitxor-openapi-typescript-fetch-client';
/**
 * Network related configuration properties.
 */
export declare class NetworkProperties {
    readonly identifier?: string | undefined;
    readonly nodeEqualityStrategy?: NodeIdentityEqualityStrategy | undefined;
    readonly genesisSignerPublicKey?: string | undefined;
    readonly generationHashSeed?: string | undefined;
    readonly epochAdjustment?: string | undefined;
    /**
     * @param identifier - Network identifier.
     * @param nodeEqualityStrategy - Node equality strategy. Defines if the identifier for the node must be its public key or host.
     * @param genesisSignerPublicKey - Genesis public key.
     * @param generationHashSeed - Seed for generate genesis generation hash.
     * @param epochAdjustment - Genesis epoch time adjustment.
     */
    constructor(identifier?: string | undefined, nodeEqualityStrategy?: NodeIdentityEqualityStrategy | undefined, genesisSignerPublicKey?: string | undefined, generationHashSeed?: string | undefined, epochAdjustment?: string | undefined);
}
