'use client'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { signInWithPopup, signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { db, auth, provider } from '../../../lib/firebase/firebaseConfig'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/navigation'

export default function AuthButton() {
    const [user, setUser] = useState(null)
    const [role, setRole] = useState(null)
    const router=useRouter()

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user)
                if (user.uid) {  // ✅ Check if user exists before proceeding
                    await saveUserToFireStore(user)
                    await getUserRole(user.uid)
                }
            } else {
                setUser(null)
                setRole(null)
            }
        })
        return () => unsubscribe()
    }, [])

    const getUserRole = async (id) => {
        if (!id) return  // ✅ Prevents error if id is null
        const userRef = doc(db, 'users', id)
        const userSnap = await getDoc(userRef)
        if (userSnap.exists()) {
            const newRole=userSnap.data().role
            setRole(newRole)
            console.log("User Role:", userSnap.data().role)
            return newRole
        }
        return null // Return null if role is not found
    }

    const saveUserToFireStore = async (user) => {
        if (!user.uid) return // ✅ Prevents error if user is null
        const userRef = doc(db, 'users', user.uid)
        const userSnap = await getDoc(userRef)
        if (!userSnap.exists()) {
            await setDoc(userRef, {
                uid: user.uid,
                name: user.displayName,
                email: user.email,
                role: "editor",
                uniqueId: uuidv4()
            })
        }
    }

    const login = async () => {
      try{
       const result= await signInWithPopup(auth, provider)
       const user=result.user
       const role=await getUserRole(user.uid)
       console.log('role of user is ',role)
       if(role){
        if(role=='admin'){
          router.push('/admin')
        }
        else{
          router.push('/editor')
        }
       }
      }
      catch(e){
        alert(e)
      }
    }
       
    
    const logout = async () => {
        await signOut(auth)
        setUser(null)
        setRole(null)
    }

    return (
        <div>
            {user ? (
                <>
                    <p>Welcome, {user.displayName}</p>
                    <p>Role: {role || "Loading..."}</p>
                    <button onClick={logout} className="bg-red-500 text-white px-4 py-2">
                        Logout
                    </button>
                </>
            ) : (
                <button onClick={login} className="bg-blue-500 text-white px-4 py-2">
                    Sign in with Google
                </button>
            )}
        </div>
    )
}
