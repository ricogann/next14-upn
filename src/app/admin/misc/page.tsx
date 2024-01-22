"use client";
import { useState, useEffect } from "react";
import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import InfoData from "@/components/admin/misc/info-data";
import EditData from "@/components/admin/misc/edit-data";
import { getMisc } from "@/hooks";
import Loading from "@/components/ui/loading";
import { parseJwt, getClientSideCookie } from "@/libs/auth";
import { useRouter } from "next/navigation";
import Misc from "@/interfaces/miscDTO";

export default function MiscPage() {
    const [misc, setMisc] = useState<Misc>();
    const [isEdit, setIsEdit] = useState(false);
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
            const res = await getMisc();
            setMisc(res.data);
        }
        initialize();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
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
                    <div className="p-10">
                        <div className="flex flex-col items-start justify-center text-white">
                            <h1 className="text-[45px] font-bold">
                                Miscellanous
                            </h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                Halaman untuk mengelola data informasi dari
                                sipus.
                            </h4>
                        </div>
                        <div className="flex flex-row items-start my-4 border-b border-[#E2E7EE]"></div>
                        <div className={`${isEdit ? "hidden" : "block"}`}>
                            {misc ? <InfoData data={misc} /> : <Loading />}
                        </div>
                        <div className={`${isEdit ? "block" : "hidden"}`}>
                            {misc ? <EditData data={misc} /> : <Loading />}
                        </div>
                        <button
                            className={`bg-[#07393C] uppercase text-white font-bold py-2 px-4 rounded-xl w-[900px] mr-2 mt-10 ${
                                isEdit ? "hidden" : "block"
                            }`}
                            onClick={() => setIsEdit(true)}
                        >
                            Edit Data
                        </button>
                        <button
                            className={`bg-red-500 uppercase text-white font-bold py-2 px-4 rounded-xl w-[900px] mr-2 mt-2 ${
                                isEdit ? "block" : "hidden"
                            }`}
                            onClick={() => setIsEdit(false)}
                        >
                            CANCEL
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
