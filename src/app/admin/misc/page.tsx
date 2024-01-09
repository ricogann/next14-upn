"use client";
import { useState, useEffect } from "react";
import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import InfoData from "@/components/admin/misc/info-data";
import EditData from "@/components/admin/misc/edit-data";
import { getMisc } from "@/hooks";

export default function MiscPage() {
    const [misc, setMisc] = useState({});
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        async function initialize() {
            const res = await getMisc();
            setMisc(res.data);
        }
        initialize();
    }, []);
    return (
        <>
            <div className="xl:hidden">
                <Error />
            </div>

            <div className="hidden xl:flex">
                <div className="min-h-screen">
                    <Sidebar />
                </div>

                <div className="hidden xl:block bg-[#2C666E] min-h-screen flex-1 overflow-hidden">
                    <div className="p-10">
                        <div className="flex flex-col items-start justify-center">
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
                            <InfoData data={misc} />
                        </div>
                        <div className={`${isEdit ? "block" : "hidden"}`}>
                            <EditData data={misc} />
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
