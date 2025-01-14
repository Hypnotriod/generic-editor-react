import React, { useEffect, useState } from "react";

import { convertImageFileToBase64 } from "../../../tools/resourcesTools";
import "./imageElement.css";

/**
 * @typedef {{
 * resource: File;
 * id: number;
 * }} ImageElementComponentDependencies
 */

/**
 * @param { ImageElementComponentDependencies} props 
 */
const ImageElementComponent = (props) => {
    const [parsedResource, setParsedResource] = useState({
        url: "",
        name: "Loading..."
    });

    useEffect(() => {
        const proxy = {
            setParsedResource: ({ name, url }) => {
                setParsedResource({ url, name: name.replace(/(.png)|(.jpeg)|(.jpg)/i, "") });
            }
        };

        // it is an async operation but if the component gets unmounted before the callback files, 
        // there will be a complain from React framework about memory leakage. I use proxy to fix that
        convertImageFileToBase64(props.resource, (data) => proxy.setParsedResource(data));

        return () => (proxy.setParsedResource = () => { });
    }, [props.resource])

    // @TODO find another way of doing it. I tried to add it to the dataTransfer.items, but it didn't work
    const onDragStart = () => window["__RESOURCE_ID"] = props.id;

    return (
        <div
            draggable
            onDragStart={onDragStart}
            className="image-preview"
            data-type="image-preview"
            data-image-id={props.id}
            style={{ backgroundImage: `url(${parsedResource.url})` }}
        >
            {parsedResource.name}
        </div>
    )
}

export const ImageElement = ImageElementComponent