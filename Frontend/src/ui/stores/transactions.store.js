import { create } from "zustand"

export const useTransactionStore = create((set) => ({
  transactions: [],
  setTransactions: (transactions) => set({ transactions }),
  addTransaction: (transaction) =>
    set((state) => ({
      transactions: [...state.transactions, transaction],
    })),
  updateTransaction: (updated) =>
    set((state) => ({
      transactions: state.transactions.map((transaction) =>
        transaction.id === updated.id ? updated : transaction
      ),
    })),
  removeTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((transaction) => transaction.id !== id),
    })),
}))
