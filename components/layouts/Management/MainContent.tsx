'use client';
import { useCommonStore } from "@/stores/useCommonStore";

export default function MainContent({ children }: { children: React.ReactNode }) {
    const { isopenDrawer } = useCommonStore();

    return (
        <main className={`flex-1 flex flex-col transition-all duration-300 bg-[#D9D9D9] p-4 ${isopenDrawer ? 'ml-64' : 'ml-14'}`}>
            {children}
        </main>
    )
}