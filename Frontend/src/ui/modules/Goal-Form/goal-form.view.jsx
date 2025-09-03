import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import useGoalForm from "./useGoalForm"
import { CalendarPopover } from "@/ui/components/calendar-popover/calendar-popover"

export default function GoalForm() {
  const { errors, setFormsField, submitNewGoal, goalsFormFields, openCalendar, setOpenCalendar } = useGoalForm()

  return (
    <div className="max-w-2xl mx-auto mt-10 px-4">
      <h2 className="text-3xl font-bold text-main-green mb-4">Nova Meta</h2>

      <div className="flex flex-col shadow-sm">
        <h2 className="bg-main-green/50 p-4 rounded-t-md font-semibold text-lg font-main-text">
          Detalhes da meta
        </h2>

        <form className="space-y-6 p-4" onSubmit={(event) => submitNewGoal(event)}>
          <div className="flex flex-col md:flex-row gap-4 my-8 items-start">
            <div className="w-full">
              <div>
                <Label className="text-title-1 text-base">Título da Meta</Label>
                <Input
                  type="text"
                  name="title"
                  placeholder="Título da Meta"
                  className="w-full"
                  onChange={(event) => setFormsField(event)}
                  value={goalsFormFields.title}
                />
              </div>
              {errors.title && (
                <p className="text-sm text-destructive py-1">{errors.title}</p>
              )}
            </div>

            <div className="w-full">
              <div className="flex flex-col gap-1 w-full">
                <Label className="text-title-1 text-base">Data Final</Label>
                <CalendarPopover
                  open={openCalendar}
                  setOpen={setOpenCalendar}
                  value={goalsFormFields.finalDate}
                  onChange={(date) =>
                    setFormsField({ target: { name: "finalDate", value: date } })
                  }
                  placeholder="Selecionar data"
                />
              </div>
              {errors.finalDate && (
                <p className="text-sm text-destructive py-1">{errors.finalDate}</p>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:my-8 items-start">
            <div className="w-full">
              <div className="w-full">
                <Label className="text-title-1 text-base">Valor a arrecadar</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="moneyToCollect"
                  placeholder="Ex. 42,34"
                  onChange={(event) => setFormsField(event)}
                  value={goalsFormFields.moneyToCollect}
                />
              </div>
              {errors.moneyToCollect && (
                <p className="text-sm text-destructive py-1">{errors.moneyToCollect}</p>
              )}
            </div>

            <div className="w-full">
              <div className="w-full">
                <Label className="text-title-1 text-base">Valor arrecadado</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  name="moneyCollected"
                  placeholder="Ex. 42,78"
                  onChange={(event) => setFormsField(event)}
                  value={goalsFormFields.moneyCollected}
                />
              </div>
              {errors.moneyCollected && (
                <p className="text-sm text-destructive py-1">{errors.moneyCollected}</p>
              )}
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
    </div>
  )
}
