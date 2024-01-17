"use client";
import { useState, useEffect } from "react";

import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { usePathname } from "next/navigation";
import { getHargaFasilitas, editHargaFasilitas } from "@/hooks";
import Loading from "@/components/ui/loading";
import { parseJwt, getClientSideCookie } from "@/libs/auth";

export default function EditHarga() {
    const router = useRouter();
    const pathname = usePathname();
    const id = pathname.split("/")[4];
    const [loading, setLoading] = useState(true);
    const [harga, setHarga] = useState({
        nama_fasilitas: "",
        nama: "",
        harga: 0,
    });

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
            const harga = await getHargaFasilitas(Number(id));
            if (harga.status === true) {
                setHarga({
                    nama_fasilitas: harga.data.Fasilitas.nama,
                    nama: harga.data.nama,
                    harga: harga.data.harga,
                });
            }
        }

        initialize();
    }, []);

    const handleChanges = (e: any) => {
        setHarga({
            ...harga,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        if (harga.nama === "" || harga.harga === 0) {
            toast.error("Nama dan harga harus diisi", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }
        const { nama_fasilitas, ...data } = harga;
        const res = await editHargaFasilitas(Number(id), data);
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
                        <div className=" overflow-hidden rounded-lg">
                            <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                                <div className="flex flex-col p-4">
                                    <h1 className="px-4">Data Fasilitas</h1>
                                    <div className="flex flex-row p-4 gap-5">
                                        <input
                                            type="text"
                                            className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                            placeholder="Nama..."
                                            value={harga.nama_fasilitas}
                                            readOnly
                                        />
                                        <input
                                            name="nama"
                                            type="text"
                                            className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                            placeholder="Nama..."
                                            value={harga.nama}
                                            onChange={handleChanges}
                                        />
                                        <input
                                            name="harga"
                                            type="number"
                                            className="px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200"
                                            placeholder="Harga..."
                                            value={harga.harga}
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
