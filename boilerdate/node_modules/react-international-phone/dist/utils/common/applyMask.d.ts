interface ApplyMaskArgs {
    value: string;
    mask: string;
    maskSymbol: string;
    /**
     * Apply mask starting from provided char index
     * @example
     * value: "+12345678"
     * mask: "(....)"
     * offset === 2 -> "+1(2345)"
     * offset === 5 -> "+1234(5678)"
     */
    offset?: number;
    /**
     * @description Removes all non-maskSymbol chars from the result's ending if the value is shorter than the mask
     * @example
     * value: "1234"
     * mask: "(....) ...."
     * if true -> "(1234"
     * if false -> "(1234) "
     */
    trimNonMaskCharsLeftover?: boolean;
}
export declare const applyMask: ({ value, mask, maskSymbol, offset, trimNonMaskCharsLeftover, }: ApplyMaskArgs) => string;
export {};
