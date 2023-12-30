import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import { FaSquareInstagram } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";

export default function Footer() {
    const Menus = [
        {
            title: `Instagram`,
            src: FaSquareInstagram,
            link: "https://instagram.com/bpU",
        },
        {
            title: `Website`,
            src: TbWorldWww,
            link: "/",
        },
        {
            title: `Telepon`,
            src: IoCall,
            link: "/",
        },
        {
            title: `Email`,
            src: AiOutlineMail,
            link: "/",
        },
    ];

    return (
        <>
            <div className="bg-[rgb(240,237,238)] shadow-xl lg:p-3 mt-10">
                <div className="text-[#0A090C] font-semibold font-montserrat w-full px-6 py-4 md:px-8">
                    <div className="flex justify-center px-6 gap-2 lg:gap-10">
                        {Menus.map((menu, index) => (
                            <div
                                className="flex flex-row items-center lg:gap-2"
                                key={index}
                            >
                                <menu.src className="text-[30px] text-black" />
                                <h1
                                    className={`hidden lg:block text-[15px] text-black`}
                                >
                                    {menu.title}
                                </h1>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
