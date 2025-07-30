import { useState } from "react"
import sidebarMenuItems from "@/ui/utils/sidebar-items"
import { useAuthorization } from "@/contexts/authorization.context"
import { useNavigate } from "react-router-dom"

export default function useSidebar() {
    const [activeTab, setActiveTab] = useState(sidebarMenuItems[0].title)
    const { removeToken } = useAuthorization()
    const navigate = useNavigate()

    function logout() {
        removeToken()
        navigate("/login")
    }
    
    return {
        activeTab,
        setActiveTab,
        logout,
    }
}