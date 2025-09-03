import { useEffect, useState } from "react"
import { useAuthorization } from "@/contexts/authorization.context"
import { useSidebarStore } from "@/ui/stores/side-bar.store"
import { toast } from "sonner"
import sidebarMenuItems from "@/ui/utils/sidebar-items"

export default function useProfile() {
  const { token } = useAuthorization()

  const [user, setUser] = useState({
    name: "",
    email: "",
  })

  const setActiveTab = useSidebarStore((state) => state.setActiveTab)

  useEffect(() => {
    if (!token) return

    async function fetchUserData() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/users/me`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })

        if (!response.ok) {
          throw new Error("Error searching user's information.")
        }

        const data = await response.json()
        setUser(prev => ({
          ...prev,
          name: data.name || "",
          email: data.email || "",
        }))
      } catch (error) {
        console.error("Error loading user's information.", error)
      }
    }

    fetchUserData()
    setActiveTab(sidebarMenuItems[3].title)
  }, [token])

  function setFormsField(event) {
    const { name, value } = event.target

    setUser(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const allErrors = verifyErrors()

    if (Object.keys(allErrors).length === 0) {
      try {
        const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/users/me`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(user),
        })

        if (!response.ok) throw new Error("Error updating user's data.")
        toast.success("Usuário atualizado com sucesso!")
      } catch (error) {
        console.error("Error updating user's data.", error)
        toast.error("Erro ao tentar atualizar o usuário.")
      }
    }
  }

  function verifyErrors() {
    const allErrors = {}

    if(!user.name) {
      allErrors.name = "O campo nome é obrigatório!"
    } else if(user.name.length < 3) {
      allErrors.name = "O campo nome deve ter pelo menos 3 letras."
    }

    if(!user.email) {
      allErrors.email = "O campo email é obrigatório!"
    } else if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)) {
      allErrors.email = "Este email é inválido!"
    }

    return allErrors
  }

  return {
    user,
    setFormsField,
    handleSubmit,
  }
}
