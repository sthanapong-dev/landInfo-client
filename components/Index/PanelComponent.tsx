export default function Panel() {
    return (
        // overscloostyle
        <div className="absolute top-20 right-4 z-20 grid grid-cols-1 gap-2 max-w-sm w-full  overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
            <div className="  w-full  rounded">
                <div className="py-2 px-4 bg-black/70 text-white rounded-t">
                    <div className="font-medium mb-2 text-center flex justify-between">
                        <h1>ข้อมูลพื้นที่</h1>
                    </div>
                </div>
                <div className="p-4 bg-white">
                    <div>
                        เจ้าของพื้นที่: นายสมชาย ใจดี
                    </div>
                    <div className="mt-2 text-sm text-gray-600">บ้านเลขที่ 123/45  ตำบลตัวอย่าง จังหวัดตัวอย่าง จังหวัดตัวอย่าง</div>

                    <div className="mt-4">
                        <h3 className="font-medium mb-2">รายละเอียดพื้นที่</h3>
                        <ul className="list-disc list-inside text-sm text-gray-700">
                            <li>ขนาดพื้นที่: 150 ตารางเมตร</li>
                            <li>ประเภทการใช้ประโยชน์: ที่อยู่อาศัย</li>
                            <li>สถานะ: ปกติ</li>
                        </ul>
                    </div>
                </div>
            </div>

             <div className="w-full  rounded">
                <div className="py-2 px-4 bg-black/70 text-white rounded-t">
                    <div className="font-medium mb-2 text-center flex justify-between">
                        <h1>รูปตัวอย่าง (Sample Image)</h1>
                    </div>
                </div>

                <div>
                    <img src="https://i.pinimg.com/1200x/ec/5c/ac/ec5cace2725f2c4baed80d5bea04bb8a.jpg" alt="Sample" className="w-full max-h-60 object-cover rounded-b" />
                </div>

            </div>

            <div className="w-full  rounded">
                <div className="py-2 px-4 bg-black/70 text-white rounded-t">
                    <div className="font-medium mb-2 text-center flex justify-between">
                        <h1>เลย์เยอร์ข้อมูล (Data Layers)</h1>
                    </div>
                </div>

                <div className="p-4 bg-white">
                    <ul className="list-disc list-inside text-sm text-gray-700">
                        <li>ชั้นข้อมูลถนน (ถนนหลัก, ถนนรอง)</li>
                        <li>ชั้นข้อมูลแหล่งน้ำ (แม่น้ำ, คลอง)</li>
                        <li>ชั้นข้อมูลเขตการปกครอง (ตำบล, อำเภอ)</li>
                    </ul>
                </div>
            </div>
        </div>
    )
}