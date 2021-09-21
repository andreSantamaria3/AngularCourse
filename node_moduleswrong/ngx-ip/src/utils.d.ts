export declare const noop: () => void;
export interface AddressModeLogic {
    BLOCK_COUNT: number;
    SEP: string;
    RE_CHAR: RegExp;
    RE_BLOCK: RegExp[];
    blocks: () => string[];
    fromBlocks: (blocks: string[], sep?: string) => string;
    split: (value: string, sep?: string, throwError?: boolean) => string[];
    isValid: (blocks: string[]) => boolean;
    isMaxLen: (value: string) => boolean;
}
export declare const v4: AddressModeLogic;
export declare const v4WithMask: AddressModeLogic;
export declare const v6: AddressModeLogic;
export declare const mac: AddressModeLogic;
export declare const inputSelection: {
    insert(input: HTMLInputElement, value: string): string;
    caretIsLast(input: HTMLInputElement): boolean;
    some(input: HTMLInputElement): boolean;
    all(input: HTMLInputElement): boolean;
};
export declare function coerceBooleanProperty(value: any): boolean;
