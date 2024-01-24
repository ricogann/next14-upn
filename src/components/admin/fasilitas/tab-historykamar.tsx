import React, { useState, useEffect } from "react";
import splitData from "@/libs";
import Loading from "../../ui/loading";
import HistoryKamar from "@/interfaces/kamarDTO";
import Pagination from "@/components/ui/pagination";

interface Props {
    data: HistoryKamar[];
    page: number;

    currentPage: number;
    handlePage: (page: number) => void;
}

const TabHistoryKamar: React.FC<Props> = ({
    data,
    page,
    currentPage,
    handlePage,
}) => {
    const [kamar, setKamar] = useState<HistoryKamar[] | any[]>([]);
    const [kamarFiltered, setKamarFiltered] = useState<HistoryKamar[][]>([]);

    const [loading, setLoading] = useState<boolean>(true);
    const [searchText, setSearchText] = useState<string>("");

    useEffect(() => {
        const filteredData = data.filter((item) =>
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
                } else if (value && typeof value === "object") {
                    if ("no_kamar" in value) {
                        return value.no_kamar
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if ("npm_bed1_a" in value) {
                        return value.npm_bed1_a
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if ("npm_bed2_b" in value) {
                        return value.npm_bed2_b
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if ("npm_bed3_c" in value) {
                        return value.npm_bed3_c
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else if ("nama" in value) {
                        return value.nama
                            .toLowerCase()
                            .includes(searchText.toLowerCase());
                    } else {
                        return false;
                    }
                }
                return false;
            })
        );

        setKamarFiltered(splitData(filteredData, 6));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kamar, searchText]);

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
                        onChange={(e) => setSearchText(e.target.value)}
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
                {kamarFiltered.length > 0 ? (
                    kamarFiltered[page].map(
                        (data: HistoryKamar, index: number) => (
                            <div className="flex text-center" key={index}>
                                <div className="px-6 py-3 whitespace-no-wrap w-[70px]">
                                    {index + 1}
                                </div>
                                <div className="px-6 py-3 whitespace-no-wrap w-[170px]">
                                    {data.no_kamar}
                                </div>
                                <div
                                    className={`px-6 py-3 break-all w-[150px]`}
                                >
                                    {data.npm_bed1_a}
                                </div>
                                <div
                                    className={`px-6 py-3 break-all w-[150px]`}
                                >
                                    {data.npm_bed2_b}
                                </div>
                                <div
                                    className={`px-6 py-3 break-all w-[150px]`}
                                >
                                    {data.npm_bed3_c}
                                </div>
                                <div className="px-6 py-3 break-all w-[140px]">
                                    {data.year}
                                </div>
                            </div>
                        )
                    )
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
            <div className="mb-10 w-[830px]">
                <Pagination
                    totalPages={kamarFiltered.length}
                    totalData={data.length}
                    currentPage={currentPage}
                    handlePage={handlePage}
                />
            </div>
        </>
    );
};

export default TabHistoryKamar;
