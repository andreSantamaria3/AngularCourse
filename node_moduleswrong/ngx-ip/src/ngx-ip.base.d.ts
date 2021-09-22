import { EventEmitter, QueryList, ElementRef, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { AbstractControl, ValidationErrors, ControlValueAccessor, Validator } from '@angular/forms';
import { AddressModeLogic } from './utils';
export declare type ADDRESS_MODE_TYPE = 'ipv4' | 'ipv4WithMask' | 'ipv6' | 'mac';
export declare type COPY_METHOD = 'block' | 'address';
export declare type COPY_MODE_TYPE = 'block' | 'address' | 'select';
export declare type VALIDATION_TYPE = 'none' | 'char' | 'block';
export declare class NgxIpBase implements OnChanges, ControlValueAccessor, Validator {
    private _cdr;
    blocks: string[];
    blocksRef: number[];
    invalidBlocks: boolean[];
    addr: AddressModeLogic;
    focused: any;
    /**
     * IP format.
     * Valid values: 'ipv4', 'ipv6' or 'mac'
     * @param mode
     */
    mode: ADDRESS_MODE_TYPE;
    value: string;
    copyMode: COPY_MODE_TYPE;
    /**
     * The separator to use character to use as an octet delimiter.
     * The value has an effect on both UI and UX.
     * On the UI side, this character is what the user see's as the delimiter.
     * On the UX side, when this character value is pressed the focus jumps to the next octet
     * similar to what happens when the user press TAB
     *
     * Another behaviour that changes is the paste operation, paste will split to octets by the specified
     * separator, e.g.: The IP address 10.0.0.1 when pasted and the separator is "," will not split correctly.
     */
    separator: string;
    /**
     * The validation level performed on an input.
     * This is a validation performed based on a keystroke. Does not apply to paste.
     * none - No validation
     * char - Only valid char's are allowed (however, invalid value can be set. e.g: 333)
     * block - Only valid char's that compose a valid block are allowed
     *
     * Default: 'block'
     */
    inputValidation: VALIDATION_TYPE;
    /**
     * A bit map representing disabled blocks.
     * e.g: [1, 1, 0, 0] will set disabled the first 2 blocks (from the left).
     * Since the component is set to OnPush this is an immutable array, to change the state
     * replace the array (don't change it's items).
     */
    disabledBlocks: boolean[];
    disabled: any;
    readonly: any;
    required: any;
    change: EventEmitter<string>;
    inputs: QueryList<ElementRef>;
    separatorMap: string[];
    protected errorCount: number;
    protected emptyFlag: number;
    protected fullBlocks: number;
    private _required;
    private _readonly;
    private _disabled;
    private _mode;
    private _value;
    private _onTouchedCallback;
    private _onChangeCallback;
    private autoCopy;
    private _separator;
    constructor(_cdr: ChangeDetectorRef);
    ngOnChanges(changes: SimpleChanges): void;
    isBlockDisabled(idx: number): boolean;
    validate(c: AbstractControl): ValidationErrors | null;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    /**
     * Override this method to enable custom copy mode user selection.
     * The default implementation does not enable selection and set 'block' mode.
     */
    getUserCopyMethod(): Promise<COPY_METHOD>;
    /**
     * A Copy (ctrl-c) event handler to control the copy behaviour based on
     * the copyMode the user have selected.
     *
     * Do not override this method in extending classes, to provide a custom
     * mode selection UX use getUserCopyMethod()
     *
     * This method handles the whole copy process, including browser support
     * initialization and the "select" copy mode process.
     * @internal
     */
    onCopy($event: ClipboardEvent, idx: number): void;
    /**
     * A Paste (ctrl-v) event handler to control the paste behaviour.
     * This method can be overriden by extending classes.
     * When overriding, use paste() method.
     */
    onPaste($event: ClipboardEvent, blockIndex: number): void;
    onChange(value: string, idx: number): void;
    onKeyPress($event: KeyboardEvent, idx: number): void;
    onKeyUp($event: KeyboardEvent, idx: number): void;
    onBlur(idx: number): void;
    onFocus(idx: number): void;
    protected isBackspace($event: KeyboardEvent): boolean;
    protected getInputElement(blockIndex: number): HTMLInputElement | undefined;
    protected paste(data: string, blockIndex: number): boolean;
    protected reset(): void;
    /**
     * mark the validity for all blocks
     */
    protected markValidity(): void;
    protected markBlockValidity(value: string, idx: number): void;
    protected focusNext(idx: number, selectRange?: boolean): void;
    protected toBlocks(value: string): string[];
    protected fromBlocks(blocks: string[]): string;
    private copyUserSelectedMethod(blockIndex);
    private notifyChange(value);
}
