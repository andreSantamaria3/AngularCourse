import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgModule, Output, ViewChildren, ViewEncapsulation, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const noop = () => { };
/**
 * @record
 */

const V4_BLOCK_RE = /^([01]?[0-9]?[0-9]|2[0-4][0-9]|25[0-5])$/;
const v4 = {
    BLOCK_COUNT: 4,
    SEP: '.',
    RE_CHAR: /^[0-9]$/,
    RE_BLOCK: [V4_BLOCK_RE, V4_BLOCK_RE, V4_BLOCK_RE, V4_BLOCK_RE],
    /**
     * @return {?}
     */
    blocks() { return ['', '', '', '']; },
    /**
     * @param {?} blocks
     * @param {?=} sep
     * @return {?}
     */
    fromBlocks(blocks, sep = v4.SEP) {
        return blocks.join(sep);
    },
    /**
     * @param {?} value
     * @param {?=} sep
     * @param {?=} throwError
     * @return {?}
     */
    split(value, sep = v4.SEP, throwError = false) {
        if (!value) {
            return v4.blocks();
        }
        const /** @type {?} */ result = value.split(sep);
        if (throwError && result.length !== v4.BLOCK_COUNT) {
            throw new Error('Invalid IPV4');
        }
        return result;
    },
    /**
     * @param {?} blocks
     * @return {?}
     */
    isValid(blocks) {
        return blocks.every(value => parseInt(value, 10) >= 0 && parseInt(value, 10) <= 255);
    },
    /**
     * @param {?} value
     * @return {?}
     */
    isMaxLen(value) {
        if (value.length === 3) {
            return true;
        }
        else if (value.length === 2 && parseInt(value, 10) > 25) {
            return true;
        }
        else {
            return false;
        }
    }
};
const v4WithMask = Object.assign(Object.create(v4), {
    BLOCK_COUNT: 5,
    RE_BLOCK: v4.RE_BLOCK.concat([/^([0-2]?[0-9]|30)$/]),
    /**
     * @return {?}
     */
    blocks() { return ['', '', '', '', '']; },
    /**
     * @param {?} blocks
     * @param {?=} sep
     * @return {?}
     */
    fromBlocks(blocks, sep = v4.SEP) {
        return blocks.slice(0, 4).join(sep) + `/${blocks[4]}`;
    },
    /**
     * @param {?} value
     * @param {?=} sep
     * @param {?=} throwError
     * @return {?}
     */
    split(value, sep = v4.SEP, throwError = false) {
        if (!value) {
            return v4WithMask.blocks();
        }
        const /** @type {?} */ result = value.split(sep);
        result.push(...result.pop().split('/'));
        if (throwError && result.length !== v4WithMask.BLOCK_COUNT) {
            throw new Error('Invalid IPV4 with Mask');
        }
        return result;
    },
    /**
     * @param {?} blocks
     * @return {?}
     */
    isValid(blocks) {
        for (let /** @type {?} */ i = 0; i < 4; i++) {
            const /** @type {?} */ value = parseInt(blocks[i], 10);
            if (!(value >= 0 && value <= 255)) {
                return false;
            }
        }
        const /** @type {?} */ value = parseInt(blocks[4], 10);
        return value >= 0 && value <= 30;
    },
    /**
     * @param {?} value
     * @return {?}
     */
    isMaxLen(value) {
        if (value.length === 3) {
            return true;
        }
        else if (value.length === 2 && parseInt(value, 10) > 25) {
            return true;
        }
        else {
            return false;
        }
    }
});
const V6_BLOCK_RE = /^[0-9A-Fa-f]{0,4}$/;
const v6 = {
    BLOCK_COUNT: 8,
    SEP: ':',
    RE_CHAR: /^[0-9A-Fa-f]$/,
    RE_BLOCK: v4.RE_BLOCK.map(s => V6_BLOCK_RE).concat(v4.RE_BLOCK.map(s => V6_BLOCK_RE)),
    /**
     * @return {?}
     */
    blocks() { return v4.blocks().concat(v4.blocks()); },
    /**
     * @param {?} blocks
     * @param {?=} sep
     * @return {?}
     */
    fromBlocks(blocks, sep = v6.SEP) {
        return blocks.map(value => value ? value : '0000').join(sep);
    },
    /**
     * @param {?} value
     * @param {?=} sep
     * @param {?=} throwError
     * @return {?}
     */
    split(value, sep = v6.SEP, throwError = false) {
        if (!value) {
            return v6.blocks();
        }
        const /** @type {?} */ consecutiveSplit = value.split(sep + sep);
        const /** @type {?} */ result = consecutiveSplit[0].split(sep);
        if (consecutiveSplit.length === 2) {
            // if :: is used we need to calculate the amount of empty blocks.
            // - Get the right parts (left is already the result)
            // - find how much blocks are missing to reach total of 8.
            // - fill the empty blocks and append right part.
            let /** @type {?} */ rightPart = consecutiveSplit[1].split(sep);
            let /** @type {?} */ emptySpaces = v6.BLOCK_COUNT - (result.length + rightPart.length);
            result.splice(result.length, 0, ...v6.blocks().slice(0, emptySpaces));
            result.splice(result.length, 0, ...rightPart);
        }
        // consecutive :: allowed once.
        if (throwError && (consecutiveSplit.length > 2 || result.length !== v6.BLOCK_COUNT)) {
            throw new Error('Invalid IPV6');
        }
        return result;
    },
    /**
     * @param {?} blocks
     * @return {?}
     */
    isValid(blocks) {
        return blocks.every(value => V6_BLOCK_RE.test(value)) && blocks.some(value => !!value);
    },
    /**
     * @param {?} value
     * @return {?}
     */
    isMaxLen(value) {
        return value.length === 4;
    }
};
const MAC_BLOCK_RE = /^[0-9A-Fa-f]{1,2}$/;
const mac = Object.assign(Object.create(v6), {
    BLOCK_MAX_LEN: 2,
    BLOCK_COUNT: 6,
    RE_BLOCK: v4.RE_BLOCK.map(s => MAC_BLOCK_RE).concat([MAC_BLOCK_RE, MAC_BLOCK_RE]),
    /**
     * @return {?}
     */
    blocks() { return ['', '', '', '', '', '']; },
    /**
     * @param {?} blocks
     * @param {?=} sep
     * @return {?}
     */
    fromBlocks(blocks, sep = mac.SEP) {
        return blocks.join(sep);
    },
    /**
     * @param {?} value
     * @param {?=} sep
     * @param {?=} throwError
     * @return {?}
     */
    split(value, sep = mac.SEP, throwError = false) {
        if (!value) {
            return mac.blocks();
        }
        const /** @type {?} */ result = value.split(sep);
        if (throwError && result.length !== mac.BLOCK_COUNT) {
            throw new Error('Invalid MAC address');
        }
        return result;
    },
    /**
     * @param {?} blocks
     * @return {?}
     */
    isValid(blocks) {
        return blocks.every(value => MAC_BLOCK_RE.test(value)) && blocks.some(value => !!value);
    },
    /**
     * @param {?} value
     * @return {?}
     */
    isMaxLen(value) {
        return value.length === 2;
    }
});
const inputSelection = {
    /**
     * Given an input element, insert the supplied value at the caret position.
     * If some (or all) of the text is selected, replaces the selection with the value.
     * In case the input is falsy returns the value. (universal)
     * @param {?} input
     * @param {?} value
     * @return {?}
     */
    insert(input, value) {
        return input
            ? input.value.substr(0, input.selectionStart) + value + input.value.substr(input.selectionEnd)
            : value;
    },
    /**
     * @param {?} input
     * @return {?}
     */
    caretIsLast(input) {
        return input
            ? input.selectionStart === input.selectionEnd && input.selectionStart === input.value.length
            : false;
    },
    /**
     * Returns true if some (or all) of the text is selected
     * @param {?} input
     * @return {?}
     */
    some(input) {
        return input.selectionStart > input.selectionEnd;
    },
    /**
     * Returns true if the whole text is selected
     * @param {?} input
     * @return {?}
     */
    all(input) {
        return input.selectionStart === 0 && input.selectionEnd === input.value.length;
    }
};
/**
 * @param {?} value
 * @return {?}
 */
function coerceBooleanProperty(value) {
    return value != null && `${value}` !== 'false';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
// if supported set it, else try once
let COPY_FEAT_SUPPORTED = document.queryCommandSupported('copy') ? true : null;
/**
 * @param {?} $event
 * @return {?}
 */
function cancelEvent($event) {
    $event.preventDefault();
    $event.stopPropagation();
}
const MODE_MAP = {
    'ipv6': v6,
    'mac': mac,
    'ipv4WithMask': v4WithMask,
    'ipv4': v4
};
class NgxIpBase {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
        /**
         * The validation level performed on an input.
         * This is a validation performed based on a keystroke. Does not apply to paste.
         * none - No validation
         * char - Only valid char's are allowed (however, invalid value can be set. e.g: 333)
         * block - Only valid char's that compose a valid block are allowed
         *
         * Default: 'block'
         */
        this.inputValidation = 'block';
        /**
         * A bit map representing disabled blocks.
         * e.g: [1, 1, 0, 0] will set disabled the first 2 blocks (from the left).
         * Since the component is set to OnPush this is an immutable array, to change the state
         * replace the array (don't change it's items).
         */
        this.disabledBlocks = [];
        this.change = new EventEmitter();
        this.errorCount = 0;
        this.emptyFlag = 0;
        this.fullBlocks = 0;
        this._required = false;
        this._readonly = false;
        this._disabled = false;
        this._value = null;
        this._onTouchedCallback = noop;
        this._onChangeCallback = noop;
        this.mode = 'ipv4';
    }
    /**
     * @return {?}
     */
    get mode() {
        return this._mode;
    }
    /**
     * IP format.
     * Valid values: 'ipv4', 'ipv6' or 'mac'
     * @param {?} mode
     * @return {?}
     */
    set mode(mode) {
        if (this._mode === mode) {
            return;
        }
        /* We set the separator of the new address logic only if user did not set it explicitly.
               but we also need to support changing of modes so we check old address logic separator to\
               match current, if match then we know user did not set separator to something else and so
               we update new logic separator */
        const /** @type {?} */ setSeparator = !this.addr || this.separator === this.addr.SEP;
        this.addr = MODE_MAP[mode];
        if (!this.addr) {
            throw new Error(`Unknown mode ${mode}`);
        }
        if (setSeparator) {
            this.separator = this.addr.SEP;
        }
        this._mode = mode;
        this.blocks = this.addr.blocks();
        this.blocksRef = [];
        this.invalidBlocks = [];
        this.fullBlocks = 0;
        for (let /** @type {?} */ i = 0; i < this.addr.BLOCK_COUNT; i++) {
            this.fullBlocks |= 1 << (i + 1);
            this.blocksRef[i] = i;
            this.invalidBlocks[i] = false;
        }
    }
    /**
     * @return {?}
     */
    get value() { return this._value; }
    ;
    /**
     * @param {?} v
     * @return {?}
     */
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.blocks = this.toBlocks(v);
            this.markValidity();
            this._onChangeCallback(v);
            this._cdr.markForCheck();
            this._cdr.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    get copyMode() {
        switch (this.autoCopy) {
            case 'DEFAULT_ADDRESS':
                return 'address';
            case 'DEFAULT_BLOCK':
                return 'block';
            default:
                return 'select';
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set copyMode(value) {
        // if copy is not supported in this browser don't allow select mode.
        if (COPY_FEAT_SUPPORTED === false && value === 'select') {
            value = undefined;
        }
        switch (value) {
            case 'select':
                this.autoCopy = undefined;
                break;
            case 'address':
                this.autoCopy = 'DEFAULT_ADDRESS';
                break;
            default:
                this.autoCopy = 'DEFAULT_BLOCK';
                break;
        }
    }
    /**
     * The separator to use character to use as an octet delimiter.
     * The value has an effect on both UI and UX.
     * On the UI side, this character is what the user see's as the delimiter.
     * On the UX side, when this character value is pressed the focus jumps to the next octet
     * similar to what happens when the user press TAB
     *
     * Another behaviour that changes is the paste operation, paste will split to octets by the specified
     * separator, e.g.: The IP address 10.0.0.1 when pasted and the separator is "," will not split correctly.
     * @return {?}
     */
    get separator() { return this._separator; }
    /**
     * @param {?} value
     * @return {?}
     */
    set separator(value) {
        this._separator = value;
        this.separatorMap = this.addr.blocks().map(b => value);
        this.separatorMap[this.addr.BLOCK_COUNT - 1] = '';
        if (this.addr === v4WithMask) {
            this.separatorMap[this.addr.BLOCK_COUNT - 2] = '/';
        }
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} value
     * @return {?}
     */
    set disabled(value) { this._disabled = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} value
     * @return {?}
     */
    set readonly(value) { this._readonly = coerceBooleanProperty(value); }
    /**
     * @return {?}
     */
    get required() { return this._required; }
    /**
     * @param {?} value
     * @return {?}
     */
    set required(value) { this._required = coerceBooleanProperty(value); }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if ('separator' in changes) {
            if (!changes["separator"].currentValue) {
                this.separator = this.addr.SEP;
            }
            else if (this.separator.length > 1) {
                this.separator = this.separator[0];
            }
        }
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    isBlockDisabled(idx) {
        return this.disabled || this.disabledBlocks[idx];
    }
    /**
     * @param {?} c
     * @return {?}
     */
    validate(c) {
        if (this.required && this.fullBlocks === this.emptyFlag) {
            return { required: true };
        }
        if (this.errorCount > 0) {
            return { NgxIpControl: 'Invalid address' };
        }
        else {
            return null;
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        /* This is a special case, we can't just do this.value = value
            because the old value is irrelevant as it might have a value differebt from the input's (not commited yet)
            this call comes from the form so we need to reset everything. */
        this._value = value;
        this.blocks = this.toBlocks(value);
        this.markValidity();
        this._cdr.markForCheck();
        this._cdr.detectChanges();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * Override this method to enable custom copy mode user selection.
     * The default implementation does not enable selection and set 'block' mode.
     * @return {?}
     */
    getUserCopyMethod() {
        return Promise.resolve(/** @type {?} */ ('block'));
    }
    /**
     * A Copy (ctrl-c) event handler to control the copy behaviour based on
     * the copyMode the user have selected.
     *
     * Do not override this method in extending classes, to provide a custom
     * mode selection UX use getUserCopyMethod()
     *
     * This method handles the whole copy process, including browser support
     * initialization and the "select" copy mode process.
     * \@internal
     * @param {?} $event
     * @param {?} idx
     * @return {?}
     */
    onCopy($event, idx) {
        switch (COPY_FEAT_SUPPORTED) {
            case 'TEST':
                // if we hit this it means we are testing if copy works on this
                // browser, and it does...
                COPY_FEAT_SUPPORTED = true;
                return;
            case true:
                break;
            case false:
                return; // not supported, returning here will in-effect apply "block" mode.
            case null:
                // make sure recursion will not overflow
                COPY_FEAT_SUPPORTED = 'TEST';
                document.execCommand('copy');
                if (/** @type {?} */ (COPY_FEAT_SUPPORTED) !== true) {
                    // if not supported return without cancelling, resulting in the original copy command
                    // passed through as usual, setting COPY_FEAT_SUPPORTED to false also means
                    // it will not allow changing the copyMode. We also set the copy mode to the default.
                    COPY_FEAT_SUPPORTED = false;
                    return;
                }
                break;
            default:
                return;
        }
        try {
            switch (this.autoCopy) {
                case 'block':
                    this.autoCopy = undefined;
                case 'DEFAULT_BLOCK':
                    return;
                case 'address':
                    this.autoCopy = undefined;
                case 'DEFAULT_ADDRESS':
                    const /** @type {?} */ value = this.fromBlocks(this.blocks);
                    $event.clipboardData.setData('text', value);
                    cancelEvent($event);
                    break;
                case 'IN_FLIGHT':
                    cancelEvent($event);
                    break;
                default:
                    cancelEvent($event);
                    if (inputSelection.all(/** @type {?} */ ($event.target))) {
                        this.autoCopy = 'IN_FLIGHT';
                        this.getUserCopyMethod()
                            .then(method => {
                            this.autoCopy = (method === 'address' ? 'address' : 'block');
                            this.copyUserSelectedMethod(idx);
                        })
                            .catch(err => this.autoCopy = undefined);
                    }
                    break;
            }
        }
        catch (/** @type {?} */ e) {
        }
    }
    /**
     * A Paste (ctrl-v) event handler to control the paste behaviour.
     * This method can be overriden by extending classes.
     * When overriding, use paste() method.
     * @param {?} $event
     * @param {?} blockIndex
     * @return {?}
     */
    onPaste($event, blockIndex) {
        try {
            const /** @type {?} */ data = $event.clipboardData.getData('text');
            this.paste(data, blockIndex);
        }
        catch (/** @type {?} */ e) { }
        cancelEvent($event);
    }
    /**
     * @param {?} value
     * @param {?} idx
     * @return {?}
     */
    onChange(value, idx) {
        if (this.blocks[idx] === value) {
            return;
        }
        this.blocks[idx] = value;
        this.markValidity();
        this.notifyChange(this.fromBlocks(this.blocks));
    }
    /**
     * @param {?} $event
     * @param {?} idx
     * @return {?}
     */
    onKeyPress($event, idx) {
        // safari/ff will cancel copy/paste , chrome wont... so don't mess with it.
        if ($event.metaKey || $event.ctrlKey || $event.altKey) {
            return;
        }
        // browser support (e.g: safari)
        let /** @type {?} */ key = typeof $event.key === 'string' ? $event.key : String.fromCharCode($event.charCode);
        if (key === 'Tab') {
            // FireFox
            return;
        }
        else if (key === this.separator) {
            cancelEvent($event);
            this.focusNext(idx);
        }
        else if (this.isBackspace($event)) {
            // for FireFox
            return this.onKeyUp($event, idx);
        }
        const /** @type {?} */ isLast = inputSelection.caretIsLast(/** @type {?} */ ($event.target));
        const /** @type {?} */ value = inputSelection.insert(/** @type {?} */ ($event.target), key);
        if (this.inputValidation === 'char' && !this.addr.RE_CHAR.test(key)) {
            return cancelEvent($event);
        }
        else if (this.inputValidation === 'block' && !this.addr.RE_BLOCK[idx].test(value)) {
            return cancelEvent($event);
        }
        this.markBlockValidity(value, idx);
        if (!this.invalidBlocks[idx] && isLast && this.addr.isMaxLen(value)) {
            // FireFox will not update the value into the input if we move focus.
            setTimeout(() => this.focusNext(idx, false));
        }
    }
    /**
     * @param {?} $event
     * @param {?} idx
     * @return {?}
     */
    onKeyUp($event, idx) {
        if (this.isBackspace($event)) {
            const /** @type {?} */ input = /** @type {?} */ ($event.target);
            const /** @type {?} */ value = input && input.selectionStart >= 0 && input.selectionEnd > input.selectionStart
                ? input.value.substr(0, input.selectionStart) + input.value.substr(input.selectionEnd)
                : input.value.substr(0, input.value.length - 1);
            this.markBlockValidity(value, idx);
        }
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    onBlur(idx) {
        this.focused = false;
    }
    /**
     * @param {?} idx
     * @return {?}
     */
    onFocus(idx) {
        if (!this.readonly) {
            this.focused = true;
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    isBackspace($event) {
        return $event.keyCode === 8 || $event.key === 'Backspace';
    }
    /**
     * @param {?} blockIndex
     * @return {?}
     */
    getInputElement(blockIndex) {
        const /** @type {?} */ input = this.inputs.toArray()[blockIndex];
        return input && input.nativeElement;
    }
    /**
     * @param {?} data
     * @param {?} blockIndex
     * @return {?}
     */
    paste(data, blockIndex) {
        let /** @type {?} */ arr = this.addr.split(data, this.separator);
        if (arr.length === this.addr.BLOCK_COUNT) {
            this.value = this.fromBlocks(arr);
        }
        else {
            const /** @type {?} */ value = inputSelection.insert(this.getInputElement(blockIndex), arr[0]);
            this.onChange(value, blockIndex);
        }
        return true;
    }
    /**
     * @return {?}
     */
    reset() {
        this.errorCount = 0;
        for (let /** @type {?} */ i = 0; i < this.addr.BLOCK_COUNT; i++) {
            this.invalidBlocks[i] = false;
        }
    }
    /**
     * mark the validity for all blocks
     * @return {?}
     */
    markValidity() {
        for (let /** @type {?} */ i = 0; i < this.addr.BLOCK_COUNT; i++) {
            this.markBlockValidity(this.blocks[i], i);
        }
        if (this.fullBlocks === this.emptyFlag) {
            this.reset();
        }
    }
    /**
     * @param {?} value
     * @param {?} idx
     * @return {?}
     */
    markBlockValidity(value, idx) {
        if (!value) {
            this.emptyFlag |= 1 << (idx + 1);
        }
        else {
            this.emptyFlag &= this.emptyFlag - (1 << (idx + 1));
        }
        const /** @type {?} */ lastHasError = !!this.invalidBlocks[idx];
        this.invalidBlocks[idx] = !this.addr.RE_BLOCK[idx].test(value);
        // Special check for IPv4 with mask. RegExp will accept 0,1,2,3 which are invalid.
        // current address data model can not support this abstraction.
        if (idx === 4 && this.addr === v4WithMask && !this.invalidBlocks[idx]) {
            this.invalidBlocks[idx] = parseInt(value, 10) < 0;
        }
        if (lastHasError && !this.invalidBlocks[idx]) {
            this.errorCount--;
        }
        else if (!lastHasError && this.invalidBlocks[idx]) {
            this.errorCount++;
        }
    }
    /**
     * @param {?} idx
     * @param {?=} selectRange
     * @return {?}
     */
    focusNext(idx, selectRange = true) {
        const /** @type {?} */ next = this.getInputElement(idx + 1);
        if (next) {
            next.focus();
            if (selectRange && this.blocks[idx + 1]) {
                next.setSelectionRange(0, this.blocks[idx + 1].toString().length);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    toBlocks(value) {
        return this.addr.split(value, this.separator);
    }
    /**
     * @param {?} blocks
     * @return {?}
     */
    fromBlocks(blocks) {
        if (this.fullBlocks === this.emptyFlag) {
            return '';
        }
        else {
            return this.addr.fromBlocks(blocks, this.separator);
        }
    }
    /**
     * @param {?} blockIndex
     * @return {?}
     */
    copyUserSelectedMethod(blockIndex) {
        try {
            const /** @type {?} */ input = this.getInputElement(blockIndex);
            // we can't use the renderer here since it's async thus will run on the next turn.
            // it will force us to run the copy command in a timeout (after selection was made).
            // this will break clipboard policy on some browsers.
            if (input && input.select) {
                input.select();
            }
            document.execCommand('copy');
        }
        catch (/** @type {?} */ e) {
            this.autoCopy = 'DEFAULT_BLOCK';
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    notifyChange(value) {
        this._onChangeCallback(value);
        this.change.emit(value);
    }
}
NgxIpBase.propDecorators = {
    "mode": [{ type: Input },],
    "value": [{ type: Input },],
    "copyMode": [{ type: Input },],
    "separator": [{ type: Input },],
    "inputValidation": [{ type: Input },],
    "disabledBlocks": [{ type: Input },],
    "disabled": [{ type: Input },],
    "readonly": [{ type: Input },],
    "required": [{ type: Input },],
    "change": [{ type: Output },],
    "inputs": [{ type: ViewChildren, args: ['input', { read: ElementRef },] },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
const ADDRESS_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgxIpComponent),
    multi: true
};
const ADDRESS_CONTROL_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NgxIpComponent),
    multi: true
};
class NgxIpComponent extends NgxIpBase {
    /**
     * @param {?} cdr
     */
    constructor(cdr) {
        super(cdr);
        this.containerClass = [];
        this._highlightInvalidBlocks = true;
        this._theme = '';
    }
    /**
     * @return {?}
     */
    get highlightInvalidBlocks() {
        return this._highlightInvalidBlocks;
    }
    /**
     * When true add's the 'ngx-ip-error' class to the block when it's invalid.
     * @param {?} value
     * @return {?}
     */
    set highlightInvalidBlocks(value) {
        if (this._highlightInvalidBlocks === value) {
            return;
        }
        this._highlightInvalidBlocks = value;
        this.markValidity();
    }
    /**
     * @return {?}
     */
    get focused() {
        return this.containerClass.indexOf('ngx-ip-focused') > -1;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set focused(value) {
        const /** @type {?} */ idx = this.containerClass.indexOf('ngx-ip-focused');
        if (value && idx === -1) {
            this.containerClass.push('ngx-ip-focused');
        }
        else if (!value && idx > -1) {
            this.containerClass.splice(idx, 1);
        }
    }
    /**
     * @return {?}
     */
    get theme() {
        return this._theme;
    }
    /**
     * The CSS class representing the theme of this instance.
     * @param {?} value
     * @return {?}
     */
    set theme(value) {
        if (this._theme === value) {
            return;
        }
        let /** @type {?} */ idx = this.containerClass.indexOf(this._theme);
        if (idx > -1) {
            this.containerClass.splice(idx, 1);
        }
        this._theme = value;
        if (value) {
            this.containerClass.push(value);
        }
    }
    /**
     * @param {?} method
     * @return {?}
     */
    onCopyDecision(method) {
        const /** @type {?} */ fn = this.resolveCopyMethod;
        this.resolveCopyMethod = this.inputAnim = undefined;
        if (fn) {
            fn(method);
        }
    }
    /**
     * @return {?}
     */
    getUserCopyMethod() {
        this.inputAnim = 'hide';
        return new Promise(resolve => this.resolveCopyMethod = resolve);
    }
}
NgxIpComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-ip',
                template: "<div class=\"ngx-ip-container\" [ngClass]=\"containerClass\">\n  <div class=\"ngx-ip-table\" [@inputAnim]=\"inputAnim\">\n    <ng-template ngFor let-idx [ngForOf]=\"blocksRef\"; let-isLast=\"last\">\n      <div class=\"ngx-ip-table-cell\"\n           [class.ngx-ip-disabled]=\"isBlockDisabled(idx)\"\n           [ngClass]=\"{ 'ngx-ip-error': highlightInvalidBlocks && invalidBlocks[idx] }\">\n        <input #input\n               type=\"text\"\n               [required]=\"required\"\n               [readonly]=\"readonly\"\n               [value]=\"blocks[idx] || ''\"\n               (change)=\"onChange($event.target.value, idx)\"\n               (blur)=\"onBlur(idx)\"\n               (focus)=\"onFocus(idx)\"\n               [disabled]=\"isBlockDisabled(idx)\"\n               (paste)=\"onPaste($event, idx)\"\n               (copy)=\"onCopy($event, idx)\"\n               (keypress)=\"onKeyPress($event, idx)\"\n               (keyup)=\"onKeyUp($event, idx)\"/>\n      </div>\n      <span class=\"ngx-ip-table-cell ngx-ip-sep\">{{separatorMap[idx]}}</span>\n    </ng-template>\n  </div>\n\n  <div class=\"ngx-ip-copy-overlay\" *ngIf=\"resolveCopyMethod\">\n    <div class=\"ngx-ip-table\" [@copyAnim]=\"\">\n      <div class=\"ngx-ip-copy-title\">Copy?</div>\n      <a (click)=\"onCopyDecision('block')\">Block</a>\n      <a (click)=\"onCopyDecision('address')\">Address</a>\n    </div>\n  </div>\n</div>\n",
                styles: [".ngx-ip-container {\n  position: relative;\n  margin: 5px 0;\n  padding: 2px 0;\n  overflow: hidden;\n}\n\n.ngx-ip-copy-overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n\n.ngx-ip-copy-overlay .ngx-ip-table {\n  height: 100%;\n}\n\n.ngx-ip-copy-overlay .ngx-ip-table > * {\n  display: table-cell;\n  text-align: center;\n  vertical-align: middle;\n}\n\n.ngx-ip-copy-title {\n  text-align: center;\n  vertical-align: middle;\n  font-size: 0.75em;\n}\n\n.ngx-ip-copy-overlay .ngx-ip-table > a {\n  border: 1px solid #9e9e9e;\n  cursor: pointer;\n}\n\n\n\n.ngx-ip-table {\n  display: inline-table;\n  flex-flow: column;\n  vertical-align: bottom;\n  width: 100%;\n}\n\n.ngx-ip-table-cell {\n  position: relative;\n  display: table-cell;\n  text-align: center;\n}\n\n.ngx-ip-table input {\n  text-align: center;\n  width: 100%;\n  box-sizing: border-box;\n}\n\n/* Default Theme */\n.ngx-ip-theme-default.ngx-ip-container {\n  border: 1px solid #26a69a;\n}\n\n\n.ngx-ip-theme-default .ngx-ip-table-cell {\n  transition: all 0.3s;\n}\n\n.ngx-ip-theme-default .ngx-ip-table input {\n  background: transparent;\n  border: none;\n  outline: none;\n}\n\n.ngx-ip-theme-default .ngx-ip-table-cell.ngx-ip-error {\n  box-shadow: 0 2px 15px 0 #F44336;\n}\n\n/* Boxed Theme */\n.ngx-ip-theme-boxed input {\n  transition: all 0.3s;\n}\n.ngx-ip-theme-boxed .ngx-ip-error:not(.ngx-ip-disabled) input {\n  border-color: #F44336;\n}\n\n\n/* MATERIAL THEME */\n.ngx-ip-theme-material.ngx-ip-container {\n  background-color: transparent;\n  border: none;\n  box-sizing: content-box;\n  transition: all 0.3s;\n  font-size: 1rem;\n}\n\n.ngx-ip-theme-material .ngx-ip-table-cell {\n  border-bottom: 1px solid #9e9e9e;\n  transition: all 0.3s;\n}\n\n.ngx-ip-theme-material.ngx-ip-focused .ngx-ip-table-cell:not(.ngx-ip-disabled) {\n  border-bottom: 1px solid #26a69a;\n  box-shadow: 0 1px 0 0 #26a69a;\n}\n\n\n.ngx-ip-theme-material .ngx-ip-table-cell.ngx-ip-error:not(.ngx-ip-disabled) {\n  box-shadow: 0 1px 0 0 #F44336;\n}\n\n.ngx-ip-theme-material .ngx-ip-table-cell.ngx-ip-disabled {\n  border-bottom: 1px dotted rgba(0,0,0,0.26);\n}\n\n.ngx-ip-theme-material input {\n  background: transparent;\n  border: none;\n  outline: none;\n\n  height: 3rem;\n  font-size: 1rem;\n  padding: 0;\n  box-shadow: none;\n}\n\n.ngx-ip-theme-material input[disabled] {\n  color: rgba(0,0,0,0.26);\n}\n"],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [ADDRESS_CONTROL_VALUE_ACCESSOR, ADDRESS_CONTROL_VALIDATORS],
                animations: [
                    trigger('copyAnim', [
                        transition('void => *', [
                            style({
                                transform: 'translateY(-100%)'
                            }),
                            animate('0.25s')
                        ]),
                        transition('* => void', [
                            animate('0.25s', style({
                                transform: 'translateY(-100%)'
                            }))
                        ])
                    ]),
                    trigger('inputAnim', [
                        state('hide', style({ opacity: 0 })),
                        transition('* => hide', [
                            animate('0.25s', style({
                                transform: 'translateY(100%)'
                            }))
                        ]),
                        transition('hide => *', [
                            style({
                                transform: 'translateY(100%)'
                            }),
                            animate('0.25s')
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
NgxIpComponent.ctorParameters = () => [
    { type: ChangeDetectorRef, },
];
NgxIpComponent.propDecorators = {
    "highlightInvalidBlocks": [{ type: Input },],
    "theme": [{ type: Input },],
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class NgxIpModule {
}
NgxIpModule.decorators = [
    { type: NgModule, args: [{
                declarations: [NgxIpComponent],
                imports: [CommonModule],
                exports: [NgxIpComponent]
            },] },
];
/** @nocollapse */
NgxIpModule.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { NgxIpModule, NgxIpComponent, NgxIpBase, ADDRESS_CONTROL_VALIDATORS as ɵb, ADDRESS_CONTROL_VALUE_ACCESSOR as ɵa };
//# sourceMappingURL=ngx-ip.js.map
