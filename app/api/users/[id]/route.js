import { db } from "@/lib/firebase/firebaseConfig";
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";

// Get a user by ID
export async function GET(req,{ params }) {
  try {
  
    const userId=params.id
    const userRef = doc(db, "users", userId); // Get the document reference by ID
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      return new Response(JSON.stringify(userDoc.data()), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return new Response("Failed to fetch user", { status: 500 });
  }
}

// Update user by ID
export async function PUT(req, { params }) {
  try {
    const { name, description, startDate, endDate, role, email } = await req.json();
    const userRef = doc(db, "projectsusers", params.id);

    // Update the user data in Firestore
    await updateDoc(userRef, {
      name,
      description,
      role,
      startDate,
      endDate,
      email,
      updatedAt: new Date().toISOString(),
    });

    return new Response("User updated successfully", { status: 200 });
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Failed to update user", { status: 500 });
  }
}

// Delete user by ID
export async function DELETE({ params }) {
  try {
    const userRef = doc(db, "projectsusers", params.id);
    
    // Delete the user document from Firestore
    await deleteDoc(userRef);

    return new Response("User deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Failed to delete user", { status: 500 });
  }
}
