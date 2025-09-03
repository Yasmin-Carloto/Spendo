import { useState } from "react"
import { toast } from "sonner"

export default function useForgotPassword() {
    const [email, setEmail] = useState()
    const [error, setError] = useState({})

    async function submitEmail(event) {
        event.preventDefault()
        const allErrors = verifyErrors()

        if(Object.keys(allErrors).length == 0) {
            try {
                const response = await fetch(`${import.meta.env.VITE_SPENDO_API_URL_BASE}/users/forgot-password`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: email
                    })
                })
                console.log(response)
                if(!response.ok) {
                    throw new Error("User not found.")
                } else {
                    toast.success("Email enviado com sucesso!")
                }

            } catch (error) {
                console.log(error)
                toast.error("Não foi possível enviar email.")
                console.error("Error submiting email:", error)
            }
        } else {
            setError(allErrors)
        }
    }

    function verifyErrors() {
        let allErrors = {}

        if(!email) {
            allErrors.email = "O campo email é obrigatório!"
        } else if(!/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
            allErrors.email = "Este email é inválido!"
        }

        return allErrors
    }

    return {
        setEmail,
        error,
        submitEmail,
    }
}