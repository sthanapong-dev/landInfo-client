import { create } from 'zustand'

interface CommonStore {
    isopenDrawer: boolean
    setisopenDrawer: () => void
}

export const useCommonStore = create<CommonStore>((set) => ({
    isopenDrawer: true,
    setisopenDrawer: () =>
        set((state) => ({
            isopenDrawer: !state.isopenDrawer,
        })),
}))