import { useState, useEffect, ChangeEvent } from "react";

import { AiOutlineClose } from "react-icons/ai";
import { AuthButton } from "../ui/auth-button";
import Loading from "../ui/loading";

import { getFakultas, getProdi, getTahunAjaran } from "@/hooks";

type RegisterFormProps = {
    toggle: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ toggle }) => {
    const [role, setRole] = useState("mahasiswa");
    const [fakultas, setFakultas] = useState([]);
    const [prodi, setProdi] = useState([]);
    const [tahunAjaran, setTahunAjaran] = useState([]);

    useEffect(() => {
        async function initialize() {
            const fakultas = await getFakultas();
            const prodi = await getProdi();
            const tahunAjaran = await getTahunAjaran();

            setFakultas(fakultas.data);
            setProdi(prodi.data);
            setTahunAjaran(tahunAjaran.data);
        }
        initialize();
    }, []);
    return (
        <>
            <div className="fixed z-50 top-0 flex items-center justify-center backdrop-blur-xl h-screen w-screen">
                <div className="p-6 h-[500px] overflow-auto text-black relative bg-white rounded-xl border-2 border-black shadow-xl">
                    <div className="flex justify-end" onClick={toggle}>
                        <AiOutlineClose className="text-2xl cursor-pointer" />
                    </div>
                    <h1 className="text-[30px] font-semibold mb-5 md:mb-2 md:text-[40px] lg:text-[35px] mt-3">
                        Registrasi
                    </h1>
                    <div className="mt-5">
                        <h1 className="text-[17px] mb-1">Daftar Sebagai</h1>
                        <select
                            className="bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <option value="mahasiswa">Mahasiswa</option>
                            <option value="umum">Umum</option>
                            <option value="ukm">UKM</option>
                            <option value="organisasi">Organisasi</option>
                        </select>

                        <div className="mt-2">
                            <h1
                                className={`text-[20px] mb-1 ${
                                    role === "ukm" || role === "organisasi"
                                        ? "hidden"
                                        : "block"
                                }`}
                            >
                                {role === "mahasiswa"
                                    ? "npm"
                                    : role === "dosen"
                                    ? "nip"
                                    : "nik"}
                            </h1>
                            <input
                                name={`npm`}
                                type="text"
                                className={`bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px] ${
                                    role === "ukm" ||
                                    role === "organisasi" ||
                                    role === "umum"
                                        ? "hidden"
                                        : "block"
                                }`}
                            />
                            <input
                                name={`nik`}
                                type="text"
                                className={`  bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px] ${
                                    role === "ukm" ||
                                    role === "organisasi" ||
                                    role === "mahasiswa"
                                        ? "hidden"
                                        : "block"
                                }`}
                            />
                        </div>

                        <div className="">
                            <h1 className="text-[20px] mb-1">
                                {role === "ukm"
                                    ? "nama ukm"
                                    : role === "organisasi"
                                    ? "nama organisasi"
                                    : "nama"}
                            </h1>
                            <input
                                name={`nama`}
                                type="text"
                                className={`bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]`}
                            />
                        </div>

                        <div className="">
                            <h1 className="text-[20px] mb-1">email</h1>
                            <input
                                name={`email`}
                                type="email"
                                className={` bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]`}
                            />
                        </div>

                        <div className="">
                            <h1 className="text-[20px] mb-1">password</h1>
                            <input
                                name={`password`}
                                type="password"
                                className={`bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]`}
                            />
                        </div>

                        <div
                            className={`${
                                role === "mahasiswa" ? "flex" : "hidden"
                            } flex-col gap-3`}
                        >
                            <div className="">
                                <h1 className="text-[20px] mb-1">fakultas</h1>
                                <select
                                    name="fakultas"
                                    className="bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]"
                                >
                                    {fakultas.map((fakultas, index) => (
                                        <option
                                            key={index}
                                            value={fakultas.id_fakultas}
                                        >
                                            {fakultas.nama_fakultas}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="">
                                <h1 className="text-[20px] mb-1">jurusan</h1>
                                <select
                                    name="prodi"
                                    className="bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]"
                                >
                                    {prodi.map((prodi, index) => (
                                        <option
                                            key={index}
                                            value={prodi.id_prodi}
                                        >
                                            {prodi.nama_prodi}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="">
                                <h1 className="text-[20px] mb-1">
                                    tahun ajaran
                                </h1>
                                {
                                    <select
                                        name="tahun_ajaran"
                                        className="bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]"
                                    >
                                        {tahunAjaran.map(
                                            (tahunAjaran, index) => (
                                                <option
                                                    key={index}
                                                    value={
                                                        tahunAjaran.id_tahun_ajaran
                                                    }
                                                >
                                                    {tahunAjaran.tahun_ajaran}
                                                </option>
                                            )
                                        )}
                                    </select>
                                }
                            </div>
                        </div>

                        <div className="mt-2">
                            <h1 className="text-[20px] mb-1">no. telp</h1>
                            <input
                                name={`no_telp`}
                                type="text"
                                className={`bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]`}
                            />
                        </div>

                        <div
                            className={`${
                                role === "ukm" || role === "organisasi"
                                    ? "block"
                                    : "hidden"
                            }`}
                        >
                            <h1 className="text-[20px] mb-1">
                                nama penanggung jawab
                            </h1>
                            <input
                                name={`nama-pj`}
                                type="text"
                                className={`bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]`}
                            />
                        </div>

                        <div className="">
                            <h1
                                className={`text-[20px] mb-1 ${
                                    role === "ukm" || role === "organisasi"
                                        ? "hidden"
                                        : "block"
                                }`}
                            >
                                upload kartu{" "}
                                {role === "mahasiswa"
                                    ? "mahasiswa"
                                    : role === "dosen"
                                    ? "dosen"
                                    : "identitas"}
                            </h1>
                            <h1
                                className={`${
                                    role === "ukm" || role === "organisasi"
                                        ? "block"
                                        : "hidden"
                                } text-[20px] mb-1`}
                            >
                                {role === "ukm"
                                    ? "Bukti UKM Aktif"
                                    : role === "organisasi"
                                    ? "Bukti Organisasi Aktif"
                                    : ""}
                            </h1>
                            <input
                                name={`bukti`}
                                type="file"
                                className={` bg-[#ffffff] border-[2px] border-black p-2 drop-shadow-xl rounded-[13px] w-[300px]`}
                            />
                        </div>
                    </div>
                    <div className="mt-5">
                        <AuthButton message="Registrasi" />
                    </div>
                    <div className="flex items-center justify-center mt-8">
                        <div className="w-[120px] h-[1px] bg-black"></div>
                        <div className="text-center mx-5">OR</div>
                        <div className="w-[120px] h-[1px] bg-black"></div>
                    </div>
                    <div className="text-center">
                        <h1 className="text-[16px] font-bold mt-10">
                            Sudah punya akun?{" "}
                            <span className="text-[#07393C] cursor-pointer">
                                Login
                            </span>
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterForm;
