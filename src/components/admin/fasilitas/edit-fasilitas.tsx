import { useState, useEffect, ChangeEvent } from "react";
import { BsFillPinMapFill } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { MdPayment, MdOutlineWatchLater } from "react-icons/md";
import { updateFasilitas } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditFasilitas = ({ data, toggle }) => {
    const [fasilitas, setFasilitas] = useState<any>({
        nama: "",
        alamat: "",
        buka_hari: "",
        deskripsi: "",
        no_va: "",
        jam_buka: "",
        jam_tutup: "",
        foto: [],
        termservice: [],
        name_foto_old: "",
        name_termservice_old: "",
    });

    useEffect(() => {
        if (data) {
            setFasilitas({
                nama: data.nama,
                alamat: data.alamat,
                buka_hari: data.buka_hari,
                deskripsi: data.deskripsi,
                no_va: data.no_va,
                jam_buka: data.jam_buka,
                jam_tutup: data.jam_tutup,
                foto: [],
                termservice: [],
                name_foto_old: data.foto,
                name_termservice_old: data.termservice,
            });
        }
    }, [data]);

    const handleChanges = (e: any) => {
        if (e.target.name === "termservice" || e.target.name === "foto") {
            const files = Array.from(e.target.files || []);

            setFasilitas((prev) => ({
                ...prev,
                [e.target.name]: files,
            }));
        } else {
            setFasilitas((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const res = await updateFasilitas(data.id_fasilitas, fasilitas);
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
            <div className="bg-[#FFFFFF] gap-5 p-5 rounded-lg w-full">
                <div className="flex flex-col gap-5 p-5 w-full">
                    <h1 className="text-[30px] font-bold">
                        Edit Data Fasilitas
                    </h1>
                    <input
                        name="nama"
                        type="text"
                        className={`px-5 py-2 w-full text-black placeholder-gray-400 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                        placeholder="Nama Fasilitas..."
                        value={fasilitas.nama ?? ""}
                        onChange={handleChanges}
                    />
                    <div className="flex flex-row gap-10">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <BsFillPinMapFill className="text-black font-medium text-3xl" />
                                <input
                                    name="alamat"
                                    type="text"
                                    className={`px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200 w-[700px]`}
                                    placeholder="Alamat..."
                                    value={fasilitas.alamat ?? ""}
                                    onChange={handleChanges}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <BiBookmark className="text-black font-medium text-3xl" />
                                <textarea
                                    name="deskripsi"
                                    placeholder="Deskripsi..."
                                    className={`w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                    value={fasilitas.deskripsi ?? ""}
                                    onChange={handleChanges}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <MdPayment className="text-black font-medium text-3xl" />
                                <input
                                    name="no_va"
                                    type="string"
                                    placeholder="Nomor Virtual Account..."
                                    className={`w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                    value={fasilitas.no_va ?? ""}
                                    onChange={handleChanges}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-3">
                                <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                <input
                                    name="jam_buka"
                                    type="time"
                                    placeholder="Jam Masuk..."
                                    className={`w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                    value={fasilitas.jam_buka ?? ""}
                                    onChange={handleChanges}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <MdOutlineWatchLater className="text-black font-medium text-3xl" />
                                <input
                                    name="jam_tutup"
                                    type="time"
                                    placeholder="Jam Keluar..."
                                    className={`w-full px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                    value={fasilitas.jam_tutup ?? ""}
                                    onChange={handleChanges}
                                />
                            </div>
                            <div className="flex items-center gap-3">
                                <MdOutlineWatchLater className="text-black font-medium text-2xl" />

                                <input
                                    name="buka_hari"
                                    type="text"
                                    className={`px-5 py-2 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                    placeholder="Buka Hari..."
                                    value={fasilitas.buka_hari ?? ""}
                                    onChange={handleChanges}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 mt-3">
                        <div className="w-full">
                            <h1 className="text-center">
                                Upload Foto Fasilitas
                            </h1>
                            <input
                                name="foto"
                                type="file"
                                placeholder="Input Files..."
                                className={`mb-5 w-full px-5 py-4 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                accept=".jpg,.jpeg,.png"
                                multiple={true}
                                onChange={handleChanges}
                            />
                        </div>
                        <div className="w-full text-center">
                            <h1>Upload File Term and Service</h1>
                            <input
                                name="termservice"
                                type="file"
                                placeholder="Input Files..."
                                className={`mb-5 w-full px-5 py-4 placeholder-gray-400 text-gray-700 relative  bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring focus:ring-indigo-200`}
                                accept=".pdf"
                                multiple={false}
                                onChange={handleChanges}
                            />
                        </div>
                    </div>
                    <div className="">
                        <h5 className="text-[12px]">
                            *Upload foto fasilitas dapat lebih dari 1
                        </h5>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            className={`w-[180px] bg-red-500 p-2 rounded-lg text-white font-bold uppercase mt-5 `}
                            onClick={toggle}
                        >
                            CANCEL
                        </button>
                        <button
                            className={`w-[180px] bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-5 `}
                            onClick={handleSubmit}
                        >
                            SAVE
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EditFasilitas;
