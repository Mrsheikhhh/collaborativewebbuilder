import React, { useState } from "react";

export default function ImageProperties({ selectedElement, updateElement,updateLiveElement }) {
  const [imageProperties, setImageProperties] = useState({
    src: selectedElement.src,
    width: selectedElement.width,
    height: selectedElement.height,
    borderColor: selectedElement.borderColor || "#000000",
    borderWidth: selectedElement.borderWidth || "1px",
    borderRadius: selectedElement.borderRadius || "0px",
    boxShadow: selectedElement.boxShadow || "none",
    opacity: selectedElement.opacity || 1,
    filter: selectedElement.filter || "none",
    objectFit: selectedElement.objectFit || "cover",
    transform: selectedElement.transform || "rotate(0deg)",
  });

  const handleChange = (e, property) => {
    const value = e.target.type === "range" ? parseFloat(e.target.value) : e.target.value;
    setImageProperties((prevProps) => {
      const updatedProperties = { ...prevProps, [property]: value };
      updateElement(selectedElement.id, updatedProperties);
      updateLiveElement(selectedElement.id,updatedProperties)
      return updatedProperties;
    });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Image Properties</h3>
      <div>
        <label>Image Source:</label>
        <input
          type="text"
          value={imageProperties.src}
          onChange={(e) => handleChange(e, "src")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Width:</label>
        <input
          type="text"
          value={imageProperties.width}
          onChange={(e) => handleChange(e, "width")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="text"
          value={imageProperties.height}
          onChange={(e) => handleChange(e, "height")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Border Color:</label>
        <input
          type="color"
          value={imageProperties.borderColor}
          onChange={(e) => handleChange(e, "borderColor")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Border Width:</label>
        <input
          type="text"
          value={imageProperties.borderWidth}
          onChange={(e) => handleChange(e, "borderWidth")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Border Radius:</label>
        <input
          type="text"
          value={imageProperties.borderRadius}
          onChange={(e) => handleChange(e, "borderRadius")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Box Shadow:</label>
        <input
          type="text"
          value={imageProperties.boxShadow}
          onChange={(e) => handleChange(e, "boxShadow")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Opacity:</label>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={imageProperties.opacity}
          onChange={(e) => handleChange(e, "opacity")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Filter:</label>
        <input
          type="text"
          value={imageProperties.filter}
          onChange={(e) => handleChange(e, "filter")}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Object Fit:</label>
        <select
          value={imageProperties.objectFit}
          onChange={(e) => handleChange(e, "objectFit")}
          className="border p-2 w-full"
        >
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
        </select>
      </div>
      <div>
        <label>Transform (Rotation):</label>
        <input
          type="text"
          value={imageProperties.transform}
          onChange={(e) => handleChange(e, "transform")}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
