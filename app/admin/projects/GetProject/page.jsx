'use client';
import React, { useEffect, useState } from 'react';

export default function GetProjects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await fetch("/api/projects");
                const data = await res.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Projects List</h1>
            <ul className="space-y-2">
                {projects.map((project) => (
                    <li key={project.id} className="border p-4 rounded-lg shadow">
                        <h2 className="text-lg font-semibold">{project.name}</h2>
                        <p className="text-gray-600">{project.description}</p>
                        <p className="text-sm text-gray-500">Start: {project.startDate || 'N/A'}</p>
                        <p className="text-sm text-gray-500">End: {project.endDate || 'N/A'}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
