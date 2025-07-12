import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from "./App.jsx"
import { AuthorizationProvider } from './contexts/authorization.context.jsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthorizationProvider>
      <RouterProvider router={router} />
    </AuthorizationProvider>
  </StrictMode>,
)
