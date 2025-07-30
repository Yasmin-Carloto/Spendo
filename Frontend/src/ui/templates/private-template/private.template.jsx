import { Outlet } from "react-router-dom"
import FixedSidebar from "@/ui/components/side-bar/fixed-side-bar"
import spendoLogo from "@/ui/assets/spendo-logo.svg"
import {
  SidebarProvider
} from "@/components/ui/sidebar"
import FlexibleSidebar from "@/ui/components/side-bar/flexible-side-bar"

export default function PrivateTemplate() {
  return (
    <div className="flex w-screen h-screen overflow-hidden relative">
      <SidebarProvider>
        <div className="hidden md:flex">
          <FixedSidebar />
        </div>

        <div className="md:hidden absolute top-0 left-0 z-50 flex items-center gap-4 bg-white w-full h-16 px-4 shadow-sm">
          <FlexibleSidebar />
          <img src={spendoLogo} className="h-8 w-auto" />
        </div>

        <main className="flex-1 overflow-auto pt-16 md:pt-0">
          <Outlet />
        </main>
      </SidebarProvider>
    </div>
  )
}