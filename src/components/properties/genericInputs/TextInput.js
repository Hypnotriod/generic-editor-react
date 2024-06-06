import React, { forwardRef, useImperativeHandle, useRef } from "react";


/**
 * @typedef {{
 *  label: string;
 *  dataID: string;
 *  value: string;
 *  className?: string;
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onBlur?: (event: InputEvent) => InputEvent;
 *  onChange: (dataID: string, value: number | string) => void;
 * }} TextInputDependencies
 */

/**
 * @param {TextInputDependencies} props
 */
export const TextInput = forwardRef(({
    label,
    value,
    onChange,
    dataID,
    className = "",
    onBlur = (e) => e,
    middleware = (e) => e
}, ref) => {
    const inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current.focus();
            inputRef.current.select();
        },
    }));

    const onInputChange = (event) => {
        event = middleware(event);
        onChange(dataID, event.target.value);
    };

    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <input
                ref={inputRef}
                className={`widthTwoThird ${className}`}
                type="text"
                data-id={dataID}
                value={value}
                onBlur={onBlur}
                onChange={onInputChange}
            />
        </div>
    );
});