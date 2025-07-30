import { 
  LayoutDashboard, 
  ListOrdered, 
  Target, 
  Clock, 
  HelpCircle, 
  Info, 
  User 
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
      url: "goals",
      icon: Target,
    },
    {
      title: "Histórico",
      url: "/historic",
      icon: Clock,
    },
    {
      title: "FAQ",
      url: "/faq",
      icon: HelpCircle,
    },
    {
      title: "Sobre Nós",
      url: "/about-us",
      icon: Info,
    },
    {
      title: "Perfil",
      url: "/profile",
      icon: User,
    },
]