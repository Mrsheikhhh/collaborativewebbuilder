import React from "react";
import { useDrag } from "react-dnd";

export default function DraggableComponen({ element }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "ComponentRight",  // Ensure the drag type is "ComponentRight"
    item: { ...element, dragType: "ComponentRight" },  // Add a custom dragType to the element
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  

  return (
    <div ref={drag} className="p-2 border rounded cursor-pointer">
      {element.text}
    </div>
  );
}
