'use client';

import { Logs, Map } from "lucide-react";
import { useRouter } from "next/navigation";
import {  useEffect, useState } from "react";

export default function GridLink() {
    const router = useRouter();
    const [gridActive,setGridActive] = useState<"map" | "management">("map");


    useEffect(() => {
        const path = window.location.pathname;
        if(path === "/"){
            setGridActive("map");
        }else if(path === "/management"){
            setGridActive("management");
        }
    },[])

    useEffect(()=>{
        if(gridActive === "map"){
            router.push("/");
        }else{
            router.push("/management");
        }
    },[gridActive])


    return (
        <div className="absolute top-20 left-4 z-99 flex items-center justify-center  bg-black rounded-md shadow-md">
                <button className={`p-1  cursor-pointer rounded hover:text-white ${gridActive === "map" ? "bg-[#213A41]  text-white" : "text-gray-200"}`} onClick={() => setGridActive("map")}>
                    <Map size={26} strokeWidth={1.5} />
                </button>
                <button className={`p-1  cursor-pointer rounded hover:text-white ${gridActive === "management" ? "bg-[#213A41]  text-white" : "text-gray-200"}`} onClick={() => setGridActive("management")}>
                    <Logs size={26} strokeWidth={1.5}  />
                </button>
        </div>
    )

}