import React, { useState } from "react";

export default function ImageProperties({ selectedElement, updateElement }) {
  const [imageSrc, setImageSrc] = useState(selectedElement.src);
  const [imageWidth, setImageWidth] = useState(selectedElement.width);
  const [imageHeight, setImageHeight] = useState(selectedElement.height);
  const [borderColor, setBorderColor] = useState(selectedElement.borderColor || "#000000");
  const [borderWidth, setBorderWidth] = useState(selectedElement.borderWidth || "1px");
  const [borderRadius, setBorderRadius] = useState(selectedElement.borderRadius || "0px");
  const [boxShadow, setBoxShadow] = useState(selectedElement.boxShadow || "none");
  const [opacity, setOpacity] = useState(selectedElement.opacity || 1);
  const [filter, setFilter] = useState(selectedElement.filter || "none");
  const [objectFit, setObjectFit] = useState(selectedElement.objectFit || "cover");
  const [transform, setTransform] = useState(selectedElement.transform || "rotate(0deg)");

  const handleSrcChange = (e) => {
    setImageSrc(e.target.value);
    updateElement(selectedElement.id,{ src: e.target.value });
    console.log(selectedElement,'updated')
  };

  const handleWidthChange = (e) => {
    setImageWidth(e.target.value);
    updateElement(selectedElement.id,{ width: e.target.value });
  };

  const handleHeightChange = (e) => {
    setImageHeight(e.target.value);
    updateElement(selectedElement.id,{ height: e.target.value });
  };

  const handleBorderColorChange = (e) => {
    setBorderColor(e.target.value);
    updateElement(selectedElement.id,{ borderColor: e.target.value });
  };

  const handleBorderWidthChange = (e) => {
    setBorderWidth(e.target.value);
    updateElement(selectedElement.id,{ borderWidth: e.target.value });
  };

  const handleBorderRadiusChange = (e) => {
    setBorderRadius(e.target.value);
    updateElement(selectedElement.id, { borderRadius: e.target.value });
  };

  const handleBoxShadowChange = (e) => {
    setBoxShadow(e.target.value);
    updateElement(selectedElement.id,{ boxShadow: e.target.value });
  };

  const handleOpacityChange = (e) => {
    setOpacity(e.target.value);
    updateElement( selectedElement.id,{ opacity: e.target.value });
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
    updateElement(selectedElement.id,{ filter: e.target.value });
  };

  const handleObjectFitChange = (e) => {
    setObjectFit(e.target.value);
    updateElement(selectedElement.id,{ objectFit: e.target.value });
  };

  const handleTransformChange = (e) => {
    setTransform(e.target.value);
    updateElement(selectedElement.id,{ transform: e.target.value });
  };

  return (
    <div>
      <h3 className="text-lg font-bold mb-2">Image Properties</h3>
      <div>
        <label>Image Source:</label>
        <input
          type="text"
          value={imageSrc}
          onChange={handleSrcChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Width:</label>
        <input
          type="text"
          value={imageWidth}
          onChange={handleWidthChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Height:</label>
        <input
          type="text"
          value={imageHeight}
          onChange={handleHeightChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Border Color:</label>
        <input
          type="color"
          value={borderColor}
          onChange={handleBorderColorChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Border Width:</label>
        <input
          type="text"
          value={borderWidth}
          onChange={handleBorderWidthChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Border Radius:</label>
        <input
          type="text"
          value={borderRadius}
          onChange={handleBorderRadiusChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Box Shadow:</label>
        <input
          type="text"
          value={boxShadow}
          onChange={handleBoxShadowChange}
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
          value={opacity}
          onChange={handleOpacityChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Filter:</label>
        <input
          type="text"
          value={filter}
          onChange={handleFilterChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label>Object Fit:</label>
        <select value={objectFit} onChange={handleObjectFitChange} className="border p-2 w-full">
          <option value="cover">Cover</option>
          <option value="contain">Contain</option>
        </select>
      </div>
      <div>
        <label>Transform (Rotation):</label>
        <input
          type="text"
          value={transform}
          onChange={handleTransformChange}
          className="border p-2 w-full"
        />
      </div>
    </div>
  );
}
