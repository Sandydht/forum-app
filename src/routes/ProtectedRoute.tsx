import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const accessToken = localStorage.getItem('accessToken')

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
