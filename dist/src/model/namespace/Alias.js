"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Alias = void 0;
/**
 * Abtract class for Aliases
 *
 * @since 0.10.2
 */
class Alias {
    /**
     * @internal
     * @param type - Alias type
     * @param address - Address for AddressAlias
     * @param tokenId - TokenId for TokenAlias
     */
    constructor(
    /**
     * The alias type
     *
     * - 0 : No alias
     * - 1 : Token id alias
     * - 2 : Address alias
     */
    type, 
    /**
     * The alias address
     */
    address, 
    /**
     * The alias tokenId
     */
    tokenId) {
        this.type = type;
        this.address = address;
        this.tokenId = tokenId;
    }
}
exports.Alias = Alias;
//# sourceMappingURL=Alias.js.map