import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useLogin from "./useLogin"
import loginImage from "@/ui/assets/login-image.svg"

export default function Login() {
   const { errors, goToSignup, setFormsField, submitLogin, goToForgotPassword } = useLogin()
   return (
    <div className="flex items-center justify-between p-8 gap-16">
      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col text-center items-center">
          <h1 className="font-bold text-2xl">
            Bem vindo de 
            <span className="text-main-green"> volta!</span>
          </h1>
          <p className="text-backgroud-dark-gray text-base font-semibold">Estamos felizes que você voltou!</p>
        </div>
          
        <form onSubmit={(event) => submitLogin(event)}>
          <div className="flex flex-col gap-4 pb-6">
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
          </div>
  
          <Button 
            type="submit"
            className="w-full"
          >
            Login
          </Button>
        </form>
          
        <p className="text-base text-center">
          Não possui conta?
          <Button
            variant="link"
            onClick={() => goToSignup()}
          >
            Cadastre-se aqui!
          </Button>
        </p>
      </section>

      <section className="w-full hidden md:flex items-center justify-center bg-main-green/10 p-16 rounded-2xl">
        <img
          src={loginImage}
          alt="Ilustração"
          className="w-2/3"
        />
      </section>
    </div>
  )
}
