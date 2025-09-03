import { 
  LayoutDashboard, 
  ListOrdered, 
  Target, 
  User,
} from "lucide-react"
export default [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Transações",
    url: "/transactions",
    icon: ListOrdered,
  },
  {
    title: "Metas",
    url: "/goals",
    icon: Target,
  },
  {
    title: "Perfil",
    url: "/profile",
    icon: User,
  },
]