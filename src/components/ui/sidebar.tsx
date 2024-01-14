import { useState } from "react";
import Image from "next/image";

import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiSolidDashboard, BiCalendar, BiLogOut } from "react-icons/bi";
import { FaLandmark } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdMiscellaneousServices } from "react-icons/md";
import { useRouter } from "next/navigation";

import logoUPN from "../../../public/logo-upn.png";

export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const router = useRouter();

    const Menus = [
        {
            title: "Dashboard",
            src: BiSolidDashboard,
            gap: true,
            link: "/admin/dashboard",
        },
        { title: "Booking", src: BiCalendar, link: "/admin/booking" },
        { title: "Data Fasilitas", src: FaLandmark, link: "/admin/fasilitas" },
        { title: "Data Users", src: BsFillPeopleFill, link: "/admin/users" },
        {
            title: "Miscellaneous",
            src: MdMiscellaneousServices,
            link: "/admin/misc",
        },
    ];
    return (
        <>
            <div className="flex h-full">
                <div
                    className={` ${
                        open ? "w-56" : "w-20 "
                    } bg-[#F7F8FA] min-h-screen p-5 pt-8 relative duration-300 border border-r-2 border-black`}
                >
                    <div
                        className={`absolute cursor-pointer -right-3 top-16 ${
                            !open && "rotate-180"
                        } border border-black p-1 rounded-full duration-200 bg-white text-black`}
                        onClick={() => setOpen(!open)}
                    >
                        <AiOutlineArrowLeft />
                    </div>
                    <div className="flex items-center justify-center mb-10">
                        <Image
                            src={logoUPN}
                            alt="logo"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="flex flex-col gap-5">
                        {Menus.map((menu, index) => (
                            <div
                                className={`flex  rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              ${menu.gap ? "mt-2" : "mt-2"} ${
                                    index === 0 && "bg-light-white"
                                } `}
                                key={index}
                                onClick={() => router.push(menu.link)}
                            >
                                <menu.src className="text-[30px] text-black" />
                                <h1
                                    className={`${
                                        !open && "hidden"
                                    } origin-left duration-200 text-[15px] text-black`}
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
