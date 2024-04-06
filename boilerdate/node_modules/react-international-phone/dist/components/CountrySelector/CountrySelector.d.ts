import './CountrySelector.style.scss';
import React from 'react';
import { CountryData, CountryIso2 } from '../../types';
import { CountrySelectorDropdownProps, CountrySelectorDropdownStyleProps } from './CountrySelectorDropdown';
export interface CountrySelectorStyleProps {
    style?: React.CSSProperties;
    className?: string;
    buttonStyle?: React.CSSProperties;
    buttonClassName?: string;
    buttonContentWrapperStyle?: React.CSSProperties;
    buttonContentWrapperClassName?: string;
    flagStyle?: React.CSSProperties;
    flagClassName?: string;
    dropdownArrowStyle?: React.CSSProperties;
    dropdownArrowClassName?: string;
    dropdownStyleProps?: CountrySelectorDropdownStyleProps;
}
type RenderButtonWrapperRootProps = {
    onClick: () => void;
} & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onKeyDown' | 'onMouseDown' | 'title' | 'disabled' | 'role' | 'aria-label' | 'aria-haspopup' | 'aria-expanded'>;
export interface CountrySelectorProps extends CountrySelectorStyleProps {
    selectedCountry: CountryIso2;
    onSelect?: CountrySelectorDropdownProps['onSelect'];
    disabled?: boolean;
    hideDropdown?: boolean;
    countries?: CountryData[];
    preferredCountries?: CountryIso2[];
    flags?: CountrySelectorDropdownProps['flags'];
    renderButtonWrapper?: (props: {
        children: React.ReactNode;
        rootProps: RenderButtonWrapperRootProps;
    }) => React.ReactNode;
}
export declare const CountrySelector: React.FC<CountrySelectorProps>;
export {};
