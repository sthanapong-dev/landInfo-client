'use client';

import MapComponent from "@/components/Index/MapComponent";
import Panel from "@/components/Index/PanelComponent";

export default function HomePage() {
    return (
        <>
            <div className="h-screen w-full relative">
                <Panel />
                <MapComponent />
            </div>
        </>
    )
}