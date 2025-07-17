import { useAuthorization } from "../../../contexts/authorization.context"
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute({ children }) {
    const { token } = useAuthorization()
    console.log(token)

    if (token) {
        return token ? children : <Navigate to="/login" />
    }

    return <Outlet />
}