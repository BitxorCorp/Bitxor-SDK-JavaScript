export declare enum TokenRestrictionType {
    /**
     * uninitialized value indicating no restriction
     */
    NONE = 0,
    /**
     * allow if equal
     */
    EQ = 1,
    /**
     * allow if not equal
     */
    NE = 2,
    /**
     * allow if less than
     */
    LT = 3,
    /**
     * allow if less than or equal
     */
    LE = 4,
    /**
     * allow if greater than
     */
    GT = 5,
    /**
     * allow if greater than or equal
     */
    GE = 6
}
