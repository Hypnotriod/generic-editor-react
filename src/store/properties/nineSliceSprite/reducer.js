import { defaultStoreData } from "../../../data/DefaultStoreData";
import { mockStoreData } from "../../../data/MockStreData";
import { getNineSliceSpriteProperties } from "../../../data/StoreData";
import { NINE_SLICE_SPRITE_PROPERTIES_ACTIONS } from "./actionTypes";

/**
 * @typedef {{ nodeID: number;} & {properties: Partial<import("../../../data/StoreData").INineSliceSpriteProperties>}} IActionPayload 
 */

/**
 * @typedef {{ [nodeID: number]: import("../../../data/StoreData").INineSliceSpriteProperties }} INineSliceSpritePropertiesListState;
 */


/**
 * @typeof INineSliceSpritePropertiesListState
 */
const STATE = defaultStoreData.properties.nineSliceSprite;
// const STATE = mockStoreData.properties.nineSliceSprite;

/**
 * 
 * @param {INineSliceSpritePropertiesListState} state 
 * @param {{type: string; payload: { nodeID: id } | IActionPayload | INineSliceSpritePropertiesListState}} data 
 * @returns {INineSliceSpritePropertiesListState}
 */
export const nineSliceSpritePropertiesListReducer = (state = STATE, { type, payload }) => {
    if (type === NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.INIT_NINE_SLICE_SPRITE_PROPERTIES) {
        return { ...state, [payload.nodeID]: getNineSliceSpriteProperties() };
    }
    else if (type === NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.REMOVE_NINE_SLICE_SPRITE_PROPERTIES) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }
    else if (type === NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.UPDATE_NINE_SLICE_SPRITE_PROPERTIES) {
        const { nodeID, properties } = payload;
        const newState = { ...state };
        const newNodeProps = { ...newState[nodeID], ...properties };
        newState[nodeID] = newNodeProps;
        return newState;
    }
    else if (type === NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.UPDATE_NINE_SLICE_RESOURCE_NAME) {
        const { resourceID, resourceName } = payload;
        const newState = { ...state };
        for (const prop of Object.values(newState)) {
            if (prop.resourceID === resourceID) {
                prop.resourceName = resourceName;
            }
        }
        return newState;
    }
    else if (type === NINE_SLICE_SPRITE_PROPERTIES_ACTIONS.IMPORT_NINE_SLICE_SPRITE_PROPERTIES) {
        return { ...payload }
    }
    else {
        return state;
    }

};


