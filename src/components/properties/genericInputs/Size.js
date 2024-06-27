import React from "react";
import { parseNumberMiddleware } from ".";

/**
 * @typedef {{
 *  label: string;
 *  dataIDs: [string, string];
 *  values: [number, number];
 * }} SizeDependencies
 */

/**
 * @param {SizeDependencies} props
 */
export const Size = ({
    label,
    values,
    dataIDs,
}) => {
    return (
        <div className="flexRow">
            <span className="textLeft colorGray widthOneThird">{label}</span>
            {[0, 1].map((i) => {
                return (<div key={i} className="widthOneThird positionRelative inputAfterElement">
                    <input
                        className="widthFull"
                        type="number"
                        data-id={dataIDs[i]}
                        value={values[i]}
                        disabled={true}
                    />
                </div>)
            })}
        </div>
    );
}