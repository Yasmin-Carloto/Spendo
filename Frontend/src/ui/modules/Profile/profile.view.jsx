import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import useProfile from "./useProfile"

export default function Profile() {
  const {
    user,
    setFormsField,
    handleSubmit,
  } = useProfile()

  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl bg-gray-50 rounded-xl shadow-lg p-6 space-y-8">
        <h2 className="text-2xl font-bold text-main-green">Seu perfil</h2>

        <div className="flex flex-col shadow-sm">
          <h2 className="bg-main-green/50 p-4 rounded-t-md font-semibold text-lg font-main-text">
            Detalhes da transação
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6 p-4">
            <div className="flex flex-col md:flex-row items-center gap-6 py-2">
              <div className="w-full">
                <Label className="text-title-1 text-base">Nome do usuário</Label>
                <Input
                  name="name"
                  type="text"
                  placeholder="Nome do usuário"
                  value={user.name}
                  onChange={(event) => setFormsField(event)}
                />
              </div>
              <div className="w-full">
                <Label className="text-title-1 text-base">Email do usuário</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="Email do usuário"
                  value={user.email}
                  onChange={(event) => setFormsField(event)}
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Salvar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
