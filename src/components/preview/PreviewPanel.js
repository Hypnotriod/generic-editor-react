import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "../../store";
import { MainScene } from "./MainScene";
import { CContainer } from "./custom/CContainer";
import { CGrid } from "./custom/CGrid";

export const PreviewPanel = ({ services }) => {

    const [cameraData, setCameraData] = useState({
        positionX: 0,
        positionY: 0,
        scaleX: 1,
        scaleY: 1,
    });

    const searchParams = new URLSearchParams(window.location.search);
    const cellSize = searchParams.get('cellSize') || 50;
    const gridSize = searchParams.get('gridSize') || 100;

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

    return (
        <CContainer {...{ id: "CameraContainer", rotation: 0, ...cameraData }}>
            <CGrid {...{ id: "CGrid", cellSize, gridSize, color: 0xc2c2c2, lineWidth: 2 }} />
            {/* 
                I have to rewrap the <MainScene /> with provider because, apparently, pixi fiber components inherently get context from pixi, so I need to set it back.
                Otherwise, I see: 
                `Could not find "store" in the context of "Connect(MainSceneComponent)". 
                Either wrap the root component in a <Provider>, or pass a custom React context provider to <Provider>
                and the corresponding React context consumer to Connect(MainSceneComponent) in connect options.`

            */}
            <Provider store={store}>
                <MainScene />
            </Provider>
        </CContainer>
    );
};