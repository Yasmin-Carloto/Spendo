import { Outlet } from "react-router-dom"
import { PublicHeader } from "@/ui/components/public-header/public-header"

export default function PublicTemplate() {
  return (
    <div className="min-h-screen ">
      <PublicHeader />
      <Outlet />
    </div>
  )
}