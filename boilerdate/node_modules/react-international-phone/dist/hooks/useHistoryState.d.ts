interface UseHistoryStateConfig<T> {
    size?: number;
    overrideLastItemDebounceMS?: number;
    onChange?: (data: T) => void;
}
interface SetStateConfig {
    /**
     * Update last history element (not create new one)
     */
    overrideLastItem?: boolean;
}
type HistoryActionResult<T> = {
    success: false;
} | {
    success: true;
    value: T;
};
export declare function useHistoryState<T extends Record<string, unknown> | string>(initialValue: T | (() => T), config?: UseHistoryStateConfig<T>): readonly [T, (value: T, config?: SetStateConfig) => void, () => HistoryActionResult<T>, () => HistoryActionResult<T>];
export {};
