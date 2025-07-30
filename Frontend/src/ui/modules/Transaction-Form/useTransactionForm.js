import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router"
import { useAuthorization } from "@/contexts/authorization.context"
import { useTransactionStore } from "@/ui/stores/transactions.store"
import { useCategoryStore } from "@/ui/stores/categories.store"

export default function useTransactionForm() {
  const [transactionFormFields, setTransactionFormFields] = useState({
    title: "",
    value: "",
    type: "",
    date: "",
    categoryId: null,
  })
  const [errors, setErrors] = useState({})
  const [selectedCategoryIdToDelete, setSelectedCategoryIdToDelete] = useState(null)

  const { token } = useAuthorization()
  const navigate = useNavigate()
  const { id } = useParams()

  const { addTransaction, updateTransaction } = useTransactionStore()
  const { categories, setCategories, removeCategory } = useCategoryStore()

  const transactionTypes = [
    { id: 1, type: "expense" },
    { id: 2, type: "income" },
  ]

  const selectedCategory = categories.find(
    (category) => String(category.id) === String(transactionFormFields.categoryId)
  )

  useEffect(() => {
    async function initForm() {
      if (id) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/transactions/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          })

          if (!response.ok) throw new Error("Error searching transaction")

          const transaction = await response.json()

          setTransactionFormFields({
            title: transaction.title,
            value: transaction.value,
            type: transaction.type,
            date: transaction.date,
            categoryId: transaction.categoryId,
          })
        } catch (err) {
          console.error("Error loading transaction", err)
        }
      }
    }

    initForm()
  }, [id, token])

  useEffect(() => {
    getAllCategories()
  }, [token])

  function goToAddCategory() {
    navigate("/create-category")
  }

  function goToEditCategory(id) {
    navigate(`/edit-category/${id}`)
  }

  async function removeCategoryById(id) {
    try {
      await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      })
      removeCategory(id)
    } catch (error) {
      console.error("Error removing category:", error)
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

  function setFormsField(event) {
    let { name, value } = event.target
    setTransactionFormFields((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  function setSelectField(name, value) {
    setTransactionFormFields((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  async function submitTransaction(event) {
    event.preventDefault()
    const allErrors = verifyErrors()

    if (Object.keys(allErrors).length === 0) {
      try {
        const endpoint = `${import.meta.env.VITE_SPENDO_API_URL_BASE}/transactions`
        const url = id ? `${endpoint}/${id}` : endpoint
        const method = id ? "PUT" : "POST"

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(transactionFormFields),
        })

        if (!response.ok) throw new Error("Error saving transaction")

        const saved = await response.json()

        // Atualiza store
        if (id) {
          updateTransaction(saved)
        } else {
          addTransaction(saved)
        }

        navigate("/transactions")
      } catch (err) {
        console.error("Error saving transaction:", err)
      }
    } else {
      setErrors(allErrors)
    }
  }

  function verifyErrors() {
    const allErrors = {}

    if (!transactionFormFields.title) {
      allErrors.title = "O campo título é obrigatório!"
    } else if (transactionFormFields.title.length < 3) {
      allErrors.title = "O título deve ter pelo menos 3 caracteres."
    }

    if (!transactionFormFields.value) {
      allErrors.value = "O campo valor é obrigatório!"
    } else if (isNaN(transactionFormFields.value) || Number(transactionFormFields.value) <= 0) {
      allErrors.value = "O valor deve ser um número positivo."
    }

    if (!transactionFormFields.type) {
      allErrors.type = "O tipo da transação é obrigatório (entrada ou saída)."
    } else if (!["income", "expense"].includes(transactionFormFields.type)) {
      allErrors.type = "Tipo inválido."
    }

    if (!transactionFormFields.date) {
      allErrors.date = "A data é obrigatória!"
    } else {
      const inputDate = new Date(transactionFormFields.date)
      const now = new Date()
      if (inputDate.toString() === "Invalid Date") {
        allErrors.date = "A data inserida é inválida."
      } else if (inputDate > new Date(now.setFullYear(now.getFullYear() + 1))) {
        allErrors.date = "A data não pode estar tão longe no futuro."
      }
    }

    if (!transactionFormFields.categoryId) {
      allErrors.categoryId = "Selecione uma categoria."
    }

    return allErrors
  }

  return {
    categories,
    goToAddCategory,
    goToEditCategory,
    transactionTypes,
    removeCategory: removeCategoryById,
    setSelectedCategoryIdToDelete,
    selectedCategoryIdToDelete,
    setFormsField,
    setSelectField,
    submitTransaction,
    errors,
    transactionFormFields,
    selectedCategory,
  }
}
