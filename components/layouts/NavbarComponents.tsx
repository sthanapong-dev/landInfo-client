'use client';

import User from "@/components/UI/User";
import Notification from "@/components/UI/Notification";
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from "@/stores/useAuthStore";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@/components/UI/Dropdown";

export default function NavbarComponents() {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuthStore();
    return (
        <nav className={`w-full ${pathname === '/' ? 'bg-[#213A41]/80' : 'bg-[#223941]'} fixed top-0  z-50 items-center  flex justify-center backdrop:backdrop-blur-2xl shadow-md h-14`}>
            <div className="max-w-[1720px] w-full flex justify-between px-4 py-1 rounded-md flex-row items-center text-white text-lg">
                {/* <div className="hidden lg:block">
                    <MapIcon size={32} />
                </div> */}
                <div className="justify-center items-center cursor-pointer" onClick={() => { router.push('/') }}>
                    ระบบสารสนเทศภูมิศาสตร์เพื่อการแสดงข้อมูลแปลงที่ดิน
                </div>
                <div className="flex items-center">
                    <Notification />
                    <Dropdown>
                        <DropdownTrigger>
                            <User title={user?.name} subtitle={user?.primaryRole} />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User actions">
                            <DropdownItem className="text-sm">{user?.email}</DropdownItem>
                            <DropdownItem className="text-sm">แก้ไขข้อมูลส่วนตัว</DropdownItem>
                            <DropdownItem className="text-xs" onClick={() => {
                                useAuthStore.getState().logout();
                                router.push('/login');
                            }}>ออกจากระบบ</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    
                </div>
            </div>
        </nav>
    )
}
