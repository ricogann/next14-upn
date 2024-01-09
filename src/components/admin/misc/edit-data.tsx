import { useState, useEffect } from "react";
import { updateDataMisc } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditData = ({ data }) => {
    const [misc, setMisc] = useState({
        id_misc: 0,
        nama_instansi: "",
        no_hp: "",
        email: "",
        instagram: "",
        laman_web: "",
        nama_pic: "",
        nip_pic: "",
        logo_instansi: null,
        tanda_tangan: null,
        logo_instansi_old: "",
        tanda_tangan_old: "",
    });

    useEffect(() => {
        setMisc({
            id_misc: data?.id_misc,
            nama_instansi: data?.nama_instansi,
            no_hp: data?.no_hp,
            email: data?.email,
            instagram: data?.instagram,
            laman_web: data?.laman_web,
            nama_pic: data?.nama_pic,
            nip_pic: data?.nip_pic,
            logo_instansi: data?.logo_instansi,
            tanda_tangan: data?.tanda_tangan,
            logo_instansi_old: data?.logo_instansi,
            tanda_tangan_old: data?.tanda_tangan,
        });
    }, [data]);

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === "logo_instansi") {
            setMisc({ ...misc, [name]: e.target.files[0] });
            // misc.logo_instansi_old = data.logo_instansi;
        } else if (name === "tanda_tangan") {
            setMisc({ ...misc, [name]: e.target.files[0] });
            // misc.tanda_tangan_old = data.tanda_tangan;
        } else {
            setMisc({ ...misc, [name]: value });
        }
    };

    const handleSubmit = async () => {
        const res = await updateDataMisc(misc.id_misc, misc);

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
    };
    return (
        <>
            <ToastContainer />
            <div className="flex flex-full w-[900px] overflow-hidden rounded-lg">
                <div className="min-w-full rounded-lg overflow-hidden">
                    <div className="flex flex-col gap-5 ">
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Nama Instansi
                            </h1>
                            <input
                                type="text"
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg border border-black"
                                name="nama_instansi"
                                value={misc.nama_instansi ?? ""}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                No HP BPU
                            </h1>
                            <input
                                type="text"
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg border border-black"
                                name="no_hp"
                                value={misc.no_hp ?? ""}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                NIP
                            </h1>
                            <input
                                type="text"
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg border border-black"
                                name="nip_pic"
                                value={misc.nip_pic ?? ""}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Nama Pimpinan BPU
                            </h1>
                            <input
                                type="text"
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg border border-black"
                                name="nama_pic"
                                value={misc.nama_pic ?? ""}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Instagram
                            </h1>
                            <input
                                type="text"
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg border border-black"
                                name="instagram"
                                value={misc.instagram ?? ""}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Website
                            </h1>
                            <input
                                type="text"
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg border border-black"
                                name="laman_web"
                                value={misc.laman_web ?? ""}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Email
                            </h1>
                            <input
                                type="text"
                                className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider w-[400px] bg-[#FFFFFF] rounded-lg border border-black"
                                name="email"
                                value={misc.email ?? ""}
                                onChange={handleInput}
                            ></input>
                        </div>
                        <div className="flex flex-row gap-3 rounded-lg justify-center">
                            <div className="flex items-center p-2 gap-3 bg-[#FFFFFF] rounded-lg w-[90%]">
                                <h1 className="text-center text-xs w-[100px] font-medium text-black tracking-wider ">
                                    Logo BPU
                                </h1>
                                <input
                                    name="logo_instansi"
                                    type="file"
                                    className="block w-full text-sm bg-transparent text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#07393C] file:text-white file:cursor-pointer"
                                    onChange={handleInput}
                                />
                            </div>
                            <div className="flex items-center gap-3 bg-[#FFFFFF] rounded-lg w-[100%]">
                                <h1 className="text-center text-xs font-medium text-black tracking-wider ">
                                    Tanda Tangan Pimpinan
                                </h1>
                                <input
                                    name="tanda_tangan"
                                    type="file"
                                    className="block w-full text-sm bg-transparent text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#07393C] file:text-white file:cursor-pointer"
                                    onChange={handleInput}
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        className={`border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-10`}
                        onClick={handleSubmit}
                    >
                        SIMPAN
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditData;
