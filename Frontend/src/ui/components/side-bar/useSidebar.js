import { useSidebarStore } from "@/ui/stores/side-bar.store"
import { useAuthorization } from "@/contexts/authorization.context"
import { useNavigate } from "react-router-dom"
import useEmptyStores from "@/ui/utils/useEmptyStores"

export default function useSidebar() {
    const { removeToken } = useAuthorization()
    const { activeTab, setActiveTab} = useSidebarStore()
    const { emptyStores } = useEmptyStores()
    const navigate = useNavigate()

    function logout() {
        removeToken()
        navigate("/login")
        emptyStores()
    }
    
    return {
        activeTab,
        setActiveTab,
        logout,
    }
}