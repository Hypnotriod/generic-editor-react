import React, { useState } from "react";
import { parseNumberMiddleware } from ".";

/**
 * @typedef {{
 *  label: string;
 *  dataID: string;
 *  step?: number;
 *  sign? : sting; // is used for UI to
 *  value: number;
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onChange: (dataID: string, value: number | string) => void;
 * }} NumberInputDependencies
 */

/**
 * @param {NumberInputDependencies} props
 */
export const NumberInput = ({
    label,
    value,
    onChange,
    dataID,
    step = 1,
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    sign = "",
    middleware = (event) => event
}) => {

    const [isShiftPressed, setShiftPressed] = useState(false);

    const onInputChange = (event) => {
        event = middleware(event);
        const [key, value] = parseNumberMiddleware(event);
        onChange(key, value);
    };

    const onKeyPressedReleased = (event) => {
        setShiftPressed(event.shiftKey);
    };

    return (
        <div className="flexRow"
            onKeyDown={onKeyPressedReleased}
            onKeyUp={onKeyPressedReleased}>
            <span className="textLeft colorGray widthOneThird">{label}</span>
            <div data-sign={sign} className="widthOneThird positionRelative inputAfterElement">
                <input
                    className="widthFull"
                    type="number"
                    data-id={dataID}
                    step={isShiftPressed ? step * 10 : step}
                    max={max}
                    min={min}
                    value={value}
                    onChange={onInputChange}
                />
            </div>

            {/* placeholder to make it aligned with the other elements */}
            <span className="widthOneThird"></span>
        </div>
    );
}