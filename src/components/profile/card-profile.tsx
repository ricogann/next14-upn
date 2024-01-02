import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { parseJwt } from "@/libs/auth";
import {
    getUsersMahasiswaById,
    getUsersUmumById,
    getUsersUkmById,
    getUsersOrganisasiById,
} from "@/hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function CardProfile() {
    const [account, setAccount] = useState<any>(null);
    const [role, setRole] = useState<any>(null);
    const [eyeOpen, setEyeOpen] = useState(false);

    useEffect(() => {
        async function initialize() {
            const account = parseJwt(Cookies.get("CERT"));
            setRole(account.role);
            if (account.role === "mahasiswa") {
                const res = await getUsersMahasiswaById(account.id_account);
                setAccount(res.data);
            } else if (account.role === "umum") {
                const res = await getUsersUmumById(account.id_account);
                setAccount(res.data);
            } else if (account.role === "ukm") {
                const res = await getUsersUkmById(account.id_account);
                setAccount(res.data);
            } else if (account.role === "organisasi") {
                const res = await getUsersOrganisasiById(account.id_account);
                setAccount(res.data);
            }
        }

        initialize();
    }, []);

    console.log(account);
    return (
        <>
            <div className="bg-[#FFFFFF] flex m-8 mt-7 flex-col gap-3 p-8 rounded-[15px] shadow-lg text-[#0A090C] xl:px-14 xl:py-10 xl:mx-36">
                <div className="">
                    <h1 className="text-[22px] font-bold">Profile</h1>
                    <div className="bg-[#07393C] w-[150px] py-[1px] mt-1"></div>
                </div>
                <div className="">
                    <h1 className="text-[16px] lg:text-[18px] font-semibold">
                        Nama
                    </h1>
                    <h4 className="text-[16px] lg:text-[18px] font-regular ">
                        {account?.nama || account?.nama_ukm}
                    </h4>
                </div>
                <div className="">
                    <h2 className="text-[16px] lg:text-[18px] font-semibold">
                        No. Telpon
                    </h2>
                    <h2 className="text-[16px] lg:text-[18px] font-regular ">
                        {account?.no_telp}
                    </h2>
                </div>
                <div className="">
                    <h2 className="text-[16px] lg:text-[18px] font-semibold">
                        Password
                    </h2>
                    <div className="flex gap-2 items-center">
                        <div className="text-[16px] lg:text-[18px] font-regular ">
                            <h1 className={`${eyeOpen ? "" : "hidden"}`}>
                                {account?.password}
                            </h1>
                            <h1 className={`${eyeOpen ? "hidden" : ""}`}>
                                ********
                            </h1>
                        </div>
                        <div className="">
                            <div
                                className={`text-xl ${
                                    eyeOpen ? "" : "hidden"
                                } cursor-pointer`}
                                onClick={() => setEyeOpen(false)}
                            >
                                <AiFillEye />
                            </div>
                            <div
                                className={`text-xl ${
                                    eyeOpen ? "hidden" : ""
                                } cursor-pointer`}
                                onClick={() => setEyeOpen(true)}
                            >
                                <AiFillEyeInvisible />
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`${
                        role === "ukm" || role === "organisasi" ? "" : "hidden"
                    }`}
                >
                    <h2 className="text-[16px] lg:text-[18px] font-semibold">
                        Nama Penanggung Jawab
                    </h2>
                    <h2 className="text-[16px] lg:text-[18px] font-regular ">
                        {account?.nama_pj}
                    </h2>
                </div>
                <button className="border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-5">
                    Edit Profile
                </button>
            </div>
        </>
    );
}
