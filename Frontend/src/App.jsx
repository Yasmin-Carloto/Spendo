import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ui/templates/protected-route/protected-route.template";
import { PublicTemplate } from "./ui/templates/public-template/public.template";
import { PrivateTemplate } from "./ui/templates/private-template/private.template";
import { Login } from "./ui/modules/Login/login.view";
import { Home } from "./ui/modules/Home/home.view";
import { Navigate } from 'react-router-dom';
import SignUp from "./ui/modules/Sign-Up/sign-up.view";
import { BuildScreen } from "./ui/modules/Build-Screen/build-screen.view";

export const router = createBrowserRouter([
  {
    element: 
      <ProtectedRoute>
        <PublicTemplate />
      </ProtectedRoute>,
    children: [
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
      {
        path: "/forgot-password",
        element: <BuildScreen />
      },
      {
        path: "/recover-password",
        element: <BuildScreen />
      },
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
        path: "/transactions",
        element: <BuildScreen />
      },
      {
        path: "/create-transaction",
        element: <BuildScreen />
      },
      {
        path: "/edit-transaction",
        element: <BuildScreen />
      },
      {
        path: "/goals",
        element: <BuildScreen />
      },
      {
        path: "/create-goal",
        element: <BuildScreen />
      },
      {
        path: "/edit-goal",
        element: <BuildScreen />
      },
      {
        path: "/historic",
        element: <BuildScreen />
      },
      {
        path: "/create-category",
        element: <BuildScreen />
      },
      {
        path: "/edit-category",
        element: <BuildScreen />
      },
      {
        path: "/faq",
        element: <BuildScreen />
      },
      {
        path: "/about-us",
        element: <BuildScreen />
      },
      {
        path: "/profile",
        element: <BuildScreen />
      },
    ]
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
])