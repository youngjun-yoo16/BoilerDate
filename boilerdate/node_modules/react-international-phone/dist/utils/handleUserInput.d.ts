import { ParsedCountry } from '../types';
import { PhoneFormattingConfig } from './handlePhoneChange';
interface HandleUserInputOptions extends PhoneFormattingConfig {
    country: ParsedCountry;
    insertDialCodeOnEmpty: boolean;
    phoneBeforeInput: string;
}
export declare const handleUserInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, { country, insertDialCodeOnEmpty, phoneBeforeInput, prefix, charAfterDialCode, forceDialCode, disableDialCodeAndPrefix, countryGuessingEnabled, defaultMask, disableFormatting, countries, }: HandleUserInputOptions) => {
    phone: string;
    inputValue: string;
    cursorPosition: number;
    country: ParsedCountry;
};
export {};
