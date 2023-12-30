import Image from "next/image";
import logo_bpu from "../../../public/logo-bpu.png";

import { RxHamburgerMenu } from "react-icons/rx";
import { BsPersonCircle } from "react-icons/bs";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import LoginForm from "../auth/login";
import RegisterForm from "../auth/register";
import { parseJwt } from "@/libs/auth";

export default function Navbar() {
    const [isLogin, setIsLogin] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [toggleLogin, setToggleLogin] = useState(false);
    const [toggleRegister, setToggleRegister] = useState(false);
    const [nama, setNama] = useState("");
    const [openProfile, setOpenProfile] = useState(false);

    useEffect(() => {
        const token = Cookies.get("CERT");
        if (token) {
            const data = parseJwt(token);
            if (!data.username_admin) {
                setNama(parseJwt(Cookies.get("CERT")).nama);
                setIsLogin(true);
            } else {
                window.location.href = "/admin/dashboard";
            }
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove("CERT");
        window.location.href = "/";
    };
    return (
        <>
            <div className="bg-[#F0EDEE] shadow-xl relative z-50 ">
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
                                        onClick={() => {
                                            setToggleRegister(true);
                                            setToggle(false);
                                        }}
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        name="login"
                                        className={`text-black font-semibold ${
                                            isLogin ? "hidden" : ""
                                        }`}
                                        onClick={() => {
                                            setToggleLogin(true);
                                            setToggle(false);
                                        }}
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
                        <div className="hidden md:flex md:gap-14 text-[#0A090C] font-semibold font-montserrat">
                            <button className="">Home</button>
                            <button
                                name="register"
                                className={`${isLogin ? "hidden" : "block"}`}
                                onClick={() => {
                                    setToggleRegister(true);
                                    setToggle(false);
                                }}
                            >
                                Sign Up
                            </button>
                            <button
                                name="login"
                                className={`${isLogin ? "hidden" : "block"}`}
                                onClick={() => {
                                    setToggleLogin(true);
                                    setToggle(false);
                                }}
                            >
                                Login
                            </button>
                            <div
                                className={`${isLogin ? "relative" : "hidden"}`}
                            >
                                <div
                                    className={`relative flex p-3 items-center gap-5 text-[#0A090C] shadow-xl border border-black ${
                                        openProfile
                                            ? `rounded-t-xl border-0`
                                            : ` rounded-xl`
                                    } cursor-pointer`}
                                    onClick={() => setOpenProfile(!openProfile)}
                                >
                                    <BsPersonCircle className={`text-2xl`} />
                                    <>{nama && nama}</>
                                </div>
                                <div
                                    className={`${
                                        openProfile
                                            ? `flex flex-col gap-2`
                                            : `hidden`
                                    } absolute right-0 -bottom-[95px] border w-[200px] p-5 bg-[#ffffff] z-50 rounded-b-xl rounded-tl-xl`}
                                >
                                    <div className="cursor-pointer hover:font-bold">
                                        Profile
                                    </div>
                                    <div
                                        className="cursor-pointer hover:font-bold"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${toggleLogin ? "" : "hidden"}`}>
                <LoginForm toggle={() => setToggleLogin(!toggleLogin)} />
            </div>
            <div className={`${toggleRegister ? "" : "hidden"}`}>
                <RegisterForm
                    toggle={() => setToggleRegister(!toggleRegister)}
                />
            </div>
        </>
    );
}
