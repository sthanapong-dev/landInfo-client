'use client';

import DrawMap from "@/components/database/Create/DrawMap";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useState, useEffect, use } from "react";



export default function databaseCreatePage() {
    const [features, setFeatures] = useState<any>(null);
    return (
        <div className="w-full px-10">
            <div className="flex justify-between items-center mb-4">
                <Link href="/management/database" className="flex items-center cursor-pointer   rounded active:scale-95 transition-all duration-200">
                    <ChevronLeft size={24} strokeWidth={1.5} />
                    <p>ย้อนกลับ</p>
                </Link>
            </div>
            <div className="bg-white px-4 py-2 rounded">
                <h1 className="text-xl font-bold">แบบฟอร์มสร้างข้อมูล</h1>
                <div className="">
                    <div className="w-full min-h-[600px] h-[600px] col-span-4 ">
                        <DrawMap features={features} handledraw={(e) => setFeatures(e)} />
                    </div>
                    <h1 className="text-lg font-bold mb-6">รายละเอียดข้อมูล</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                        {/* รหัสบล็อก */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                รหัสบล็อก <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 02B"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* ประเภทที่ดิน */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                ประเภทที่ดิน <span className="text-red-500">*</span>
                            </label>
                            <select className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white">
                                <option value="">-- เลือกประเภทที่ดิน --</option>
                                <option value="โฉนดที่ดิน">โฉนดที่ดิน</option>
                                <option value="นส.3">นส.3</option>
                                <option value="นส.3ก">นส.3ก</option>
                                <option value="นส.3ข">นส.3ข</option>
                            </select>
                        </div>

                        {/* พิกัด X */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                พิกัด X <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder="เช่น 773132"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* พิกัด Y */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                พิกัด Y <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                placeholder="เช่น 1564661"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* ชื่อเจ้าของ */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                ชื่อเจ้าของ <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น นางราตรี แสงจันทร์"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* ขนาดพื้นที่ */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                ขนาดพื้นที่ <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 21 ไร่ 1 งาน 63 ตารางวา"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* เลขอ้างอิงเอกสาร */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                เลขอ้างอิงเอกสาร
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 7264-00/4/4"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* รหัสแปลงที่ดิน */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                รหัสแปลงที่ดิน
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 02B127"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* หมายเลขระวางแผนที่ */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                หมายเลขระวางแผนที่
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 533737264-00"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* เลขที่ดิน */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                เลขที่ดิน
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 4"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* เลขที่โฉนด */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                เลขที่โฉนด
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 10829"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* เลขที่สอบเขต/รังวัด */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                เลขที่สอบเขต/รังวัด
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 1169"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* เลขระวาง (ชุดที่ C) */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                เลขระวาง (ชุดที่ C)
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 5337III"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* เลขระวาง (ชุดที่ M) */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                เลขระวาง (ชุดที่ M)
                            </label>
                            <input 
                                type="text" 
                                placeholder="เช่น 7264"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>

                        {/* ราคาต่อตารางวา */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-700">
                                ราคาต่อตารางวา (บาท)
                            </label>
                            <input 
                                type="number" 
                                placeholder="เช่น 130"
                                className="px-4 py-2.5 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end gap-4 mt-8">
                        <Link 
                            href="/management/database"
                            className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all"
                        >
                            ยกเลิก
                        </Link>
                        <button 
                            type="submit"
                            className="px-6 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all"
                        >
                            บันทึกข้อมูล
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}