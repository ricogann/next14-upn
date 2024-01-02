"use client";
import { useState, useEffect } from "react";
import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";

import { getMisc } from "@/hooks";

export default function MiscPage() {
    const [misc, setMisc] = useState({});

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
                <Sidebar />

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

                        <div className="flex flex-full w-[900px] overflow-hidden rounded-lg shadow-lg">
                            <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                                <div className="flex flex-col gap-5 ">
                                    <div className="flex flex-fit gap-3 bg-white rounded-lg">
                                        <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                            Nama Instansi
                                        </h1>
                                        <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                            {misc?.nama_instansi}
                                        </h1>
                                    </div>
                                    <div className="flex flex-fit gap-3 bg-white rounded-lg">
                                        <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                            No HP BPU
                                        </h1>
                                        <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                            {misc?.no_hp}
                                        </h1>
                                    </div>
                                    <div className="flex flex-fit gap-3 bg-white rounded-lg">
                                        <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                            NIP
                                        </h1>
                                        <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                            {misc?.nip_pic}
                                        </h1>
                                    </div>
                                    <div className="flex flex-fit gap-3 bg-white rounded-lg">
                                        <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                            Nama Pimpinan BPU
                                        </h1>
                                        <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                            {misc?.nama_pic}
                                        </h1>
                                    </div>
                                    <div className="flex flex-fit gap-3 bg-white rounded-lg">
                                        <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                            Instagram
                                        </h1>
                                        <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                            {misc?.instagram}
                                        </h1>
                                    </div>
                                    <div className="flex flex-fit gap-3 bg-white rounded-lg">
                                        <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                            Website
                                        </h1>
                                        <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                            {misc?.laman_web}
                                        </h1>
                                    </div>
                                    <div className="flex flex-fit gap-3 bg-white rounded-lg">
                                        <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                            Email
                                        </h1>
                                        <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                            {misc?.email}
                                        </h1>
                                    </div>
                                    <div className="flex flex-row gap-3 rounded-lg">
                                        <div className="flex flex-col p-5 gap-3 bg-white rounded-lg">
                                            <h1 className="text-center text-md font-medium text-black">
                                                Logo BPU
                                            </h1>
                                        </div>
                                        <div className="flex flex-col p-5 gap-3 bg-white rounded-lg">
                                            <h1 className="text-center text-md font-medium text-black">
                                                Tanda Tangan Pimpinan
                                            </h1>
                                        </div>
                                    </div>

                                    <button className="bg-[#07393C] uppercase text-white font-bold py-2 px-4 rounded-xl w-full mr-2">
                                        Edit Data
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
