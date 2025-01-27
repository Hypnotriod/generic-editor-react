import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateSpritePropertiesAction } from "../../../store/properties/sprite";

import { PointInput } from "../genericInputs/PointInput";
import { TextureInput } from "../genericInputs";
import { Texture } from "pixi.js";
import { Size } from "../genericInputs/Size";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * resourcesList: import("../../../store/resources").IResourcesListState
 * spritePropertiesList: import("../../../store/properties/sprite").ISpritePropertiesListState;
 * updateSpritePropertiesAction: typeof updateSpritePropertiesAction;
 * }} SpritePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { SpritePropertiesComponentDependencies} props 
 * @returns
 */
const SpritePropertiesComponent = ({
    selectedNodeID,
    resourcesList,
    spritePropertiesList,
    updateSpritePropertiesAction
}) => {

    const id = selectedNodeID;

    const { anchorX, anchorY, resourceID } = spritePropertiesList[id];

    const resource = resourcesList[resourceID];
    const resourceName = resource ? resource.name : "";

    useEffect(() => {
        // Edge case when a resource get's removed from resources but the id is still in the sprite property
        if (resourceID && !resource) updateSpritePropertiesAction({ nodeID: id, resourceID: null, resourceName: null });
    }, [resource]);

    const onInputChange = (key, value) => {
        updateSpritePropertiesAction({
            nodeID: id,
            properties: { ...spritePropertiesList[id], [key]: value }
        });
    };

    const onTextureAdded = (key, value) => {
        updateSpritePropertiesAction({ nodeID: id, properties: { resourceID: value, resourceName: resourcesList[value].name } });
    };

    const textureData = {
        label: "Texture",
        dataID: "texture",
        value: resourceName,
        onChange: onTextureAdded,
    };

    const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;
    const textureSize = {
        label: "Texture Size",
        dataIDs: ["width", "height"],
        values: [texture.width, texture.height],
    };

    const anchorData = {
        label: "Anchor",
        dataIDs: ["anchorX", "anchorY"],
        values: [anchorX, anchorY],
        signs: ["X", "Y"],
        step: 0.5,
        onChange: onInputChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <TextureInput {...textureData} />
            <Size {...textureSize} />
            <PointInput {...anchorData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, spritePropertiesList, resourcesList }) => {
    return {
        spritePropertiesList: spritePropertiesList,
        selectedNodeID: tree.selectedNodeID,
        resourcesList: resourcesList
    }
};

export const SpriteProperties = connect(
    mapStateToProps,
    { updateSpritePropertiesAction }
)(SpritePropertiesComponent)