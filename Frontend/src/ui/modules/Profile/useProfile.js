import { useEffect, useState } from "react"
import { useAuthorization } from "@/contexts/authorization.context"
import { useSidebarStore } from "@/ui/stores/side-bar.store"
import sidebarMenuItems from "@/ui/utils/sidebar-items"

export default function useProfile() {
  const { token } = useAuthorization()

  const [user, setUser] = useState({
    name: "",
    email: "",
    photo: "https://via.placeholder.com/120",
  })

  const [error, setError] = useState(null)
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
      } catch (err) {
        console.error("Error loading user's information.")
        setError(err.message)
      }
    }

    fetchUserData()
    setActiveTab(sidebarMenuItems[7].title)
  }, [token])

  function updateField(name, value) {
    setUser(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  function updatePhoto(base64Image) {
    setUser(prev => ({
      ...prev,
      photo: base64Image,
    }))
  }

  function handleFileChange(event) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePhoto(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  function handleSubmit(event) {
    console.log("A ser implementado.")
  }

  return {
    user,
    error,
    updateField,
    handleFileChange,
    handleSubmit,
  }
}
