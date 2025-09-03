import { useSidebarStore } from "@/ui/stores/side-bar.store"
import { useAuthorization } from "@/contexts/authorization.context"
import { useNavigate } from "react-router-dom"
import useEmptyStores from "@/ui/utils/useEmptyStores"
import { toast } from "sonner"
import { useState } from "react"

export default function useSidebar() {
    const { removeToken } = useAuthorization()
    const { activeTab, setActiveTab} = useSidebarStore()
    const { emptyStores } = useEmptyStores()
    const navigate = useNavigate()

    const [open, setOpen] = useState(false) 

    function logout() {
        removeToken()
        navigate("/login")
        emptyStores()
        toast.success("Logout realizado com sucesso.")
    }

    function handleItemClick() {
        setOpen(false)
    }
    
    return {
        activeTab,
        setActiveTab,
        logout,
        open,
        setOpen,
        handleItemClick
    }
}