import { useEffect, useState } from "react"
import { useSearchParams, useNavigate } from 'react-router-dom'
import { toast } from "sonner"

export default function useRecoverPassword() {
    const [validationFields, setValidationFields] = useState({
        ruleOne: false,
        ruleTwo: false,
        ruleThree: false,
        ruleFour: false,
        ruleFive: false,
        ruleSix: false
    })
    const [passwordFields, setPasswordFields] = useState({
        password: "",
        passwordConfirmation: ""
    })
    const navigate = useNavigate()
    const [searchParams,] = useSearchParams()
    const token = searchParams.get("token")

    useEffect(() => {
        if(!token) {
            navigate("/login")
        }

        setTimeout(() => {
            navigate("/forgot-password")
            toast.error("Infelizmente o tempo para alterar a senha expirou. Tente novamente!")
        }, "300000")
        validatePassword()
    }, [passwordFields])

    function setFormsField(event) {
        const { name, value } = event.target

        setPasswordFields(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function validatePassword() {
        let hasUpper = false
        let hasLower = false
        let hasNumber = false
        let hasSymbol = false

        for (const char of passwordFields.password) {
            if (char >= "A" && char <= "Z") {
                hasUpper = true
            } else if (char >= "a" && char <= "z") {
                hasLower = true
            } else if (char >= "0" && char <= "9") {
                hasNumber = true
            } else {
                hasSymbol = true
            }
        }

        setValidationFields({
            ruleOne: passwordFields.password.length >= 6,
            ruleTwo: hasUpper,
            ruleThree: hasLower,
            ruleFour: hasNumber,
            ruleFive: hasSymbol,
            ruleSix: passwordFields.password.length > 0 && 
                    passwordFields.passwordConfirmation.length > 0 && 
                    passwordFields.password == passwordFields.passwordConfirmation
        })
    }

    async function submitNewPassword(event) {
        event.preventDefault()
        let isNewPasswordSendable = true

        Object.values(validationFields).forEach((validationField) => {
            if(!validationField) {
                isNewPasswordSendable = false
            }
        })

        if(isNewPasswordSendable) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/users/recover-password`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(passwordFields)
                })

                console.log(response)

                if(!response.ok) {
                    throw new Error("Could not update password.")
                }

                navigate("/login")
                toast.success("Senha atualizada com sucesso!")
            } catch(error) {
                toast.error("Não foi possível atualizar a senha.")
                console.error("Could not update password.", error)
            }
        } else {
            toast.error("Você ainda não completou todos os requisitos da senha!")
        }
    }

    return {
        setFormsField,
        submitNewPassword,
        validationFields,
    }
}