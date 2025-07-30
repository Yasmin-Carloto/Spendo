import { useState, useEffect } from "react"
import { useNavigate, useParams  } from "react-router"
import { useAuthorization } from "@/contexts/authorization.context"
import { useCategoryStore } from "@/ui/stores/categories.store"

export default function useCategoryForm() {
  const [errors, setErrors] = useState({})
  const [categoryFormFields, setCategoryFormFields] = useState({
    name: "",
    color: "",
  })
  
  const { addCategory, updateCategory } = useCategoryStore()
  const { token } = useAuthorization()
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    async function initForm() {
      if (id) {
        try {
          const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/categories/${id}`, {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
          })

          if (!response.ok) throw new Error("Error loading category")

          const category = await response.json()
          setCategoryFormFields({
            name: category.name,
            color: category.color,
          })
        } catch (err) {
          console.error("Error loading category:", err)
        }
      }
    }

    initForm()
  }, [id, token])

  async function submitNewCategory(event) {
    event.preventDefault()
    const allErrors = verifyErrors()

    if (Object.keys(allErrors).length === 0) {
      try {
        const endpoint = `${import.meta.env.VITE_SPENDO_API_URL_BASE}/categories`
        const url = id ? `${endpoint}/${id}` : endpoint
        const method = id ? "PUT" : "POST"

        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(categoryFormFields),
        })

        if (!response.ok) throw new Error("Error saving category")

        const data = await response.json()
        if (id) {
          updateCategory(data)
        } else {
          addCategory(data)
        }

        if (!Array.isArray(data)) {
          setErrors({})
          navigate(-1, {
            fallback: '/'
          })
        }
      } catch (error) {
        throw new Error(error)
      }
    } else {
      setErrors(allErrors)
    }
  }

  function setFormsField(event) {
    const { name, value } = event.target

    setCategoryFormFields((prevValue) => ({
      ...prevValue,
      [name]: value,
    }))
  }

  function verifyErrors() {
    const allErrors = {}

    if (!categoryFormFields.name) {
      allErrors.name = "O campo nome é obrigatório!"
    } else if (categoryFormFields.name.length < 3) {
      allErrors.name = "O campo nome deve ter pelo menos 3 letras."
    }

    if (categoryFormFields.color == "#000000") {
      allErrors.color = "Campo cor não pode ser #000000 (preto)."
    } else if (!/^#[0-9a-fA-F]{6}$/.test(categoryFormFields.color)) {
      allErrors.color = "Campo cor está inválido!"
    }

    return allErrors
  }

  return {
    errors,
    setFormsField,
    submitNewCategory,
    categoryFormFields,
  }
}
