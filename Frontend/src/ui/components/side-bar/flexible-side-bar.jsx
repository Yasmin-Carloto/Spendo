import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetTitle,
  SheetDescription
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link } from "react-router"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import sidebarMenuItems from "@/ui/utils/sidebar-items"
import useSidebar from "./useSidebar"

export default function FlexibleSidebar() {
  const { logout, open, setOpen, handleItemClick } = useSidebar()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
            <button className="p-2 rounded bg-white shadow">
                <Menu />
            </button>
        </SheetTrigger>
        <SheetContent side="left" className="py-10 px-4 w-64 list-none">
          <SheetTitle></SheetTitle>
          {sidebarMenuItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                className={cn(
                  "flex items-center gap-2 py-2 rounded-md text-gray-400 hover:bg-gray-100",
                )}
                onClick={handleItemClick}
              >
                <Link to={item.url}>
                  <item.icon size={16} />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
          <Button
            onClick={() => logout()}
          >
            <LogOut size={16} />
            Sair da conta
          </Button>
          <SheetDescription></SheetDescription>
        </SheetContent>
    </Sheet>
  )
}
