import type { JSX } from 'react'
import { Navigate } from 'react-router-dom'
import SecureStorageImpl from '../../infrastructure/service/SecureStorageImpl'

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const accessToken = SecureStorageImpl.getSecureItem('accessToken')

  if (!accessToken) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
