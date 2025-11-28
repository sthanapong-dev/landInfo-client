'use client';
import { useCommonStore } from "@/stores/useCommonStore";
import { ChevronLeft, ClockAlert, Database, LayoutGrid, Logs, Users, UserStar } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function DrawerMenu() {
    const pathname = usePathname();
    const { isopenDrawer, setisopenDrawer } = useCommonStore();
    const ListMenu = [
        {
            name: "ภาพรวม",
            icon: <LayoutGrid />,
            href: "/management"
        },
        {
            name: "ฐานข้อมูล",
            icon: <Database />,
            href: "/management/database"
        },
        {
            name: "บันทึกกิจกรรมระบบ",
            icon: <Logs />,
            href: "/management/logs"
        },
        {
            name: "จัดการข้อมูลผู้ใช้",
            icon: <Users />,
            href: "/management/users"
        },
        {
            name: "จัดการบทบาทผู้ใช้",
            icon: <UserStar />,
            href: "/management/roles"
        },
        {
            name: "บันทึกการร้องเรียนระบบ",
            icon: <ClockAlert />,
            href: "/management/complaint-log"
        }

    ]
    return (
        <div
            className={`fixed top-14 left-0 h-full bg-[#37616D] 
              ${isopenDrawer ? 'w-64 p-2' : 'w-16 p-1'} 
              flex flex-col
              transition-[width] duration-300 ease-in-out
              overflow-hidden`}
        >
            <div className="w-full p-2 flex justify-end">
                <button
                    className="focus:scale-95 cursor-pointer hover:bg-white/10 text-white rounded-md p-1 transition-transform duration-300"
                    onClick={() => setisopenDrawer()}
                >
                    <ChevronLeft
                        size={24}
                        strokeWidth={1.5}
                        className={`${isopenDrawer ? "" : "rotate-180"} transition-transform duration-500`}
                    />
                </button>
            </div>

            <ul className={`w-full flex flex-col ${isopenDrawer ? 'gap-2' : 'p-2 justify-end'}`}>
                {ListMenu.map((item, index) => (
                    <Link
                        key={index}
                        href={item.href}
                        title={!isopenDrawer ? item.name : undefined}
                        className={`
                                    text-white
                                    flex items-center
                                    ${isopenDrawer ? 'gap-2 p-2  hover:bg-white/10 transition-all duration-100 overflow-hidden' : 'justify-center p-1  hover:bg-white/10 transition-transform duration-300 mb-2'}
                                    border-l-4
                                    ${pathname === item.href ? 'border-white bg-white/10' : 'border-transparent'}
                                    cursor-pointer
                                    ${!isopenDrawer ? 'focus:scale-95' : ''}
                                `}
                    >
                        {item.icon}
                        {isopenDrawer && (
                            <div className={`transition-all duration-300 ease-in-out ${isopenDrawer ? 'max-w-full opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'} whitespace-nowrap`}>
                                {item.name}
                            </div>
                        )}
                    </Link>
                ))}
            </ul>


        </div>
    )
}