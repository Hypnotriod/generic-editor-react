import React from "react";

import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";

import { ROOT_NODE_ID } from "../../../data/StoreData";
import { NumberInput, PointInput } from "../genericInputs";
import { ToggleInput } from "../genericInputs/ToggleInput";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * basePropertiesList: import("../../../store/properties/base").IBasePropertiesListState;
 * updateBasePropertiesAction: typeof updateBasePropertiesAction;
 * }} BasePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { BasePropertiesComponentDependencies} props 
 */
const BasePropertiesComponent = ({ selectedNodeID, basePropertiesList, updateBasePropertiesAction }) => {

    const nodeID = selectedNodeID;
    const baseProperty = basePropertiesList[nodeID];

    const onChange = (key, value) => {
        updateBasePropertiesAction({
            nodeID,
            properties: { ...baseProperty, [key]: value }
        });
    };

    const onVisibilityToggled = (key, visible) => {
        onChange("visible", visible);
    };

    const positionData = {
        label: "Position",
        dataIDs: ["positionX", "positionY"],
        values: [baseProperty.positionX, baseProperty.positionY],
        signs: ["X", "Y"],
        onChange
    };

    const scaleData = {
        label: "Scale",
        dataIDs: ["scaleX", "scaleY"],
        values: [baseProperty.scaleX, baseProperty.scaleY],
        signs: ["X", "Y"],
        onChange
    };

    const gridData = {
        label: "Grid Props",
        dataIDs: ["cellSize", "gridSize"],
        values: [baseProperty.cellSize, baseProperty.gridSize],
        signs: ["Cell", "Grid"],
        onChange
    };

    const angleData = {
        label: "Rotation",
        dataID: "rotation",
        value: baseProperty.rotation,
        sign: "DEG",
        onChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <ToggleInput {...{ label: "Visible", dataID: "", value: baseProperty.visible, onChange: onVisibilityToggled }} />
            {nodeID === ROOT_NODE_ID && <PointInput {...gridData} />}
            <PointInput {...positionData} />
            <PointInput {...scaleData} />
            <NumberInput {...angleData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, basePropertiesList }) => {
    return {
        basePropertiesList: basePropertiesList,
        selectedNodeID: tree.selectedNodeID
    }
};

export const BaseProperties = connect(
    mapStateToProps,
    { updateBasePropertiesAction }
)(BasePropertiesComponent)