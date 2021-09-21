import { ChangeDetectorRef } from '@angular/core';
import { NgxIpBase, COPY_METHOD } from './ngx-ip.base';
export declare const ADDRESS_CONTROL_VALUE_ACCESSOR: any;
export declare const ADDRESS_CONTROL_VALIDATORS: any;
export declare class NgxIpComponent extends NgxIpBase {
    containerClass: string[];
    resolveCopyMethod: (method: COPY_METHOD) => void;
    inputAnim: string;
    private _highlightInvalidBlocks;
    /**
     * When true add's the 'ngx-ip-error' class to the block when it's invalid.
     * @param value
     */
    highlightInvalidBlocks: boolean;
    focused: boolean;
    /**
     * The CSS class representing the theme of this instance.
     * @param value
     */
    theme: string;
    private _theme;
    constructor(cdr: ChangeDetectorRef);
    onCopyDecision(method: COPY_METHOD): void;
    getUserCopyMethod(): Promise<COPY_METHOD>;
}
