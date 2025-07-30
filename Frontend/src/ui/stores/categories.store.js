import { create } from "zustand"

export const useCategoryStore = create((set) => ({
  categories: [],

  setCategories: (categories) => set({ categories }),

  addCategory: (category) =>
    set((state) => ({
      categories: [...state.categories, category],
    })),

  updateCategory: (updated) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id === updated.id ? updated : category
      ),
    })),

  removeCategory: (id) =>
    set((state) => ({
      categories: state.categories.filter((category) => category.id !== id),
    })),
}))
