import { useGoalStore } from "@/ui/stores/goals.store"
import { useCategoryStore } from "@/ui/stores/categories.store"
import { useTransactionStore } from "@/ui/stores/transactions.store"

export default function useEmptyStores() {
    const { setGoals } = useGoalStore()
    const { setTransactions } = useTransactionStore()
    const { setCategories } = useCategoryStore()

    function emptyStores() {
        setGoals([])
        setTransactions([])
        setCategories([])
    }

    return {
        emptyStores,
    }
}