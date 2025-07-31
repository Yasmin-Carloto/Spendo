import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { useAuthorization } from "@/contexts/authorization.context"
import { useCategoryStore } from "@/ui/stores/categories.store"
import { useTransactionStore } from "@/ui/stores/transactions.store"
import sidebarMenuItems from "@/ui/utils/sidebar-items"
import { useSidebarStore } from "@/ui/stores/side-bar.store"

export default function useTransactions() {
  const [years, setYears] = useState([])
  const [months, setMonths] = useState([])

  const [selectedMonth, setSelectedMonth] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedType, setSelectedType] = useState("")
  const [selectedTransactionIdToDelete, setSelectedTransactionIdToDelete] = useState(null)

  const navigate = useNavigate()
  const { token } = useAuthorization()

  const { categories, setCategories } = useCategoryStore()
  const { transactions, setTransactions, removeTransaction } = useTransactionStore()
  const setActiveTab = useSidebarStore((state) => state.setActiveTab)

  const transactionTypes = [
    { id: 1, type: "expense" },
    { id: 2, type: "income" },
  ]

  useEffect(() => {
    async function getAllTransactions() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/transactions`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Error searching transactions.")

        const data = await response.json()
        const sorted = data.transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        setTransactions(sorted)
      } catch (error) {
        console.error("Error loading transactions:", error)
      }
    }

    async function getAllCategories() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        })

        if (!response.ok) throw new Error("Error searching categories.")

        const data = await response.json()
        setCategories(data)
      } catch (error) {
        console.error("Error loading categories:", error)
      }
    }

    getAllTransactions()

    if (categories.length === 0) {
      getAllCategories()
    }
    setActiveTab(sidebarMenuItems[1].title)
  }, [token])

  useEffect(() => {
    if (transactions.length > 0) {
      extractAllMonths()
      extractAllYears()
    }
  }, [transactions])

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const [year, month, day] = transaction.date.split("-")
      const date = new Date(Date.UTC(year, month - 1, day, 12))
  
      const matchesMonth = selectedMonth
        ? date.toLocaleString("pt-BR", { month: "long" }).toLowerCase() === selectedMonth.toLowerCase()
        : true
  
      const matchesYear = selectedYear
        ? year === selectedYear
        : true
  
      const matchesType = selectedType
        ? transaction.type === selectedType
        : true
  
      const category = getCategoryById(transaction.categoryId)
      const matchesCategory = selectedCategory
        ? category?.name === selectedCategory
        : true
  
      return matchesMonth && matchesYear && matchesType && matchesCategory
    })
  }, [transactions, selectedMonth, selectedYear, selectedType, selectedCategory])  

  function getCategoryById(id) {
    return categories.find(category => String(category.id) === String(id))
  }

  function goToAddNewTransaction() {
    navigate("/create-transaction")
  }

  function goToEditTransaction(id) {
    navigate(`/edit-transaction/${id}`)
  }

  function openDeleteDialog(id) {
    setSelectedTransactionIdToDelete(id)
  }

  function closeDeleteDialog() {
    setSelectedTransactionIdToDelete(null)
  }

  function cleanFilters() {
    setSelectedCategory("")
    setSelectedMonth("")
    setSelectedType("")
    setSelectedYear("")
  }

  async function confirmDeleteTransaction() {
    if (!selectedTransactionIdToDelete) return

    try {
      await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/transactions/${selectedTransactionIdToDelete}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })

      removeTransaction(selectedTransactionIdToDelete)
    } catch (error) {
      console.error("Erro ao excluir transação:", error)
    } finally {
      closeDeleteDialog()
    }
  }

  function extractAllMonths() {
    const monthSet = new Set()
  
    transactions.forEach((transaction) => {
      const [year, month, day] = transaction.date.split("-")
      const date = new Date(Date.UTC(year, month - 1, day, 12))
      const monthName = date.toLocaleString("pt-BR", { month: "long" })
      const capitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1)
      monthSet.add(capitalized)
    })
  
    const allMonths = Array.from(monthSet).sort((a, b) => {
      const dateA = new Date(`01 ${a} 2000`)
      const dateB = new Date(`01 ${b} 2000`)
      return dateA - dateB
    })
  
    setMonths(allMonths)
  }

  function extractAllYears() {
    const yearsSet = new Set()

    transactions.forEach((transaction) => {
      const [year] = transaction.date.split("-")
      yearsSet.add(year)
    })

    const allYears = Array.from(yearsSet).sort((a, b) => Number(b) - Number(a))
    setYears(allYears)
  }

  return {
    goToAddNewTransaction,
    categories,
    transactionTypes,
    getCategoryById,
    goToEditTransaction,
    openDeleteDialog,
    closeDeleteDialog,
    confirmDeleteTransaction,
    selectedTransactionIdToDelete,
    years,
    months,
    filteredTransactions,
    selectedMonth, setSelectedMonth,
    selectedYear, setSelectedYear,
    selectedCategory, setSelectedCategory,
    selectedType, setSelectedType,
    cleanFilters,
  }
}
