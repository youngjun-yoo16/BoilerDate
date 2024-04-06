import './DialCodePreview.style.scss';
import React from 'react';
export interface DialCodePreviewStyleProps {
    style?: React.CSSProperties;
    className?: string;
}
export interface DialCodePreviewProps extends DialCodePreviewStyleProps {
    dialCode: string;
    prefix: string;
    disabled?: boolean;
}
export declare const DialCodePreview: React.FC<DialCodePreviewProps>;
