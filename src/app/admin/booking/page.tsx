"use client";
import { useState, useEffect } from "react";
import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import Loading from "@/components/ui/loading";
import Pagination from "@/components/ui/pagination";
import { getBooking, updateStatusBooking } from "@/hooks";
import splitData from "@/libs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { parseJwt, getClientSideCookie } from "@/libs/auth";
import { useRouter } from "next/navigation";
import BookingDTO from "@/interfaces/bookingDTO";

export default function BookingPage() {
    const [bookings, setBookings] = useState<BookingDTO[]>([]);
    const [isDecline, setIsDecline] = useState(false);
    const [booking, setBooking] = useState<BookingDTO[][]>([]);
    const [bookingFiltered, setBookingFiltered] = useState<BookingDTO[][]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [id, setId] = useState(0);
    const [keterangan, setKeterangan] = useState("");
    const [searchText, setSearchText] = useState("");
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
            const booking = await getBooking();
            booking.data.sort((a: BookingDTO, b: BookingDTO) => {
                return (
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                );
            });
            const split = splitData(booking.data, 6);
            setBookings(booking.data);
            setBooking(split);
            setLoading(false);
        }
        initialize();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const filteredData = bookings.filter((item) =>
            Object.values(item).some((value) => {
                if (
                    typeof value === "string" ||
                    typeof value === "number" ||
                    value instanceof Date
                ) {
                    const stringValue =
                        typeof value === "string" ? value : String(value);

                    return stringValue
                        .toLowerCase()
                        .includes(searchText.toLowerCase());
                } else {
                    if (value && "status" in value) {
                        return value.status
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if (value && "total_harga" in value) {
                        return value.total_harga
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if (value && "tanggal_pemesanan" in value) {
                        return value.tanggal_pemesanan
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if (value && "Fasilitas.nama" in value) {
                        return value.Fasilitas.nama
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if (value && "id_pemesanan" in value) {
                        return value.id_pemesanan
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    }
                }
                return false;
            })
        );

        setBookingFiltered(splitData(filteredData, 6));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [booking, searchText]);

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
            <div className="">
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
                    <div className="">
                        <Sidebar />
                    </div>

                    <div className="hidden xl:block bg-[#2C666E] min-h-screen flex-1 overflow-hidden">
                        <div className="p-10 text-white">
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
                                        onChange={(e) =>
                                            setSearchText(e.target.value)
                                        }
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
                            <div className="bg-white rounded-b-lg divide-y divide-gray-200 text-black">
                                {bookingFiltered.length > 0 ? (
                                    bookingFiltered[page].map((data, index) => (
                                        <div className="flex" key={index}>
                                            <div className="px-6 py-4 whitespace-no-wrap text-[15px] w-[70px]">
                                                {data.id_pemesanan}
                                            </div>
                                            <div className="px-6 py-4 whitespace-no-wrap w-[130px] text-[15px] text-center">
                                                {data.Fasilitas &&
                                                    data.Fasilitas.nama}
                                            </div>
                                            <div className="px-6 py-4 break-all w-[200px] text-[15px] text-center">
                                                {data.Account.Mahasiswa.length >
                                                0
                                                    ? data.Account.Mahasiswa[0]
                                                          .nama
                                                    : data.Account.UKM.length >
                                                      0
                                                    ? data.Account.UKM[0]
                                                          .nama_ukm
                                                    : data.Account.Umum.length >
                                                      0
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

                                            <div
                                                className={`px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[238px]`}
                                            >
                                                <div
                                                    className={`${
                                                        isDecline &&
                                                        id === data.id_pemesanan
                                                            ? "hidden"
                                                            : ""
                                                    }`}
                                                >
                                                    {data.bukti_pembayaran !==
                                                    null ? (
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
                                                                data.status ===
                                                                    "Dibatalkan" ||
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
                                                        data.status ===
                                                            "Menunggu Konfirmasi" ||
                                                        data.status ===
                                                            "Review Berkas"
                                                            ? "flex flex-col gap-2"
                                                            : "hidden"
                                                    }`}
                                                >
                                                    <div
                                                        className={`${
                                                            isDecline &&
                                                            id ===
                                                                data.id_pemesanan
                                                                ? "hidden"
                                                                : "block"
                                                        } flex flex-col gap-2
                                                    `}
                                                    >
                                                        <button
                                                            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full text-[13px]`}
                                                            onClick={() => {
                                                                setIsDecline(
                                                                    true
                                                                );
                                                                setId(
                                                                    data.id_pemesanan
                                                                );
                                                            }}
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
                                                            onClick={() =>
                                                                handleSubmit(
                                                                    data.id_pemesanan,
                                                                    data.status ===
                                                                        "Review Berkas"
                                                                        ? "Dikonfirmasi"
                                                                        : "Menunggu Berkas",
                                                                    keterangan
                                                                )
                                                            }
                                                        >
                                                            Approve
                                                        </button>
                                                    </div>
                                                    <div
                                                        className={`${
                                                            isDecline &&
                                                            id ===
                                                                data.id_pemesanan
                                                                ? "block"
                                                                : "hidden"
                                                        }`}
                                                    >
                                                        <textarea
                                                            name={`keterangan_tolak`}
                                                            className={` bg-white border-2 rounded-md w-full px-2 py-[2px] border-black`}
                                                            onChange={
                                                                handleTextArea
                                                            }
                                                            onKeyDown={(e) =>
                                                                enterPressed(
                                                                    e,
                                                                    data.id_pemesanan,
                                                                    "Dibatalkan",
                                                                    keterangan
                                                                )
                                                            }
                                                        />
                                                        <div
                                                            className={`mt-2 flex justify-center gap-3`}
                                                        >
                                                            <button
                                                                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md text-[13px]`}
                                                                onClick={() => {
                                                                    setIsDecline(
                                                                        false
                                                                    );
                                                                }}
                                                            >
                                                                Cancel
                                                            </button>
                                                            <button
                                                                className={`bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md text-[13px]`}
                                                                onClick={() =>
                                                                    handleSubmit(
                                                                        data.id_pemesanan,
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
                            <Pagination
                                totalPages={bookingFiltered.length}
                                currentPage={page + 1}
                                handlePage={setPage}
                                totalData={bookings.length}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
