import React, { useState, useEffect } from "react";
import splitData from "@/libs";
import Loading from "../../ui/loading";
import { FaXmark, FaCheck } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import { updateKamar } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Kamar from "@/interfaces/kamarDTO";
import Pagination from "@/components/ui/pagination";

interface Props {
    data: Kamar[];
    page: number;
    currentPage: number;
    handlePage: (page: number) => void;
}

const TabKamarAsrama: React.FC<Props> = ({
    data,
    page,
    currentPage,
    handlePage,
}) => {
    const [kamar, setKamar] = useState<Kamar[][]>([]);
    const [filteredKamar, setFilteredKamar] = useState<Kamar[][]>([]);
    const [searchText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [indexEdit, setIndexEdit] = useState<number>(0);
    const router = useRouter();
    const [dataEdit, setDataEdit] = useState<any>({
        id: "",
        npm_bed1_a: "",
        npm_bed2_b: "",
        npm_bed3_c: "",
    });

    useEffect(() => {
        setKamar(splitData(data, 6));
        setLoading(false);
    }, [data]);

    const handleEdit = (
        index: number,
        id: number,
        npm_bed1_a: string,
        npm_bed2_b: string,
        npm_bed3_c: string
    ) => {
        setIsEdit(true);
        setIndexEdit(index);
        setDataEdit({
            id,
            npm_bed1_a,
            npm_bed2_b,
            npm_bed3_c,
        });
    };

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

        setFilteredKamar(splitData(filteredData, 6));

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [kamar, searchText]);

    const handleChange = (e: any) => {
        if (e.target.value === "") {
            setDataEdit({
                ...dataEdit,
                [e.target.name]: null,
            });
            return;
        }
        setDataEdit({
            ...dataEdit,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async () => {
        const { id, ...data } = dataEdit;
        if (
            data.npm_bed1_a === ("" || null) ||
            data.npm_bed2_b === ("" || null) ||
            data.npm_bed3_c === ""
        ) {
            data.status_kamar = true;
            const res = await updateKamar(dataEdit.id, data);
            if (res.status === true) {
                toast.success("Berhasil update data!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            } else {
                toast.error("Gagal update data!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        } else {
            data.status_kamar = false;
            const res = await updateKamar(dataEdit.id, data);
            if (res.status === true) {
                toast.success("Berhasil update data!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            } else {
                toast.error("Gagal update data!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
            }
        }
    };

    const enterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSubmit();
        } else if (e.key === "Escape") {
            setIsEdit(false);
            setIndexEdit(0);
            setDataEdit({
                id: "",
                npm_bed1_a: "",
                npm_bed2_b: "",
                npm_bed3_c: "",
            });
        }
    };
    return (
        <>
            <ToastContainer />
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
                {filteredKamar.length > 0 ? (
                    filteredKamar[page].map((data: Kamar, index: number) => (
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
                            <div
                                className={`px-6 py-3 break-all w-[150px] ${
                                    isEdit && index === indexEdit
                                        ? "hidden"
                                        : "block"
                                }`}
                            >
                                {data.npm_bed1_a}
                            </div>
                            <input
                                name="npm_bed1_a"
                                value={dataEdit.npm_bed1_a ?? ""}
                                type="text"
                                className={`${
                                    isEdit && index === indexEdit
                                        ? "block"
                                        : "hidden"
                                } w-[140px] h-[40px] mx-1 px-5 py-2 my-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                placeholder="Npm Bed 1"
                                onChange={handleChange}
                                onKeyUp={enterPressed}
                            />
                            <div
                                className={`px-6 py-3 break-all w-[150px] ${
                                    isEdit && index === indexEdit
                                        ? "hidden"
                                        : "block"
                                }
                            `}
                            >
                                {data.npm_bed2_b}
                            </div>
                            <input
                                name="npm_bed2_b"
                                value={dataEdit.npm_bed2_b ?? ""}
                                type="text"
                                className={`${
                                    isEdit && index === indexEdit
                                        ? "block"
                                        : "hidden"
                                } w-[140px] h-[40px] mx-1 px-5 py-2 my-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                placeholder="Npm Bed 2"
                                onChange={handleChange}
                                onKeyUp={enterPressed}
                            />
                            <div
                                className={`px-6 py-3 break-all w-[150px] ${
                                    isEdit && index === indexEdit
                                        ? "hidden"
                                        : "block"
                                }`}
                            >
                                {data.npm_bed3_c}
                            </div>
                            <input
                                name="npm_bed3_c"
                                value={dataEdit.npm_bed3_c ?? ""}
                                type="text"
                                className={`${
                                    isEdit && index === indexEdit
                                        ? "block"
                                        : "hidden"
                                } w-[140px] h-[40px] mx-1 px-5 py-2 my-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                placeholder="Npm Bed 3"
                                onChange={handleChange}
                                onKeyUp={enterPressed}
                            />
                            <div className="px-6 py-3 break-all w-[140px]">
                                {data.status_kamar === false
                                    ? "Penuh "
                                    : "Kosong"}
                            </div>
                            <button
                                className={`w-[120px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md text-[15px] mx-10 my-1 ${
                                    isEdit && index === indexEdit
                                        ? "hidden"
                                        : "block"
                                }`}
                                onClick={() =>
                                    handleEdit(
                                        index,
                                        data.id_asrama,
                                        data.npm_bed1_a,
                                        data.npm_bed2_b,
                                        data.npm_bed3_c
                                    )
                                }
                            >
                                Edit
                            </button>

                            <div
                                className={`flex items-center justify-center w-[200px] gap-5 ${
                                    isEdit && index === indexEdit
                                        ? "block"
                                        : "hidden"
                                }`}
                            >
                                <button
                                    onClick={() => {
                                        setIsEdit(false);
                                        setIndexEdit(0);
                                        setDataEdit({
                                            id: "",
                                            npm_bed1_a: "",
                                            npm_bed2_b: "",
                                            npm_bed3_c: "",
                                        });
                                    }}
                                >
                                    <FaXmark className="text-white font-bold text-4xl rounded-xl bg-red-500 p-2" />
                                </button>
                                <button onClick={handleSubmit}>
                                    <FaCheck className="text-white font-bold text-4xl rounded-xl bg-green-500 p-2" />
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
            <div className="mb-10">
                <Pagination
                    totalPages={filteredKamar.length}
                    currentPage={currentPage}
                    handlePage={handlePage}
                    totalData={data.length}
                />
            </div>
        </>
    );
};

export default TabKamarAsrama;
