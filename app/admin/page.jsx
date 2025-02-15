import React from 'react'
import ProtectedRoute from '../components/custom/protectedRoute'

export default function Admin() {
  return (
    <ProtectedRoute requiredRole='admin'>

        
    </ProtectedRoute>
  )
}
