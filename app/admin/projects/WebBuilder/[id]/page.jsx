"use client";
import React, { useEffect, useState } from "react";
import LeftSide from "../components/LeftSide";
import MainScreen from "../components/MainScreen";
import RightSide from "../components/RightSide";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { RoomProvider } from "@liveblocks/react";
import { LiveblocksProvider } from "@liveblocks/react";
import { db } from "@/lib/firebase/firebaseConfig";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function WebBuilder() {
  const [selectedElement, setSelectedElement] = useState(null);
  const [elements, setElements] = useState([]);
  const [project, setProject] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user,setUser]=useState(null)
  const [error, setError] = useState(null);

  const { id } = useParams(); // `projectId` from URL
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId"); // Extract userId from URL query

  useEffect(() => {
    const fetchProjectAndRole = async () => {
      if (!id || !userId) return;

      try {
        // Step 1: Fetch Project
        const projectQuery = query(collection(db, "projects"), where("projectId", "==", id));
        const projectSnapshot = await getDocs(projectQuery);

        if (projectSnapshot.empty) {
          setError("Project not found");
          setLoading(false);
          return;
        }

        const projectData = projectSnapshot.docs[0].data();
        setProject(projectData);

        // Step 2: Check if user is Admin
        if (projectData.adminId === userId) {
          setRole("Admin");
          setLoading(false);
          return;
        }
      console.log('user is ',userId)
        // Step 3: Fetch user role from `projectUsers` collection
        const projectUsersQuery = query(
          collection(db, "projectsusers"),
          where("projectId", "==", id),
          where("userId", "==", userId)
        );
        
        const projectUsersSnapshot = await getDocs(projectUsersQuery);
        console.log("Querying projectUsers for:", { projectId: id, userId });
        
        if (!projectUsersSnapshot.empty) {
          const userData = projectUsersSnapshot.docs[0].data();
          console.log("User found in projectUsers:", userData.role);
          setRole(userData.role);
          setUser(userData)
        } else {
          console.log("No matching document found in projectUsers");
          setRole("No Access");
        }
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching project:", err);
        setError("Failed to fetch project");
        setLoading(false);
      }
    };

    fetchProjectAndRole();
  }, [id, userId]);

  // Function to update the selected element index
  const updateSelectedElement = (index) => {
    setSelectedElement(index);
  };

  // Function to update the properties of a selected element
  const updateElement = (id, newProperties) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...newProperties } : el))
    );
  };
  return (
    <LiveblocksProvider publicApiKey={"pk_dev_NO5DfnrhOqZEHH_n1MsB3lH2i_8aePmG1DBBEjSEmbFMHs7pl8LxwX7zhcsYNIgj"}>
      <RoomProvider id="canvas-room">
        <DndProvider backend={HTML5Backend}>
          <div className="grid grid-cols-12 w-screen h-screen">
            {role !== "guest" && (
              <div className="col-span-2 w-full">
                <LeftSide selectedElement={elements[selectedElement]} updateElement={updateElement}  />
              </div>
            )}
            <div className={`w-full flex flex-col items-center bg-gray-500 ${role === "guest" ? "col-span-12" : "col-span-8"}`}>
              {loading ? (
                <p>Loading project...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <>
                  <p className="text-white font-bold text-lg">
                    {role === "Admin" && "You are an Admin"}
                    {role === "editor" && "You are an Editor"}
                    {role === "guest" && "You are a Guest"}
                    {role === "No Access" && "You do not have access to this project"}
                  </p>
                  <MainScreen elements={elements} setElements={setElements} updateSelectedElement={updateSelectedElement} updateElement={updateElement} user={user}/>
                </>
              )}
            </div>
            {role !== "guest" && (
              <div className="col-span-2 w-full">
                <RightSide selectedElement={elements[selectedElement]} updateElement={updateElement} />
              </div>
            )}
          </div>
        </DndProvider>
      </RoomProvider>
    </LiveblocksProvider>
  );
  
}
