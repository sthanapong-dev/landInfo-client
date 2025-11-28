'use client';
import { useEffect, useState } from "react";
import Table from "@/components/UI/Table";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@/components/UI/Dropdown";
import dayjs from "dayjs";
import { MoreVertical, Search} from "lucide-react";
import apiClient from "@/libs/apiClient";

export default function UserPage() {
    const [selectedKeys, setSelectedKeys] =  useState<Set<number>>(new Set());
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        const fetch = async () => {
            setIsLoading(true);
            try {
                const response = await apiClient.get('/api/v1/roles');
                setData(response.data.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetch();
    },[])

    return (
        <div className="w-full px-10">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-xl font-bold">จัดการข้อมูลบทบาท</h1>
                    <p className="text-sm text-gray-500">เพิ่ม แก้ไข หรือลบข้อมูลบทบาท</p>
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
                    <button className="bg-[#849E33] text-white px-4 py-2 rounded hover:bg-[#849E33] cursor-pointer active:scale-95 transition-all duration-200">เพิ่มบทบาท</button>
                </div>
            </div>
            <div className="mt-6 ">
                <Table
                data={data}
                isLoading={isLoading}
                    columns={
                        [
                            { key: 'name', header: 'ชื่อ', renderCell: (item) => <span >{item.name}</span> ,sortable: true},
                            {key: 'description', header: 'คำอธิบาย', renderCell: (item) => <span >{item.description}</span>,sortable: true },
                            { 
                                key: '_id', header: 'เพิ่มเติม', renderCell: (item) => 
                                <>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 transition-all duration-200 flex items-center justify-center space-x-1 cursor-pointer">
                                                    จัดการ
                                                <MoreVertical className="inline-block"  size={10}/>
                                            </button>
                                        </DropdownTrigger> 
                                        <DropdownMenu aria-label="User actions">
                                            <DropdownItem onClick={() => alert(`Edit user ${item._id}`)}>แก้ไขข้อมูล</DropdownItem>
                                            <DropdownItem onClick={() => alert(`Reset password for user ${item._id}`)}>รีเซ็ตรหัสผ่าน</DropdownItem>
                                            <DropdownItem color="danger" onClick={() => alert(`Delete user ${item._id}`)}>ลบผู้ใช้</DropdownItem>
                                        </DropdownMenu>    
                                    </Dropdown>
                                </>,
                                sortable: false 
                            },
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