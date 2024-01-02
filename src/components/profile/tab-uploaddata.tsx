import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { uploadBukti, uploadSIK } from "@/hooks";

const TabUploadData = ({ data }) => {
    const [file, setFile] = useState({
        id_pemesanan: "",
        file: null,
    });
    const handleUpload = async (id, harga) => {
        if (file.file === null) {
            toast.error("Isi file terlebih dahulu!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        } else if (file.id_pemesanan !== id) {
            toast.error(`Perbarui file untuk booking ref ${id}!`, {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            return;
        }
        if (harga === 0) {
            const formData = new FormData();
            if (file.file) {
                formData.append("SIK", file.file as File);
            }
            const res = await uploadSIK(id, formData);
            console.log(res);
            if (res.status === true) {
                toast.success("Upload SIK berhasil!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            }
        } else {
            const formData = new FormData();
            if (file.file) {
                formData.append("bukti_pembayaran", file.file as File);
            }
            const res = await uploadBukti(id, formData);
            if (res.status === true) {
                toast.success("Upload bukti pembayaran berhasil!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            }
        }
    };
    const handleFile = (e) => {
        setFile({
            ...file,
            file: e.target.files[0],
        });
    };
    const handleId = (id) => {
        setFile({
            ...file,
            id_pemesanan: id,
        });
    };
    console.log(file);
    return (
        <>
            <ToastContainer />
            <div className="flex flex-col gap-5 rounded-[15px] md:grid md:grid-cols-2 xl:grid-cols-4 xl:px-10 xl:py-5">
                {data.map((item, index) => (
                    <div
                        className="bg-[#FFFFFF] flex flex-col w-full p-5 gap-4 rounded-[15px] shadow-lg border-2 border-[#FFA101] xl:min-w-[270px] xl:max-w-[320px]"
                        key={index}
                    >
                        <div className="flex flex-col">
                            <h2 className="text-[16px] lg:text-[20px] font-bold">
                                {item.Fasilitas.nama}
                            </h2>
                            <h2 className="text-[12px] lg:text-[15px] font-regular ">
                                {`Booking ref # : ${item.id_pemesanan}`}
                            </h2>
                            <h2 className="text-[12px] lg:text-[15px] font-regular ">
                                {`Tanggal : ${new Date(
                                    item.tanggal_pemesanan
                                ).toLocaleDateString("id-ID", {
                                    weekday: "long",
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                })}`}
                            </h2>
                        </div>

                        <div className="border-t border-gray-500 xl:hidden"></div>
                        <div
                            className={`text-center ${
                                item.total_harga === 0 ? "hidden" : ""
                            }`}
                        >
                            <h2 className="text-[16px] lg:text-[15px] font-semibold">
                                Kode BNI VA
                            </h2>
                            <h2 className="text-[16px] lg:text-[20px] font-semibold text-[#FFA101]">
                                {item.Fasilitas.no_va}
                            </h2>
                        </div>

                        <div className={`text-center`}>
                            <h2 className="text-[16px] lg:text-[12px] xl:text-[14px] font-bold mb-2">
                                {item.total_harga === 0
                                    ? "Upload SIK"
                                    : "Upload Bukti Pembayaran"}
                            </h2>

                            <div>
                                <input
                                    name="bukti"
                                    type="file"
                                    className="block w-full text-sm bg-white text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                    onChange={handleFile}
                                    onClick={() => handleId(item.id_pemesanan)}
                                />
                            </div>
                        </div>

                        <button
                            className="border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-2"
                            onClick={() =>
                                handleUpload(
                                    item.id_pemesanan,
                                    item.total_harga
                                )
                            }
                        >
                            SUBMIT
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TabUploadData;
