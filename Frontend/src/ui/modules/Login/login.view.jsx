import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useLogin from "./useLogin"
import loginImage from "@/ui/assets/login-image.svg"

export default function Login() {
   const { errors, goToSignup, setFormsField, submitLogin, goToForgotPassword } = useLogin()
   return (
      <div className="py-16 flex items-center justify-center px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="hidden md:flex flex-1 justify-center">
            <img
              src={loginImage}
              alt="Ilustração"
              className="w-1/2"
            />
          </div>
  
          {/* Formulário */}
          <div className="bg-card rounded-lg shadow-md p-8 w-full max-w-md">
            <h2 className="text-lg font-bold text-foreground">Crie sua conta</h2>
            <p className="text-main-green font-black mb-4 text-lg">SPENDO</p>
  
            <form onSubmit={(event) => submitLogin(event)}>
              <section className="flex flex-col gap-4 pb-6">
                  <div>
                      <Input 
                          onChange={(event) => setFormsField(event)}
                          placeholder="Email"
                          type="email"
                          name="email"
                      />
                      {errors.email &&                     
                          <p className="text-sm text-destructive py-1">{errors.email}</p>
                      }
                  </div>
  
                  <div>
                      <div>
                        <Input
                          onChange={(event) => setFormsField(event)}
                          placeholder="Senha"
                          type="password"
                          name="password"
                        />

                        {errors.password &&                     
                          <p className="text-sm text-destructive py-1">{errors.password}</p>
                        }
                      </div>
                        <Button
                          variant="link"
                          className="w-full self-end justify-end"
                          onClick={() => goToForgotPassword()}
                        >
                          Esqueceu a senha?
                        </Button>
                  </div>

                  {errors.user &&                     
                    <p className="text-sm text-destructive py-1">{errors.user}</p>
                  }
              </section>
  
              <Button 
                  type="submit"
                  className="w-full"
              >
                Login
              </Button>
            </form>
  
            <p className="text-sm text-center p-2">
              Não possui conta?
              <Button
                variant="link"
                onClick={() => goToSignup()}
              >
                Cadastre-se aqui!
              </Button>
            </p>
          </div>
        </div>
      </div>
    )
}
