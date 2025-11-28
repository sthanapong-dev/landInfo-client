import { Bell } from "lucide-react";

export default function Notification() {

    return (
        <div className="relative inline-flex items-center justify-center p-2 rounded-xl 
                hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer">
            <Bell className="w-6 h-6 text-white/90" />

            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] 
                  font-semibold px-1.5 py-0.5 rounded-full shadow-md">
                1
            </span>
        </div>

    )
}