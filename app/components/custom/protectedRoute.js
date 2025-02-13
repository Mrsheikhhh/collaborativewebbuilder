
'use client'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { db,auth } from '../../../lib/firebase/firebaseConfig'
import { doc, getDoc } from 'firebase/firestore'

export default function ProtectedRoute({children,requiredRole}) {
    const [user,setUser]=useState(null)
    const [role,setRole]=useState(null)
    const router=useRouter()
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            setUser(user)
            const userRef = doc(db, 'users', user.uid)
            const userSnap = await getDoc(userRef)
    
            if (userSnap.exists()) {
              setRole(userSnap.data().role)
            }
          } else {
            setUser(null)
            setRole(null)
          }
        })
    
        return () => unsubscribe()
      }, [])
      useEffect(()=>{
        if(role&&requiredRole&&role!==requiredRole){
            router.push('/unauthorized')
        }
      },[role])
      if (role === requiredRole) {
        return children // Only show content if user role matches required role
      } else {
        return <p>Loading...</p> // Or show a loading state until role is determined
      }
    }

