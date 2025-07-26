import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useAuthorization } from "../../../contexts/authorization.context"

export default function useTransactions() {
    const [transactions, setTransactions] = useState([])
    const [categories, setCategories] = useState([])
    const [years, setYears] = useState([])
    const [months, setMonths] = useState([])

    const navigate = useNavigate()
    const { token } = useAuthorization()

    const transactionTypes = [
        {
            id: 1,
            type: "expense"
        },
        {
            id: 2,
            type: "income"
        }
    ]
    const [selectedTransactionIdToDelete, setSelectedTransactionIdToDelete] = useState(null)


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
                const sortedTransactions = data.transactions.sort((firstDate, secondDate) => {
                    const firstDateObject = new Date(firstDate.date)
                    const secondDateObject = new Date(secondDate.date)
                    return secondDateObject.getTime() - firstDateObject.getTime()
                })
                setTransactions(sortedTransactions)
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

        getAllCategories()
        getAllTransactions()
    }, [token])

    useEffect(() => {
        if (transactions.length > 0) {
            extractAllMonths()
            extractAllYears()
        }
    }, [transactions])

    function formatDate(dateString) {
        if (!dateString) return ""
        const [year, month, day] = dateString.split("-")
        return `${day}/${month}/${year}`
    }

    function getCategoryById(id) {
        const category = categories.find(category => String(category.id) === String(id))
        return category
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

            setTransactions((prev) =>
                prev.filter((transaction) => transaction.id !== selectedTransactionIdToDelete)
            )
        } catch (error) {
            console.error("Erro ao excluir transação:", error)
        } finally {
            closeDeleteDialog()
        }
    }

    function extractAllMonths() {
        const monthSet = new Set()

        transactions.forEach((transaction) => {
            const date = new Date(transaction.date)
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
        transactions,
        categories,
        transactionTypes,
        formatDate,
        getCategoryById,
        goToEditTransaction,
        openDeleteDialog,
        closeDeleteDialog,
        confirmDeleteTransaction,
        selectedTransactionIdToDelete,
        years,
        months,
    }
}