export default function BaseMapControl() {

    return (
        <div className="absolute bottom-10 left-4  bg-white bg-opacity-50 backdrop-blur-md  z-20   py-1 px-2 flex space-x-2 rounded shadow-md">
            <button className="w-auto h-full text-sm text-gray-900 cursor-pointer">แผนที่ดาวเทียม</button>
            <button className="w-auto h-full text-sm text-gray-900 cursor-pointer">แผนที่กายภาพ</button>
        </div>


    )

}