import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Handle GET, UPDATE, DELETE for a specific project by ID
export async function GET(req, { params }) {
  try {
    const projectId = params.id;  // Extract the project ID from params
    const projectRef = doc(db, "projects", projectId);  // Get a reference to the project document
    const projectDoc = await getDoc(projectRef);  // Get the document

    if (!projectDoc.exists()) {
      return new Response("Project not found", { status: 404 });
    }

    const project = { id: projectDoc.id, ...projectDoc.data() };
    return new Response(JSON.stringify(project), { status: 200 });
  } catch (error) {
    console.error("Error fetching project:", error);
    return new Response("Failed to fetch project", { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const projectId = params.id;
    const { name, description, startDate, endDate, projectId: newProjectId, adminId } = await req.json();

    const projectRef = doc(db, "projects", projectId);  // Get the document reference for updating

    await updateDoc(projectRef, {
      name,
      description,
      startDate,
      endDate,
      projectId: newProjectId,
      adminId,
      updatedAt: new Date().toISOString(),
    });

    return new Response("Project updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return new Response("Failed to update project", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const projectId = params.id;
    const projectRef = doc(db, "projects", projectId);  // Get the document reference for deletion

    await deleteDoc(projectRef);  // Delete the document

    return new Response("Project deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting project:", error);
    return new Response("Failed to delete project", { status: 500 });
  }
}
