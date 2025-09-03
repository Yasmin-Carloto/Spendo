import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { router } from "./App.jsx"
import { AuthorizationProvider } from './contexts/authorization.context.jsx'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthorizationProvider>
      <Toaster richColors position="top-right" />
      <RouterProvider router={router} />
    </AuthorizationProvider>
  </StrictMode>,
)
