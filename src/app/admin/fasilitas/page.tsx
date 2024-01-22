"use client";
import { useState, useEffect } from "react";

import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import TabFasilitas from "@/components/admin/fasilitas/tab-fasilitas";
import TabHarga from "@/components/admin/fasilitas/tab-harga";
import { getAllHargaFasilitas, getFasilitas } from "@/hooks";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";
import { parseJwt, getClientSideCookie } from "@/libs/auth";

export default function FasilitasPage() {
    const [activeTab, setActiveTab] = useState("fasilitas");
    const [fasilitas, setFasilitas] = useState([]);
    const [harga, setHarga] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function initialize() {
            const cookie = getClientSideCookie();
            if (cookie.token === undefined) {
                router.push("/admin");
                return;
            } else if (parseJwt(cookie.token).role) {
                router.push("/");
                return;
            }
            setLoading(false);
            const fasilitas = await getFasilitas();
            const harga = await getAllHargaFasilitas();
            setFasilitas(fasilitas.data);
            setHarga(harga.data);
        }

        initialize();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <>
            <div className="xl:hidden">
                <Error />
            </div>

            <div
                className={`fixed h-screen w-screen flex items-center justify-center backdrop-blur-xl z-50 ${
                    loading ? "block" : "hidden"
                }`}
            >
                <Loading />
            </div>

            <div className="hidden xl:flex">
                <div className="min-h-screen">
                    <Sidebar />
                </div>

                <div className="hidden xl:block bg-[#2C666E] min-h-screen flex-1 overflow-hidden">
                    <div className="p-10 text-white">
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="text-[45px] font-bold">
                                {
                                    {
                                        fasilitas: "Fasilitas",
                                        harga: "Harga",
                                    }[activeTab]
                                }
                            </h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                {
                                    {
                                        fasilitas: "Tabel data fasilitas",
                                        harga: "Tabel data harga",
                                    }[activeTab]
                                }
                            </h4>
                        </div>
                        <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                            <button onClick={() => toggleTab("fasilitas")}>
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 ${
                                        activeTab === "fasilitas"
                                            ? "border-b-2 border-[#FFA101] font-bold"
                                            : ""
                                    }`}
                                >
                                    Fasilitas
                                </h2>
                            </button>
                            <button onClick={() => toggleTab("harga")}>
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 ${
                                        activeTab === "harga"
                                            ? "border-b-2 border-[#FFA101] font-bold"
                                            : ""
                                    }`}
                                >
                                    Harga
                                </h2>
                            </button>
                        </div>
                        <div className="flex flex-col overflow-hidden rounded-lg">
                            <div className="flex flex-row relative overflow-hidden mb-5">
                                {
                                    {
                                        fasilitas: (
                                            <div className="flex gap-5 items-center">
                                                <input
                                                    className="w-auto h-[50px] px-5 py-3 bg-white border border-gray-300 rounded-xl text-[20px] font-bold outline-none"
                                                    type="text"
                                                    placeholder="Cari Data Fasilitas . . ."
                                                />
                                                <button
                                                    className=" w-full bg-[#07393C] px-5 py-3.5 rounded-lg text-white font-bold uppercase"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admin/fasilitas/add-fasilitas`
                                                        )
                                                    }
                                                >
                                                    Add Data
                                                </button>
                                            </div>
                                        ),
                                        harga: (
                                            <div className="flex gap-5 items-center">
                                                <input
                                                    className="w-auto h-[50px] px-5 py-3 bg-white border border-gray-300 rounded-xl text-[20px] font-bold outline-none"
                                                    type="text"
                                                    placeholder="Cari Data Harga. . ."
                                                />
                                                <button
                                                    className=" w-full bg-[#07393C] px-5 py-3.5 rounded-lg text-white font-bold uppercase"
                                                    onClick={() =>
                                                        router.push(
                                                            `/admin/fasilitas/add-harga`
                                                        )
                                                    }
                                                >
                                                    Add Data
                                                </button>
                                            </div>
                                        ),
                                    }[activeTab]
                                }
                            </div>
                        </div>
                        <div className="">
                            {
                                {
                                    fasilitas: (
                                        <TabFasilitas data={fasilitas} />
                                    ),
                                    harga: <TabHarga data={harga} />,
                                }[activeTab]
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
