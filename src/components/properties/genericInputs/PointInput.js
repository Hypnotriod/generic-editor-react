import React, { useState } from "react";
import { parseNumberMiddleware } from ".";

/**
 * @typedef {{
 *  label: string;
 *  dataIDs: [string, string];
 *  values: [number, number];
 *  step?: number;
 *  signs? : string[]; // are  used for UI
 *  middleware?: (event: InputEvent) => InputEvent;
 *  onChange: (dataID: string, value: number | string) => void;
 * }} PointInputDependencies
 */

/**
 * @param {PointInputDependencies} props
 */
export const PointInput = ({
    label,
    values,
    onChange,
    dataIDs,
    step = 1,
    max = Number.MAX_SAFE_INTEGER,
    min = Number.MIN_SAFE_INTEGER,
    signs = ["", ""],
    middleware = (event) => event
}) => {

    const [isShiftPressed, setShiftPressed] = useState(false);

    const onInputChange = (event) => {
        event = middleware(event);
        const [key, value] = parseNumberMiddleware(event);
        onChange(key, value)
    };

    const onKeyPressedReleased = (event) => {
        setShiftPressed(event.shiftKey);
    };

    return (
        <div className="flexRow"
            onKeyDown={onKeyPressedReleased}
            onKeyUp={onKeyPressedReleased}>
            <span className="textLeft colorGray widthOneThird">{label}</span>
            {[0, 1].map((i) => {
                return (<div key={i} data-sign={signs[i]} className="widthOneThird positionRelative inputAfterElement">
                    <input
                        className="widthFull"
                        type="number"
                        data-id={dataIDs[i]}
                        step={isShiftPressed ? step * 10 : step}
                        max={max}
                        min={min}
                        value={values[i]}
                        onChange={onInputChange}
                    />
                </div>)
            })}
        </div>
    );
}