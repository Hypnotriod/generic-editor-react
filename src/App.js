
import React from "react";
import { Header } from "./components/header";
import { TreeElement } from "./components/tree";
import { PropertiesPanel } from "./components/properties";

import "./app.css";

export const App = () => {
  window.addEventListener("contextmenu", (event) => event.preventDefault());

  return (
    <>
      <Header />
      <div id="left-panel">
        <div id="tree-container"><TreeElement /></div>
      </div>
      <div id="center-panel">"preview"</div>
      <div id="right-panel"><PropertiesPanel /></div>
      <div id="bottom-panel">"resources"</div>
    </>
  );
}