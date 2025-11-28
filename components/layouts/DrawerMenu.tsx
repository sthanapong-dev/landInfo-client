'use client'

import { useEffect, useRef } from 'react'
import { useCommonStore } from '@/stores/useCommonStore'

export default function DrawerMenu() {
    const { isopenDrawer, setisopenDrawer } = useCommonStore()
    const closeButtonRef = useRef<HTMLButtonElement | null>(null)
    const drawerRef = useRef<HTMLDivElement | null>(null)



    useEffect(() => {
        if (isopenDrawer) {
            setTimeout(() => closeButtonRef.current?.focus(), 50)
        }
    }, [isopenDrawer])

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === 'Escape' && isopenDrawer) setisopenDrawer?.()
        }
        window.addEventListener('keydown', onKey)
        return () => window.removeEventListener('keydown', onKey)
    }, [isopenDrawer, setisopenDrawer])

    if (typeof isopenDrawer === 'undefined' || typeof setisopenDrawer === 'undefined') return null

    return (
        <div className="fixed inset-0 z-50 pointer-events-none">
            <div
                onClick={() => setisopenDrawer()}
                aria-hidden={!isopenDrawer}
                className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
                    isopenDrawer ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                }`}
            />

            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-hidden={!isopenDrawer}
                className={`fixed top-0 left-0 h-full w-64 max-w-[80vw] bg-white text-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out pointer-events-auto ${
                    isopenDrawer ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="font-medium">เมนู</h2>
                    <button
                        ref={closeButtonRef}
                        onClick={() => setisopenDrawer()}
                        aria-label="Close menu"
                        className="rounded px-2 py-1 hover:bg-gray-100 focus:outline-none focus:ring"
                    >
                        ✕
                    </button>
                </div>

                <div className="p-4">
                    <nav className="flex flex-col gap-2">
                        <a href="#" className="px-2 py-2 rounded hover:bg-gray-100">แผนที่</a>
                     
                    </nav>
                </div>
            </div>
        </div>
    )
}