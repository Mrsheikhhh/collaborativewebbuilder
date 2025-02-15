'use client'
import { useParams } from "next/navigation";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
export default function CreateUser() {
    const {id}=useParams()
    console.log(id)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    projectId: id,
    role: "",
    startDate: "",
    email:"",
    userId:uuidv4(),
    endDate: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to create user");
      const data = await response.json();
      setMessage(`User created successfully`);
      setFormData({ name: "", description: "", projectId: id, role: "", startDate: "", endDate: "",email:'' });
    } catch (error) {
      setMessage("Error creating user");
      console.error("Error:", error);
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Create Project User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <input type="text" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
    
        <input type="text" name="role" placeholder="Role" value={formData.role} onChange={handleChange} required />
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} required />
        <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} required />
        <button type="submit" disabled={loading}>{loading ? "Creating..." : "Create User"}</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}
