import React, { useState, useEffect } from "react";
import { useDrop,useDrag } from "react-dnd";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";

export default function Canvas({elements,setElements,updateElement,updateSelectedElement}) {
  
  
  // Drop functionality
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["ComponentRight", "ComponentCanvas"],
    drop: (item, monitor) => {
      // This should log the item being dropped
      const delta = monitor.getDifferenceFromInitialOffset();
      const clientOffset = monitor.getClientOffset();
    
      if (delta) {
        
        if (item.dragType === "ComponentRight") {
         
          // New element from RightSide
          const newElement = {
            ...item,
            id: uuidv4(),
            x: clientOffset.x - 50,
            y: clientOffset.y - 50,
          };
          setElements((prev) => [...prev, newElement]);
        } else if (item.dragType === "ComponentCanvas") {
          console.log(item);
          // Existing element movement
          setElements((prev) =>
            prev.map((el) =>
              el.id === item.id
                ? { ...el, x: el.x + delta.x, y: el.y + delta.y }
                : el
            )
          );
        }
      }
    },
    
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));


  return (
    <div ref={drop} className="w-full h-full p-4 border bg-white relative">
      <h2 className="text-black mb-4">Canvas</h2>

      {elements.map((element,index) => (
        <CanvasElement
          key={element.id}
          element={element}
          updateElement={updateElement}
          index={index}
          updateSelectedElement={updateSelectedElement}
        />
      ))}
    </div>
  );
}

const CanvasElement = ({ element, updateElement, updateSelectedElement, index }) => {
  const handleClick = () => {
    updateSelectedElement(index); // Update selected element index
  };

  return (
    <Rnd
      onClick={() => handleClick()}
      size={{ width: element.width, height: element.height }}
      position={{ x: element.x, y: element.y }}
      onDragStop={(e, d) => {
        updateElement(element.id,{ x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateElement(element.id,{
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        });
      }}
      bounds="parent"
      style={{
        transform: `translate(${element.x}px, ${element.y}px)`,
        backgroundColor: element.backgroundColor || "transparent",
        color: element.color || "#000",
        fontSize: element.fontSize ? `${element.fontSize}px` : "inherit",
        fontWeight: element.fontWeight || "normal",
        padding:element.padding,
        margin:element.margin,
        borderColor:element.borderColor,
        textAlign: element.textAlign || "left",
        textDecoration: element.textDecoration || "none",
        borderWidth: element.borderWidth ? `${element.borderWidth}px `:'0px',
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
        element.text || "Div"
      )}
    </Rnd>
  );
};
