import { useAuthorization } from "@/contexts/authorization.context"
import { Navigate, Outlet } from 'react-router-dom'

export default function ProtectedRoute({ children }) {
  const { token } = useAuthorization()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}
