export interface FormatPhoneConfig {
    prefix: string;
    dialCode: string;
    mask: string;
    maskChar: string;
    /**
     * Passed value will set after dial code
     */
    charAfterDialCode?: string;
    /**
     * Force dial code setting to result value
     * Will return only dial code if passed value not starts with dial code
     */
    forceDialCode?: boolean;
    /**
     * Insert prefix and dial code if provided empty value
     */
    insertDialCodeOnEmpty?: boolean;
    /**
     * @description
     * Result will not include passed *dialCode* and *prefix* if set to *true*.
     * Passed value will not process dial code if it's included in provided value.
     * Result will be the same as with *forceDialCode* option but without prefix and dial code on start
     *
     * @ignore provided *forceDialCode* value will be ignored and set to *false*
     * @ignore provided *insertDialCodeOnEmpty* value will be ignored and set to *true*
     */
    disableDialCodeAndPrefix?: boolean;
    /**
     * Trim all non-digit values from the end of the result
     */
    trimNonDigitsEnd?: boolean;
}
export declare const formatPhone: (phone: string, config: FormatPhoneConfig) => string;
