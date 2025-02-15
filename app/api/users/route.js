import { db } from "@/lib/firebase/firebaseConfig"
import { collection, addDoc,getDocs } from "firebase/firestore"
import { auth } from "@/lib/firebase/firebaseConfig" // Import Firebase auth
import nodemailer from 'nodemailer'

import { sendMail } from "@/lib/nodemailer/NodeMailerConfig"
export async function POST(req) {
  try {
      const { name, description, startDate, endDate,projectId,role,email,userId } = await req.json();

      const docRef = await addDoc(collection(db, "projectsusers"), {
          name,
          description,
          role,
          projectId,
          userId,
          startDate,
          email,
          endDate,
          createdAt: new Date().toISOString(),
      });
      const subject = `Welcome to the Project: ${name}`;
      const text = `Hello ${name},\n\nYou have been added to the project: ${name} as a ${role}. Here are the project details:\n\nDescription: ${description}\nStart Date: ${startDate}\nEnd Date: ${endDate}\n\nBest regards,\nThe Project Team`;

      // Send email to the user
      await sendMail(email, subject, text);
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