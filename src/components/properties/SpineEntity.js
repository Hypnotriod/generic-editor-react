import React from "react";
import { NameProperty } from "./name";
import { BaseProperties } from "./base";
import { SpineProperties } from "./spine/SpineProperties";
import { ENTITY_TYPES } from "../../data/StoreData";

/**
 * @param {number} id 
 * @param {import("../../store").IStore} store 
 */
export const isSpineEntity = (id, store) => {
    const entity = store.entityTypesList[id];
    return entity && entity.type === ENTITY_TYPES.SPINE;
};

export const SpineEntity = () => {
    return (
        <div>
            <NameProperty />
            <BaseProperties />
            <SpineProperties />
        </div>
    )
}