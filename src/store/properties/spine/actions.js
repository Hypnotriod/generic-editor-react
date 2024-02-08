import { SPINE_PROPERTIES_ACTIONS } from "./actionTypes"

/**
 * @param {number} id
 */
export const initSpinePropertiesAction = (id) => {
    return { type: SPINE_PROPERTIES_ACTIONS.INIT_SPINE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {number} id
 */
export const removeSpinePropertiesAction = (id) => {
    return { type: SPINE_PROPERTIES_ACTIONS.REMOVE_SPINE_PROPERTIES, payload: { nodeID: id } }
};

/**
 * @param {import("./reducer").IActionPayload} payload
 */
export const updateSpinePropertiesAction = (payload) => {
    return { type: SPINE_PROPERTIES_ACTIONS.UPDATE_SPINE_PROPERTIES, payload }
};

/**
 * @param {import("./reducer").ISpinePropertiesListState} payload
 */
export const importSpinePropertiesAction = (payload) => {
    return { type: SPINE_PROPERTIES_ACTIONS.IMPORT_SPINE_PROPERTIES, payload }
};