import { DEFAULT_CELL_SIZE, DEFAULT_GRID_SIZE } from "../components/preview/custom/CGrid";
import { createNode } from "./NodeData";
import { ENTITY_TYPES, ROOT_NODE_ID, getBaseProperties, getEntityType } from "./StoreData";

/* 
    By default, (for new projects) 
    We have a rood node in the tree which is an entity type of container and, thus, has base properties
*/
export const defaultStoreData = {
    tree: {
        treeData: createNode(ROOT_NODE_ID, "Scene", []),
        selectedNodeID: null
    },
    entitiesList: {
        [ROOT_NODE_ID]: getEntityType(ENTITY_TYPES.CONTAINER, [])
    },
    properties: {
        base: {
            [ROOT_NODE_ID]: { ...getBaseProperties(), cellSize: DEFAULT_CELL_SIZE, gridSize: DEFAULT_GRID_SIZE }
        },
        sprite: {},
        nineSliceSprite: {},
        graphics: {},
        text: {},
        spine: {},
    }
}