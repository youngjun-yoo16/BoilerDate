import { CountryData, CountryGuessResult, CountryIso2 } from '../../types';
export declare const guessCountryByPartialNumber: ({ phone: partialPhone, countries, currentCountryIso2, }: {
    phone: string;
    countries?: CountryData[] | undefined;
    currentCountryIso2?: CountryIso2 | undefined;
}) => CountryGuessResult;
