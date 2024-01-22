import React, { useState, useEffect } from "react";
import splitData from "@/libs";
import Loading from "../../ui/loading";
import HistoryKamar from "@/interfaces/kamarDTO";

interface Props {
    data: HistoryKamar[];
    page: number;
}

const TabHistoryKamar: React.FC<Props> = ({ data, page }) => {
    const [kamar, setKamar] = useState<HistoryKamar[] | any[]>([]);
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
                    <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium text-white uppercase tracking-wider w-[140px] rounded-tr-xl">
                        Periode
                    </h1>
                </div>
            </div>
            <div className="bg-white rounded-b-lg divide-y divide-gray-200 text-black w-[830px]">
                {kamar.length > 0 ? (
                    kamar[page].map((data: HistoryKamar, index: number) => (
                        <div className="flex text-center" key={index}>
                            <div className="px-6 py-3 whitespace-no-wrap w-[70px]">
                                {index + 1}
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
                                {data.year}
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

export default TabHistoryKamar;
