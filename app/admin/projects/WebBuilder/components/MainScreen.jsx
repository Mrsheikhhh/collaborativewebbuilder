import React from "react";
import Canvas from "./CanvasDrag";

export default function MainScreen({ elements, setElements, updateElement, updateSelectedElement }) {
  return (
    <div className="w-full h-full p-4 border bg-white relative">
      <h2 className="text-black mb-4">Canvas</h2>
      <Canvas
     
        updateSelectedElement={updateSelectedElement}
        elements={elements}
        setElements={setElements}
        updateElement={updateElement}
      />
    </div>
  );
}
