import { create } from "zustand"

export const useSidebarStore = create((set) => ({
  activeTab: "Dashboard",
  setActiveTab: (tab) => set({ activeTab: tab }),
}))