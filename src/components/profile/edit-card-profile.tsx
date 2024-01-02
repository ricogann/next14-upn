import { useEffect, useState } from "react";
import {
    updateUsersUmum,
    updateUsersMahasiswa,
    updateUsersUkm,
    updateUsersOrganisasi,
} from "@/hooks";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { decryptPassword, parseJwt, encryptPassword } from "@/libs/auth";
import Cookies from "js-cookie";

const EditCardProfile = ({ data, toggle }) => {
    const [account, setAccount] = useState<any>({
        nama: "",
        no_telp: "",
        password: "",
        nama_pj: "",
    });
    const [role, setRole] = useState<any>(null);
    const [id, setId] = useState<any>(null);

    useEffect(() => {
        if (data) {
            const account = parseJwt(Cookies.get("CERT"));
            setRole(account.role);
            setId(account.id_account);
            setAccount({
                nama: data.nama,
                no_telp: data.no_telp,
                password: decryptPassword(data.password),
                nama_pj: data.nama_pj,
            });
        }
    }, [data]);

    const handleChanges = (e) => {
        setAccount((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (role === "mahasiswa") {
            const { nama_pj, ...data } = account;
            data.password = encryptPassword(data.password);
            const res = await updateUsersMahasiswa(id, data);
            if (res.status === true) {
                toast.success("Berhasil update data!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            }
        }
        if (role === "umum") {
            const { nama_pj, ...data } = account;
            data.password = encryptPassword(data.password);
            const res = await updateUsersUmum(id, data);
            if (res.status === true) {
                toast.success("Berhasil melakukan pemesanan!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            }
        }
        if (role === "ukm") {
            const res = await updateUsersUkm(id, account);
            data.password = encryptPassword(data.password);
            if (res.status === true) {
                toast.success("Berhasil melakukan pemesanan!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                });
                window.location.reload();
            }
        }
        if (role === "organisasi") {
            const res = await updateUsersOrganisasi(id, account);
            data.password = encryptPassword(data.password);
            if (res.status === true) {
                toast.success("Berhasil melakukan pemesanan!", {
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
    return (
        <>
            <ToastContainer />
            <div className="bg-[#FFFFFF] flex m-8 mt-7 flex-col gap-3 p-8 rounded-[15px] shadow-lg text-[#0A090C] xl:px-14 xl:py-10 xl:mx-36">
                <div className="">
                    <h1 className="text-[22px] font-bold">Profile</h1>
                    <div className="bg-[#07393C] w-[150px] py-[1px] mt-1"></div>
                </div>
                <div className={``}>
                    <h1 className="text-[16px] lg:text-[18px] font-semibold">
                        Nama
                    </h1>
                    <input
                        name={`nama`}
                        type="text"
                        className="text-[12px] lg:text-[14px] w-[500px] p-1 mt-1 border border-black text-[#0A090C] font-regular bg-[#fff] xl:bg-[#F7F8FA] rounded-lg"
                        value={account.nama ?? ""}
                        onChange={handleChanges}
                    />
                </div>
                <div className={``}>
                    <h1 className="text-[16px] lg:text-[18px] font-semibold">
                        No. Telpon
                    </h1>
                    <input
                        name={`no_telp`}
                        type="text"
                        className="text-[12px] lg:text-[14px] w-[500px] p-1 mt-1 border border-black text-[#0A090C] font-regular bg-[#fff] xl:bg-[#F7F8FA] rounded-lg"
                        value={account.no_telp ?? ""}
                        onChange={handleChanges}
                    />
                </div>
                <div className={``}>
                    <h1 className="text-[16px] lg:text-[18px] font-semibold">
                        Password
                    </h1>
                    <input
                        name={`password`}
                        type="password"
                        className="text-[12px] lg:text-[14px] w-[500px] p-1 mt-1 border border-black text-[#0A090C] font-regular bg-[#fff] xl:bg-[#F7F8FA] rounded-lg"
                        value={account.password ?? ""}
                        onChange={handleChanges}
                    />
                </div>
                <div className={`${account.nama_pj ? "" : "hidden"}`}>
                    <h1 className="text-[16px] lg:text-[18px] font-semibold">
                        Nama Penanggung Jawab
                    </h1>
                    <input
                        name={`nama_pj`}
                        type="text"
                        className="text-[12px] lg:text-[14px] w-[500px] p-1 mt-1 border border-black text-[#0A090C] font-regular bg-[#fff] xl:bg-[#F7F8FA] rounded-lg"
                        value={account.nama_pj ?? ""}
                        onChange={handleChanges}
                    />
                </div>
                <div className={`flex gap-5`}>
                    <button
                        className={`w-full bg-red-500 p-2 rounded-lg text-white font-bold uppercase mt-5`}
                        onClick={toggle}
                    >
                        Batal
                    </button>
                    <button
                        className={`border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-5`}
                        onClick={handleUpdate}
                    >
                        Simpan
                    </button>
                </div>
            </div>
        </>
    );
};

export default EditCardProfile;
