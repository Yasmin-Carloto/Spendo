import { Button } from "@/components/ui/button"
import useGoals from "./useGoals"
import GoalCard from "./components/goal-card/goal-card"
import ConfirmationDialog from "@/ui/components/confirmation-dialog/ConfirmationDialog"
import EmptyState from "@/ui/components/empty-state/empty-state"
import formatToBRL from "@/ui/utils/money-formatter"
import formatDate from "@/ui/utils/date-formatter"

export default function Goals() {
  const { goToCreateGoal, confirmDeleteGoal, goToEditGoal, goals, closeDeleteDialog, openDeleteDialog, selectedGoalIdToDelete } = useGoals()
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-main-green">Metas</h2>
        <Button onClick={() => goToCreateGoal()}>
            + Adicionar nova meta
        </Button>
      </div>

      <div className={`flex flex-wrap gap-6 ${goals.length <= 0 && "justify-center items-center"}`}>
        {goals.length <= 0 ? (
           <EmptyState 
              text="Você ainda não adicionou metas!" 
              to="/create-goal" 
              buttonText="Adicionar nova  meta"
          />
        ) : (
          goals.map((goal) => {
            const percentage = Math.floor((goal.moneyCollected / goal.moneyToCollect) * 100)
            const formattedCollected = formatToBRL(goal.moneyCollected)
            const formattedTotal = formatToBRL(goal.moneyToCollect)
            const missing = formatToBRL((goal.moneyToCollect - goal.moneyCollected))
            const daysLeft = Math.ceil((new Date(goal.finalDate) - new Date()) / (1000 * 60 * 60 * 24))
            const goalDate = formatDate(goal.finalDate)

            return (
              <GoalCard 
                finalDate={goalDate}
                goToEditGoal={goToEditGoal}
                goalId={goal.id}
                moneyToCollect={formattedTotal}
                moneyCollected={formattedCollected}
                openDeleteDialog={openDeleteDialog}
                percentage={percentage}
                title={goal.title}
                key={goal.id}
                missing={missing}
                daysLeft={daysLeft}
              />
            )
          })
        )}
      </div>

      <ConfirmationDialog 
        closeDeleteDialog={closeDeleteDialog}
        confirmDelete={confirmDeleteGoal}
        dialogDescription="Essa ação não poderá ser desfeita. A meta será removida permanentemente."
        dialogTitle="Tem certeza que deseja excluir esta meta?"
        selectedItemIdToDelete={selectedGoalIdToDelete}
      />
    </div>
  )
}
