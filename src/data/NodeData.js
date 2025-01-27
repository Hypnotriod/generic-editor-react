/**
 * @typedef {{
 * id: number;
 * name: string;
 * nodes: INodeData[];
 * }} INodeData
 */

/**
 * 
 * @param {number} id 
 * @param {INodeData[]} [nodes = []]
 * @returns {INodeData} 
 */
export const createNode = (id, name = `node_${id}`, nodes = []) => {
    return {
        id: id,
        name: name,
        nodes: nodes,
    }
}