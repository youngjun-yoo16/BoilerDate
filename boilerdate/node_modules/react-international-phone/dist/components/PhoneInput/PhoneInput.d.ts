import './PhoneInput.style.scss';
import React from 'react';
import { usePhoneInput, UsePhoneInputConfig } from '../../hooks/usePhoneInput';
import { ParsedCountry } from '../../types';
import { CountrySelectorProps, CountrySelectorStyleProps } from '../CountrySelector/CountrySelector';
import { DialCodePreviewStyleProps } from '../DialCodePreview/DialCodePreview';
export interface PhoneInputStyleProps {
    style?: React.CSSProperties;
    className?: string;
    inputStyle?: React.CSSProperties;
    inputClassName?: string;
    countrySelectorStyleProps?: CountrySelectorStyleProps;
    dialCodePreviewStyleProps?: DialCodePreviewStyleProps;
}
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
export interface PhoneInputProps extends Omit<UsePhoneInputConfig, 'onChange'>, PhoneInputStyleProps {
    /**
     * @description Hide the dropdown icon. Make country selection not accessible.
     * @default false
     */
    hideDropdown?: CountrySelectorProps['hideDropdown'];
    /**
     * @description
     * Show prefix and dial code between country selector and phone input.
     * Works only when *disableDialCodeAndPrefix* is *true*
     * @default false
     */
    showDisabledDialCodeAndPrefix?: boolean;
    /**
     * @description Disable auto focus on input field after country select.
     * @default false
     */
    disableFocusAfterCountrySelect?: boolean;
    /**
     * @description Custom flag URLs array
     * @default undefined
     */
    flags?: CountrySelectorProps['flags'];
    /**
     * @description Callback that calls on phone change
     * @param phone - New phone value in E.164 format.
     * @param meta - Additional information about the phone.
     * @param data.country - New phone country object.
     * @param data.inputValue - Value that is displayed in input element.
     * @default undefined
     */
    onChange?: (phone: string, meta: {
        country: ParsedCountry;
        inputValue: string;
    }) => void;
    /**
     * @description Default input component props
     * @default undefined
     */
    inputProps?: InputProps;
    onFocus?: InputProps['onFocus'];
    onBlur?: InputProps['onBlur'];
    name?: InputProps['name'];
    required?: InputProps['required'];
    autoFocus?: InputProps['autoFocus'];
    disabled?: InputProps['disabled'];
    placeholder?: InputProps['placeholder'];
}
export type PhoneInputRefType = null | (HTMLInputElement & {
    setCountry: ReturnType<typeof usePhoneInput>['setCountry'];
    state: {
        phone: string;
        inputValue: string;
        country: ParsedCountry;
    };
});
export declare const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps & React.RefAttributes<PhoneInputRefType>>;
export {};
