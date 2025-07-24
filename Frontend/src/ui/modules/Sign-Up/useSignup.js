import { useState } from "react"
import { useNavigate } from "react-router"
import { useAuthorization } from "../../../contexts/authorization.context"

export default function useSignup() {
    const [errors, setErrors] = useState({})
    const [signupFields, setSignupFields] = useState({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })
    let navigate = useNavigate()
    const { saveToken } = useAuthorization()

    function goToLogin() {
        navigate("/login")
    }

    async function submitSignup(event) {
        event.preventDefault()
        const allErrors = verifyErrors()

        if(Object.keys(allErrors).length == 0) {

            try {
                const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/users`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: signupFields.name,
                        email: signupFields.email,
                        password: signupFields.password,
                    })
                })

                const data = await response.json()

                if(!response.ok) {
                    if(data[0] == 'User already exists'){
                        allErrors.user = "Usuário já está cadastrado!"
                        setErrors(allErrors)
                    }
                    throw new Error("Erro ao cadastrar!")
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

    function setFormsField(event) {
        const { name, value } = event.target

        setSignupFields(prevValue => ({
            ...prevValue,
            [name]: value
        }))
    }

    function verifyErrors() {
        const allErrors = {}

        if(!signupFields.name) {
            allErrors.name = "O campo nome é obrigatório!"
        } else if(signupFields.name.length < 3) {
            allErrors.name = "O campo nome deve ter pelo menos 3 letras."
        }

        if(!signupFields.email) {
            allErrors.email = "O campo email é obrigatório!"
        } else if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(signupFields.email)) {
            allErrors.email = "Este email é inválido!"
        }

        if(!signupFields.password) {
            allErrors.password = "O campo senha é obrigatório!"
        } else if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^A-Za-z0-9]).{6,}$/.test(signupFields.password)) {
            allErrors.password = "O campo senha deve ter pelo menos 6 caractéres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo."
        }

        if(!signupFields.passwordConfirmation) {
            allErrors.passwordConfirmation = "O campo confirmação de senha é obrigatório!"
        } else if(signupFields.passwordConfirmation !== signupFields.password) {
            allErrors.passwordConfirmation = "O campo confirmação de senha deve ser igual ao campo de senha."
        }

        return allErrors
    }

    return {
        errors,
        goToLogin,
        submitSignup,
        setFormsField
    }
}