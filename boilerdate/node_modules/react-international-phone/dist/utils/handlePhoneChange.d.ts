import { CountryData, ParsedCountry } from '../types';
export interface PhoneFormattingConfig {
    countries: CountryData[];
    prefix: string;
    charAfterDialCode: string;
    forceDialCode: boolean;
    disableDialCodeAndPrefix: boolean;
    defaultMask: string;
    countryGuessingEnabled: boolean;
    disableFormatting: boolean;
}
interface HandlePhoneChangeProps extends PhoneFormattingConfig {
    value: string;
    country: ParsedCountry;
    insertDialCodeOnEmpty: boolean;
    trimNonDigitsEnd?: boolean;
}
export declare function handlePhoneChange({ value, country, insertDialCodeOnEmpty, trimNonDigitsEnd, countries, prefix, charAfterDialCode, forceDialCode, disableDialCodeAndPrefix, defaultMask, countryGuessingEnabled, disableFormatting, }: HandlePhoneChangeProps): {
    phone: string;
    inputValue: string;
    country: ParsedCountry;
};
export {};
