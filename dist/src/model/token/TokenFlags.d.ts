/**
 * Token flags model
 */
export declare class TokenFlags {
    /**
     * The creator can choose between a definition that allows a token supply change at a later point or an immutable supply.
     * Allowed values for the property are "true" and "false". The default value is "false".
     */
    readonly supplyMutable: boolean;
    /**
     * The creator can choose if the token definition should allow for transfers of the token among accounts other than the creator.
     * If the property 'transferable' is set to "false", only transfer transactions
     * having the creator as sender or as recipient can transfer tokens of that type.
     * If set to "true" the tokens can be transferred to and from arbitrary accounts.
     * Allowed values for the property are thus "true" and "false". The default value is "true".
     */
    readonly transferable: boolean;
    /**
     * Not all the tokens of a given network will be subject to token restrictions. The feature will only affect
     * those to which the issuer adds the "restrictable" property explicitly at the moment of its creation. This
     * property appears disabled by default, as it is undesirable for autonomous tokens like the public network currency.
     */
    readonly restrictable: boolean;
    /**
     *  The creator can choose if he can revoke tokens after a transfer.
     */
    readonly revokable: boolean;
    /**
     * @param flags
     */
    constructor(flags: number);
    /**
     * Static constructor function with default parameters
     * @returns {TokenFlags}
     * @param supplyMutable
     * @param transferable
     * @param restrictable
     * @param revokable
     */
    static create(supplyMutable: boolean, transferable: boolean, restrictable?: boolean, revokable?: boolean): TokenFlags;
    /**
     * Get token flag value in number
     * @returns {number}
     */
    getValue(): number;
    /**
     * Create DTO object
     */
    toDTO(): any;
    /**
     * It "adds up" individual flags into a bit wise number flag.
     *
     * @param supplyMutable - if the supply is mutable. First flag.
     * @param transferable - if the balance can be transferred. Second flag.
     * @param restrictable - if the transaction can be restricted. Third flag.
     * @param revokable - if the balance can be revoked. Fourth flag.
     * @private
     */
    private static toFlag;
}
