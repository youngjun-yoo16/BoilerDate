/// <reference types="jest" />
import { CountryIso2 } from '../types';
export declare const getInput: () => HTMLInputElement;
export declare const getCountrySelector: () => HTMLElement;
export declare const getCountrySelectorDropdown: () => HTMLUListElement;
export declare const getDropdownOption: (country: CountryIso2) => HTMLLIElement;
export declare const getCountrySelectorFlag: () => HTMLLIElement;
export declare const getDropdownArrow: () => HTMLDivElement | null;
export declare const getDialCodePreview: () => HTMLDivElement | null;
export declare const getCountryFlag: (country: CountryIso2) => HTMLLIElement;
export declare const mockScrollIntoView: () => jest.Mock<any, any, any>;
/**
 * Make sure that `jest.useFakeTimers()` is called before use
 */
export declare const increaseSystemTime: (ms?: number) => void;
