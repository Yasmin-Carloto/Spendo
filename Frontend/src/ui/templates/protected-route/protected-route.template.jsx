import { useAuthorization } from "../../../contexts/authorization.context"
import { Navigate } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const { token } = useAuthorization()
    
    if(!token) {
        return <Navigate to="/login" />
    }

    return children
}