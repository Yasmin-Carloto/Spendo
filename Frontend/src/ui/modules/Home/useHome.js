import { useEffect, useState } from "react"
import { useTransactionStore } from "@/ui/stores/transactions.store"
import { useGoalStore } from "@/ui/stores/goals.store"
import { useAuthorization } from "@/contexts/authorization.context"

const MONTH_NAMES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
]

export default function useHome() {
  const { token } = useAuthorization()
  const { transactions, setTransactions } = useTransactionStore()
  const { goals, setGoals } = useGoalStore()

  const [chartData, setChartData] = useState([])
  const [totalIncome, setTotalIncome] = useState(0)
  const [totalExpense, setTotalExpense] = useState(0)
  const [totalBalance, setTotalBalance] = useState(0)

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/transactions`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) throw new Error("Erro ao buscar transações")

        const data = await response.json()
        setTransactions(data.transactions || [])
      } catch (err) {
        console.error("Erro ao carregar transações:", err)
      }
    }

    async function fetchGoals() {
      try {
        const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/goals`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        if (!response.ok) throw new Error("Erro ao buscar metas")

        const data = await response.json()
        setGoals(data || [])
      } catch (err) {
        console.error("Erro ao carregar metas:", err)
      }
    }

    if (!transactions || transactions.length === 0) {
      fetchTransactions()
    } else {
      generateChart(transactions)
      calculateMonthlyTotals(transactions)
    }

    if (!goals || goals.length === 0) {
      fetchGoals()
    }
  }, [transactions, token])

  function generateChart(transactions) {
    const summary = {}
    const currentYear = new Date().getFullYear()

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const year = date.getFullYear()
      if (year !== currentYear) return

      const month = MONTH_NAMES[date.getMonth()]

      if (!summary[month]) {
        summary[month] = { month, income: 0, expense: 0 }
      }

      if (transaction.type === "income") {
        summary[month].income += Number(transaction.value)
      } else if (transaction.type === "expense") {
        summary[month].expense += Number(transaction.value)
      }
    })

    const orderedChartData = MONTH_NAMES
      .filter((month) => summary[month])
      .map((month) => summary[month])

    setChartData(orderedChartData)
  }

  function calculateMonthlyTotals(transactions) {
    const now = new Date()
    const currentMonth = now.getMonth()
    const currentYear = now.getFullYear()

    let income = 0
    let expense = 0

    transactions.forEach((transaction) => {
      const date = new Date(transaction.date)
      const isCurrentMonth = date.getMonth() === currentMonth && date.getFullYear() === currentYear

      if (isCurrentMonth) {
        const value = Number(transaction.value)
        if (transaction.type === "income") income += value
        else if (transaction.type === "expense") expense += value
      }
    })

    setTotalIncome(income)
    setTotalExpense(expense)
    setTotalBalance(income - expense)
  }

  return {
    chartData,
    totalIncome,
    totalExpense,
    totalBalance,
    goals,
  }
}
