import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface CommonState {
  isCollapseSidebar: boolean
  setIsCollapseSidebar: (collapse: boolean) => void
}

export const useCommonStore = create<CommonState>()(
  devtools<CommonState>(set => ({
    isCollapseSidebar: true,
    setIsCollapseSidebar: (collapse: boolean) => set({ isCollapseSidebar: collapse }),
  })),
)
