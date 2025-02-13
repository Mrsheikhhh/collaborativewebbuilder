'use client'
import { Calendar, Home, Inbox, Search, Settings } from "lucide-react"
import { db, auth } from "@/lib/firebase/firebaseConfig"
import { getDoc, doc } from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar"

// Menu items.
const adminItems = [
  { title: "Dashboard", url: "/admin", icon: Home },
  { title: "Create", url: "/admin/projects/CreateProject", icon: Inbox },
  { title: "Manage Users", url: "/admin/users", icon: Settings },
]

const editorItems = [
  { title: "Dashboard", url: "/editor", icon: Home },
  { title: "My Projects", url: "/editor/projects", icon: Inbox },
]

const defaultItems = [{ title: "Dashboard", url: "/", icon: Home }]

export function AppSidebar() {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          setRole(userSnap.data().role)
        } else {
          setRole(null)
        }
      } else {
        setRole(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  if (loading) return <div>Loadinnng...</div>

  const items =
    role === "admin" ? adminItems : role === "editor" ? editorItems : defaultItems

  return (
    <Sidebar>
      <SidebarHeader>
        <h2>Sidebar</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex items-center gap-2">
                      <item.icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
