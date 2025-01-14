import React, { useEffect } from "react";

import { connect } from "react-redux";
import { updateNineSliceSpritePropertiesAction } from "../../../store/properties/nineSliceSprite";

import { PointInput } from "../genericInputs/PointInput";
import { TextureInput } from "../genericInputs";
import { Texture } from "pixi.js";
import { Size } from "../genericInputs/Size";


/**
 * @typedef {{
 * selectedNodeID: number | null;
 * resourcesList: import("../../../store/resources").IResourcesListState
 * nineSliceSpritePropertiesList: import("../../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState;
 * updateNineSliceSpritePropertiesAction: typeof updateNineSliceSpritePropertiesAction;
 * }} NineSliceSpritePropertiesComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { NineSliceSpritePropertiesComponentDependencies} props 
 * @returns
 */
const NineSliceSpritePropertiesComponent = ({
    selectedNodeID,
    resourcesList,
    nineSliceSpritePropertiesList,
    updateNineSliceSpritePropertiesAction
}) => {

    const id = selectedNodeID;

    const spriteProperties = nineSliceSpritePropertiesList[id];

    const resource = resourcesList[spriteProperties.resourceID];
    const resourceName = resource ? resource.name : "";

    useEffect(() => {
        // Edge case when a resource get's removed from resources but the id is still in the sprite property
        if (spriteProperties.resourceID && !resource) updateNineSliceSpritePropertiesAction({ nodeID: id, resourceID: null, resourceName: null });
    }, [resource]);

    const onInputChange = (key, value) => {
        updateNineSliceSpritePropertiesAction({
            nodeID: id,
            properties: { ...spriteProperties, [key]: value }
        });
    };

    const onTextureAdded = (key, value) => {
        updateNineSliceSpritePropertiesAction({ nodeID: id, properties: { resourceID: value, resourceName: resourcesList[value].name } });
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

    const cornersABData = {
        label: "Corners",
        dataIDs: ["A", "C"],
        values: [spriteProperties.A, spriteProperties.C],
        signs: ["A", "C"],
        onChange: onInputChange,
    };

    const cornersCDData = {
        label: "",
        dataIDs: ["B", "D"],
        values: [spriteProperties.B, spriteProperties.D],
        signs: ["B", "D"],
        onChange: onInputChange,
    };

    const anchorData = {
        label: "Anchor",
        dataIDs: ["anchorX", "anchorY"],
        values: [spriteProperties.anchorX, spriteProperties.anchorY],
        signs: ["X", "Y"],
        step: 0.5,
        onChange: onInputChange
    };

    const sizeData = {
        label: "Size",
        dataIDs: ["width", "height"],
        values: [spriteProperties.width, spriteProperties.height],
        signs: ["W", "H"],
        onChange: onInputChange
    };

    return (
        <div className="properties propertiesTopOffset">
            <TextureInput {...textureData} />
            <Size {...textureSize} />
            <PointInput {...anchorData} />
            <PointInput {...sizeData} />
            <PointInput {...cornersABData} />
            <PointInput {...cornersCDData} />
        </div>
    )
}

/**
 * @param {import("../../../store").IStore} data 
 */
const mapStateToProps = ({ tree, nineSliceSpritePropertiesList, resourcesList }) => {
    return {
        nineSliceSpritePropertiesList: nineSliceSpritePropertiesList,
        selectedNodeID: tree.selectedNodeID,
        resourcesList: resourcesList
    }
};

export const NineSliceSpriteProperties = connect(
    mapStateToProps,
    { updateNineSliceSpritePropertiesAction }
)(NineSliceSpritePropertiesComponent)