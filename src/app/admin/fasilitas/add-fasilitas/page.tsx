"use client";
import { useState, useEffect } from "react";

import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import { addFasilitas } from "@/hooks";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "@/components/ui/loading";
import { parseJwt, getClientSideCookie } from "@/libs/auth";

export default function AddFasilitas() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cookie = getClientSideCookie();
        if (cookie.token === undefined) {
            router.push("/admin");
            return;
        } else if (parseJwt(cookie.token).role) {
            router.push("/");
            return;
        }
        setLoading(false);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [fasilitas, setFasilitas] = useState({
        nama: "",
        alamat: "",
        buka_hari: "",
        deskripsi: "",
        jam_buka: "",
        jam_tutup: "",
        no_va: "",
        foto: "",
        termservice: "",
    });

    const handleChanges = (e: any) => {
        if (e.target.name === "foto" || e.target.name === "termservice") {
            const files = Array.from(e.target.files || []);
            setFasilitas((prev) => ({
                ...prev,
                [e.target.name]: files,
            }));
        } else {
            setFasilitas((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleSubmit = async () => {
        if (
            fasilitas.nama === "" ||
            fasilitas.alamat === "" ||
            fasilitas.buka_hari === "" ||
            fasilitas.deskripsi === "" ||
            fasilitas.jam_buka === "" ||
            fasilitas.jam_tutup === "" ||
            fasilitas.no_va === "" ||
            fasilitas.foto === "" ||
            fasilitas.termservice === ""
        ) {
            toast.error("Semua data harus diisi!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }
        const res = await addFasilitas(fasilitas);
        if (res.status === true) {
            toast.success(res.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            router.push("/admin/fasilitas");
        } else {
            toast.error(res.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    };
    return (
        <>
            <ToastContainer />
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
                                Form Tambah Fasilitas
                            </h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                Form digunakan untuk menambah fasilitas baru
                            </h4>
                        </div>
                        <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                            <button>
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 border-b-2 border-[#FFA101] font-bold"`}
                                >
                                    Form Tambah Fasilitas
                                </h2>
                            </button>
                        </div>
                        <div className="overflow-hidden rounded-lg">
                            <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                                <div className="flex flex-col">
                                    <div className="flex flex-row p-4 gap-5">
                                        <div className="">
                                            <h1 className="mb-1">
                                                Nama Fasilitas
                                            </h1>
                                            <input
                                                name="nama"
                                                type="text"
                                                className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                placeholder="Nama Fasilitas..."
                                                onChange={handleChanges}
                                            />
                                        </div>

                                        <div className="">
                                            <h1 className="mb-1">
                                                Alamat Fasilitas
                                            </h1>
                                            <input
                                                name="alamat"
                                                type="text"
                                                className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                placeholder="Alamat..."
                                                onChange={handleChanges}
                                            />
                                        </div>
                                        <div className="">
                                            <h1 className="mb-1">Buka hari</h1>
                                            <input
                                                name="buka_hari"
                                                type="text"
                                                className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                placeholder="Buka Hari..."
                                                onChange={handleChanges}
                                            />
                                        </div>
                                    </div>
                                    <div className="pl-4 mb-3">
                                        <h1 className="text-[12px]">
                                            *Untuk menambah fasilitas Asrama,
                                            beri nama hanya Asrama
                                        </h1>
                                        <h1 className="text-[12px]">
                                            *Untuk menambah fasilitas Kantin,
                                            beri nama hanya Kantin
                                        </h1>
                                    </div>
                                    <div className="px-4">
                                        <h1 className="mb-1">
                                            Deskripsi Fasilitas
                                        </h1>
                                        <textarea
                                            name="deskripsi"
                                            placeholder="Deskripsi..."
                                            className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                            onChange={handleChanges}
                                        />
                                    </div>

                                    <div className="px-4 flex justify-between gap-5 mt-2">
                                        <div className="w-full">
                                            <h1 className="mb-1">Jam Buka</h1>
                                            <input
                                                name="jam_buka"
                                                type="time"
                                                placeholder="Jam Masuk..."
                                                className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                onChange={handleChanges}
                                            />
                                        </div>
                                        <div className="w-full">
                                            <h1 className="mb-1">Jam Tutup</h1>
                                            <input
                                                name="jam_tutup"
                                                type="time"
                                                placeholder="Jam Keluar..."
                                                className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                onChange={handleChanges}
                                            />
                                        </div>
                                    </div>

                                    <div className="p-4 flex justify-between gap-5">
                                        <div className="w-full">
                                            <h1 className="mb-1">
                                                Nomor Virtual Account
                                            </h1>
                                            <input
                                                name="no_va"
                                                type="string"
                                                placeholder="Nomor Virtual Account..."
                                                className="w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                                onChange={handleChanges}
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col px-4">
                                        <h1 className="mb-1">Foto Fasilitas</h1>
                                        <input
                                            name="foto"
                                            type="file"
                                            placeholder="input Files..."
                                            className="mb-1 w-full px-5 py-4 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                            accept=".png, .jpg, .jpeg"
                                            onChange={handleChanges}
                                        />
                                        <h1 className="mb-2 text-[12px]">
                                            *Upload foto dapat lebih dari satu
                                        </h1>
                                    </div>

                                    <div className="flex flex-col px-4">
                                        <h1 className="mb-1">
                                            Term Service Fasilitas
                                        </h1>
                                        <input
                                            name="termservice"
                                            type="file"
                                            placeholder="input Files..."
                                            className="mb-5 w-full px-5 py-4 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                            accept=".pdf"
                                            multiple={false}
                                            onChange={handleChanges}
                                        />
                                    </div>

                                    <button
                                        className="bg-[#07393C] text-white font-bold py-2 px-4 rounded-lg mx-4"
                                        onClick={handleSubmit}
                                    >
                                        SUBMIT
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
