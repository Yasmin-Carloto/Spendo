import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router"
import { useAuthorization } from "@/contexts/authorization.context"
import { useCategoryStore } from "@/ui/stores/categories.store"
import { useTransactionStore } from "@/ui/stores/transactions.store"
import sidebarMenuItems from "@/ui/utils/sidebar-items"
import { useSidebarStore } from "@/ui/stores/side-bar.store"
import { toast } from "sonner"

export default function useTransactions() {
  const [years, setYears] = useState([])

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
  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

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
        const sorted = data.transactions.sort((transactionOne, transactionTwo) => new Date(transactionTwo.date) - new Date(transactionOne.date))
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
  }, [token, selectedTransactionIdToDelete])

  useEffect(() => {
    if (transactions.length > 0) {
      extractAllYears()
    }
  }, [transactions])
  //   return transactions.filter((transaction) => {
  //     const [year, month, day] = transaction.date.split("-")
  //     const date = new Date(Date.UTC(year, month - 1, day, 12))
  
  //     const matchesMonth = selectedMonth
  //       ? date.toLocaleString("pt-BR", { month: "long" }).toLowerCase() === selectedMonth.toLowerCase()
  //       : true
  
  //     const matchesYear = selectedYear
  //       ? year === selectedYear
  //       : true
  
  //     const matchesType = selectedType
  //       ? transaction.type === selectedType
  //       : true
  
  //     const category = getCategoryById(transaction.categoryId)
  //     const matchesCategory = selectedCategory
  //       ? category?.name === selectedCategory
  //       : true
  
  //     return matchesMonth && matchesYear && matchesType && matchesCategory
  //   })
  // }, [transactions, selectedMonth, selectedYear, selectedType, selectedCategory])  

  const filteredTransactions = useMemo(() => {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    const isAnyFilterActive =
      Boolean(selectedMonth) ||
      Boolean(selectedYear) ||
      Boolean(selectedType) ||
      Boolean(selectedCategory)

    const getTransactionDate = (transaction) => {
      if (Array.isArray(transaction)) {
        transaction = transaction[0]
      }
      if (!transaction?.date || typeof transaction.date !== "string") return null
      const [yearStr, monthStr, dayStr] = transaction.date.split("-")
      return new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr), 12))
    }

    return transactions.filter((transaction) => {
      const date = getTransactionDate(transaction)
      if (!date) return false

      const monthMatches = selectedMonth
        ? date.toLocaleString("pt-BR", { month: "long" }).toLowerCase() === selectedMonth.toLowerCase()
        : isAnyFilterActive ? true : date.getUTCMonth() === currentMonth

      const yearMatches = selectedYear
        ? String(date.getUTCFullYear()) === String(selectedYear)
        : isAnyFilterActive ? true : date.getUTCFullYear() === currentYear

      const typeMatches = selectedType
        ? transaction.type === selectedType
        : true

      const category = getCategoryById(transaction.categoryId)
      const categoryMatches = selectedCategory
        ? category?.name === selectedCategory
        : true

      return monthMatches && yearMatches && typeMatches && categoryMatches
    })
  }, [transactions, selectedMonth, selectedYear, selectedType, selectedCategory, categories])

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
      setSelectedTransactionIdToDelete(null)
      toast.success("Transação excluída com sucesso.")
    } catch (error) {
      toast.error("Não foi possível excluir a transação.")
      console.error("Error removing transaction:", error)
    } finally {
      closeDeleteDialog()
    }
  }

  function extractAllYears() {
    const yearsSet = new Set()

    transactions.forEach((transaction) => {
      if (Array.isArray(transaction)) transaction = transaction[0]

      if (!transaction?.date) return

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
