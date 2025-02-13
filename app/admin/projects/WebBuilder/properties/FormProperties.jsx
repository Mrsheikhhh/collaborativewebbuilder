import React, { useState } from "react";

export default function FormComponent({ selectedElement, updateElement }) {
  const [formFields, setFormFields] = useState([
    { id: 1, type: "text", label: "Name", placeholder: "Enter your name", required: true },
    { id: 2, type: "email", label: "Email", placeholder: "Enter your email", required: true },
    { id: 3, type: "password", label: "Password", placeholder: "Enter password", required: true },
    { id: 4, type: "textarea", label: "Message", placeholder: "Enter your message", required: false },
    { id: 5, type: "select", label: "Country", options: ["USA", "Canada", "UK"], required: true },
    { id: 6, type: "checkbox", label: "Accept Terms", required: true },
    { id: 7, type: "radio", label: "Gender", options: ["Male", "Female"], required: true },
    { id: 8, type: "submit", text: "Submit" },
  ]);

  return (
    <form className="p-4 border rounded shadow-lg bg-white max-w-md mx-auto">
      <h3 className="text-lg font-bold mb-4">Custom Form</h3>
      {formFields.map((field) => (
        <div key={field.id} className="mb-3">
          {field.type !== "submit" && <label className="block font-medium">{field.label}</label>}
          
          {field.type === "text" || field.type === "email" || field.type === "password" ? (
            <input
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border rounded"
            />
          ) : field.type === "textarea" ? (
            <textarea
              placeholder={field.placeholder}
              required={field.required}
              className="w-full p-2 border rounded"
            />
          ) : field.type === "select" ? (
            <select className="w-full p-2 border rounded" required={field.required}>
              {field.options.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : field.type === "checkbox" ? (
            <div className="flex items-center">
              <input type="checkbox" required={field.required} className="mr-2" />
              <span>{field.label}</span>
            </div>
          ) : field.type === "radio" ? (
            field.options.map((option, index) => (
              <label key={index} className="mr-4">
                <input type="radio" name="radio-group" required={field.required} className="mr-1" />
                {option}
              </label>
            ))
          ) : field.type === "submit" ? (
            <button className="w-full p-2 bg-blue-500 text-white rounded">{field.text}</button>
          ) : null}
        </div>
      ))}
    </form>
  );
}
