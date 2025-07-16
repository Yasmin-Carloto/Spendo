import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuthorization } from "../../../contexts/authorization.context"

export function useLogin() {
    const [errors, setErrors] = useState({})
    const [loginFields, setLoginFields] = useState({
        email: "",
        password: "",
    })
    let navigate = useNavigate()
    const { saveToken } = useAuthorization()

    function goToSignup() {
        navigate("/signup")
    }

    function goToForgotPassword() {
        navigate("/forgot-password")
    }

    function setFormsField(event) {
        const { name, value } = event.target

        setLoginFields(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    async function submitLogin(event) {
        event.preventDefault()
        const allErrors = verifyErrors()

        if(Object.keys(allErrors).length == 0) {

            try {
                const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/users/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginFields)   
                })

                const data = await response.json()

                if(!response.ok) {
                    if(data[0] == 'User not registered!') {
                        allErrors.user = "Usuário não está cadastrado!"
                    } else {
                        allErrors.user = "Os dados desse usuário estão inválidos!"
                    }
                    setErrors(allErrors)
                    throw new Error("Erro ao fazer o login!")
                }

                saveToken(data.token)
                setErrors({})
                navigate("/")
            } catch (error) {
                console.error(error)
            }

        } else {
            setErrors(allErrors)
        }
    }

    function verifyErrors() {
        const allErrors = {}

        if(!loginFields.email) {
            allErrors.email = "O campo email é obrigatório!"
        } else if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(loginFields.email)) {
            allErrors.email = "Este email é inválido!"
        }

        if(!loginFields.password) {
            allErrors.password = "O campo senha é obrigatório!"
        } else if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/.test(loginFields.password)) {
            allErrors.password = "O campo senha deve ter pelo menos 6 caractéres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo."
        }

        return allErrors
    }

    return {
        errors,
        goToSignup,
        setFormsField,
        submitLogin,
        goToForgotPassword
    }
}