import React from "react";
import { Rnd } from "react-rnd";

const CanvasElement = ({ element, updateElement, updateSelectedElement, index }) => {
  const handleClick = () => {
    updateSelectedElement(index); // Update selected element index
  };

  return (
    <div onClick={handleClick} style={{ position: "absolute", left: element.x, top: element.y }}>
      <Rnd
        size={{ width: element.width, height: element.height }}
        position={{ x: element.x, y: element.y }}
        onDragStop={(e, d) => {
          updateElement({ id: element.id, x: d.x, y: d.y });
        }}
        onResizeStop={(e, direction, ref, delta, position) => {
          updateElement({ id: element.id, width: ref.offsetWidth, height: ref.offsetHeight, x: position.x, y: position.y });
        }}
        bounds="parent"
        style={{
          backgroundColor: element.backgroundColor || "transparent",
          color: element.color || "#000",
          fontSize: element.fontSize ? `${element.fontSize}px` : "inherit",
          fontWeight: element.fontWeight || "normal",
          textAlign: element.textAlign || "left",
          textDecoration: element.textDecoration || "none",
          border: element.borderWidth ? `${element.borderWidth}px solid ${element.borderColor || "#000"}` : "none",
          borderRadius: element.borderRadius ? `${element.borderRadius}px` : "0",
          width: element.width, // Use element width
          height: element.height, // Use element height
        }}
      >
        {element.type === "image" ? (
          <img
            src={element.src} // Set the src for the image
            alt="Canvas Element"
            style={{
              width: "100%",
              height: "100%",
              objectFit: element.objectFit || "cover", // Set image fit, fallback to 'cover'
              borderRadius: element.borderRadius ? `${element.borderRadius}px` : "0", // Apply borderRadius to image if defined
            }}
          />
        ) : (
          element.type || "Div"
        )}
      </Rnd>
    </div>
  );
};

export default CanvasElement;
