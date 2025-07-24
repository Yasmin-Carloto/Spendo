import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import useCategoryForm from "./useCategoryForm"

export default function CategoryForm() {
  const { errors, setFormsField, submitNewCategory, categoryFormFields } = useCategoryForm()

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-main-green">Nova Categoria</h2>

      <form className="space-y-6" onSubmit={(event) => submitNewCategory(event)}>
        <div className="flex flex-col gap-4 items-end my-8">
          <div className="w-full">
            <Input
              type="text"
              name="name"
              placeholder="Nome"
              className="w-full"
              onChange={(event) => setFormsField(event)}
              value={categoryFormFields.name}
            />
            {errors.name &&                     
              <p className="text-sm text-destructive py-1">{errors.name}</p>
            }
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-gray-700">Cor</Label>
              <Input
                type="color"
                name="color"
                onChange={(event) => setFormsField(event)}
                value={categoryFormFields.color}
              />
            </div>
            {errors.color &&                     
              <p className="text-sm text-destructive py-1">{errors.color}</p>
            }
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            className="bg-main-green text-white px-8 py-2 rounded-full hover:bg-accent-green transition"
          >
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}
