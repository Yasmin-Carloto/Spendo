import { Outlet } from "react-router-dom"
import { PublicHeader } from "../../components/public-header/PublicHeader"

export function PublicTemplate() {
  return (
    <div>
      <PublicHeader />
      <Outlet />
    </div>
  )
}