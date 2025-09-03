import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import recoverPasswordImage from "@/ui/assets/recover-password-image.svg"
import useRecoverPassword from "./useRecoverPassword"

export default function RecoverPassword() {
    const { setFormsField, submitNewPassword, validationFields } = useRecoverPassword()

    return (
        <div className="flex items-center justify-between p-8 gap-16">
            <section className="w-full flex flex-col gap-6">
                <div className="flex flex-col text-center items-center">
                  <h1 className="font-bold text-2xl">Recupere sua senha</h1>
                </div>
                  
                <form 
                    onSubmit={(event) => submitNewPassword(event)}
                    className="flex flex-col gap-4 pb-6"
                >
                    <div>
                        <Input
                          onChange={(event) => setFormsField(event)}
                          placeholder="Senha"
                          type="password"
                          name="password"
                        />
                    </div>
                    
                    <div>
                        <Input
                            onChange={(event) => setFormsField(event)} 
                            placeholder="Confirmação de senha"
                            type="password"
                            name="passwordConfirmation"
                        />
                    </div>
          
                  <Button 
                    type="submit"
                    className="w-full"
                  >
                    Enviar
                  </Button>
                </form>

                <ul className="list-disc px-4">
                    <li 
                        className="text-base"
                        style={{ color: `${validationFields.ruleOne ? "#00AD5C" : "#6B7280"}` }}
                    >
                        Deve ter pelo menos 6 caractéres
                    </li>
                    <li 
                        className="text-base"
                        style={{ color: `${validationFields.ruleTwo ? "#00AD5C" : "#6B7280"}` }}
                    >
                        Deve ter pelo menos uma letra maiúscula
                    </li>
                    <li 
                        className="text-base"
                        style={{ color: `${validationFields.ruleThree ? "#00AD5C" : "#6B7280"}` }}
                    >
                        Deve ter pelo menos uma letra minúscula
                    </li>
                    <li 
                        className="text-base"
                        style={{ color: `${validationFields.ruleFour ? "#00AD5C" : "#6B7280"}` }}
                    >
                        Deve ter pelo menos um número
                    </li>
                    <li 
                        className="text-base"
                        style={{ color: `${validationFields.ruleFive ? "#00AD5C" : "#6B7280"}` }}
                    >
                        Deve ter pelo menos um símbolo
                    </li>
                    <li 
                        className="text-base"
                        style={{ color: `${validationFields.ruleSix ? "#00AD5C" : "#6B7280"}` }}
                    >
                        Campos senha e confirmação de senha devem ser iguais
                    </li>
                </ul>
            </section>
        
            <section className="w-full hidden md:flex items-center justify-center bg-main-green/10 p-16 rounded-2xl">
                <img
                  src={recoverPasswordImage}
                  alt="Ilustração"
                  className="w-2/3"
                />
            </section>
        </div>
    )
}