import { createContext, useContext, useState, useEffect } from 'react';

const AuthorizationContext = createContext()
export const useAuthorization = () => useContext(AuthorizationContext)

export function AuthorizationProvider({ children }) {
  const [token, setToken] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('spendo-token')
    if (savedToken) {
      setToken(savedToken)
    }
    setIsLoading(false)
  }, [token])

  function saveToken(newToken) {
    setToken(newToken)
    localStorage.setItem('spendo-token', newToken)
  }

  const removeToken = () => {
    setToken(null)
    localStorage.removeItem('spendo-token')
  }

  return (
    <AuthorizationContext.Provider value={{ token, saveToken, removeToken, isLoading }}>
      {children}
    </AuthorizationContext.Provider>
  )
}
