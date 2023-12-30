import Image from "next/image";
import logo_bpu from "../../../public/logo-bpu.png";

import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonCircle } from "react-icons/bs";

import { useState } from "react";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [toggle, setToggle] = useState(false);
    return (
        <>
            <div className="bg-[#F0EDEE] shadow-xl relative z-50">
                <div className="container mx-auto flex justify-between items-center ">
                    <div className="flex items-center justify-between w-full px-12 py-3 md:px-8">
                        <div className="text-white font-semibold text-lg">
                            <Image
                                src={logo_bpu}
                                alt="logo"
                                className="w-[90px] h-[70px]"
                            />
                        </div>
                        <div className="relative">
                            <div onClick={() => setToggle(!toggle)}>
                                <RxHamburgerMenu className="text-black text-4xl md:hidden" />
                            </div>
                            <div
                                className={`md:hidden absolute right-1 w-[150px] ${
                                    toggle ? "block" : "hidden"
                                }`}
                            >
                                <div className="bg-[#cdcdcd] flex flex-col gap-2 p-3 rounded-md">
                                    <button className=" text-black font-semibold">
                                        Home
                                    </button>
                                    <button
                                        name="login"
                                        className={`text-black font-semibold ${
                                            isLogin ? "hidden" : ""
                                        }`}
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        name="login"
                                        className={`text-black font-semibold ${
                                            isLogin ? "hidden" : ""
                                        }`}
                                    >
                                        Login
                                    </button>
                                    <button
                                        name="register"
                                        className={`text-black font-semibold ${
                                            isLogin ? "" : "hidden"
                                        }`}
                                    >
                                        Profile
                                    </button>
                                    <button
                                        name="register"
                                        className={`text-black font-semibold
                                        ${isLogin ? "" : "hidden"}`}
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
