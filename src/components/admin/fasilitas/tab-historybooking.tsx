import React, { useState, useEffect } from "react";
import splitData from "@/libs";
import Loading from "../../ui/loading";
import BookingDTO from "@/interfaces/bookingDTO";

interface Props {
    data: BookingDTO[];
    page: number;
}

const TabHistoryBooking: React.FC<Props> = ({ data, page }) => {
    const [booking, setBooking] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setBooking(splitData(data, 6));
        setLoading(false);
    }, [data]);
    return (
        <>
            <div className="flex flex-col overflow-hidden rounded-lg">
                <div className="flex flex-row relative overflow-hidden mb-5">
                    <input
                        className="w-auto h-[50px] px-5 py-3 bg-white border border-gray-300 rounded-xl text-[20px] font-bold outline-none"
                        type="text"
                        placeholder="Cari Data Booking . . ."
                    />
                </div>
            </div>
            <div className="divide-y divide-gray-200">
                <div className="flex">
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[70px] rounded-tl-xl">
                        ID
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[200px]">
                        Nama Penyewa
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[170px]">
                        No Handphone
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[150px]">
                        Tanggal Pemesanan
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[150px]">
                        Tanggal Selesai
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[137px]">
                        Status
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[140px]">
                        Total Harga
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[200px] rounded-tr-xl">
                        Berkas
                    </h1>
                </div>
            </div>
            <div className="bg-white rounded-b-lg divide-y divide-gray-200 text-black">
                {booking.length ? (
                    booking[page].map((data: BookingDTO, index: number) => (
                        <div className="flex" key={index}>
                            <div className="px-6 py-4 whitespace-no-wrap text-[15px] w-[70px]">
                                {data.id_pemesanan}
                            </div>
                            <div className="px-6 py-4 break-all w-[200px] text-[15px] text-center">
                                {data.Account.Mahasiswa.length > 0
                                    ? data.Account.Mahasiswa[0].nama
                                    : data.Account.UKM.length > 0
                                    ? data.Account.UKM[0].nama_ukm
                                    : data.Account.Umum.length > 0
                                    ? data.Account.Umum[0].nama
                                    : data.Account.Organisasi[0]
                                          .nama_organisasi}
                            </div>
                            <div className="px-6 py-4 break-all w-[170px] text-[15px] text-center">
                                {data.Account.Mahasiswa.length > 0
                                    ? data.Account.Mahasiswa[0].no_telp
                                    : data.Account.UKM.length > 0
                                    ? data.Account.UKM[0].no_telp
                                    : data.Account.Umum.length > 0
                                    ? data.Account.Umum[0].no_telp
                                    : data.Account.Organisasi[0].no_telp}
                            </div>
                            <div className="px-6 py-4 break-all text-center w-[150px] text-[15px]">
                                {new Date(
                                    data.tanggal_pemesanan
                                ).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                            <div className="px-6 py-4 break-all text-center w-[150px]">
                                {new Date(
                                    new Date(data.tanggal_pemesanan).getTime() +
                                        data.durasi * 24 * 60 * 60 * 1000
                                ).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}
                            </div>
                            <div className="px-6 py-4 break-all w-[137px] text-[15px] text-center">
                                {data.status}
                            </div>
                            <div className="px-6 py-4 break-all w-[140px] text-[15px] text-center">
                                Rp
                                {data.total_harga
                                    .toString()
                                    .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                            </div>

                            <div
                                className={`px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]`}
                            >
                                <div className={``}>
                                    {data.bukti_pembayaran !== null ? (
                                        <button
                                            className={`${
                                                data.status ===
                                                "Menunggu Konfirmasi"
                                                    ? "hidden"
                                                    : "block"
                                            } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[10px]`}
                                            onClick={() => {
                                                window.open(
                                                    `${process.env.NEXT_PUBLIC_API_URL}/assets/${data.bukti_pembayaran}`,
                                                    "_blank"
                                                );
                                            }}
                                        >
                                            Bukti Pembayaran
                                        </button>
                                    ) : (
                                        <button
                                            className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[10px] ${
                                                data.status === "Dibatalkan" ||
                                                data.status ===
                                                    "Menunggu Berkas" ||
                                                data.status ===
                                                    "Menunggu Konfirmasi"
                                                    ? "hidden"
                                                    : "block"
                                            }`}
                                            onClick={() => {
                                                window.open(
                                                    `${process.env.NEXT_PUBLIC_API_URL}/assets/${data.SIK}`,
                                                    "_blank"
                                                );
                                            }}
                                        >
                                            Open PDF
                                        </button>
                                    )}
                                </div>

                                <div
                                    className={`${
                                        data.status === "Menunggu Konfirmasi" ||
                                        data.status === "Review Berkas"
                                            ? "flex flex-col gap-2"
                                            : "hidden"
                                    }`}
                                ></div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="">
                        <div
                            className={`fixed w-full mt-10 left-[55%] ${
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
        </>
    );
};

export default TabHistoryBooking;
