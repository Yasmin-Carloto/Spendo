import { Button } from "@/components/ui/button"
import useGoals from "./useGoals"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog"
import GoalCard from "./components/goal-card/goal-card"

export default function Goals() {
  const { goToCreateGoal, confirmDeleteGoal, goToEditGoal, goals, closeDeleteDialog, openDeleteDialog, selectedGoalIdToDelete } = useGoals()
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-main-green">Metas</h2>
        <Button onClick={() => goToCreateGoal()}>
            Adicionar nova meta
        </Button>
      </div>

      <div className="flex flex-wrap gap-6">
        {goals.map((goal) => {
          const percentage = Math.floor((goal.moneyCollected / goal.moneyToCollect) * 100)

          return (
            // <div
            //   key={goal.id}
            //   className="bg-zinc-100 rounded-xl shadow p-4 w-full sm:w-[300px] flex flex-col gap-2"
            // >
            //   <div className="flex justify-between items-start">
            //     <div className="flex flex-col">
            //       <h3 className="text-lg font-bold">{goal.title}</h3>
            //       <span className="text-sm text-zinc-600">Até {goal.finalDate}</span>
            //     </div>
            //     <span className="text-sm font-bold text-green-500">{percentage}%</span>
            //   </div>

            //   <div className="w-full mt-2">
            //     <p className="text-sm">
            //       <span className="text-green-600 font-medium">
            //         R$ {goal.moneyToCollect.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            //       </span>{" "}
            //       concluídos
            //     </p>

            //     <Progress value={percentage} />

            //     <p className="text-right text-sm mt-1">
            //       de{" "}
            //       <span className="font-bold">
            //         R$ {goal.moneyToCollect.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            //       </span>
            //     </p>
            //   </div>

            //   <div className="flex justify-between items-center mt-2">
            //     <Button variant="outline" onClick={() => goToEditGoal(goal.id)}>
            //       Editar
            //     </Button>
            //     <Button variant="destructive" onClick={() => openDeleteDialog(goal.id)}>
            //       Excluir
            //     </Button>
            //   </div>
            // </div>
            <GoalCard 
                finalDate={goal.finalDate}
                goToEditGoal={goToEditGoal}
                goalId={goal.id}
                moneyToCollect={goal.moneyToCollect}
                openDeleteDialog={openDeleteDialog}
                percentage={percentage}
                title={goal.title}
                key={goal.id}
            />
          )
        })}
      </div>

      <Dialog open={selectedGoalIdToDelete !== null} onOpenChange={closeDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tem certeza que deseja excluir esta meta?</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Essa ação não poderá ser desfeita. A meta será removida permanentemente.
          </DialogDescription>
          <DialogFooter className="flex gap-2 justify-end">
            <Button variant="outline" onClick={closeDeleteDialog}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={confirmDeleteGoal}>
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
