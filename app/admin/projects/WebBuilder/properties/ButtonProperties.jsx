import React, { useState } from "react";

export default function ButtonProperties({ elementData, updateElement }) {
  const [buttonWidth, setButtonWidth] = useState(elementData.width);
  const [buttonHeight, setButtonHeight] = useState(elementData.height);
  const [buttonColor, setButtonColor] = useState(elementData.color);
  const [buttonText, setButtonText] = useState(elementData.text);

  const handleUpdate = () => {
    updateElement(elementData.id, {
      width: buttonWidth,
      height: buttonHeight,
      color: buttonColor,
      text: buttonText,
    });
  };

  return (
    <div>
      <div>
        <label>Button Width:</label>
        <input
          type="number"
          value={buttonWidth}
          onChange={(e) => setButtonWidth(e.target.value)}
        />
      </div>

      <div>
        <label>Button Height:</label>
        <input
          type="number"
          value={buttonHeight}
          onChange={(e) => setButtonHeight(e.target.value)}
        />
      </div>

      <div>
        <label>Button Color:</label>
        <input
          type="color"
          value={buttonColor}
          onChange={(e) => setButtonColor(e.target.value)}
        />
      </div>

      <div>
        <label>Button Text:</label>
        <input
          type="text"
          value={buttonText}
          onChange={(e) => setButtonText(e.target.value)}
        />
      </div>

      <button onClick={handleUpdate}>Apply Changes</button>
    </div>
  );
}
