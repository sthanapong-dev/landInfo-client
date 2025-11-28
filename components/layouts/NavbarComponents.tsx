'use client';

import User from "@/components/UI/User";
import Notification from "@/components/UI/Notification";
import { usePathname, useRouter } from 'next/navigation'
// import { MapIcon } from "lucide-react";

export default function NavbarComponents() {
    const pathname = usePathname();
    const router = useRouter();
    return (
        <nav className={`w-full ${pathname === '/' ? 'bg-[#213A41]/80' : 'bg-[#223941]'} fixed top-0  z-50 items-center  flex justify-center backdrop:backdrop-blur-2xl shadow-md h-14`}>
            <div className="max-w-[1720px] w-full flex justify-between px-4 py-1 rounded-md flex-row items-center text-white text-lg">
                {/* <div className="hidden lg:block">
                    <MapIcon size={32} />
                </div> */}
                <div className="justify-center items-center cursor-pointer" onClick={()=> {router.push('/')}}>
                    ระบบสารสนเทศภูมิศาสตร์เพื่อการแสดงข้อมูลแปลงที่ดิน
                </div>
                <div className="flex items-center">
                    <Notification />
                    <User />
                </div>
            </div>
        </nav>
    )
}
