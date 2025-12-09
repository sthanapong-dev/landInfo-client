'use client';

import GridView from "@/components/database/GridView";
import ListView from "@/components/database/ListView";
import { Grid2X2Icon, List } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ManagementDatabasePage() {
    const [Tab, setTab] = useState<'grid' | 'list'>('grid');
    return (
        <div className="w-full px-10">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h1 className="text-xl font-bold">จัดการฐานข้อมูล</h1>
                </div>
                <div>
                    <Link href="/management/database/create" className="bg-[#849E33] text-white px-4 py-2 rounded hover:bg-[#849E33] cursor-pointer active:scale-95 transition-all duration-200">เพิ่มข้อมูล</Link>
                </div>
            </div>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <h1 className="text-md font-bold">ข้อมูลทั้งหมด</h1>
                </div>
                
                <div className="flex space-x-2 items-center">
                    <button
                        className={`px-3 py-2 rounded cursor-pointer ${Tab === 'grid' ? 'bg-[#37616D]  text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setTab('grid')}
                    >
                        <Grid2X2Icon className="w-4 h-4" />
                    </button>
                    <button
                        className={`px-3 py-2 rounded cursor-pointer ${Tab === 'list' ? 'bg-[#37616D]  text-white' : 'bg-gray-200 text-gray-700'}`}
                        onClick={() => setTab('list')}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>
            {
                Tab === 'grid' ? <GridView /> : <ListView />
            }
        </div>
    )
}