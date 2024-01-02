import FasilitasDTO from "@/interfaces/fasilitasDTO";
import { BsFillPinMapFill } from "react-icons/bs";
import { MdOutlineWatchLater, MdPayment } from "react-icons/md";
import { useState, useEffect } from "react";
import LoginForm from "../auth/login";
import Cookies from "js-cookie";
import { parseJwt } from "@/libs/auth";
import { useRouter } from "next/navigation";
import Loading from "../ui/loading";

type InfoFasilitasProps = {
    data: FasilitasDTO;
};

const InfoFasilitas: React.FC<InfoFasilitasProps> = ({ data }) => {
    const router = useRouter();
    const [toggleLogin, setToggleLogin] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const [account, setAccount] = useState<any>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (Cookies.get("CERT")) {
            setIsLogin(true);
            setAccount(parseJwt(Cookies.get("CERT")));
        } else {
            setIsLogin(false);
        }
    }, []);

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <div className="font-montserrat mt-5 bg-[#FFFFFF] rounded-[13px] border-[#07393C] border-2 shadow-xl mr-1">
                <div className="lg:flex-row">
                    <div className="flex items-center justify-between p-5 md:p-8 xl:px-14 xl:py-10">
                        <div className="w-[150px] md:w-full flex flex-col gap-2">
                            <h1 className="text-xl text-[#222222] font-bold md:text-[25px] xl:text-[35px]">
                                {data.nama}
                            </h1>
                            <div className="flex items-center gap-3 lg:mt-2">
                                <div className="w-2 h-2 xl:w-2 xl:h-2 bg-black rounded-full"></div>
                                <div className="text-black text-[10px] lg:text-[15px]">
                                    <span>Closed,</span> opens soon at 9:00 a.m
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-end gap-1">
                            <button className="w-24 bg-[#F7F8FA] hover:bg-[#07393C] hover:text-[#F7F8FA] text-semibold font-bold p-1 lg:p-2 text-[10px] text-black border-black border-[2px] xl:text-[17px] xl:w-32 rounded-lg">
                                More Info
                            </button>
                            <button
                                className={`w-24 bg-[#07393C] hover:bg-[#F0EDEE] hover:text-[#0A090C] text-white font-bold p-1 lg:p-2 text-[10px] border-black border-[2px] xl:text-[17px] xl:w-32 rounded-lg
                                ${
                                    data.nama === "Asrama" &&
                                    account.role !== "mahasiswa"
                                        ? "opacity-50 cursor-not-allowed"
                                        : ""
                                }`}
                                onClick={() => {
                                    if (isLogin) {
                                        setLoading(true);
                                        router.push(
                                            `/booking/${data.id_fasilitas}`
                                        );
                                    } else {
                                        setToggleLogin(!toggleLogin);
                                    }
                                }}
                                disabled={
                                    data.nama === "Asrama" &&
                                    account.role !== "mahasiswa"
                                        ? true
                                        : false
                                }
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-start gap-5 md:flex-row text-[8px] md:text-[12px] xl:text-[18px] border-[#07393C] border-t-[2px] p-5 md:p-8 xl:px-14 xl:py-10">
                        <div className="flex gap-3 items-start">
                            <BsFillPinMapFill className="text-black font-bold text-lg lg:text-xl" />

                            <div className="text-black text-[12px] xl:text-[16px]">
                                <div className="w-[230px] xl:w-[360px] mb-1">
                                    {data.alamat}
                                </div>
                                <a
                                    href=""
                                    className="text-blue-900 font-semibold"
                                >
                                    Get directions
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <MdOutlineWatchLater className="text-black font-bold text-lg lg:text-xl" />
                            <div className="flex flex-col">
                                <h2 className="text-[12px] lg:text-[16px] text-black">
                                    {data.buka_hari}
                                </h2>
                                <h2 className="text-[12px] lg:text-[16px] text-black">
                                    {data.jam_buka} - {data.jam_tutup}
                                </h2>
                            </div>
                        </div>
                        <div className="flex gap-3 items-start">
                            <MdPayment className="text-black font-bold text-lg lg:text-xl" />
                            <div className="flex flex-col text-[12px] lg:text-[16px] text-black">
                                <h2 className="">Mode Of Payment</h2>
                                <h2 className="">Virtual Account</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${toggleLogin ? "" : "hidden"}`}>
                <LoginForm toggle={() => setToggleLogin(!toggleLogin)} />
            </div>
        </>
    );
};

export default InfoFasilitas;
