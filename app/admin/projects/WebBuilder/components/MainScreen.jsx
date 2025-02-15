import React from "react";
import Canvas from "./CanvasDrag";
import { RoomProvider } from "@liveblocks/react";

export default function MainScreen({
  elements,
  setElements,
  updateElement,
  updateSelectedElement,
  user
}) {
  return (
    <div className="w-full h-full p-4 border bg-white relative">
      <h2 className="text-black mb-4">Canvas</h2>

      <RoomProvider id="canvas-room" initialPresence={{}}>
        <Canvas
          updateSelectedElement={updateSelectedElement}
          elements={elements}
          setElements={setElements}
          updateElement={updateElement}
          user={user}
        />
      </RoomProvider>
    </div>
  );
}
