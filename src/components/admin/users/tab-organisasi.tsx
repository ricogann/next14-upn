import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import Loading from "@/components/ui/loading";
import splitData from "@/libs";
import { decryptPassword } from "@/libs/auth";
import { updateStatusAccount } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Organisasi from "@/interfaces/usersDTO";

interface Props {
    data: Organisasi[];
}

const TabOrganisasi: React.FC<Props> = ({ data }) => {
    const [eyeOpen, setEyeOpen] = useState(true);
    const [page, setPage] = useState(0);
    const [dataShow, setDataShow] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(0);

    useEffect(() => {
        setDataShow(splitData(data, 3));
        setLoading(false);
    }, [data]);

    const handleUpdateStatus = async (
        id: number,
        id_account: number,
        status: boolean
    ) => {
        const data = {
            id: id_account,
            status_account: status,
        };

        const res = await updateStatusAccount(id, data);

        if (res.status === true) {
            toast.success("Berhasil mengubah status akun", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            window.location.reload();
        } else {
            toast.error(res.error, {
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
            <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                <input
                    className="w-auto h-[50px] px-5 py-3 bg-white border border-gray-300 rounded-xl text-[20px] font-bold outline-none"
                    type="text"
                    placeholder="Cari Users Umum. . ."
                />
                <div className="min-w-full rounded-lg overflow-hidden">
                    <div className="flex mt-5">
                        <div className="px-6 py-3 bg-[#07393C] text-left text-xs leading-4 font-medium uppercase w-[50px] rounded-tl-xl">
                            ID
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[120px]">
                            Nama Organisasi
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[150px]">
                            Email
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[220px]">
                            Password
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[150px]">
                            Nama Penanggung Jawab
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[150px]">
                            No Telepon
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[170px]">
                            Bukti Identitas
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[100px]">
                            Status
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[120px] rounded-tr-xl">
                            Action
                        </div>
                    </div>

                    <div className="flex flex-col rounded-b-lg bg-white divide-y divide-gray-200 text-black">
                        {dataShow.length > 0 ? (
                            dataShow[page].map(
                                (organisasi: Organisasi, index: number) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4 w-[50px]">
                                            {organisasi.id}
                                        </div>
                                        <div className="px-6 py-4 w-[120px] text-center text-[15px]">
                                            {organisasi.nama_organisasi}
                                        </div>
                                        <div className="px-6 py-4 w-[150px] break-all text-[15px]">
                                            {organisasi.email}
                                        </div>
                                        <div className="px-6 py-4 w-[220px] break-all text-[15px] flex items-center justify-between">
                                            <div className="">
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "" : "hidden"
                                                    }`}
                                                >
                                                    {organisasi.password}
                                                </h1>
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "hidden" : ""
                                                    }`}
                                                >
                                                    {decryptPassword(
                                                        organisasi.password
                                                    )}
                                                </h1>
                                            </div>
                                            <div className="">
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "" : "hidden"
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(false)
                                                    }
                                                >
                                                    <AiFillEye />
                                                </div>
                                                <div
                                                    className={`text-xl ${
                                                        eyeOpen ? "hidden" : ""
                                                    } cursor-pointer`}
                                                    onClick={() =>
                                                        setEyeOpen(true)
                                                    }
                                                >
                                                    <AiFillEyeInvisible />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="px-6 py-4 w-[150px] text-[15px]">
                                            {organisasi.nama_pj}
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[150px] ">
                                            <a
                                                href={`https://wa.me/${organisasi.no_telp}?text=Halo%20${organisasi.nama_pj}Halo,%20saya%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                            >
                                                {organisasi.no_telp}
                                            </a>
                                        </div>
                                        <div className="px-6 py-4 text-[15px] w-[170px]">
                                            <div className="cursor-pointer"></div>
                                        </div>
                                        {organisasi.status ? (
                                            <div className="px-6 py-4 text-[15px] text-green-800 font-semibold w-[100px]">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4 text-[15px] text-red-500 font-semibold w-[100px]">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[100px]">
                                            {organisasi.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            organisasi.id_account,
                                                            organisasi.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    DeActive
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 text-[15px] rounded-full"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            organisasi.id_account,
                                                            organisasi.id,
                                                            true
                                                        )
                                                    }
                                                >
                                                    Approve
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )
                            )
                        ) : (
                            <div className="">
                                <div
                                    className={`fixed w-full left-[55%] ${
                                        loading ? "" : "hidden"
                                    }`}
                                >
                                    <Loading />
                                </div>
                                <div
                                    className={`text-white text-2xl fixed w-full left-[55%] ${
                                        loading ? "hidden" : ""
                                    }`}
                                >
                                    Data Kosong
                                </div>
                            </div>
                        )}
                    </div>
                    <Pagination
                        totalPages={dataShow.length}
                        currentPage={page + 1}
                        handlePage={setPage}
                        totalData={data.length}
                    />
                </div>
            </div>
        </>
    );
};

export default TabOrganisasi;
