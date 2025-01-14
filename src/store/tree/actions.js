import { TREE_ACTIONS } from "./actionTypes"

/**
 * Whenever a node is selected in the tree, we want to make the rest to be aware of that.
 * @param {number | null} nodeID 
 */
export const setSelectedNodeIDAction = (nodeID) => {
    return { type: TREE_ACTIONS.SET_SELECTED_NODE_ID, payload: nodeID }
};


/**
 * Set node id to be copied.
 * @param {number | null} nodeID 
 */
export const setCopyNodeIDAction = (nodeID) => {
    return { type: TREE_ACTIONS.SET_COPY_NODE_ID, payload: nodeID }
};

/**
 * Append node is used just to append newly created nodes
 * @param {{
 * referenceID: number;
 * nodeData: import("../../data/NodeData").INodeData;
 * }} payload 
 */
export const appendNodeAction = (payload) => {
    return { type: TREE_ACTIONS.APPEND_NODE, payload }
};

/**
 * Move node is used when we move (re-append) a node into a new parent
 * @param {{
 * referenceID: number;
 * nodeData: import("../../data/NodeData").INodeData;
 * }} payload 
 */
export const moveNodeAction = (payload) => {
    return { type: TREE_ACTIONS.MOVE_NODE, payload }
};

/**
 * This function is called when we want to move (re-append) a node. But,
 * unlike `moveNodeAction` function this one inserts the node before the reference one
 * @param {{
 * referenceID: number;
 * nodeData: import("../../data/NodeData").INodeData;
 * }} payload 
 */
export const insertBeforeNodeAction = (payload) => {
    return { type: TREE_ACTIONS.INSERT_BEFORE_NODE, payload }
};

/**
 * When we update any params of the selected node (find node by nodeID)
 * @param {{nodeID: number, name: string }} payload 
 * @returns 
 */
export const updateNodeNameAction = (payload) => {
    return { type: TREE_ACTIONS.UPDATE_NODE_NAME, payload }
};

/**
 * To delete a node from a tree by its nodeID
 * @param {number} id
 */
export const deleteNodeAction = (id) => {
    return { type: TREE_ACTIONS.DELETE_NODE, payload: { nodeID: id } }
};

/**
 * To create a new node in a tree
 * @param {number} parentID the parent's node ID we need to append a new node to
 * @param {number} id new node id
 */
export const createNodeAction = (parentID, id) => {
    return { type: TREE_ACTIONS.CREATE_NODE, payload: { nodeID: id, referenceID: parentID } }
};

/**
 * @param {import("../../data/NodeData").INodeData | null} treeData the parent's node ID we need to append a new node to
 */
export const importTreeDataAction = (treeData) => {
    return { type: TREE_ACTIONS.IMPORT_TREE_DATA, payload: { treeData, selectedNodeID: null } }
};