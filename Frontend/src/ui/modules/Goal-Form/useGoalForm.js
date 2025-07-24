import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router"
import { useAuthorization } from "../../../contexts/authorization.context"

export default function useGoalForm() {
    const [errors, setErrors] = useState({})
    const [, setIsLoading] = useState(true)

    const [goalsFormFields, setGoalsFormFields] = useState({
        title: "",
        beginDate: "",
        finalDate: "",
        moneyToCollect: 0,
        moneyCollected: 0
    })
    const { token } = useAuthorization()
    let navigate = useNavigate()
    const { id } = useParams()

    const today = new Date()
    const minFinalDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
                        .toISOString()
                        .split("T")[0]

    useEffect(() => {
        async function initForm() {
            if (id) {
                try {
                    const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/goals/${id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`
                        },
                    })
                    if (!response.ok) throw new Error("Error searching goal")

                    const goal = await response.json()

                    setGoalsFormFields({
                        title: goal.title,
                        beginDate: goal.beginDate,
                        finalDate: goal.finalDate,
                        moneyToCollect: Number(goal.moneyToCollect),
                        moneyCollected: Number(goal.moneyCollected)
                    })
                } catch (err) {
                    console.error("Error loading goal:", err)
                }
            } else {
                setGoalsFormFields((prev) => ({
                    ...prev,
                    beginDate: today.toISOString().split("T")[0],
                    moneyCollected: 0,
                }))
            }

            setIsLoading(false)
        }
        initForm()
    }, [id, token])

    async function submitNewGoal(event) {
        event.preventDefault()
        const allErrors = verifyErrors()

        if (Object.keys(allErrors).length == 0) {
            const endpoint = `${import.meta.env.VITE_SPENDO_API_URL_BASE}/goals`
            const url = id ? `${endpoint}/${id}` : endpoint
            const method = id ? "PUT" : "POST"

            try {
                const response = await fetch(url, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(goalsFormFields),
                })

                if (!response.ok) throw new Error("Error saving goal")

                navigate("/goals")
            } catch (err) {
                console.error(err)
            }
        } else {
            setErrors(allErrors)
        }
    }

    function setFormsField(event) {
        const { name, value } = event.target

        setGoalsFormFields(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function verifyErrors() {
        const allErrors = {}

        if(!goalsFormFields.title) {
            allErrors.title = "O campo titulo é obrigatório!"
        } else if(goalsFormFields.title.length < 3) {
            allErrors.title = "O campo titulo deve ter pelo menos 3 letras."
        }

        if(goalsFormFields.moneyToCollect <= 0) {
            allErrors.moneyToCollect = "Campo valor a arrecadar não pode estar vazio."
        }

        if (!goalsFormFields.finalDate) {
            allErrors.finalDate = "Data final é obrigatória."
        } else if (goalsFormFields.finalDate < minFinalDate) {
            allErrors.finalDate = "A data final deve ser pelo menos 7 dias após hoje."
        }

        if (!goalsFormFields.moneyToCollect || Number(goalsFormFields.moneyToCollect) <= 0) {
            allErrors.moneyToCollect = "Informe um valor a arrecadar válido."
        }

        if (
            goalsFormFields.moneyCollected &&
            Number(goalsFormFields.moneyCollected) > Number(goalsFormFields.moneyToCollect)
        ) {
            allErrors.moneyCollected = "O valor arrecadado não pode ser maior que o valor a arrecadar."
        }
        
        return allErrors
    }

    return {
        errors,
        minFinalDate,
        setFormsField,
        submitNewGoal,
        goalsFormFields
    }
}