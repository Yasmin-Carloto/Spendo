import { useAuthorization } from "@/contexts/authorization.context"
import { Navigate } from 'react-router-dom'
import Loading from "@/ui/components/loading/loading"

export default function ProtectedRoute({ children }) {
  const { token, isLoading } = useAuthorization()

  if (isLoading) {
    return <Loading /> 
  }

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
