import { useNavigate } from "react-router-dom"
import { useAuthorization } from "../../../contexts/authorization.context"

export function Login() {
  const { saveToken } = useAuthorization()
  const navigate = useNavigate()

  function handleLogin() {
    saveToken("fake-token")
    navigate("/")
  }

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Entrar</button>
    </div>
  )
}
