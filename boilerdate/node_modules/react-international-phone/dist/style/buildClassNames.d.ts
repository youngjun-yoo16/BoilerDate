export declare const classPrefix = "react-international-phone-";
export declare const joinClasses: (...classes: Array<string | false | undefined>) => string;
export declare const classNamesWithPrefix: (...classes: Array<string | false | undefined>) => string;
interface BuildClassNamesArgs {
    addPrefix: Array<string | false | undefined>;
    rawClassNames: Array<string | false | undefined>;
}
export declare const buildClassNames: ({ addPrefix, rawClassNames, }: BuildClassNamesArgs) => string;
export {};
