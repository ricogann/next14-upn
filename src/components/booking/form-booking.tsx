import { BsFillPersonFill, BsFillCalendarFill } from "react-icons/bs";
import { BiSolidTimer, BiSolidPhoneCall, BiSolidPencil } from "react-icons/bi";
import { AiFillClockCircle } from "react-icons/ai";
import { FaDollarSign } from "react-icons/fa";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import FasilitasDTO from "@/interfaces/fasilitasDTO";
import BookingDTO from "@/interfaces/bookingDTO";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

import { getHargaFasilitas, createBooking } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../ui/loading";

type FormBookingProps = {
    booking?: BookingDTO[];
    fasilitas?: FasilitasDTO;
};

const FormBooking: React.FC<FormBookingProps> = ({ booking, fasilitas }) => {
    const path = usePathname();
    const router = useRouter();
    const [harga, setHarga] = useState([]);
    const [account, setAccount] = useState({
        nama: "",
        no_telp: "",
        role: "",
    });

    const [isAvailable, setIsAvailable] = useState(true);
    const [isWeekend, setIsWeekend] = useState(false);
    const [errorTime, setErrorTime] = useState({
        status: false,
        message: "",
    });
    const [isLongTerm, setIsLongTerm] = useState(false);
    const [loading, setLoading] = useState(false);

    const [pesan, setPesan] = useState({
        id_fasilitas: 0,
        id_account: 0,
        id_harga: 0,
        tanggal_pemesanan: "",
        jam_checkin: "00:00",
        jam_checkout: "00:00",
        durasi: 1,
        harga: 0,
        total_harga: 0,
        keterangan: "",
        status: "Menunggu Konfirmasi",
    });

    useEffect(() => {
        async function initialize() {
            const token = Cookies.get("CERT");
            if (token) {
                const data = JSON.parse(atob(token.split(".")[1]));

                setAccount({
                    nama: data.nama,
                    no_telp: data.no_telp,
                    role: data.role,
                });

                const harga = await getHargaFasilitas(
                    Number(path.split("/")[2])
                );

                setHarga(harga.data);
                setPesan({
                    ...pesan,
                    id_account: data.id_account,
                    id_fasilitas: Number(path.split("/")[2]),
                    harga: harga.data[0].harga,
                    id_harga: harga.data[0].id,
                    jam_checkin: fasilitas?.jam_buka ?? "00:00",
                    jam_checkout: fasilitas?.jam_tutup ?? "00:00",
                });
            }

            if (fasilitas?.nama === "Asrama") {
                setIsLongTerm(true);
            }

            if (isLongTerm && account.role !== "mahasiswa") {
                window.location.href = "/";
            }
        }

        if (fasilitas) {
            initialize();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fasilitas]);

    useEffect(() => {
        const booked = booking?.filter(
            (book) =>
                book.tanggal_pemesanan.split("T")[0] ===
                    pesan.tanggal_pemesanan &&
                book.id_fasilitas === pesan.id_fasilitas
        );

        if (
            (booked && booked.length > 0) ||
            pesan.tanggal_pemesanan < new Date().toISOString().split("T")[0]
        ) {
            setIsAvailable(false);
        } else {
            setIsAvailable(true);
        }

        if (account.role === "organisasi") {
            checkWeekend(pesan.tanggal_pemesanan);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pesan.tanggal_pemesanan]);

    const handleChanges = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
        >
    ) => {
        if (e.target.name === "jam_checkin") {
            const [hour, minute] = e.target.value.split(":").map(Number);

            setPesan({
                ...pesan,
                [e.target.name]: e.target.value,
            });

            const newHour = (hour + 1) % 24;

            pesan.jam_checkout = `${String(newHour).padStart(2, "0")}:${String(
                minute
            ).padStart(2, "0")}`;

            let errorMessage = "";

            const minutes_checkin = Number(pesan.jam_checkout.split(":")[1]);
            const minutes_checkout = Number(e.target.value.split(":")[1]);

            if (minutes_checkin !== minutes_checkout) {
                errorMessage = "Durasi fasilitas harus berkelipatan 1 jam!";
            } else {
                errorMessage = "";
            }

            setErrorTime({
                status: errorMessage !== "",
                message: errorMessage,
            });
        }
        if (e.target.name === "jam_checkout") {
            setPesan({
                ...pesan,
                [e.target.name]: e.target.value,
            });

            let errorMessage = "";

            const minutes_checkin = Number(pesan.jam_checkin.split(":")[1]);
            const minutes_checkout = Number(e.target.value.split(":")[1]);

            if (e.target.value <= pesan.jam_checkin) {
                errorMessage =
                    "Jam Checkout tidak boleh lebih kecil dari jam buka!";
            } else if (minutes_checkin !== minutes_checkout) {
                errorMessage = "Durasi fasilitas harus berkelipatan 1 jam!";
            } else {
                errorMessage = "";
            }

            setErrorTime({
                status: errorMessage !== "",
                message: errorMessage,
            });
        }

        if (e.target.name === "harga") {
            const harga = e.target.value.split(",");
            setPesan({
                ...pesan,
                [e.target.name]: Number(harga[1]),
                id_harga: Number(harga[0]),
            });
        } else {
            setPesan({
                ...pesan,
                [e.target.name]: e.target.value,
            });
        }
    };

    const handleSubmit = async () => {
        if (isLongTerm) {
            pesan.tanggal_pemesanan = new Date().toISOString().split("T")[0];
            pesan.total_harga = pesan.harga * 2 + 250000;
        } else {
            pesan.total_harga = pesan.harga * pesan.durasi * durationHours();
        }

        if (pesan.tanggal_pemesanan === "" || pesan.keterangan === "") {
            toast.error("Mohon isi semua form!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }

        const { harga, ...data } = pesan;
        data.durasi = Number(data.durasi);

        const res = await createBooking(data);

        if (res.status === true) {
            toast.success("Berhasil melakukan pemesanan!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            setTimeout(() => {
                setLoading(true);
                router.push("/profile");
            }, 3000);
        } else {
            toast.error("Gagal melakukan pemesanan!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
        }
    };

    const checkWeekend = (date: string) => {
        const day = new Date(date).getDay();
        if (day === 6 || day === 0) {
            setIsWeekend(true);
        } else {
            setIsWeekend(false);
        }
    };

    const durationHours = () => {
        const jam_checkin = pesan.jam_checkin;
        const jam_checkout = pesan.jam_checkout;
        const checkin = jam_checkin.split(":")[0];
        const checkout = jam_checkout.split(":")[0];

        const duration = Number(checkout) - Number(checkin);

        return duration;
    };

    return (
        <>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 backdrop-blur-md">
                    <Loading />
                </div>
            )}
            <ToastContainer />
            <div className="flex flex-col xl:gap-4 xl:p-8 lg:bg-[#FFFFFF] rounded-[15px] lg:flex-1 mt-5 xl:mt-[7px]">
                <div className="">
                    <h2 className="text-[12px] lg:text-[18px] mb-1 text-white lg:text-[#0A090C] font-semibold ">
                        Nama
                    </h2>
                    <div className="  bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-lg lg:bg-[#F7F8FA]  lg:flex-row ">
                        <BsFillPersonFill className="text-[#0A090C] md:text-2xl" />
                        <input
                            name={`nama`}
                            type="text"
                            className="text-[12px] lg:text-[14px] ml-2 w-full p-1 text-[#0A090C] font-regular bg-[#fff] xl:bg-[#F7F8FA]"
                            value={account.nama}
                            readOnly
                        />
                    </div>
                </div>
                {/* Short Term Fasilitas */}
                <div className={`${isLongTerm === true ? "hidden" : "block"}`}>
                    <div className="mt-2">
                        <h2
                            className={`text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold`}
                        >
                            Tanggal
                        </h2>
                        <div
                            className={`bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-lg lg:bg-[#F7F8FA] lg:flex-row`}
                        >
                            <BsFillCalendarFill className="text-[#0A090C] md:text-xl" />
                            <input
                                name={`tanggal_pemesanan`}
                                type="date"
                                min={new Date().toISOString().split("T")[0]}
                                className="text-[12px] lg:text-[14px] ml-4 rounded bg-[#fff] xl:bg-[#F7F8FA] text-[#0A090C]"
                                onChange={handleChanges}
                            />
                        </div>
                        <h2
                            className={`${
                                isAvailable ? "hidden" : "block"
                            } mt-2 text-[12px] lg:text-[15px] my-1 text-red-500 font-semibold`}
                        >
                            Fasilitas Tidak Tersedia Pada Tanggal Ini!
                        </h2>
                    </div>
                    <div className={``}>
                        <h2
                            className={`text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold`}
                        >
                            Lama Hari
                        </h2>
                        <div className="  bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-lg lg:bg-[#F7F8FA]  lg:flex-row ">
                            <BiSolidTimer className="text-[#0A090C] md:text-2xl" />
                            <input
                                name={`durasi`}
                                type="number"
                                className="text-[12px] lg:text-[14px] ml-2 w-full p-1 text-[#0A090C] font-regular bg-[#fff] xl:bg-[#F7F8FA]"
                                value={pesan.durasi ?? 0}
                                onChange={handleChanges}
                            />
                        </div>
                    </div>
                    <div
                        className={`${
                            account?.role === "umum" ||
                            (account?.role === "organisasi" &&
                                isWeekend === true)
                                ? "hidden"
                                : "block"
                        }`}
                    >
                        <div className={`mt-2`}>
                            <h2 className="text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold ">
                                Jam Checkin
                            </h2>
                            <div className="  bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row ">
                                <AiFillClockCircle className="text-[#0A090C] text-xl" />
                                <input
                                    id="jam_checkin"
                                    name="jam_checkin"
                                    type="time"
                                    className=" text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa]"
                                    value={fasilitas?.jam_buka ?? "00:00"}
                                    readOnly
                                />
                            </div>
                        </div>
                        <div className={`mt-2`}>
                            <h2 className="text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold ">
                                Jam Checkout
                            </h2>
                            <div className="  bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row ">
                                <AiFillClockCircle className="text-[#0A090C] text-xl" />
                                <input
                                    id="jam_checkout"
                                    name="jam_checkout"
                                    type="time"
                                    className=" text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa]"
                                    value={fasilitas?.jam_tutup ?? "00:00"}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
                    <div
                        className={`${
                            account?.role === "umum" ||
                            (account?.role === "organisasi" &&
                                isWeekend === true)
                                ? "block"
                                : "hidden"
                        }`}
                    >
                        <div className={`mt-2`}>
                            <h2 className="text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold ">
                                Jam Checkin
                            </h2>
                            <div className="  bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row ">
                                <AiFillClockCircle className="text-[#0A090C] text-xl" />
                                <input
                                    id="jam_checkin"
                                    name="jam_checkin"
                                    type="time"
                                    className=" text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa]"
                                    value={pesan.jam_checkin}
                                    onChange={handleChanges}
                                />
                            </div>
                        </div>
                        <div className={`mt-2`}>
                            <h2 className="text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold ">
                                Jam Checkout
                            </h2>
                            <div className="  bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row ">
                                <AiFillClockCircle className="text-[#0A090C] text-xl" />
                                <input
                                    id="jam_checkout"
                                    name="jam_checkout"
                                    type="time"
                                    className=" text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa]"
                                    value={pesan.jam_checkout}
                                    onChange={handleChanges}
                                />
                            </div>
                        </div>
                        <h2
                            className={`${
                                errorTime.status ? "block" : "hidden"
                            } mt-2 text-[12px] lg:text-[18px] my-1 text-red-500 font-semibold`}
                        >
                            {errorTime.message}
                        </h2>
                    </div>
                    <div
                        className={`${
                            account?.role === "umum" ||
                            (account?.role === "organisasi" &&
                                isWeekend === true)
                                ? "block"
                                : "hidden"
                        }`}
                    >
                        <div className={`mt-2`}>
                            <h2
                                className={`text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold `}
                            >
                                Tipe Harga
                            </h2>
                            <div
                                className={`bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-[15px] lg:bg-[#F7F8FA] lg:flex-row `}
                            >
                                <AiFillClockCircle className="text-[#0A090C] text-xl" />
                                <select
                                    name={`harga`}
                                    className=" text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] font-semibold bg-[#fff] xl:bg-[#f7f8fa] w-full"
                                    onChange={handleChanges}
                                >
                                    {harga &&
                                        harga.map(
                                            (harga: any, index: number) => {
                                                return (
                                                    <option
                                                        value={[
                                                            harga.id,
                                                            harga.harga,
                                                        ]}
                                                        key={index}
                                                    >
                                                        {harga.nama}
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2
                                className={`text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold `}
                            >
                                Biaya
                            </h2>
                            <div
                                className={`bg-[#FFFFFF] flex items-center p-2 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row`}
                            >
                                <FaDollarSign className="text-[#0A090C] text-xl" />
                                <input
                                    type="text"
                                    className={`text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa]`}
                                    readOnly
                                    value={`Rp${(
                                        pesan.harga *
                                        pesan.durasi *
                                        durationHours()
                                    )
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}`}
                                    onChange={handleChanges}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Long Term Fasilitas */}
                <div className={`${isLongTerm ? "block" : "hidden"}`}>
                    <div
                        className={`${
                            account.role !== "mahasiswa" ? "hidden" : "block"
                        }`}
                    >
                        <div className={`mt-2`}>
                            <h2
                                className={`text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold `}
                            >
                                Tipe Fasilitas
                            </h2>
                            <div
                                className={`bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-[15px] lg:bg-[#F7F8FA] lg:flex-row `}
                            >
                                <AiFillClockCircle className="text-[#0A090C] text-xl" />
                                <select
                                    name={`harga`}
                                    className=" text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] font-semibold bg-[#fff] xl:bg-[#f7f8fa] w-full"
                                    onChange={handleChanges}
                                >
                                    {harga &&
                                        harga.map(
                                            (harga: any, index: number) => {
                                                return (
                                                    <option
                                                        value={[
                                                            harga.id,
                                                            harga.harga,
                                                        ]}
                                                        key={index}
                                                    >
                                                        {harga.nama}
                                                    </option>
                                                );
                                            }
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className="mt-2">
                            <h2
                                className={`text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold `}
                            >
                                Biaya
                            </h2>
                            <div
                                className={`bg-[#FFFFFF] flex items-center p-2 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row`}
                            >
                                <FaDollarSign className="text-[#0A090C] text-xl" />
                                <input
                                    type="text"
                                    className={`text-[12px] lg:text-[14px] ml-4 rounded text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa]`}
                                    readOnly
                                    value={`Rp${pesan.harga
                                        .toString()
                                        .replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            "."
                                        )}`}
                                    onChange={handleChanges}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-0">
                    <h2 className="text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold ">
                        No. Telp
                    </h2>
                    <div className="  bg-[#FFFFFF] flex items-center p-2 md:p-3 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row ">
                        <BiSolidPhoneCall className="text-[#0A090C] text-xl" />
                        <input
                            type="number"
                            className="text-[12px] lg:text-[14px] ml-4 text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa] rounded"
                            value={account.no_telp ?? ""}
                            readOnly
                        />
                    </div>
                </div>
                <div className="mt-2">
                    <h2 className="text-[12px] lg:text-[18px] my-1 text-white lg:text-[#0A090C] font-semibold ">
                        Keterangan
                    </h2>
                    <div className="  bg-[#FFFFFF] flex items-center p-2 rounded-[15px] lg:bg-[#F7F8FA]  lg:flex-row ">
                        <BiSolidPencil className="text-[#0A090C]" />
                        <textarea
                            name="keterangan"
                            className="text-[12px] lg:text-[12px] ml-2 text-[#0A090C] bg-[#fff] xl:bg-[#f7f8fa] rounded w-full h-full"
                            placeholder="Saya meminjam fasilitas ini untuk..."
                            onChange={handleChanges}
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <p className="lg:text-[#0A090C]">
                        Dengan Melakukan Transaksi Maka Anda telah menyetujui
                        semua kesepakatan. Untuk informasi lebih lanjut, silakan
                        kunjungi{" "}
                        {
                            <a
                                className="text-[#FFA500]"
                                href={``}
                                target="_blank"
                            >
                                halaman kebijakan kami
                            </a>
                        }
                    </p>
                </div>

                <button
                    className={` bg-[#07393C] hover:bg-[#2C666E] text-[#F0EDEE] font-bold py-2 px-4 rounded-lg mt-7`}
                    onClick={handleSubmit}
                >
                    Continue
                </button>
            </div>
        </>
    );
};

export default FormBooking;
