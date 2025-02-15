import React, { useState, useEffect } from "react";

export default function HeadingProperties({ selectedElement, updateElement, updateLiveElement }) {
  const [properties, setProperties] = useState({
    text: selectedElement.text || "Heading Text",
    fontSize: selectedElement.fontSize || "24px",
    fontWeight: selectedElement.fontWeight || "bold",
    textAlign: selectedElement.textAlign || "left",
    color: selectedElement.color || "#000000",
  });

  useEffect(() => {
    if (selectedElement) {
      setProperties({
        text: selectedElement.text,
        fontSize: selectedElement.fontSize,
        fontWeight: selectedElement.fontWeight,
        textAlign: selectedElement.textAlign,
        color: selectedElement.color,
      });
    }
  }, [selectedElement]);

  const handleUpdate = (updates) => {
    setProperties((prevProperties) => ({
      ...prevProperties,
      ...updates,
    }));

    updateElement(selectedElement.id, updates);
    updateLiveElement(selectedElement.id, updates); // Liveblocks update
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Heading Properties</h3>
      
      <div>
        <label>Text:</label>
        <input
          type="text"
          value={properties.text}
          onChange={(e) => handleUpdate({ text: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Font Size:</label>
        <input
          type="text"
          value={properties.fontSize}
          onChange={(e) => handleUpdate({ fontSize: e.target.value })}
          className="border p-2 w-full"
        />
      </div>

      <div>
        <label>Font Weight:</label>
        <select
          value={properties.fontWeight}
          onChange={(e) => handleUpdate({ fontWeight: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </select>
      </div>

      <div>
        <label>Text Align:</label>
        <select
          value={properties.textAlign}
          onChange={(e) => handleUpdate({ textAlign: e.target.value })}
          className="border p-2 w-full"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>

      <div>
        <label>Text Color:</label>
        <input
          type="color"
          value={properties.color}
          onChange={(e) => handleUpdate({ color: e.target.value })}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
