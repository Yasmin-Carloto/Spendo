import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Pencil, Trash2, Calendar } from "lucide-react"

export default function GoalCard({ 
  title, 
  finalDate, 
  percentage, 
  moneyToCollect,
  moneyCollected,
  goToEditGoal, 
  openDeleteDialog,
  goalId,
  missing,
  daysLeft, 
}) {
  
  return (
    <div
      className={`rounded-xl shadow p-4 w-full sm:w-[300px] flex flex-col gap-3 border 
      ${percentage === 100 ? "bg-green-50 border-green-300" : "bg-white border-zinc-200"}`}
    >
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h3 className="text-lg font-bold text-title-1">{title}</h3>
          <span className="flex items-center gap-1 text-xs text-subtitle-2">
            <Calendar className="w-3 h-3" />
            Até {finalDate} {daysLeft > 0 && `(faltam ${daysLeft} dias)`}
          </span>
        </div>
        {percentage === 100 ? (
          <CheckCircle className="text-main-green/90 w-5 h-5" />
        ) : (
          <span className="text-sm font-bold text-main-green">{percentage}%</span>
        )}
      </div>

      <div className="space-y-1">
        <p className="text-sm text-subtitle-1">
          <span className="font-medium text-main-green">R$ {moneyCollected}</span> de{" "}
          <span className="font-semibold">R$ {moneyToCollect}</span>
        </p>
        <Progress value={percentage} />
        {percentage < 100 && (
          <p className="text-xs text-subtitle-2 text-right">Faltam R${missing}</p>
        )}
      </div>

      <div className="flex justify-between items-center">
        <Button variant="outline" onClick={() => goToEditGoal(goalId)}>
          <Pencil className="w-4 h-4 mr-1" /> 
          Editar
        </Button>
        <Button variant="destructive" onClick={() => openDeleteDialog(goalId)}>
          <Trash2 className="w-4 h-4 mr-1" /> 
          Excluir
        </Button>
      </div>
    </div>
  )
}
