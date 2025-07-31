import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export default function GoalCard({ 
    title, 
    finalDate, 
    percentage, 
    moneyToCollect, 
    moneyCollected,
    goToEditGoal, 
    openDeleteDialog,
    goalId,
}) {
    return (
        <div
            className="bg-zinc-100 rounded-xl shadow p-4 w-full sm:w-[300px] flex flex-col gap-2"
        >
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <h3 className="text-lg font-bold">{title}</h3>
                  <span className="text-sm text-zinc-600">Até {finalDate}</span>
                </div>
                {percentage == 100 ? (
                  <span className="text-sm font-bold text-green-500">Meta concluída!</span>
                ) : (
                <span className="text-sm font-bold text-green-500">{percentage}%</span>
            </div>

            <div className="w-full mt-2">
                <p className="text-sm">
                  <span className="text-green-600 font-medium">
                    R$ {moneyCollected.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>{" "}
                  concluídos
                </p>

                <Progress value={percentage} />

                <p className="text-right text-sm mt-1">
                  de{" "}
                  <span className="font-bold">
                    R$ {moneyToCollect.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                  </span>
                </p>
            </div>

            <div className="flex justify-between items-center mt-2">
                <Button variant="outline" onClick={() => goToEditGoal(goalId)}>
                  Editar
                </Button>
                <Button variant="destructive" onClick={() => openDeleteDialog(goalId)}>
                  Excluir
                </Button>
            </div>
        </div>
    )
}