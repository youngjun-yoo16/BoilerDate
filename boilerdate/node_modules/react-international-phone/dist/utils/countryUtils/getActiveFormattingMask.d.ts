import { ParsedCountry } from '../../types';
/**
 * Get the country mask format based on the phone value.
 * Since country can have multiple mask formats this function select proper mask based on regex
 */
export declare const getActiveFormattingMask: ({ phone, country, defaultMask, disableFormatting, }: {
    phone: string;
    country: ParsedCountry;
    /**
     * defaultMask is returned when country's format is undefined or not valid
     */
    defaultMask?: string | undefined;
    disableFormatting?: boolean | undefined;
}) => string;
