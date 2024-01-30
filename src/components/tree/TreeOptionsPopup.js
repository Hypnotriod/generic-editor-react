import React from "react";
import { connect } from "react-redux";

import { NODE_DATA_TYPE_ATTRIBUTE } from ".";

import { createNodeAction, updateNodeNameAction, deleteNodeAction } from "../../store/tree";
import { initEntityAction, removeEntityAction } from "../../store/entityTypes";
import { initBasePropertiesAction, updateBasePropertiesAction, removeBasePropertiesAction } from "../../store/properties/base";
import { initSpritePropertiesAction, updateSpritePropertiesAction, removeSpritePropertiesAction } from "../../store/properties/sprite";
import { initNineSliceSpritePropertiesAction, updateNineSliceSpritePropertiesAction, removeNineSliceSpritePropertiesAction } from "../../store/properties/nineSliceSprite";
import { initGraphicsPropertiesAction, updateGraphicsPropertiesAction, removeGraphicsPropertiesAction } from "../../store/properties/graphics";
import { initTextPropertiesAction, updateTextPropertiesAction, removeTextPropertiesAction } from "../../store/properties/text";
import { ENTITY_TYPES, GRAPHICS_TYPES, ROOT_NODE_ID } from "../../data/StoreData";
import { getUID } from "../../tools/uidGenerator";
import { PopupWithOptions } from "../optionsPopup";
import store from "../../store";
import { getNodeByID, getParent } from "../../tools/treeTools";

const OPTIONS_MAP = {
    ...ENTITY_TYPES,
    CLONE_OPTION: "CLONE_OPTION",
    REMOVE_OPTION: "REMOVE_OPTION",
};

/**
 * @typedef {{
 * createNodeAction: typeof createNodeAction;
 * updateNodeNameAction: typeof updateNodeNameAction;
 * deleteNodeAction: typeof deleteNodeAction;
 * initEntityAction: typeof  initEntityAction;
 * removeEntityAction: typeof  removeEntityAction;
 * initBasePropertiesAction: typeof  initBasePropertiesAction;
 * updateBasePropertiesAction: typeof  updateBasePropertiesAction;
 * removeBasePropertiesAction: typeof  removeBasePropertiesAction;
 * initSpritePropertiesAction: typeof  initSpritePropertiesAction;
 * updateSpritePropertiesAction: typeof  updateSpritePropertiesAction;
 * removeSpritePropertiesAction: typeof  removeSpritePropertiesAction;
 * initGraphicsPropertiesAction: typeof initGraphicsPropertiesAction; 
 * updateGraphicsPropertiesAction: typeof updateGraphicsPropertiesAction; 
 * removeGraphicsPropertiesAction: typeof removeGraphicsPropertiesAction;
 * initNineSliceSpritePropertiesAction: typeof initNineSliceSpritePropertiesAction;
 * updateNineSliceSpritePropertiesAction: typeof updateNineSliceSpritePropertiesAction;
 * removeNineSliceSpritePropertiesAction: typeof removeNineSliceSpritePropertiesAction;
 * initTextPropertiesAction: typeof initTextPropertiesAction;
 * updateTextPropertiesAction: typeof updateTextPropertiesAction;
 * removeTextPropertiesAction: typeof removeTextPropertiesAction;
 * }} TreeOptionsPopupComponentDependencies
 */

/**
 * Each node must have base properties
 * @param { TreeOptionsPopupComponentDependencies} props 
 */
const TreeOptionsPopupComponent = (props) => {

    const isNotRootNode = (hoveredElement) => {
        /* ROOT_NODE_ID can't be deleted or clonned so the option will become disabled */
        const id = hoveredElement ? hoveredElement.getAttribute("data-id") : undefined;
        return id && Number(id) !== ROOT_NODE_ID;
    };

    const optionsMap = [
        { option: OPTIONS_MAP.CONTAINER, label: "Add Container", isAvailable: () => true },
        { option: OPTIONS_MAP.SPRITE, label: "Add Sprite", isAvailable: () => true },
        { option: OPTIONS_MAP.NINE_SLICE_SPRITE, label: "Add 9 Slice Sprite", isAvailable: () => true },
        { option: OPTIONS_MAP.GRAPHICS, label: "Add Graphics", isAvailable: () => true },
        { option: OPTIONS_MAP.TEXT, label: "Add Text", isAvailable: () => true },
        { option: OPTIONS_MAP.CLONE_OPTION, label: "Clone", isAvailable: isNotRootNode },
        { option: OPTIONS_MAP.REMOVE_OPTION, label: "Remove", className: "remove-option", isAvailable: isNotRootNode },
    ];

    const canProcessContextMenu = (event) => {
        const type = event.target.getAttribute("data-type");
        const id = event.target.getAttribute("data-id");
        return (id && type && type === NODE_DATA_TYPE_ATTRIBUTE)
    };

    const canProcessClick = (event) => {
        return Boolean(event.target.getAttribute("data-option"));
    };

    /**
     * @param {import("../../data/NodeData").INodeData} node
     * @param {string} parentNodeId
     */
    const cloneNode = (node, parentNodeId) => {
        const entity = store.getState().entityTypesList[node.id];
        const newID = getUID();
        props.initBasePropertiesAction(newID);
        props.updateBasePropertiesAction({
            nodeID: newID,
            properties: store.getState().basePropertiesList[node.id],
        });
        props.initEntityAction(newID, entity.type);
        if (entity.type === ENTITY_TYPES.SPRITE) {
            props.initSpritePropertiesAction(newID);
            props.updateSpritePropertiesAction({
                nodeID: newID,
                properties: store.getState().spritePropertiesList[node.id],
            });
        } else if (entity.type === ENTITY_TYPES.GRAPHICS) {
            props.initGraphicsPropertiesAction(newID, GRAPHICS_TYPES.RECTANGLE);
            props.updateGraphicsPropertiesAction({
                nodeID: newID,
                properties: store.getState().graphicsList[node.id],
            });
        } else if (entity.type === ENTITY_TYPES.NINE_SLICE_SPRITE) {
            props.initNineSliceSpritePropertiesAction(newID);
            props.updateNineSliceSpritePropertiesAction({
                nodeID: newID,
                properties: store.getState().nineSliceSpritePropertiesList[node.id],
            });
        } else if (entity.type === ENTITY_TYPES.TEXT) {
            props.initTextPropertiesAction(newID);
            props.updateTextPropertiesAction({
                nodeID: newID,
                properties: store.getState().textPropertiesList[node.id],
            });
        }
        props.createNodeAction(parentNodeId, newID);
        props.updateNodeNameAction({ nodeID: newID, name: node.name });
        node.nodes.forEach(n => cloneNode(n, newID));
    }

    const processClick = (event, hoveredElement) => {
        const option = event.target.getAttribute("data-option");
        const id = Number(hoveredElement.getAttribute("data-id"));

        if (option === OPTIONS_MAP.REMOVE_OPTION) {
            const entity = store.getState().entityTypesList[id];
            // these 3 are for any type of entity, so we will remove them at once
            props.deleteNodeAction(id);
            props.removeEntityAction(id);
            props.removeBasePropertiesAction(id);

            if (entity.type === ENTITY_TYPES.CONTAINER) {/* Already done by code above */ }
            else if (entity.type === ENTITY_TYPES.SPRITE) { props.removeSpritePropertiesAction(id); }
            else if (entity.type === ENTITY_TYPES.GRAPHICS) { props.removeGraphicsPropertiesAction(id); }
            else if (entity.type === ENTITY_TYPES.NINE_SLICE_SPRITE) { props.removeNineSliceSpritePropertiesAction(id); }
            else if (entity.type === ENTITY_TYPES.TEXT) { props.removeTextPropertiesAction(id); }
            else { throw new Error("You forgot to add a handler for REMOVE option"); }
            return;
        }

        if (option === OPTIONS_MAP.CLONE_OPTION) {
            const treeData = store.getState().tree.treeData;
            const node = getNodeByID(id, treeData);
            const parentNode = getParent(node.id, treeData);
            cloneNode(node, parentNode.id);
            return;
        }

        const newID = getUID();
        props.initBasePropertiesAction(newID);

        if (option === OPTIONS_MAP.SPRITE) {
            props.initEntityAction(newID, ENTITY_TYPES.SPRITE);
            props.initSpritePropertiesAction(newID);
        }
        else if (option === OPTIONS_MAP.CONTAINER) {
            props.initEntityAction(newID, ENTITY_TYPES.CONTAINER);
        }
        else if (option === OPTIONS_MAP.GRAPHICS) {
            props.initEntityAction(newID, ENTITY_TYPES.GRAPHICS);
            props.initGraphicsPropertiesAction(newID, GRAPHICS_TYPES.RECTANGLE);
        }
        else if (option === OPTIONS_MAP.NINE_SLICE_SPRITE) {
            props.initEntityAction(newID, ENTITY_TYPES.NINE_SLICE_SPRITE);
            props.initNineSliceSpritePropertiesAction(newID);
        }
        else if (option === OPTIONS_MAP.TEXT) {
            props.initEntityAction(newID, ENTITY_TYPES.TEXT);
            props.initTextPropertiesAction(newID);
        }
        else {
            throw new Error("You forgot to add a handler for ADD option")
        }
        // I need to create the node at the end when all the props are created
        // because PreviewPanel will add new UI when a node is added
        // but it will throw error if the properties for that node doesn't exist yet
        props.createNodeAction(id, newID);
    };

    return (
        <PopupWithOptions {
            ...{ canShowRemoveOption: isNotRootNode, canProcessContextMenu, canProcessClick, processClick, optionsMap }
        } />
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ }) => {
    return {};
};


export const TreeOptionsPopup = connect(
    mapStateToProps,
    {
        createNodeAction,
        updateNodeNameAction,
        deleteNodeAction,
        initEntityAction,
        removeEntityAction,
        initBasePropertiesAction,
        updateBasePropertiesAction,
        removeBasePropertiesAction,
        initSpritePropertiesAction,
        updateSpritePropertiesAction,
        removeSpritePropertiesAction,
        initGraphicsPropertiesAction,
        updateGraphicsPropertiesAction,
        removeGraphicsPropertiesAction,
        initNineSliceSpritePropertiesAction,
        updateNineSliceSpritePropertiesAction,
        removeNineSliceSpritePropertiesAction,
        initTextPropertiesAction,
        updateTextPropertiesAction,
        removeTextPropertiesAction
    }
)(TreeOptionsPopupComponent);
