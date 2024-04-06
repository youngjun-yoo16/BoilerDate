interface RemoveDialCodeProps {
    phone: string;
    dialCode: string;
    prefix?: string;
    charAfterDialCode?: string;
}
export declare const removeDialCode: ({ phone, dialCode, prefix, charAfterDialCode, }: RemoveDialCodeProps) => string;
export {};
