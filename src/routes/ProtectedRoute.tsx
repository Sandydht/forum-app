import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import { getSecureItem } from '../utils/secureStorage.utils'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const accessToken = getSecureItem('accessToken')

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
