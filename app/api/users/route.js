import { db } from "@/lib/firebase/firebaseConfig"
import { collection, addDoc,getDocs } from "firebase/firestore"
import { auth } from "@/lib/firebase/firebaseConfig" // Import Firebase auth
export async function POST(req) {
  try {
      const { name, description, startDate, endDate,projectId,role } = await req.json();

      const docRef = await addDoc(collection(db, "projectsusers"), {
          name,
          description,
          role,
          projectId,
          startDate,
          endDate,
          createdAt: new Date().toISOString(),
      });

      return new Response(JSON.stringify({ id: docRef.id }), { status: 201 });
  } catch (error) {
      console.error("Error saving project:", error);
      return new Response("Failed to save project", { status: 500 });
  }
}


export async function GET() {
  try {
      const querySnapshot = await getDocs(collection(db, "projectusers"));
      const projects = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
      }));

      return new Response(JSON.stringify(projects), { status: 200 });
  } catch (error) {
      console.error("Error fetching projects:", error);
      return new Response("Failed to fetch projects", { status: 500 });
  }
}