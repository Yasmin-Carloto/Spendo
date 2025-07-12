import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ui/templates/protected-route/protected-route.template";
import { PublicTemplate } from "./ui/templates/public-template/public.template";
import { PrivateTemplate } from "./ui/templates/private-template/private.template";
import { Login } from "./ui/modules/Login/login.view";
import { Home } from "./ui/modules/Home/home.view";
import { Navigate } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    element: <PublicTemplate />,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      // Outras rotas como cadastro e etc
    ]
  },
  {
    element: 
      <ProtectedRoute>
        <PrivateTemplate />
      </ProtectedRoute>,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "*",
        element: <Navigate to="/" />
      }
    ]
  }
])