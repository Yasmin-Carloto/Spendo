import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useSignup from "./useSignup"
import signupImage from "@/ui/assets/signup-image.svg"

export default function SignUp() {
  const { errors, goToLogin, setFormsField, submitSignup } = useSignup()
  
  return (
    <div className="flex items-center justify-between p-8 gap-16">
      <section className="w-full flex flex-col gap-6">
        <div className="flex flex-col text-center items-center">
          <h1 className="font-bold text-2xl">
            Bem vindo ao
            <span className="text-main-green"> Spendo!</span>
          </h1>
          <p className="text-backgroud-dark-gray text-base font-semibold">
            Simplifique a sua vida financeira com o uso do 
            <span className="text-main-green"> Spendo! </span>
            Comece agora, gratuitamente.
          </p>
        </div>
            
        <form onSubmit={(event) => submitSignup(event)}>
          <div className="flex flex-col gap-4 pb-12">
            <div>
              <Input
                onChange={(event) => setFormsField(event)} 
                placeholder="Nome"
                type="text"
                name="name"
              />
              {errors.name &&                     
                <p className="text-sm text-destructive py-1">{errors.name}</p>
              }
            </div>
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
            <div>
              <Input
                onChange={(event) => setFormsField(event)} 
                placeholder="Confirmação de senha"
                type="password"
                name="passwordConfirmation"
              />
              {errors.passwordConfirmation &&                     
                <p className="text-sm text-destructive py-1">{errors.passwordConfirmation}</p>
              }
            </div>
          </div>

          <Button 
            type="submit"
            className="w-full"
          >
            Cadastrar-se
          </Button>
        </form>

        <p className="text-base text-center">
          Já possui conta?
          <Button
            variant="link"
            onClick={() => goToLogin()}
          >
            Faça login aqui!
          </Button>
        </p>
      </section>

      <section className="w-full hidden md:flex items-center justify-center bg-main-green/10 p-16 rounded-2xl">
        <img
          src={signupImage}
          alt="Ilustração"
          className="w-2/3"
        />
      </section>
    </div>
  )
}
