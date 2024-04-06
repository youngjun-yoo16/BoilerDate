import './CountrySelectorDropdown.style.scss';
import React from 'react';
import { CountryData, CountryIso2, CustomFlagImage, ParsedCountry } from '../../types';
export interface CountrySelectorDropdownStyleProps {
    style?: React.CSSProperties;
    className?: string;
    listItemStyle?: React.CSSProperties;
    listItemClassName?: string;
    listItemFlagStyle?: React.CSSProperties;
    listItemFlagClassName?: string;
    listItemCountryNameStyle?: React.CSSProperties;
    listItemCountryNameClassName?: string;
    listItemDialCodeStyle?: React.CSSProperties;
    listItemDialCodeClassName?: string;
    preferredListDividerStyle?: React.CSSProperties;
    preferredListDividerClassName?: string;
}
export interface CountrySelectorDropdownProps extends CountrySelectorDropdownStyleProps {
    show: boolean;
    dialCodePrefix?: string;
    selectedCountry: CountryIso2;
    countries?: CountryData[];
    preferredCountries?: CountryIso2[];
    flags?: CustomFlagImage[];
    onSelect?: (country: ParsedCountry) => void;
    onClose?: () => void;
}
export declare const CountrySelectorDropdown: React.FC<CountrySelectorDropdownProps>;
