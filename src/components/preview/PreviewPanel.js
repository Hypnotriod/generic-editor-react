import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { ROOT_NODE_ID } from "../../data/StoreData";
import { setSelectedNodeIDAction } from "../../store/tree";
import { MainScene } from "./MainScene";
import { CContainer } from "./custom/CContainer";
import { CGrid } from "./custom/CGrid";

export const PreviewPanelComponent = ({ basePropertiesList, setSelectedNodeIDAction, services }) => {

    const [cameraData, setCameraData] = useState({
        positionX: 0,
        positionY: 0,
        scaleX: 1,
        scaleY: 1,
    });

    useEffect(() => {
        const handleResizeUpdate = (size) => {
            // I could have used useState and pass x,y to the <Stage/> but that makes an extra rendering call I don't need
            services.app.stage.position.set(size.width / 2, size.height / 2)
        };
        services.resize.on("update", handleResizeUpdate);
        services.resize.activate();

        return () => {
            services.resize.off("update", handleResizeUpdate);
            services.resize.deactivate();
        }
    }, []);

    useEffect(() => {
        const handleCameraUpdate = ({ scale, position }) => {
            setCameraData({
                positionX: position.x,
                positionY: position.y,
                scaleX: scale.x,
                scaleY: scale.y,
            });
        };

        services.camera.on("update", handleCameraUpdate);
        services.camera.activate();

        return () => {
            services.camera.off("update", handleCameraUpdate);
            services.camera.deactivate();
        }
    }, []);

    const onSelect = (id) => setSelectedNodeIDAction(id);

    return (
        <CContainer {...{ id: "CameraContainer", rotation: 0, visible: true, alpha: 1, ...cameraData }}>
            <CGrid id="CGrid"
                cellSize={basePropertiesList[ROOT_NODE_ID].cellSize}
                gridSize={basePropertiesList[ROOT_NODE_ID].gridSize}
                color={0xc2c2c2}
                lineWidth={2}
                onSelect={onSelect} />
            <MainScene />
        </CContainer>
    );
};

const mapStateToProps = (store) => {
    return {
        basePropertiesList: store.basePropertiesList,
    };
};

export const PreviewPanel = connect(
    mapStateToProps,
    { setSelectedNodeIDAction }
)(PreviewPanelComponent)