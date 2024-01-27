import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import Loading from "@/components/ui/loading";
import splitData from "@/libs";
import { decryptPassword } from "@/libs/auth";
import { updateStatusAccount } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Umum from "@/interfaces/usersDTO";
import Image from "next/image";
import ZoomComponent from "@/components/ui/zoom";

interface Props {
    data: Umum[];
}

const TabUmum: React.FC<Props> = ({ data }) => {
    const [eyeOpen, setEyeOpen] = useState(true);
    const [page, setPage] = useState(0);
    const [dataShow, setDataShow] = useState<Umum[] | any[]>([]);
    const [searchText, setSearchText] = useState("");
    const [dataFiltered, setDataFiltered] = useState<Umum[] | any[]>([]);
    const [buktiIdentitasShow, setBuktiIdentitasShow] = useState("");
    const [loading, setLoading] = useState(true);
    const [id, setId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const filteredDataUmum = data.filter((item) =>
            Object.values(item).some(
                (value) =>
                    typeof value === "string" &&
                    value.toLowerCase().includes(searchText.toLowerCase())
            )
        );

        setDataFiltered(splitData(filteredDataUmum, 3));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dataShow, searchText]);

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
            {isModalOpen && (
                <ZoomComponent
                    bukti={buktiIdentitasShow}
                    toggle={() => setIsModalOpen(false)}
                />
            )}
            <ToastContainer />
            <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                <input
                    className="w-auto h-[50px] px-5 py-3 bg-white border border-gray-300 rounded-xl text-[20px] font-bold outline-none"
                    type="text"
                    placeholder="Cari Users Umum. . ."
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="min-w-full rounded-lg overflow-hidden">
                    <div className="flex mt-5">
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[80px] rounded-tl-xl">
                            ID
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[120px]">
                            NIK
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[130px]">
                            Nama
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[150px]">
                            Email
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[200px]">
                            Password
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[140px]">
                            No Telepon
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[190px]">
                            Bukti Identitas
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[80px]">
                            Status
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[150px] rounded-tr-xl">
                            Action
                        </div>
                    </div>

                    <div className="bg-white divide-y divide-gray-200 text-black">
                        {dataFiltered.length > 0 ? (
                            dataFiltered[page].map(
                                (umum: Umum, index: number) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4  w-[80px] text-center">
                                            {umum.id_account}
                                        </div>
                                        <div className="px-6 py-4 break-all  w-[120px] text-center">
                                            {umum.NIK}
                                        </div>
                                        <div className="px-6 py-4 w-[130px] text-center ">
                                            {umum.nama}
                                        </div>
                                        <div className="px-6 py-4  break-all w-[150px] text-center">
                                            {umum.email}
                                        </div>
                                        <div className="px-6 py-4 break-all w-[200px] text-center flex items-center justify-between">
                                            <div className="">
                                                <h1
                                                    className={`${
                                                        eyeOpen ? "" : "hidden"
                                                    } text-[15px]`}
                                                >
                                                    {umum.password}
                                                </h1>
                                                <h1
                                                    className={`${
                                                        eyeOpen
                                                            ? "hidden"
                                                            : "block"
                                                    }`}
                                                >
                                                    {decryptPassword(
                                                        umum.password
                                                    )}
                                                </h1>
                                            </div>
                                            <div className="ml-1">
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
                                        <div className="px-6 py-4  w-[140px] text-center">
                                            <a
                                                href={`https://wa.me/${umum.no_telp}?text=Halo%20${umum.nama},%20Kami%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                            >
                                                {umum.no_telp}
                                            </a>
                                        </div>
                                        <div className="px-6 py-4 w-[190px] flex items-center justify-center">
                                            {umum.bukti_identitas
                                                .toLowerCase()
                                                .endsWith(".pdf") ? (
                                                <a
                                                    href={`${process.env.NEXT_PUBLIC_API_URL}/assets/${umum.bukti_identitas}`}
                                                    target="_blank"
                                                    className="cursor-pointer font-bold text-[#F0EDEE] bg-[#07393C] px-5 py-2 text-[13px] rounded-xl"
                                                >
                                                    View PDF
                                                </a>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setIsModalOpen(true);
                                                        setBuktiIdentitasShow(
                                                            umum.bukti_identitas
                                                        );
                                                    }}
                                                >
                                                    <Image
                                                        src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${umum.bukti_identitas}`}
                                                        alt="bukti-pembayaran"
                                                        width={120}
                                                        height={120}
                                                        className="rounded-lg h-[80px] w-[130px] object-cover"
                                                    />
                                                </button>
                                            )}
                                        </div>
                                        {umum.status ? (
                                            <div className="px-6 py-4  w-[80px] text-center text-green-800">
                                                Aktif
                                            </div>
                                        ) : (
                                            <div className="px-6 py-4  w-[80px] text-center text-red-500">
                                                Tidak Aktif
                                            </div>
                                        )}
                                        <div className="px-6 py-4  flex items-center justify-center w-[150px]">
                                            {umum.status ? (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-xl"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            umum.id_account,
                                                            umum.id,
                                                            false
                                                        )
                                                    }
                                                >
                                                    DeActive
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl"
                                                    onClick={() =>
                                                        handleUpdateStatus(
                                                            umum.id_account,
                                                            umum.id,
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
                                {loading ? (
                                    <div
                                        className={`relative left-[120%] flex items-center justify-center`}
                                    >
                                        <Loading />
                                    </div>
                                ) : (
                                    <div
                                        className={`text-white text-2xl w-[1000px]`}
                                    >
                                        Data kosong...
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <Pagination
                        totalPages={dataFiltered.length}
                        currentPage={page + 1}
                        handlePage={setPage}
                        totalData={data.length}
                    />
                </div>
            </div>
        </>
    );
};

export default TabUmum;
