import { Outlet } from "react-router-dom"

export function PublicTemplate() {
  return (
    <div>
      <h1>Aqui vem as rotas no padrão login</h1>
      <Outlet />
    </div>
  )
}