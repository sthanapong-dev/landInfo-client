'use client';

import { Search } from "lucide-react";
import Table from "@/components/UI/Table";
import { useState } from "react";


export default function UserPage() {
    const [selectedKeys, setSelectedKeys] =  useState<Set<number>>(new Set());
    return (
        <div className="w-full px-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold">จัดการข้อมูลผู้ใช้ในระบบ</h1>
                    <p className="text-sm text-gray-500">เพิ่ม แก้ไข หรือลบข้อมูลผู้ใช้ในระบบ</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                           <Search/>
                        </div>
                        <input
                            type="text"
                            placeholder="ค้นหา"
                            className="border border-gray-300 rounded px-10 py-2 w-full focus:outline-none focus:ring-0 bg-white"
                        />
                    </div>
                    <button className="bg-[#849E33] text-white px-4 py-2 rounded hover:bg-[#849E33] cursor-pointer active:scale-95 transition-all duration-200">เพิ่มผู้ใช้ใหม่</button>
                </div>
            </div>
            <div className="mt-6 ">
                <Table
                data={
                    [ 
                        {id: 1, name: 'John Doe', email: 'john.doe@example.com'},
                        {id: 2, name: 'Jane Smith', email: 'jane.smith@example.com'},
                        {id: 3, name: 'Alice Johnson', email: 'alice.johnson@example.com'},
                        {id: 4, name: 'Bob Brown', email: 'bob.brown@example.com'},
                        {id: 5, name: 'Charlie Davis', email: 'charlie.davis@example.com'}
                     ] }
                    columns={
                        [
                            { key: 'name', header: 'ชื่อผู้ใช้', renderCell: (item) => <span >{item.name}</span> ,sortable: true},
                            { key: 'email', header: 'อีเมล', renderCell: (item) => <span >{item.email}</span>,sortable: true },
                        ]
                    }
                onSortChange={(sort) => console.log(sort)}
                selectable={true}
                selectedKeys={selectedKeys}
                onSelectionChange={(keys) => setSelectedKeys(keys)}
                />
            </div>
        </div>
    )
}