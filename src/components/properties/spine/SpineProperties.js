import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateSpinePropertiesAction } from "../../../store/properties/spine";

import { PointInput } from "../genericInputs/PointInput";
import { TextureInput } from "../genericInputs";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * resourcesList: import("../../../store/resources").IResourcesListState
 * spinePropertiesList: import("../../../store/properties/spine").ISpinePropertiesListState;
 * updateSpinePropertiesAction: typeof updateSpinePropertiesAction;
 * }} SpinePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { SpinePropertiesComponentDependencies} props 
 * @returns
 */
const SpinePropertiesComponent = ({
    selectedNodeID,
    resourcesList,
    spinePropertiesList,
    updateSpinePropertiesAction
}) => {

    const id = selectedNodeID;

    const { anchorX, anchorY, resourceID } = spinePropertiesList[id];

    const resource = resourcesList[resourceID];
    const resourceName = resource ? resource.name : "";

    useEffect(() => {
        // Edge case when a resource get's removed from resources but the id is still in the spine property
        if (resourceID && !resource) updateSpinePropertiesAction({ nodeID: id, resourceID: null, resourceName: null });
    }, [resource]);

    const onInputChange = (key, value) => {
        updateSpinePropertiesAction({
            nodeID: id,
            properties: { ...spinePropertiesList[id], [key]: value }
        });
    };

    const onJSONAdded = (key, value) => {
        updateSpinePropertiesAction({ nodeID: id, properties: { resourceID: value, resourceName: resourcesList[value].name } });
    };

    const jsonData = {
        label: "JSON",
        dataID: "json",
        value: resourceName,
        onChange: onJSONAdded,
    };

    const anchorData = {
        label: "Anchor",
        dataIDs: ["anchorX", "anchorY"],
        values: [anchorX, anchorY],
        signs: ["X", "Y"],
        onChange: onInputChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <TextureInput {...jsonData} />
            <PointInput {...anchorData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, spinePropertiesList, resourcesList }) => {
    return {
        spinePropertiesList: spinePropertiesList,
        selectedNodeID: tree.selectedNodeID,
        resourcesList: resourcesList
    }
};

export const SpineProperties = connect(
    mapStateToProps,
    { updateSpinePropertiesAction }
)(SpinePropertiesComponent)