import './FlagImage.style.scss';
import React, { CSSProperties } from 'react';
import { ParsedCountry } from '../../types';
export interface FlagImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    /**
     * @description iso2 code of country flag
     * @required
     */
    iso2?: ParsedCountry['iso2'];
    /**
     * @description Size of flag
     * @default undefined
     */
    size?: CSSProperties['width'];
    /**
     * @description Custom src of flag
     * @default undefined
     */
    src?: string;
    /**
     * @description Protocol to use with twemoji cnd
     * @default "https"
     */
    protocol?: 'http' | 'https';
    /**
     * @description Disable lazy loading of flags (loading="lazy" attribute will not be set)
     * @default undefined
     */
    disableLazyLoading?: boolean;
}
export declare const FlagImage: React.FC<FlagImageProps>;
