import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import useCategoryForm from "./useCategoryForm"

export default function CategoryForm({ id, onClose }) {
  const { errors, setFormsField, submitNewCategory, categoryFormFields } = useCategoryForm(id, onClose)

  return (
    <div>
      <h2 className="text-xl font-bold text-main-green">Nova Categoria</h2>

      <form className="space-y-6">
        <div className="flex flex-col gap-4 items-end my-8">
          <div className="w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-title-1 text-base">Título</Label>
              <Input
                type="text"
                name="name"
                placeholder="Ex. Lazer"
                className="w-full"
                onChange={(event) => setFormsField(event)}
                value={categoryFormFields.name}
              />
            </div>
            {errors.name &&                     
              <p className="text-sm text-destructive py-1">{errors.name}</p>
            }
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-title-1 text-base">Cor</Label>
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
      </form>

      <div className="flex justify-between gap-6">
        <Button
          type="submit"
          onClick={(event) => submitNewCategory(event)}
        >
          Salvar
        </Button>
        <Button
          variant="outline"
          onClick={onClose}
        >
          Cancelar
        </Button>
      </div>
    </div>
  )
}
