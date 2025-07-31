import { useSidebarStore } from "@/ui/stores/side-bar.store"
import { useAuthorization } from "@/contexts/authorization.context"
import { useNavigate } from "react-router-dom"

export default function useSidebar() {
    const { removeToken } = useAuthorization()
    const { activeTab, setActiveTab} = useSidebarStore()
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