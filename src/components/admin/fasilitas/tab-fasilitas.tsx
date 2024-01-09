import { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import Loading from "@/components/ui/loading";
import splitData from "@/libs";

export default function TabFasilitas({ data }) {
    const [page, setPage] = useState(0);
    const [dataShow, setDataShow] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDataShow(splitData(data, 3));
        setLoading(false);
    }, [data]);
    return (
        <>
            <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                <div className="min-w-full rounded-lg overflow-hidden">
                    <div className="flex text-white">
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase">
                            ID
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium  uppercase w-[200px]">
                            Nama Fasilitas
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[400px]">
                            Deskripsi
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[350px]">
                            Alamat
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[200px]">
                            Action
                        </h1>
                    </div>

                    <div className="bg-white divide-y rounded-b-lg divide-gray-200 text-black">
                        {dataShow.length > 0 ? (
                            dataShow[page].map((data, index) => (
                                <div
                                    className="flex justify-between"
                                    key={index}
                                >
                                    <div className="px-6 py-4 whitespace-no-wrap">
                                        {data.id_fasilitas}
                                    </div>
                                    <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                        {data.nama}
                                    </div>
                                    <div className="px-6 py-4 break-all w-[400px]">
                                        {data.deskripsi}
                                    </div>
                                    <div className="px-6 py-4 break-all w-[300px]">
                                        {data.alamat}
                                    </div>
                                    <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                                            Detail
                                        </button>
                                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full">
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="">
                                <div
                                    className={`fixed w-full left-[55%] ${
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
                        totalPages={dataShow.length}
                        currentPage={page + 1}
                        handlePage={setPage}
                        totalData={data.length}
                    />
                </div>
            </div>
        </>
    );
}
