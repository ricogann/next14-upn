import { useState, useEffect } from "react";
import Pagination from "@/components/ui/pagination";
import Loading from "@/components/ui/loading";
import splitData from "@/libs";
import { deleteHargaFasilitas } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function TabHarga({ data }) {
    const [page, setPage] = useState(0);
    const [dataShow, setDataShow] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDataShow(splitData(data, 6));
        setLoading(false);
    }, [data]);

    const handleDelete = async (id: number) => {
        const res = await deleteHargaFasilitas(id);
        if (res.status === true) {
            toast.success(res.message, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            window.location.reload();
        } else {
            toast.error(res.message, {
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
            <div className="flex flex-wrap overflow-hidden rounded-lg">
                <div className="rounded-lg overflow-hidden">
                    <div className="flex text-white">
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase tracking-wider w-[70px]">
                            ID
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase tracking-wider w-[200px]">
                            Nama Fasilitas
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase tracking-wider w-[200px]">
                            Nama Harga
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase tracking-wider w-[200px]">
                            Harga
                        </h1>
                        <h1 className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase tracking-wider w-[200px]">
                            Action
                        </h1>
                    </div>

                    <div className="bg-white divide-y divide-gray-200 text-black w-[870px] rounded-b-lg">
                        {dataShow.length > 0 ? (
                            dataShow[page].map((data, index) => (
                                <div className="flex" key={index}>
                                    <div className="px-6 py-4 whitespace-no-wrap w-[70px]">
                                        {data.id}
                                    </div>
                                    <div className="px-6 py-4 whitespace-no-wrap w-[200px]">
                                        {data.Fasilitas.nama}
                                    </div>
                                    <div className="px-6 py-4 break-all w-[200px]">
                                        {data.nama}
                                    </div>
                                    <div className="px-6 py-4 break-all w-[200px] text-center">
                                        Rp
                                        {data.harga
                                            .toString()
                                            .replace(
                                                /\B(?=(\d{3})+(?!\d))/g,
                                                "."
                                            )}
                                    </div>
                                    <div className="px-6 py-4 whitespace-no-wrap flex items-center justify-center w-[200px]">
                                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mr-2">
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                                            onClick={() =>
                                                handleDelete(data.id)
                                            }
                                        >
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
