'use client';

import { User as UserIcon , ChevronDown } from "lucide-react";

export default function User() {
    return (
        <div className="select-none inline-flex items-center justify-center gap-1  px-1 py-1 hover:bg-white/10 active:scale-95 transition-all duration-200 cursor-pointer rounded-xl">
            <span className="flex relative justify-center items-center">
                <UserIcon size={32} className="text-white" />
            </span>
            <div className="inline-flex flex-col items-start">
                <span className="text-sm text-inherit font-bold">Mr Thanapong So.</span>
                <span className="text-xs text-gray-100">Developer</span>
            </div>
            <div>
                <ChevronDown />
            </div>
        </div>
    );
}