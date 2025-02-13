import React, { useState, useEffect } from "react";

export default function HeadingProperties({ selectedElement, updateElement }) {
  const [text, setText] = useState(selectedElement.text || "Heading Text");
  const [fontSize, setFontSize] = useState(selectedElement.fontSize || "24px");
  const [fontWeight, setFontWeight] = useState(selectedElement.fontWeight || "bold");
  const [textAlign, setTextAlign] = useState(selectedElement.textAlign || "left");
  const [color, setColor] = useState(selectedElement.color || "#000000");
 console.log(selectedElement)
  useEffect(() => {
    if (selectedElement) {
      setText(selectedElement.text);
      setFontSize(selectedElement.fontSize);
      setFontWeight(selectedElement.fontWeight);
      setTextAlign(selectedElement.textAlign);
      setColor(selectedElement.color);
    }
  }, [selectedElement]);

  const handleTextChange = (e) => {
    const newText = e.target.value;
    setText(newText);  // Update the local state
    updateElement(selectedElement.id, { text: newText });  // Update the global state by passing `id`
  };
  
  const handleFontSizeChange = (e) => {
    const newFontSize = e.target.value;
    setFontSize(newFontSize);  // Update the local state
    updateElement(selectedElement.id, { fontSize: newFontSize });  // Update the global state by passing `id`
  };
  
  // Similar for other property changes
  
  const handleFontWeightChange = (e) => {
    setFontWeight(e.target.value);
    updateElement(selectedElement.id, { fontWeight: e.target.value });
  };

  const handleTextAlignChange = (e) => {
    setTextAlign(e.target.value);
    updateElement(selectedElement.id, { textAlign: e.target.value });
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
    updateElement(selectedElement.id, { color: e.target.value });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Heading Properties</h3>
      <div>
        <label>Text:</label>
        <input
          type="text"
          value={text}
          onChange={handleTextChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Font Size:</label>
        <input
          type="text"
          value={fontSize}
          onChange={handleFontSizeChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Font Weight:</label>
        <select value={fontWeight} onChange={handleFontWeightChange} className="border p-2 w-full">
          <option value="normal">Normal</option>
          <option value="bold">Bold</option>
          <option value="lighter">Light</option>
        </select>
      </div>
      <div>
        <label>Text Align:</label>
        <select value={textAlign} onChange={handleTextAlignChange} className="border p-2 w-full">
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <div>
        <label>Text Color:</label>
        <input
          type="color"
          value={color}
          onChange={handleColorChange}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
