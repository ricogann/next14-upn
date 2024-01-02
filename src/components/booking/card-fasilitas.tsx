import { BiCalendar } from "react-icons/bi";
import { HiLocationMarker } from "react-icons/hi";
import { MdPayment } from "react-icons/md";
import { useState } from "react";
import BookingDTO from "@/interfaces/bookingDTO";
import FasilitasDTO from "@/interfaces/fasilitasDTO";

type CardFasilitasProps = {
    booking: BookingDTO[];
    fasilitas?: FasilitasDTO;
};

const CardFasilitas = ({ booking, fasilitas }: CardFasilitasProps) => {
    const [booked, setBooked] = useState<BookingDTO[]>([]);
    const [isAvailable, setIsAvailable] = useState(true);

    const checkAvailability = () => {
        const date = new Date().toISOString().split("T")[0];
        const available = booking.filter(
            (item: BookingDTO) =>
                item.tanggal_pemesanan.split("T")[0] === date &&
                item.id_fasilitas === fasilitas?.id_fasilitas
        );
        setBooked(available);

        if (available.length > 0) {
            setIsAvailable(false);
        } else {
            setIsAvailable(true);
        }
    };
    return (
        <>
            <div className="flex-col flex lg:gap-5 lg:flex-row-reverse">
                <div className="bg-[#FFFFFF] flex flex-wrap rounded-[15px] xl:flex-col mr-2 mt-2">
                    <div className="p-7 flex flex-row lg:flex-col lg:items-center gap-3 xl:p-10">
                        <div className="flex flex-col md:mt-6 gap-3">
                            <h2 className="text-[16px] md:text-[22px] font-bold text-[#0A090C] xl:text-[35px]">
                                {fasilitas && fasilitas.nama}
                            </h2>
                            <div className="flex items-start gap-2">
                                <HiLocationMarker className="text-2xl md:text-lg md:block text-[#0A090C]" />
                                <h2 className="text-[12px] md:text-[14px] text-[#0A090C] xl:w-[380px] xl:text-[17px]">
                                    {fasilitas && fasilitas.alamat}
                                </h2>
                            </div>
                            <div className="flex items-start gap-2">
                                <MdPayment className="text-[#0A090C] font-bold text-md" />
                                <div className="flex flex-col">
                                    <h2 className="text-[12px] md:text-[12px] xl:text-[17px] text-[#0A090C]">
                                        Mode Of Payment
                                    </h2>
                                    <h2 className="text-[12px] md:text-[12px] xl:text-[17px] text-[#0A090C]">
                                        Virtual Account
                                    </h2>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div className="flex gap-2">
                                    <BiCalendar className="text-[#0A090C] font-bold text-md" />
                                    <div className="flex flex-col gap-2">
                                        <h2 className="text-[12px] md:text-[12px] xl:text-[17px] text-[#0A090C]">
                                            Cek Ketersediaan Fasilitas
                                        </h2>
                                        <div className="flex flex-col items-start gap-5">
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="date"
                                                    className="border rounded-md px-2 py-1 w-[130px] text-[12px] xl:text-[15px] xl:h-[30px] xl:w-[150px] h-8 focus:outline-none focus:border-blue-500 text-white"
                                                    min={
                                                        new Date()
                                                            .toISOString()
                                                            .split("T")[0]
                                                    }
                                                />
                                                <button
                                                    className="bg-[#07393C] hover:bg-[#2C666E] text-[#F0EDEE] font-bold p-[4px] text-[12px] xl:text-[15px] w-20 h-8 xl:h-8 xl:w-24 rounded-lg"
                                                    onClick={checkAvailability}
                                                >
                                                    Check
                                                </button>
                                            </div>
                                            <div className="">
                                                {isAvailable ? (
                                                    <div className="flex text-[#0A090C] items-center gap-3">
                                                        <div className="">
                                                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                        </div>
                                                        <h1 className="text-[15px]">
                                                            Available
                                                        </h1>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1">
                                                        <div className="text-[#0A090C] flex items-center gap-3">
                                                            <div className="w-2 h-2 xl:w-3 xl:h-3 bg-red-500 rounded-full"></div>
                                                            <h1 className="text-[15px] xl:text-[17px]">
                                                                Booked Oleh
                                                            </h1>
                                                        </div>
                                                        <div className="">
                                                            {booked.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="text-[#0A090C] flex gap-3"
                                                                    >
                                                                        <div
                                                                            className={`text-[15px] xl:text-[17px] ${
                                                                                item.status ===
                                                                                "Dibatalkan"
                                                                                    ? "hidden"
                                                                                    : "flex gap-2"
                                                                            }`}
                                                                        >
                                                                            {item
                                                                                .Account
                                                                                .Mahasiswa[0]
                                                                                ? item
                                                                                      .Account
                                                                                      .Mahasiswa[0]
                                                                                      .nama
                                                                                : item
                                                                                      .Account
                                                                                      .Umum[0]
                                                                                ? item
                                                                                      .Account
                                                                                      .Umum[0]
                                                                                      .nama
                                                                                : item
                                                                                      .Account
                                                                                      .UKM[0]
                                                                                ? item
                                                                                      .Account
                                                                                      .UKM[0]
                                                                                      .nama_ukm
                                                                                : item
                                                                                      .Account
                                                                                      .Organisasi[0]
                                                                                      .nama_organisasi}
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CardFasilitas;
