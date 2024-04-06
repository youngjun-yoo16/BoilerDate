interface GetCursorPositionProps {
    phoneBeforeInput: string;
    phoneAfterInput: string;
    phoneAfterFormatted: string;
    cursorPositionAfterInput: number;
    leftOffset?: number;
    deletion?: 'forward' | 'backward' | undefined;
}
export declare const getCursorPosition: ({ phoneBeforeInput, phoneAfterInput, phoneAfterFormatted, cursorPositionAfterInput, leftOffset, deletion, }: GetCursorPositionProps) => number;
export {};
