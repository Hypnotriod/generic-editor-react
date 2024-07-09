import React from "react";
import { connect } from "react-redux";

import { pixiLoader } from "../../middlewares/pixiLoaderMiddleware";
import store from "../../store";
import { addResourceAction, removeResourceAction } from "../../store/resources";
import { createImagesLoader, exportImageFile } from "../../tools/resourcesTools";
import { getUID } from "../../tools/uidGenerator";
import { PopupWithOptions } from "../optionsPopup";
import { updateNineSliceSpriteResourceNameAction } from "../../store/properties/nineSliceSprite";
import { updateSpriteResourceNameAction } from "../../store/properties/sprite";

const OPTIONS_MAP = {
    ADD_IMAGE: "ADD_IMAGE",
    DOWNLOAD_IMAGE: "DOWNLOAD_IMAGE",
    REPLACE_IMAGE: "REPLACE_IMAGE",
    REMOVE_IMAGE: "REMOVE_IMAGE",
};

/**
 * @typedef {{
 * addResourceAction: typeof addResourceAction;
 * removeResourceAction: typeof removeResourceAction;
 * }} ResourcesOptionsPopupComponentDependencies
 */

/**
 * @param { ResourcesOptionsPopupComponentDependencies} props 
 */
const ResourcesOptionsPopupComponent = (props) => {

    const canShowRemoveOption = (hoveredElement) => {
        /* resources-panel can't have remove option when showing the popup */
        const dataType = hoveredElement ? hoveredElement.getAttribute("data-type") : undefined;
        return dataType !== "resources-panel";
    };

    const canShowDownloadOption = (hoveredElement) => {
        /* If there is no images, we don't show the option */
        const id = hoveredElement ? parseInt(hoveredElement.getAttribute("data-image-id")) : NaN;
        return !Number.isNaN(id);
    };

    const optionsMap = [
        { option: OPTIONS_MAP.ADD_IMAGE, label: "Add Image", isAvailable: () => true },
        { option: OPTIONS_MAP.DOWNLOAD_IMAGE, label: "Download Image", isAvailable: canShowDownloadOption },
        { option: OPTIONS_MAP.REPLACE_IMAGE, label: "Replace Image", isAvailable: canShowRemoveOption },
        { option: OPTIONS_MAP.REMOVE_IMAGE, label: "Remove Image", className: "remove-option", isAvailable: canShowRemoveOption },
    ];

    const canProcessContextMenu = (event) => {
        const dataType = event.target.getAttribute("data-type");
        return (dataType === "resources-panel" || dataType == "image-preview");
    };

    const canProcessClick = (event) => {
        return Boolean(event.target.getAttribute("data-option"));
    };

    const processClick = (event, hoveredElement) => {
        const option = event.target.getAttribute("data-option");
        if (option && option === OPTIONS_MAP.ADD_IMAGE) {
            const onImagesLoaded = (files) => {
                pixiLoader.loadAssets(files, () => {
                    const data = files.map((file) => ({ id: getUID(), file }));
                    props.addResourceAction(data);
                });
            };
            const imageLoaderElement = createImagesLoader(onImagesLoaded);
            imageLoaderElement.click();
            return;
        }

        const id = parseInt(hoveredElement.getAttribute("data-image-id"));

        if (!id) {
            return;
        }

        if (option === OPTIONS_MAP.REPLACE_IMAGE) {
            const onImagesLoaded = (files) => {
                if (files.length !== 1) { return; }
                event.target.src = undefined;
                pixiLoader.loadAssets(files[0], () => {
                    const data = files.map((file) => ({ id: id, file }));
                    props.addResourceAction(data);
                    const resource = { resourceID: String(id), resourceName: data[0].file.name }
                    props.updateSpriteResourceNameAction(resource);
                    props.updateNineSliceSpriteResourceNameAction(resource);
                });
            };
            const imageLoaderElement = createImagesLoader(onImagesLoaded);
            imageLoaderElement.click();
            return;
        }
        else if (option === OPTIONS_MAP.REMOVE_IMAGE) {
            pixiLoader.removeAssets(store.getState().resourcesList[id])
            props.removeResourceAction(id);
            const resource = { resourceID: String(id), resourceName: null }
            props.updateSpriteResourceNameAction(resource);
            props.updateNineSliceSpriteResourceNameAction(resource);
        }
        else if (option === OPTIONS_MAP.DOWNLOAD_IMAGE) {
            const file = store.getState().resourcesList[id];
            exportImageFile(file, file.name);
        }
    };

    return (
        <PopupWithOptions {
            ...{ canShowRemoveOption, canProcessContextMenu, canProcessClick, processClick, optionsMap }
        } />
    );
};

/**
 * @param {import("../../store").IStore} data 
 */
const mapStateToProps = (data) => {
    return {};
};


export const ResourcesOptionsPopup = connect(
    mapStateToProps,
    {
        addResourceAction,
        updateSpriteResourceNameAction,
        updateNineSliceSpriteResourceNameAction,
        removeResourceAction,
    }
)(ResourcesOptionsPopupComponent)
