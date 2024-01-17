import { useState, useEffect } from "react";
import splitData from "@/libs";
import Loading from "../../ui/loading";

const TabKamarAsrama = ({ data, page }) => {
    const [kamar, setKamar] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setKamar(splitData(data, 6));
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
                        NO
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[200px]">
                        Lantai Asrama
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[170px]">
                        Nomor Kamar
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[150px]">
                        Penyewa 1
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[150px]">
                        Penyewa 2
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[150px]">
                        Penyewa 3
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[140px]">
                        Status
                    </h1>
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[200px] rounded-tr-xl">
                        Action
                    </h1>
                </div>
            </div>
            <div className="bg-white rounded-b-lg divide-y divide-gray-200 text-black">
                {kamar.length > 0 ? (
                    kamar[page].map((data, index) => (
                        <div className="flex text-center" key={index}>
                            <div className="px-6 py-3 whitespace-no-wrap w-[70px]">
                                {index + 1}
                            </div>
                            <div className="px-6 py-3 whitespace-no-wrap w-[200px]">
                                {data.Harga.nama}
                            </div>
                            <div className="px-6 py-3 whitespace-no-wrap w-[170px]">
                                {data.no_kamar}
                            </div>
                            <div className={`px-6 py-3 break-all w-[150px]`}>
                                {data.npm_bed1_a}
                            </div>
                            <div className={`px-6 py-3 break-all w-[150px]`}>
                                {data.npm_bed2_b}
                            </div>
                            <div className={`px-6 py-3 break-all w-[150px]`}>
                                {data.npm_bed3_c}
                            </div>
                            <div className="px-6 py-3 break-all w-[140px]">
                                {data.status_kamar === false
                                    ? "Penuh "
                                    : "Kosong"}
                            </div>
                            <div className="flex flex-col gap-2 w-[200px]">
                                <button
                                    className={` bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-[15px] mx-10 my-1`}
                                >
                                    Edit
                                </button>
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

export default TabKamarAsrama;
