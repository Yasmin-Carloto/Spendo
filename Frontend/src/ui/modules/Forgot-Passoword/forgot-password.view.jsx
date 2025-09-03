import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import forgotPasswordImage from "@/ui/assets/forgot-password-image.svg"
import useForgotPassword from "./useForgotPassword"

export default function ForgotPassword() {
  const { error, setEmail, submitEmail } = useForgotPassword()
    return (
      <div className="flex items-center justify-between p-8 gap-16">
        <section className="w-full flex flex-col gap-6">
          <div className="flex flex-col text-center items-center">
            <h1 className="font-bold text-2xl">Esqueceu a senha?</h1>
            <p className="text-backgroud-dark-gray text-base font-semibold">Não se preocupe, você pode recuperar sua conta. Enviaremos um e-mail para você redefinir sua senha.</p>
          </div>
              
          <form 
            onSubmit={(event) => submitEmail(event)}
          >
            <div className="flex flex-col gap-4 pb-6">
              <div>
                <Input 
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email para recuperação"
                  type="email"
                  name="email"
                />
                {error &&                     
                  <p className="text-sm text-destructive py-1">{error.email}</p>
                }
              </div>
            </div>
          
            <Button 
              type="submit"
              className="w-full"
            >
              Enviar
            </Button>
          </form>
        </section>

        <section className="w-full hidden md:flex items-center justify-center bg-main-green/10 p-16 rounded-2xl">
          <img
            src={forgotPasswordImage}
            alt="Ilustração"
            className="w-2/3"
          />
        </section>
      </div>
    )
}