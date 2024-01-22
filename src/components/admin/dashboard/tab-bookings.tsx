import React, { useState, useEffect } from "react";
import splitData from "@/libs";
import FasilitasDTO from "@/interfaces/fasilitasDTO";
import Loading from "@/components/ui/loading";
import Pagination from "@/components/ui/pagination";
import { updateStatusBooking } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BookingDTO from "@/interfaces/bookingDTO";
import AccountDTO from "@/interfaces/accountDTO";

interface TabBookingsProps {
    data: BookingDTO[];
}

const TabBookings: React.FC<TabBookingsProps> = ({ data }) => {
    const [loading, setLoading] = useState(true);
    const [isDecline, setIsDecline] = useState(false);
    const [dataShow, setDataShow] = useState<BookingDTO[][]>([]);
    const [page, setPage] = useState(0);
    const [id, setId] = useState(0);
    const [keterangan, setKeterangan] = useState("");

    useEffect(() => {
        setDataShow(splitData(data, 6));

        if (dataShow.length > 0) {
            setLoading(false);
        }
    }, [data]);

    const handleTextArea = (e: any) => {
        setKeterangan(e.target.value);
    };

    const handleSubmit = async (
        id: number,
        status: string,
        keterangan: string | null
    ) => {
        if (isDecline && keterangan === "") {
            toast.error("Keterangan tolak harus di isi!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }
        const data = {
            status: status,
            keterangan_tolak: keterangan,
        };

        const res = await updateStatusBooking(id, data);

        if (res.status === true) {
            toast.success("Berhasil mengubah status booking", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            setIsDecline(false);
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

    const enterPressed = (
        e: React.KeyboardEvent<HTMLTextAreaElement>,
        id: number,
        status: string,
        keterangan: string | null
    ) => {
        if (e.key === "Enter") {
            handleSubmit(id, status, keterangan);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="flex flex-col text-black">
                <div className="relative grid grid-cols-3 mr-32 gap-5">
                    {dataShow.length > 0 ? (
                        dataShow[page].map((item, index) => (
                            <div
                                className="bg-white rounded-lg shadow-xl p-5 mr-5 mb-5 flex flex-col justify-between min-h-[330px] w-[330px]"
                                key={index}
                            >
                                <div className="text-[16px]">
                                    <p className=" font-bold">Nama Penyewa</p>
                                    <p className="font-regular mb-5 xl:mb-2">
                                        {item.Account.Mahasiswa[0]
                                            ? item.Account.Mahasiswa[0].nama
                                            : item.Account.UKM.length > 0
                                            ? item.Account.UKM[0].nama_ukm
                                            : item.Account.Organisasi.length > 0
                                            ? item.Account.Organisasi[0]
                                                  .nama_organisasi
                                            : item.Account.Umum[0].nama}
                                    </p>
                                    <p className="font-bold">Status Penyewa</p>
                                    <p className="font-regular mb-5 xl:mb-2">
                                        {item.Account.Mahasiswa[0]
                                            ? "Mahasiswa"
                                            : item.Account.UKM[0]
                                            ? "UKM"
                                            : item.Account.Organisasi[0]
                                            ? "Organisasi"
                                            : "Umum"}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <div className="">
                                            <p className="font-bold">
                                                Fasilitas
                                            </p>
                                            <p className="font-regular mb-5 ">
                                                {item.Fasilitas.nama}
                                            </p>
                                        </div>
                                        <div className="flex flex-col justify-end items-end">
                                            <p className="font-bold">
                                                Tanggal Pemesanan
                                            </p>
                                            <p className="font-regular mb-5 text-right">
                                                {new Date(
                                                    item.tanggal_pemesanan
                                                ).toLocaleDateString("id-ID", {
                                                    weekday: "long",
                                                    day: "numeric",
                                                    month: "long",
                                                    year: "numeric",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-between">
                                        <div className="flex-col text-left">
                                            <p className="font-bold">
                                                Lama pemesanan
                                            </p>
                                            <p className="font-regular">
                                                {item.durasi} Hari
                                            </p>
                                        </div>
                                        <div className="flex-col text-right">
                                            <p className="font-bold">Biaya</p>
                                            <p className="font-regular">
                                                Rp
                                                {item.total_harga
                                                    .toString()
                                                    .replace(
                                                        /\B(?=(\d{3})+(?!\d))/g,
                                                        "."
                                                    )}
                                            </p>
                                        </div>
                                    </div>
                                    <div
                                        className={`flex flex-row justify-between mt-6 ${
                                            isDecline &&
                                            item.id_pemesanan === id
                                                ? "hidden"
                                                : "block"
                                        }`}
                                    >
                                        <button
                                            className="text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-red-500"
                                            onClick={() => {
                                                setIsDecline(true);
                                                setId(item.id_pemesanan);
                                            }}
                                        >
                                            Decline Booking
                                        </button>
                                        <button
                                            className={`text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-[#07393C]`}
                                            onClick={() =>
                                                handleSubmit(
                                                    item.id_pemesanan,
                                                    "Menunggu Berkas",
                                                    null
                                                )
                                            }
                                        >
                                            Accept Booking
                                        </button>
                                    </div>
                                    <div
                                        className={`${
                                            isDecline &&
                                            item.id_pemesanan === id
                                                ? "block"
                                                : "hidden"
                                        }`}
                                    >
                                        <div className="mt-2">
                                            <h1>Keterangan Tolak</h1>
                                            <textarea
                                                name={`keterangan_tolak`}
                                                className="bg-white border-2 rounded-md w-full px-2 py-[2px] border-black"
                                                onChange={handleTextArea}
                                                onKeyDown={(e) =>
                                                    enterPressed(
                                                        e,
                                                        item.id_pemesanan,
                                                        "Dibatalkan",
                                                        keterangan
                                                    )
                                                }
                                            />
                                        </div>
                                        <div className="flex flex-row justify-end gap-2 mt-2">
                                            <button
                                                className="text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-red-500"
                                                onClick={() =>
                                                    setIsDecline(false)
                                                }
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className={`text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-[#07393C]`}
                                                onClick={() =>
                                                    handleSubmit(
                                                        item.id_pemesanan,
                                                        "Dibatalkan",
                                                        keterangan
                                                    )
                                                }
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="">
                            <div
                                className={`relative left-[120%] flex items-center justify-center${
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
        </>
    );
};

export default TabBookings;
