import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import useGoalForm from "./useGoalForm"

export default function GoalForm() {
  const { errors, minFinalDate, setFormsField, submitNewGoal, goalsFormFields } = useGoalForm()
  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold text-main-green">Nova Meta</h2>

      <form className="space-y-6" onSubmit={(event) => submitNewGoal(event)}>
        <div className="flex flex-col md:flex-row gap-4 items-end md:my-8">
          <div className="w-full">
            <div>
              <Label className="text-gray-700">Título da Meta</Label>
              <Input
                type="text"
                name="title"
                placeholder="Título da Meta"
                className="w-full"
                onChange={(event) => setFormsField(event)}
                value={goalsFormFields.title}
              />
            </div>
            {errors.title &&                     
              <p className="text-sm text-destructive py-1">{errors.title}</p>
            }
          </div>

          <div className="w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label className="text-gray-700">Data Final</Label>
              <Input
                type="date"
                name="finalDate"
                placeholder="Data Final"
                onChange={(event) => setFormsField(event)}
                min={minFinalDate}
                value={goalsFormFields.finalDate}
              />
            </div>
            {errors.finalDate &&                     
              <p className="text-sm text-destructive py-1">{errors.finalDate}</p>
            }
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:my-8">
          <div className="w-full">
            <div className="w-full">
              <Label className="text-gray-700">Valor a arrecadar</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                name="moneyToCollect"
                placeholder="Valor a arrecadar"
                onChange={(event) => setFormsField(event)}
                value={goalsFormFields.moneyToCollect}
              />
            </div>
            {errors.moneyToCollect &&                     
              <p className="text-sm text-destructive py-1">{errors.moneyToCollect}</p>
            }
          </div>

          <div className="w-full">
            <div className="w-full">
              <Label className="text-gray-700">Valor arrecadado</Label>
              <Input
                type="number"
                step="0.01"
                min="0"
                name="moneyCollected"
                placeholder="Valor arrecadado"
                onChange={(event) => setFormsField(event)}
                value={goalsFormFields.moneyCollected}
              />
            </div>
            {errors.moneyCollected &&                     
              <p className="text-sm text-destructive py-1">{errors.moneyCollected}</p>
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
