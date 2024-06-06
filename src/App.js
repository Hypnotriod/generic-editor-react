
import React, { useEffect, useRef, useState } from "react";
import "./app.css";

import { Application } from "pixi.js";
import { Stage } from 'react-pixi-fiber';

import { Header } from "./components/header";
import { PreviewPanel } from "./components/preview";
import { PropertiesPanel } from "./components/properties";
import { ResourcesOptionsPopup, ResourcesPanel } from "./components/resources";
import { TreeController, TreeOptionsPopup } from "./components/tree";

import { InteractiveTransformTools } from "./components/transformTools/InteractiveTransformTools";
import { ViewCameraController } from "./services/ViewCameraController";
import { ViewResizeController } from "./services/ViewResizeController";
// I have to copy it because the available npm packages incompatible with pixi 4.6.0 this project use 
import { DOMGizmoButtons } from "./services/DOMGizmoButtons";
import { ViewElementBounds } from "./services/ViewElementBounds";
import { ViewGizmoPositionArrows } from "./services/ViewGizmoPositionArrows";
import { ViewGizmoRotation } from "./services/ViewGizmoRotation";
import { ViewGizmoScaleBox } from "./services/ViewGizmoScaleBox";
import { getChildByName, getChildRelativePosition, getGlobalRotation } from "./services/ViewTools";

import { Provider } from "react-redux";
import move from "./assets/icons/move.png";
import resize from "./assets/icons/resize.png";
import rotate from "./assets/icons/rotate.png";
import store from "./store";


export const App = () => {
  window.addEventListener("contextmenu", (event) => event.preventDefault());

  const [services, setServices] = useState(null);
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const gizmoButtons = {
    move: useRef(null),
    resize: useRef(null),
    rotate: useRef(null),
  };

  useEffect(() => {
    const app = new Application({
      backgroundColor: 0xffffff,
      view: canvasRef.current
    });

    setServices({
      app,
      camera: new ViewCameraController(app.view, app.ticker, { min: 1 / 8, max: 8 }),
      resize: new ViewResizeController(canvasContainerRef.current, app.renderer, { width: 1280, height: 1280 }),
      elementBounds: new ViewElementBounds(),
      gizmoPositionArrows: new ViewGizmoPositionArrows(app.ticker),
      gizmoScaleBox: new ViewGizmoScaleBox(app.ticker),
      gizmoRotation: new ViewGizmoRotation(app.ticker),
      gizmoButtons: new DOMGizmoButtons({
        move: gizmoButtons.move.current,
        resize: gizmoButtons.resize.current,
        rotate: gizmoButtons.rotate.current,
      }),
      pixiTools: {
        getChildByName,
        getChildRelativePosition,
        getGlobalRotation
      }
    });

  }, []);

  return (
    <>
      <Header />
      <div id="left-panel">
        <TreeController />
      </div>
      <div ref={canvasContainerRef} id="center-panel">
        <canvas ref={canvasRef}></canvas>
        {
          services === null ? null : (
            <Stage app={services.app}>
              <Provider store={store}>
                <PreviewPanel services={services} />
              </Provider>
              <InteractiveTransformTools services={services} />
            </Stage>
          )
        }
      </div>
      <div id="gizmo-buttons">
        <input ref={gizmoButtons.move} type="image" className="gizmoButton" src={move} />
        <input ref={gizmoButtons.resize} type="image" className="gizmoButton" src={resize} />
        <input ref={gizmoButtons.rotate} type="image" className="gizmoButton" src={rotate} />
      </div>
      <div id="right-panel">
        <PropertiesPanel />
      </div>
      <div id="bottom-panel">
        <ResourcesPanel />
      </div>
      <TreeOptionsPopup />
      <ResourcesOptionsPopup />
    </>
  );
}