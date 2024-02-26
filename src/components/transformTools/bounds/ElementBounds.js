import React, { useEffect } from "react";
import { connect } from "react-redux";
import { updateBasePropertiesAction } from "../../../store/properties/base";
import { round } from "lodash";

/**
 * @typedef {{
 * services: {},
 * selectedNodeID: number;
 * treeData: import("../../../store/tree").ITreeState["treeData"];
 * basePropertiesList: import("../../../store/properties/base").IBasePropertiesListState;
 * spritePropertiesList: import("../../../store/properties/sprite").ISpritePropertiesListState;
 * nineSliceSpritePropertiesList: import("../../../store/properties/nineSliceSprite").INineSliceSpritePropertiesListState;
 * graphicsList: import("../../../store/properties/graphics").IGraphicsPropertiesListState;
 * textPropertiesList: import("../../../store/properties/text").ITextPropertiesListState;
 * entityTypesList: import("../../../store/entityTypes").IEntityTypesListState;
 * resourcesList: import("../../../store/resources").IResourcesListState;
 * updateBasePropertiesAction: typeof updateBasePropertiesAction;
 * 
 * }} PositionGizmoComponentDependencies
 */


/**
 * @param {PositionGizmoComponentDependencies} props 
 */
const ElementBoundsComponent = ({ services, selectedNodeID, updateBasePropertiesAction, basePropertiesList }) => {

    useEffect(() => {
        services.app.stage.addChild(services.elementBounds.view);
        return () => {
            services.app.stage.removeChild(services.elementBounds.view);
        };
    }, []);

    useEffect(() => {
        if (!selectedNodeID) {
            return () => { };
        }

        const handleCameraUpdate = () => {
            const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));
            services.elementBounds.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
            services.elementBounds.setRotation(services.pixiTools.getGlobalRotation(element));
            services.elementBounds.adjustBounds(element);
        };

        handleCameraUpdate();

        services.camera.on("update", handleCameraUpdate);

        return () => services.camera.off("update", handleCameraUpdate);

    }, [selectedNodeID]);


    if (selectedNodeID) {
        const element = services.pixiTools.getChildByName(services.app.stage, String(selectedNodeID));
        services.elementBounds.setPosition(services.pixiTools.getChildRelativePosition(element, services.app.stage));
        services.elementBounds.setRotation(services.pixiTools.getGlobalRotation(element));
        services.elementBounds.adjustBounds(element);
        services.elementBounds.show();
    }
    else {
        services.elementBounds.hide();
    }

    return (
        <></>
    )
}

/**
 * @param {import("../../../store").IStore} store 
 */
const mapStateToProps = (store) => {
    return {
        selectedNodeID: store.tree.selectedNodeID,
        treeData: store.tree.treeData,
        basePropertiesList: store.basePropertiesList,
        spritePropertiesList: store.spritePropertiesList,
        nineSliceSpritePropertiesList: store.nineSliceSpritePropertiesList,
        entityTypesList: store.entityTypesList,
        resourcesList: store.resourcesList,
        graphicsList: store.graphicsList,
        textPropertiesList: store.textPropertiesList
    }
};


export const ElementBounds = connect(
    mapStateToProps,
    { updateBasePropertiesAction }
)(ElementBoundsComponent)