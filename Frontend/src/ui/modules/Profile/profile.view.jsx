import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import useProfile from "./useProfile"

export default function Profile() {
  const {
    user,
    updateField,
    updatePhoto,
    handleFileChange,
    handleSubmit,
  } = useProfile()

  return (
    <div className="min-h-screen py-8 px-4 flex items-center justify-center bg-white">
      <div className="w-full max-w-4xl bg-gray-50 rounded-xl shadow-lg p-6 space-y-8">
        <h2 className="text-2xl font-bold text-main-green">Seu perfil</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <label htmlFor="foto" className="cursor-pointer">
                <img
                  src={user.photo}
                  alt="Foto de perfil"
                  className="w-32 h-32 rounded-full object-cover border-4 border-emerald-400 shadow"
                />
              </label>
              <input
                id="photo"
                disabled={true}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 w-full space-y-4">
              <Input
                disabled={true}
                name="name"
                placeholder="Nome do usuário"
                value={user.name}
                onChange={(event) => updateField("name", event.target.value)}
              />
              <Input
                disabled={true}
                name="email"
                type="email"
                placeholder="Email do usuário"
                value={user.email}
                onChange={(event) => updateField("email", event.target.value)}
              />
            </div>
          </div>

          <Button type="submit" className="w-full">
            Salvar
          </Button>
        </form>
      </div>
    </div>
  )
}
