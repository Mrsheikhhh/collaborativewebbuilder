import React from "react";
import DraggableComponent from "./DraggableComponen";

export default function RightSide({ selectedElement = {}, updateElement }) {
  const initialComponents = [
    {
      i: 1,
      type: "button",
      text: "Click Me",
      backgroundColor: "#4CAF50",
      width: "50%",
    },
    {
      i: 2,
      type: "text",
      text: "Text",
      color: "#000000",
      fontSize: "14px",
      fontWeight: "normal",
      fontStyle: "normal",
      textAlign: "left",
      letterSpacing: "0px",
      lineHeight: "1.5",
      textDecoration: "none",
    },
    {
      i: 3,
      type: "div",
      width: "400px",
      height: "200px",
      backgroundColor: "#f0f0f0",
      x: 300,
      y: 300,
      borderColor: "#000000",
      borderWidth: "1",
      borderRadius: "5px",
      padding: "10px",
      boxShadow: "none",
      display: "block",
      overflow: "visible",
      opacity: 1,
    },
    {
      i: 4,
      type: "image",
      src: "https://via.placeholder.com/150",
      width: "300px",
      height: "300px",
      x: 300,
      y: 300,
      text: "Image",
      borderColor: "#000000",
      borderWidth: "1px",
      borderRadius: "8px",
      boxShadow: "none",
      opacity: 1,
      filter: "none",
      objectFit: "cover",
      transform: "rotate(0deg)",
    },
    {
      i: 5,
      type: "heading",
      level: 1,
      text: "Heading Text",
      color: "#333333",
      fontSize: "24",
      fontWeight: "bold",
      textAlign: "center",
      letterSpacing: "0.5px",
      x: 200,
      width: 200,
      lineHeight: "1.2",
      textDecoration: "none",
    },
    {
      i: 6, // New Form Component
      type: "form",
      fields: [
        { id: 1, type: "text", label: "Name", placeholder: "Enter your name", required: true },
        { id: 2, type: "email", label: "Email", placeholder: "Enter your email", required: true },
        { id: 3, type: "password", label: "Password", placeholder: "Enter password", required: true },
        { id: 4, type: "textarea", label: "Message", placeholder: "Enter your message", required: false },
        { id: 5, type: "select", label: "Country", options: ["USA", "Canada", "UK"], required: true },
        { id: 6, type: "checkbox", label: "Accept Terms", required: true },
        { id: 7, type: "radio", label: "Gender", options: ["Male", "Female"], required: true },
        { id: 8, type: "submit", text: "Submit" },
      ],
      width: "400px",
      height: "auto",
      backgroundColor: "#ffffff",
      borderColor: "#cccccc",
      borderWidth: "1px",
      borderRadius: "5px",
      x:100,
      y:100,
      padding: "10px",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      opacity: 1,
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Drag Elements</h3>
      {initialComponents.map((c) => (
        <div key={c.i}>
          <DraggableComponent
            element={{ ...c, ...selectedElement }}
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        </div>
      ))}
    </div>
  );
}
