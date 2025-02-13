import React from "react";

export default function PropertiesPanel({ elementData, updateElement }) {
  // Handle changes for any property
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle different types of inputs (checkbox, text, number, etc.)
    const updatedValue = type === "checkbox" ? checked : value;

    // Create updated element data
    const updatedElement = { ...elementData, [name]: updatedValue };

    // Call updateElement to pass the updated element data to the parent
    updateElement(updatedElement); 
  };

  if (!elementData) return <p>Select an element to customize</p>;

  // Dynamically render properties based on elementData's keys
  return (
    <div className="p-4">
      <h1 className="font-bold">Customize {elementData.type}</h1>

      {/* Iterate over all properties of elementData and render corresponding inputs */}
      {Object.keys(elementData).map((key) => {
        // Skip "type" property, as it doesn't need an input field
        if (key === "type") return null;

        const value = elementData[key];

        return (
          <div key={key} className="mb-4">
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}</label>
            {typeof value === "string" ? (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="border p-1 w-full"
              />
            ) : typeof value === "number" ? (
              <input
                type="number"
                name={key}
                value={value}
                onChange={handleChange}
                className="border p-1 w-full"
              />
            ) : typeof value === "boolean" ? (
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleChange}
                className="border p-1 w-full"
              />
            ) : (
              <input
                type="text"
                name={key}
                value={value}
                onChange={handleChange}
                className="border p-1 w-full"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
