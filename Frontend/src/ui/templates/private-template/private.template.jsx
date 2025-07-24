import { Outlet } from "react-router-dom";

export default function PrivateTemplate() {
  return (
    <div>
      <h1>Vai ter em todos, menos os de login e etc</h1>
      <Outlet />
    </div>
  )
}