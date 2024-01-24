"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import {
    getFasilitasById,
    getBookingByIdFasilitas,
    getKamar,
    getHistoryKamar,
    updateActiveFasilitas,
} from "@/hooks";
import { BsFillPinMapFill } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { MdPayment, MdOutlineWatchLater } from "react-icons/md";
import EditFasilitas from "@/components/admin/fasilitas/edit-fasilitas";
import Loading from "@/components/ui/loading";
import { parseJwt, getClientSideCookie } from "@/libs/auth";
import { useRouter } from "next/navigation";
import TabHistoryBooking from "@/components/admin/fasilitas/tab-historybooking";
import TabKamarAsrama from "@/components/admin/fasilitas/tab-kamarasrama";
import TabHistoryKamar from "@/components/admin/fasilitas/tab-historykamar";
import Pagination from "@/components/ui/pagination";
import splitData from "@/libs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FasilitasDTO from "@/interfaces/fasilitasDTO";
import BookingDTO from "@/interfaces/bookingDTO";

export default function DetailFasilitasPage() {
    const pathname = usePathname();
    const id = pathname.split("/")[3];
    const [fasilitas, setFasilitas] = useState<FasilitasDTO>();
    const [kamar, setKamar] = useState([]);
    const [historyKamar, setHistoryKamar] = useState([]);
    const [booking, setBooking] = useState<BookingDTO[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [pageAsrama, setPageAsrama] = useState(0);
    const [pageHistoryKamar, setPageHistoryKamar] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [totalPageAsrama, setTotalPageAsrama] = useState(0);
    const [totalPageHistoryKamar, setTotalPageHistoryKamar] = useState(0);

    const [activeTab, setActiveTab] = useState("history");
    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const isTabActive = (tab: string) => activeTab === tab;
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
            const fasilitas = await getFasilitasById(id);
            const booking = await getBookingByIdFasilitas(id);
            const filteredBooking = booking.data.filter(
                (data: BookingDTO) =>
                    data.status === "Dikonfirmasi" ||
                    data.status === "Dibatalkan"
            );
            setFasilitas(fasilitas.data);
            setBooking(filteredBooking);
            setTotalPage(splitData(filteredBooking, 6).length);

            if (fasilitas.data.nama === "Asrama") {
                setActiveTab("kamarAsrama");
                const kamar = await getKamar();
                const historyKamar = await getHistoryKamar();
                setKamar(kamar.data);
                setHistoryKamar(historyKamar.data);
                setTotalPageHistoryKamar(
                    splitData(historyKamar.data, 6).length
                );
                setTotalPageAsrama(splitData(kamar.data, 6).length);
            }
        }

        initialize();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleActiveFasilitas = async (id: number, active: boolean) => {
        const res = await updateActiveFasilitas(id, { active: active });
        if (res.status === true) {
            toast.success("Ubah status fasilitas berhasil!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            window.location.reload();
        } else {
            toast.error("Ubah status fasilitas error!", {
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
                    <div className="p-10">
                        <div className="flex flex-col items-start justify-center text-white">
                            <h1 className="text-[45px] font-bold">
                                Detail Fasilitas
                            </h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                Halaman ini berisi detail fasilitas, anda dapat
                                mengubah data fasilitas pada halaman ini.
                            </h4>
                        </div>

                        <div
                            className={`flex bg-[#FFFFFF] gap-5 p-5 rounded-lg text-black ${
                                isEdit ? "hidden" : ""
                            }`}
                        >
                            <div className={`carousel w-[400px]`}>
                                {fasilitas && fasilitas.foto !== undefined ? (
                                    JSON.parse(fasilitas.foto).map(
                                        (foto: string, index: number) => {
                                            return (
                                                <div
                                                    id={`slide${index + 1}`}
                                                    className="carousel-item relative w-full"
                                                    key={index}
                                                >
                                                    <Image
                                                        src={`https://api.ricogann.com/assets/${foto}`}
                                                        width={400}
                                                        height={400}
                                                        className="rounded-lg"
                                                        alt="detail-fasilitas"
                                                        priority={true}
                                                    />
                                                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                                                        <a
                                                            href={
                                                                index === 0
                                                                    ? "#slide3"
                                                                    : `#slide${index}`
                                                            }
                                                            className="btn btn-circle"
                                                        >
                                                            ❮
                                                        </a>
                                                        <a
                                                            href={
                                                                index === 2
                                                                    ? "#slide1"
                                                                    : `#slide${
                                                                          index +
                                                                          2
                                                                      }`
                                                            }
                                                            className="btn btn-circle"
                                                        >
                                                            ❯
                                                        </a>
                                                    </div>
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className=""></div>
                                )}
                            </div>

                            <div
                                className={`flex flex-col gap-5 p-5  ${
                                    isEdit ? "hidden" : ""
                                }`}
                            >
                                <h1 className="text-[30px] font-bold">
                                    {fasilitas?.nama}
                                </h1>
                                <div className="flex flex-row gap-10">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <BsFillPinMapFill className="text-black font-medium text-3xl" />
                                            <h1 className="text-[12px] font-medium">
                                                {fasilitas?.alamat}
                                            </h1>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <BiBookmark className="text-black font-medium text-3xl" />
                                            <h1 className="text-[12px] font-medium">
                                                {fasilitas?.deskripsi}
                                            </h1>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MdPayment className="text-black font-medium text-3xl" />
                                            <h1 className="text-[12px] font-medium">
                                                {fasilitas?.no_va}
                                            </h1>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                            <h1 className="text-[12px] font-medium">
                                                {fasilitas?.jam_buka}
                                            </h1>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                            <h1 className="text-[12px] font-medium">
                                                {fasilitas?.jam_tutup}
                                            </h1>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                            <h1 className="text-[12px] font-medium">
                                                {fasilitas?.buka_hari}
                                            </h1>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button
                                        className={`border border-black w-[180px] bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-5 `}
                                        onClick={() => setIsEdit(true)}
                                    >
                                        Edit Fasilitas
                                    </button>
                                    <button
                                        className={`border border-black w-[270px] bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-5 ${
                                            fasilitas?.active ? "hidden" : ""
                                        }`}
                                        onClick={() =>
                                            handleActiveFasilitas(
                                                fasilitas?.id_fasilitas as number,
                                                true
                                            )
                                        }
                                    >
                                        BUKA BOOKING FASILITAS
                                    </button>
                                    <button
                                        className={`w-[270px] bg-red-500 p-2 rounded-lg text-white font-bold uppercase mt-5 ${
                                            fasilitas?.active ? "" : "hidden"
                                        }`}
                                        onClick={() =>
                                            handleActiveFasilitas(
                                                fasilitas?.id_fasilitas as number,
                                                false
                                            )
                                        }
                                    >
                                        TUTUP BOOKING FASILITAS
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={` ${isEdit ? "" : "hidden"}`}>
                            <EditFasilitas
                                data={fasilitas}
                                toggle={() => setIsEdit(false)}
                            />
                        </div>
                    </div>
                    <div className={` ${isEdit ? "hidden" : ""}`}>
                        <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE] mx-10">
                            <button
                                onClick={() => toggleTab("history")}
                                className={`text-[18] ${
                                    isTabActive("history")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                } ${
                                    fasilitas?.nama === "Asrama"
                                        ? "hidden"
                                        : "block"
                                }`}
                            >
                                History Booking
                            </button>
                            <button
                                onClick={() => toggleTab("kamarAsrama")}
                                className={`text-[18] ${
                                    isTabActive("kamarAsrama")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                } ${
                                    fasilitas?.nama === "Asrama"
                                        ? "block"
                                        : "hidden"
                                }`}
                            >
                                Kamar Asrama
                            </button>
                            <button
                                onClick={() => toggleTab("historyKamarAsrama")}
                                className={`text-[18] ${
                                    isTabActive("historyKamarAsrama")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                } ${
                                    fasilitas?.nama === "Asrama"
                                        ? "block"
                                        : "hidden"
                                }`}
                            >
                                History Kamar Asrama
                            </button>
                        </div>
                        <div className="mx-10">
                            <div
                                className={`
                            ${isTabActive("history") ? "block" : "hidden"}`}
                            >
                                <TabHistoryBooking
                                    data={booking}
                                    page={page}
                                    currentPage={page + 1}
                                    handlePage={setPage}
                                />
                            </div>
                            <div
                                className={`
                            ${isTabActive("kamarAsrama") ? "block" : "hidden"}`}
                            >
                                <TabKamarAsrama
                                    data={kamar}
                                    page={pageAsrama}
                                    currentPage={pageAsrama + 1}
                                    handlePage={setPageAsrama}
                                />
                            </div>
                            <div
                                className={`
                            ${
                                isTabActive("historyKamarAsrama")
                                    ? "block"
                                    : "hidden"
                            }`}
                            >
                                <TabHistoryKamar
                                    data={historyKamar}
                                    page={pageHistoryKamar}
                                    currentPage={pageHistoryKamar + 1}
                                    handlePage={setPageHistoryKamar}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
