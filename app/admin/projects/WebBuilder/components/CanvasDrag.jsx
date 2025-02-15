import React, { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import { Rnd } from "react-rnd";
import { v4 as uuidv4 } from "uuid";
import { useStorage, useMutation } from "@liveblocks/react";

const Canvas = ({ elements, setElements, updateElement, updateSelectedElement, user }) => {
  // Get live elements and last updated user from Liveblocks storage
  const liveblocksElements = useStorage((root) => root.liveblocksElements || []);
  const lastUpdatedBy = useStorage((root) => root.lastUpdatedBy || "");

  // Function to update the last updated user
  const setLastUpdatedBy = useMutation(({ storage }, username) => {
    storage.set("lastUpdatedBy", username);
  }, []);

  // Add a new element
  const addElement = useMutation(
    ({ storage }, newElement) => {
      const elements = storage.get("liveblocksElements") || [];
      storage.set("liveblocksElements", [...elements, newElement]);
      setLastUpdatedBy(user?.name); // Update last updated user
    },
    [user]
  );

  // Update an existing element
  const updateLiveElement = useMutation(
    ({ storage }, id, newProperties) => {
      const elements = storage.get("liveblocksElements") || [];
      const index = elements.findIndex((el) => el.id === id);
      if (index !== -1) {
        elements[index] = { ...elements[index], ...newProperties };
        storage.set("liveblocksElements", [...elements]);
        setLastUpdatedBy(user?.name); // Update last updated user
      }
    },
    [user]
  );
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ["ComponentRight", "ComponentCanvas"],
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      const clientOffset = monitor.getClientOffset();
      if (delta) {
        if (item.dragType === "ComponentRight") {
          const newElement = {
            ...item,
            id: uuidv4(),
            x: clientOffset.x - 50,
            y: clientOffset.y - 50,
          };
          setElements((prev) => [...prev, newElement]);
          addElement(newElement);
          setLastUpdatedBy(user?.name); // Track user update
        } else if (item.dragType === "ComponentCanvas") {
          setElements((prev) =>
            prev.map((el) => (el.id === item.id ? { ...el, x: el.x + delta.x, y: el.y + delta.y } : el))
          );
          updateLiveElement(item.id, { x: item.x + delta.x, y: item.y + delta.y });
          setLastUpdatedBy(user?.name); // Track user update
        }
      }
    },
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));
  // Remove an element
  const removeElement = useMutation(
    ({ storage }, id) => {
      const elements = storage.get("liveblocksElements") || [];
      const newElements = elements.filter((el) => el.id !== id);
      storage.set("liveblocksElements", newElements);
      setLastUpdatedBy(user?.name); // Update last updated user
    },
    [user]
  );

  // Sync local state with Liveblocks storage
  useEffect(() => {
    if (Array.isArray(liveblocksElements)) {
      setElements([...liveblocksElements]);
    } else {
      setElements([]);
    }
  }, [liveblocksElements, setElements]);

  return (
    <div className="w-full h-full p-4 border bg-white relative" ref={drop}>
      <h2 className="text-black mb-4">Canvas</h2>
      
      {/* Display the last updated user */}
      {lastUpdatedBy && (
        <p className="text-gray-600 italic">Last updated by: {lastUpdatedBy}</p>
      )}

      {elements.map((element, index) => (
        <CanvasElement
          key={element.id}
          element={element}
          updateElement={updateElement}
          index={index}
          updateSelectedElement={updateSelectedElement}
          updateLiveElement={updateLiveElement}
          removeElement={removeElement}
        />
      ))}
    </div>
  );
};

const CanvasElement = ({ element, updateLiveElement, removeElement,updateSelectedElement,index,updateElement }) => {
  const handleClick = () => {
    updateSelectedElement(index);
  };
  return (
    <Rnd
    onClick={handleClick}
    size={{ width: element.width, height: element.height }}
    position={{ x: element.x, y: element.y }}
    onDragStop={(e, d) => {
      updateElement(element.id, { x: d.x, y: d.y });
      updateLiveElement(element.id, { x: d.x, y: d.y });
    }}
    onResizeStop={(e, direction, ref, delta, position) => {
      updateElement(element.id, {
        width: ref.offsetWidth,
        height: ref.offsetHeight,
        x: position.x,
        y: position.y,
      });
      updateLiveElement(element.id, {
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
      padding: element.padding,
      margin: element.margin,
      borderColor: element.borderColor,
      textAlign: element.textAlign || "left",
      textDecoration: element.textDecoration || "none",
      borderWidth: element.borderWidth ? `${element.borderWidth}px` : "0px",
      borderRadius: element.borderRadius ? `${element.borderRadius}px` : "0",
      width: element.width,
      height: element.height,
    }}
  >
    <button onClick={() => removeElement(element.id)}className="absolute top-0 right-0 bg-red-500 text-white rounded-full">
      X
    </button>
    {element.type === "image" ? (
      <img
        src={element.src}
        alt="Canvas Element"
        style={{
          width: "100%",
          height: "100%",
          objectFit: element.objectFit || "cover",
          borderRadius: element.borderRadius ? `${element.borderRadius}px` : "0",
        }}
      />
    ) : (
      element.text || "Div"
    )}
  </Rnd>
  );
};

export default Canvas;

