"use client";
import React, { useState } from "react";
import LeftSide from "../components/LeftSide";
import MainScreen from "../components/MainScreen";
import RightSide from "../components/RightSide";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export default function WebBuilder() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);



  // Function to update the selected element index
  const updateSelectedElement = (index) => {
    setSelectedElement(index);
  };

  // Function to update the properties of a selected element
  const updateElement = (id, newProperties) => {
    setElements((prev) => {
      const updatedElements = prev.map((el) =>
        el.id === id ? { ...el, ...newProperties } : el
      );
      console.log("Updated elements:", updatedElements);
      return updatedElements;
    });
  };
  

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-12 w-screen h-screen">
        {/* Left Side Panel */}
        <div className="col-span-2 w-full bg-orange-600">
          <LeftSide
            selectedElement={elements[selectedElement]}
            updateElement={updateElement}
          />
        </div>

        {/* Main Canvas Area */}
        <div className="col-span-8 w-full flex items-center bg-gray-500">
          <MainScreen
            elements={elements}
            setElements={setElements}
            updateSelectedElement={updateSelectedElement}
            updateElement={updateElement}
          />
        </div>

        {/* Right Side - Draggable Items */}
        <div className="col-span-2 w-full bg-red-600">
          <RightSide selectedElement={elements[selectedElement]}
            updateElement={updateElement}/>
        </div>
      </div>
    </DndProvider>
  )}