interface AddDialCodeProps {
    phone: string;
    dialCode: string;
    prefix?: string;
    charAfterDialCode?: string;
}
export declare const addDialCode: ({ phone, dialCode, prefix, charAfterDialCode, }: AddDialCodeProps) => string;
export {};
