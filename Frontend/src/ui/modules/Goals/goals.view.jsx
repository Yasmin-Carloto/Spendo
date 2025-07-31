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
            <GoalCard 
                finalDate={goal.finalDate}
                goToEditGoal={goToEditGoal}
                goalId={goal.id}
                moneyToCollect={goal.moneyToCollect}
                moneyCollected={goal.moneyCollected}
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
