export declare class NodeVersion {
    /**
     * The raw node version value.
     */
    private readonly nodeVersion;
    /**
     * Create a NodeVersion from a given raw version number.
     * @param {number} rawNodeVersion - Node version in number format.
     *                  ex: 655367
     * @returns {NodeVersion}
     */
    static createFromRawNodeVersion(rawNodeVersion: number): NodeVersion;
    /**
     * Create a NodeVersion from a given formatted version string.
     * @param {string} formattedNodeVersion - Node version in string format.
     *                  ex: 0.10.0.7
     * @returns {NodeVersion}
     */
    static createFromFormattedNodeVersion(formattedNodeVersion: string): NodeVersion;
    /**
     * Determines the validity of a raw node version number.
     * @param {string} rawNodeVersion The raw node version number. Expected format 655367
     * @returns {boolean} true if the raw node version number is valid, false otherwise.
     */
    static isValidRawNodeVersion: (rawNodeVersion: number) => boolean;
    /**
     * Determines the validity of a formatted node version string.
     * @param {string} formattedNodeVersion The formatted node version string. Expected format: 0.10.0.7
     * @returns {boolean} true if the formatted node version string is valid, false otherwise.
     */
    static isValidFormattedNodeVersion: (formattedNodeVersion: string) => boolean;
    /**
     * Get node version in formatted format ex: 0.10.0.7
     * @returns {string}
     */
    formatted(): string;
    /**
     * Get node version in the raw numeric format ex: 655367.
     * @returns {number}
     */
    raw(): number;
    /**
     * Compares node versions for equality
     * @param nodeVersion - Node version to compare
     * @returns {boolean}
     */
    equals(nodeVersion: any): boolean;
}
