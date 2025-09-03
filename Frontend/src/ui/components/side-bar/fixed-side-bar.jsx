import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { cn } from "@/lib/utils"
import { LogOut } from "lucide-react"
import spendoLogo from "@/ui/assets/spendo-logo.svg"
import useSidebar from "./useSidebar"
import sidebarMenuItems from "@/ui/utils/sidebar-items"

export default function FixedSidebar() {
  const { activeTab, logout } = useSidebar()

  return (
    <Sidebar className="h-screen w-64 bg-gray-50 flex flex-col justify-between px-4 py-6 border-r">
      <div className="flex items-center gap-2 mb-8 px-2">
        <img 
          className="h-12 w-auto"
          src={spendoLogo}
        />
      </div>

      <SidebarContent className="flex flex-col text-sm p-4 justify-between">
        <SidebarMenu>
          {sidebarMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md text-gray-400 hover:bg-gray-100",
                  item.title === activeTab && "bg-emerald-400 text-white hover:bg-emerald-400"
                )}
              >
                <Link to={item.url}>
                  <item.icon size={16} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <Button
          className="my-12"
          onClick={() => logout()}
        >
          <LogOut size={16} />
          Sair da conta
        </Button>
      </SidebarContent>
    </Sidebar>
  )
}
