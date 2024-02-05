import React from "react";
import { Node } from "./Node";

import "./tree.css";

import { connect } from "react-redux";


/**
* @typedef {{
 * treeState:  import("../../store/tree").ITreeState;
 * }} TreeComponentDependencies
 */

/**
* @param { TreeComponentDependencies} props 
*/
const TreeComponent = ({ treeState }) => {

    return (
        <>
            {treeState.treeData ? <Node key={treeState.treeData.id} node={treeState.treeData} selectedNodeID={treeState.selectedNodeID} /> : null}
        </>
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = ({ tree }) => {
    return {
        treeState: tree,
    };
};

export const Tree = connect(
    mapStateToProps,
)(TreeComponent)