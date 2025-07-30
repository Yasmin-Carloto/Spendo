import { create } from "zustand"

export const useGoalStore = create((set) => ({
  goals: [],

  setGoals: (goals) => set({ goals }),

  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),

  updateGoal: (updatedGoal) =>
    set((state) => ({
      goals: state.goals.map((goal) =>
        goal.id === updatedGoal.id ? updatedGoal : goal
      ),
    })),

  removeGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((goal) => goal.id !== id),
    })),
}))
