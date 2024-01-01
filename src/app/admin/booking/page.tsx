"use client";
import { useState, useEffect } from "react";

import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";

import { getBooking } from "@/hooks";

export default function BookingPage() {
    const [bookings, setBookings] = useState([]);
    const [isDecline, setIsDecline] = useState(false);

    useEffect(() => {
        async function initialize() {
            const booking = await getBooking();
            setBookings(booking.data);
        }
        initialize();
    }, []);

    return (
        <>
            <div className="">
                <div className="xl:hidden">
                    <Error />
                </div>

                <div className="hidden xl:flex">
                    <div className="">
                        <Sidebar />
                    </div>

                    <div className="hidden xl:block bg-[#2C666E] min-h-screen flex-1 overflow-hidden">
                        <div className="p-10">
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[45px] font-bold">
                                    Booking
                                </h1>
                                <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                    Tabel data booking
                                </h4>
                            </div>
                            <div className="flex items-start mb-5 border-b border-[#E2E7EE]">
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 border-b-2 border-[#FFA101] font-bold`}
                                >
                                    Booking
                                </h2>
                            </div>
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
                                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[130px]">
                                        Nama Fasilitas
                                    </h1>
                                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[200px]">
                                        Nama Penyewa
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
                                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[238px] rounded-tr-xl">
                                        Action
                                    </h1>
                                </div>
                            </div>
                            <div className="bg-white divide-y divide-gray-200 text-black">
                                {bookings.map((data, index) => (
                                    <div className="flex" key={index}>
                                        <div className="px-6 py-4 whitespace-no-wrap text-[15px] w-[70px]">
                                            {data.id_pemesanan}
                                        </div>
                                        <div className="px-6 py-4 whitespace-no-wrap w-[130px] text-[15px] text-center">
                                            {data.Fasilitas &&
                                                data.Fasilitas.nama}
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
                                                new Date(
                                                    data.tanggal_pemesanan
                                                ).getTime() +
                                                    data.durasi *
                                                        24 *
                                                        60 *
                                                        60 *
                                                        1000
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
                                                .replace(
                                                    /\B(?=(\d{3})+(?!\d))/g,
                                                    "."
                                                )}
                                        </div>

                                        <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[238px]">
                                            {data.bukti_pembayaran !== null ? (
                                                <button
                                                    className={`${
                                                        data.status ===
                                                        "Menunggu Konfirmasi"
                                                            ? "hidden"
                                                            : "block"
                                                    } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[10px]`}
                                                >
                                                    Bukti Pembayaran
                                                </button>
                                            ) : (
                                                <a
                                                    href={`https://api.ricogann.com/assets/${data.SIK}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mr-2 text-[10px]"
                                                >
                                                    Open PDF
                                                </a>
                                            )}

                                            <div
                                                className={`${
                                                    data.status ===
                                                        "Menunggu Konfirmasi" ||
                                                    data.status ===
                                                        "Review Berkas"
                                                        ? "flex flex-col gap-2"
                                                        : "hidden"
                                                }`}
                                            >
                                                <button
                                                    className={`} bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-[13px]`}
                                                >
                                                    Decline
                                                </button>
                                                <button
                                                    className={`${
                                                        data.status ===
                                                            "Review Berkas" ||
                                                        data.status ===
                                                            "Menunggu Konfirmasi"
                                                            ? "block"
                                                            : "hidden"
                                                    } bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full text-[13px]`}
                                                >
                                                    Approve
                                                </button>
                                                <div
                                                    className={`${
                                                        isDecline
                                                            ? "block"
                                                            : "hidden"
                                                    }`}
                                                >
                                                    <input
                                                        type="text"
                                                        name={`keterangan_tolak`}
                                                        className={` bg-white border-2 rounded-md w-full px-2 py-[2px] border-black`}
                                                    />
                                                    <div
                                                        className={` flex justify-center gap-3`}
                                                    >
                                                        <button
                                                            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-[13px]`}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-[13px]`}
                                                        >
                                                            Save
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
