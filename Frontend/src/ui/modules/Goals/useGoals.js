import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuthorization } from "@/contexts/authorization.context"
import { useGoalStore } from "@/ui/stores/goals.store"
import sidebarMenuItems from "@/ui/utils/sidebar-items"
import { useSidebarStore } from "@/ui/stores/side-bar.store"

export default function useGoals() {
  const [selectedGoalIdToDelete, setSelectedGoalIdToDelete] = useState(null)
  const navigate = useNavigate()
  const { token } = useAuthorization()
  const { goals, setGoals, removeGoal } = useGoalStore()
  const setActiveTab = useSidebarStore((state) => state.setActiveTab)

  useEffect(() => {
    async function getAllGoals() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/goals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Error searching goals")

        const data = await response.json()
        setGoals(data || [])
      } catch (error) {
        console.error("Error loading goals:", error)
      }
    }

    getAllGoals()
    setActiveTab(sidebarMenuItems[2].title)
  }, [token])

  function goToCreateGoal() {
    navigate("/create-goal")
  }

  function goToEditGoal(id) {
    navigate(`/edit-goal/${id}`)
  }

  function openDeleteDialog(id) {
    setSelectedGoalIdToDelete(id)
  }

  function closeDeleteDialog() {
    setSelectedGoalIdToDelete(null)
  }

  async function confirmDeleteGoal() {
    if (!selectedGoalIdToDelete) return
    try {
      await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/goals/${selectedGoalIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })

      removeGoal(selectedGoalIdToDelete)
    } catch (err) {
      console.error("Error removing goal", err)
    } finally {
      closeDeleteDialog()
    }
  }

  return {
    goals,
    goToCreateGoal,
    goToEditGoal,
    confirmDeleteGoal,
    selectedGoalIdToDelete,
    openDeleteDialog,
    closeDeleteDialog,
  }
}
