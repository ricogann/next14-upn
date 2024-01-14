"use client";
import Error from "@/components/ui/error-tampilan";
import LoginForm from "@/components/admin/home/login-form";
import logoBPU from "../../../public/logo-bpu.png";
import Image from "next/image";

import { FaSquareInstagram } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { TbWorldWww } from "react-icons/tb";

export default function HomeAdmin() {
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
            <div className="xl:hidden">
                <Error />
            </div>

            <div className="hidden xl:flex xl:items-center xl:justify-center xl:gap-10 h-screen bg-[#2C666E] ">
                <div className="flex flex-col justify-between gap-10 text-white">
                    <div className="">
                        <h1 className="text-5xl font-semibold">
                            Dashboard Admin Sipus
                        </h1>
                        <h1 className="">
                            Universitas Pembangunan Nasional &quot;Veteran&quot;
                            Jawa Timur
                        </h1>
                    </div>
                    <div className="w-[600px]">
                        <h1>
                            Dashboard Admin Sipus merupakan halaman khusus untuk
                            admin yang bertugas untuk mengelola booking
                            fasilitas yang ada di Universitas Pembangunan
                            Nasional &quot;Veteran&quot; Jawa Timur.
                        </h1>
                    </div>
                    <div className="text-white">
                        <div className="flex justify-start gap-2 lg:gap-10">
                            {Menus.map((menu, index) => (
                                <div
                                    className="flex flex-row items-center lg:gap-2"
                                    key={index}
                                >
                                    <menu.src className="text-[30px]" />
                                    <h1
                                        className={`hidden lg:block text-[15px]`}
                                    >
                                        {menu.title}
                                    </h1>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <LoginForm />
            </div>
        </>
    );
}
