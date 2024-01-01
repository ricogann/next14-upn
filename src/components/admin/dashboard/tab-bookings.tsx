import { useState } from "react";

const TabBookings = ({ data }) => {
    const [isDecline, setIsDecline] = useState(false);
    console.log(data);
    return (
        <>
            <div className="flex flex-col text-black">
                <div className="grid grid-cols-3 mr-32 gap-5">
                    {data.map((item, index) => (
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
                                        <p className="font-bold">Fasilitas</p>
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
                                        isDecline ? "hidden" : "block"
                                    }`}
                                >
                                    <button
                                        className="text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-red-500"
                                        onClick={() => setIsDecline(true)}
                                    >
                                        Decline Booking
                                    </button>
                                    <button
                                        className={`text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-[#07393C]`}
                                    >
                                        Accept Booking
                                    </button>
                                </div>
                                <div
                                    className={`${
                                        isDecline ? "block" : "hidden"
                                    }`}
                                >
                                    <div className="mt-2">
                                        <h1>Keterangan Tolak</h1>
                                        <textarea
                                            name={`keterangan_tolak`}
                                            className="bg-white border-2 rounded-md w-full px-2 py-[2px] border-black"
                                        />
                                    </div>
                                    <div className="flex flex-row justify-end gap-2 mt-2">
                                        <button
                                            className="text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-red-500"
                                            onClick={() => setIsDecline(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className={`text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-[#07393C]`}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TabBookings;
