'use client'
import React from 'react'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/app/components/ui/input'
import { Button } from '@/app/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { auth } from "@/lib/firebase/firebaseConfig";
import { v4 as uuidv4 } from 'uuid';

// ✅ Schema validation
const formSchema = z.object({
    name: z.string().min(5, 'Project Name must be at least 5 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
})

export default function CreateProject() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(formSchema)
    });

    const user = auth.currentUser;
    console.log(auth.currentUser)
   
    const onSubmit = async (data) => {
        try {
            if (!user) {
                alert("You must be logged in to create a project.");
                return;
            }

            // Get Firebase Auth Token
            const token = await user.getIdToken();

            // Generate UUID for project
            const projectId = uuidv4();
            const projectData = { ...data, projectId, adminId: user.uid }; // Include projectId and userId

            // Send request with token
            const res = await fetch("/api/projects", {
                method: "POST",
                body: JSON.stringify(projectData),
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            if (!res.ok) throw new Error("Failed to create project");

            alert("Project Created Successfully!");
            router.push(`/admin/projects/WebBuilder/${projectId}?userId=${user.uid}`);
        } catch (error) {
            console.error("Error creating project:", error);
        }
    };

    return (
        <div className="h-full grid grid-cols-2 p-5 gap-5 w-full m-10">
            {/* Left Section (Image) */}
            <div className="w-full h-full flex items-center justify-center bg-gray-100 border rounded-lg">
                <p className="text-gray-500">Image Here</p>
            </div>

            {/* Right Section (Form) */}
            <div className="w-full h-full flex flex-col justify-center">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Project Name */}
                    <div>
                        <label className="block text-gray-700">Project Name</label>
                        <Input {...register("name")} placeholder="Enter project name" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Project Description */}
                    <div>
                        <label className="block text-gray-700">Project Description</label>
                        <Textarea {...register("description")} placeholder="Describe the project" />
                        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                    </div>

                    {/* Start Date */}
                    <div>
                        <label className="block text-gray-700">Start Date</label>
                        <Input type="date" {...register("startDate")} />
                    </div>

                    {/* End Date */}
                    <div>
                        <label className="block text-gray-700">End Date</label>
                        <Input type="date" {...register("endDate")} />
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={isSubmitting} className="w-full">
                        {isSubmitting ? "Creating..." : "Create Project"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
