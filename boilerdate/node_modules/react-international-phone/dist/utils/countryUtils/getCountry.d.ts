import { CountryData, ParsedCountry } from '../../types';
export declare const getCountry: ({ field, value, countries, }: {
    /**
     * field to search by
     */
    field: keyof ParsedCountry;
    /**
     * value to search for
     */
    value: CountryData[number];
    countries?: CountryData[] | undefined;
}) => ParsedCountry | undefined;
