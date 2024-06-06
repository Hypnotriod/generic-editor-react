import React from "react";
import { ENTITY_TYPES } from "../../../data/StoreData";
import { CContainer } from "./CContainer";
import { CSprite } from "./CSprite";
import { CSpine } from "./CSpine";
import { CGraphics } from "./CGraphics";
import { CNineSlicePlane } from "./CNineSlicePlane";
import { Texture } from "pixi.js";
import { CText } from "./CText";

/**
 *
 * @param {import("../../../data/NodeData").INodeData} nodeData
 * @param {import("../../../store/properties/base").IBasePropertiesListState} basePropertiesList
 * @param {import("../../../store/properties/sprite").ISpritePropertiesListState} spritePropertiesList
 * @param {import("../../../store/properties/spine").ISpinePropertiesListState} spinePropertiesList
 * @param {import("../../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState} nineSliceSpritePropertiesList
 * @param {import("../../../store/entityTypes").IEntityTypesListState} entityTypesList
 * @param {import("../../../store/resources").IResourcesListState} resourcesList
 * @param {import("../../../store/properties/graphics").IGraphicsPropertiesListState} graphicsList
 */
export const createPixiTree = (nodeData, dependencies, onSelect) => {
    const {
        basePropertiesList,
        spritePropertiesList,
        entityTypesList,
        resourcesList,
        graphicsList,
        nineSliceSpritePropertiesList,
        textPropertiesList,
        spinePropertiesList,
    } = dependencies;

    const entity = entityTypesList[nodeData.id];
    const baseProps = basePropertiesList[nodeData.id];

    if (entity.type === ENTITY_TYPES.CONTAINER) {
        return (
            <CContainer key={nodeData.id} id={nodeData.id} {...{ onSelect, ...baseProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies, onSelect))}
            </CContainer >
        );
    }
    if (entity.type === ENTITY_TYPES.SPRITE) {
        const spriteProps = spritePropertiesList[nodeData.id];
        const resource = resourcesList[spriteProps.resourceID];
        const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;

        return (
            <CSprite key={nodeData.id} id={nodeData.id} {...{ texture, onSelect, ...baseProps, ...spriteProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies, onSelect))}
            </CSprite>
        );
    }
    if (entity.type === ENTITY_TYPES.SPINE) {
        const spineProps = spinePropertiesList[nodeData.id];
        const resource = resourcesList[spineProps.resourceID];
        const spineData = resource ? resource.spineData : undefined;

        return (
            <CSpine key={nodeData.id} id={nodeData.id} {...{ spineData, ...baseProps, ...spineProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies))}
            </CSpine>
        );
    }
    if (entity.type === ENTITY_TYPES.GRAPHICS) {
        const graphicsProps = graphicsList[nodeData.id];
        return (
            <CGraphics key={nodeData.id} id={nodeData.id} {...{ onSelect, ...baseProps, ...graphicsProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies, onSelect))}
            </CGraphics>
        );
    }
    if (entity.type === ENTITY_TYPES.NINE_SLICE_SPRITE) {
        const nineSliceProps = nineSliceSpritePropertiesList[nodeData.id];
        const resource = resourcesList[nineSliceProps.resourceID];
        const texture = resource ? Texture.from(resource.name) : Texture.EMPTY;

        return (
            <CNineSlicePlane key={nodeData.id} id={nodeData.id} {...{ texture, onSelect, ...baseProps, ...nineSliceProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies, onSelect))}
            </CNineSlicePlane>
        );
    }
    if (entity.type === ENTITY_TYPES.TEXT) {
        const textProps = textPropertiesList[nodeData.id];

        return (
            <CText key={nodeData.id} id={nodeData.id} {...{ onSelect, baseProps, textProps }}>
                {nodeData.nodes.map((node) => createPixiTree(node, dependencies, onSelect))}
            </CText>
        );
    }
}