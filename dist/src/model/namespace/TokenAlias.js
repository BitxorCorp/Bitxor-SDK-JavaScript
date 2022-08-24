"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenAlias = void 0;
const Alias_1 = require("./Alias");
const AliasType_1 = require("./AliasType");
/**
 * The TokenAlias structure describe token aliases
 *
 * @since 0.10.2
 */
class TokenAlias extends Alias_1.Alias {
    /**
     * Create AddressAlias object
     * @param tokenId
     */
    constructor(
    /**
     * The alias address
     */
    tokenId) {
        super(AliasType_1.AliasType.Token, undefined, tokenId);
        this.tokenId = tokenId;
    }
    /**
     * Compares AddressAlias for equality.
     *
     * @return boolean
     */
    equals(alias) {
        return alias && alias.type === this.type && this.tokenId.equals(alias.tokenId);
    }
    /**
     * Get string value of tokenId
     * @returns {string}
     */
    toHex() {
        return this.tokenId.toHex();
    }
}
exports.TokenAlias = TokenAlias;
//# sourceMappingURL=TokenAlias.js.map