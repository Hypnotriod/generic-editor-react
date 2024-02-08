import { defaultStoreData } from "../../../data/DefaultStoreData";
import { getSpineProperties } from "../../../data/StoreData";
import { SPINE_PROPERTIES_ACTIONS } from "./actionTypes";


/**
 * @typedef {{ nodeID: number;} & { properties: Partial<import("../../../data/StoreData").ISpineProperties>}} IActionPayload 
 */


/**
 * @typedef {{ [nodeID: number]: import("../../../data/StoreData").ISpineProperties }} ISpinePropertiesListState;
 */


/**
 * @typeof ISpinePropertiesListState
 */
const STATE = defaultStoreData.properties.spine;

/**
 * 
 * @param {ISpinePropertiesListState} state 
 * @param {{type: string; payload: { nodeID: id } | IActionPayload | ISpinePropertiesListState}} data 
 * @returns {ISpinePropertiesListState}
 */
export const spinePropertiesListReducer = (state = STATE, { type, payload }) => {
    if (type === SPINE_PROPERTIES_ACTIONS.INIT_SPINE_PROPERTIES) {
        const newState = { ...state, [payload.nodeID]: getSpineProperties() };
        return newState;
    }
    else if (type === SPINE_PROPERTIES_ACTIONS.REMOVE_SPINE_PROPERTIES) {
        const newState = { ...state };
        delete newState[payload.nodeID];
        return newState;
    }
    else if (type === SPINE_PROPERTIES_ACTIONS.UPDATE_SPINE_PROPERTIES) {
        const { nodeID, properties } = payload;
        const newState = { ...state };
        const newNodeProps = { ...newState[nodeID], ...properties };
        newState[nodeID] = newNodeProps;
        return newState;
    }
    else if (type === SPINE_PROPERTIES_ACTIONS.IMPORT_SPINE_PROPERTIES) {
        return { ...payload }
    }
    else {
        return state;
    }

};


