import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const TabMahasiswa = ({ data }) => {
    const [eyeOpen, setEyeOpen] = useState(true);
    return (
        <>
            <div className="flex flex-wrap overflow-hidden rounded-lg shadow-lg">
                <input
                    className="w-auto h-[50px] px-5 py-3 bg-white border border-gray-300 rounded-xl text-[20px] font-bold outline-none"
                    type="text"
                    placeholder="Cari Users Umum. . ."
                />
                <div className="min-w-full divide-y overflow-hidden">
                    <div className="flex mt-5">
                        <div className="px-6 py-3 bg-[#07393C] text-left text-xs leading-4 font-medium uppercase w-[50px] rounded-tl-xl">
                            ID
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[120px]">
                            Nama Mahasiswa
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[150px]">
                            NPM
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[220px]">
                            Password
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[150px]">
                            Fakultas, Jurusan
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[150px]">
                            No Telepon
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[140px]">
                            Bukti Identitas
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[100px]">
                            Status
                        </div>
                        <div className="px-6 py-3 bg-[#07393C] text-center text-xs leading-4 font-medium uppercase w-[140px] rounded-tr-xl">
                            Action
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white divide-y divide-gray-200 text-black">
                    {data.map((mahasiswa, index) => (
                        <div className="flex" key={index}>
                            <div className="px-6 py-4 w-[50px]">
                                {mahasiswa.id}
                            </div>
                            <div className="px-6 py-4 w-[120px] text-center text-[15px]">
                                {mahasiswa.nama}
                            </div>
                            <div className="px-6 py-4 w-[150px] break-all text-[15px]">
                                {mahasiswa.npm}
                            </div>
                            <div className="px-6 py-4 w-[220px] break-all text-[15px] flex items-center justify-between">
                                <div className="">
                                    <h1
                                        className={`${eyeOpen ? "" : "hidden"}`}
                                    >
                                        {mahasiswa.password}
                                    </h1>
                                    <h1
                                        className={`${eyeOpen ? "hidden" : ""}`}
                                    ></h1>
                                </div>
                                <div className="">
                                    <div
                                        className={`text-xl ${
                                            eyeOpen ? "" : "hidden"
                                        } cursor-pointer`}
                                        onClick={() => setEyeOpen(false)}
                                    >
                                        <AiFillEye />
                                    </div>
                                    <div
                                        className={`text-xl ${
                                            eyeOpen ? "hidden" : ""
                                        } cursor-pointer`}
                                        onClick={() => setEyeOpen(true)}
                                    >
                                        <AiFillEyeInvisible />
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 w-[150px] text-[15px]">
                                {mahasiswa.Fakultas.nama_fakultas} ,{" "}
                                {mahasiswa.Prodi.nama_prodi}
                            </div>
                            <div className="px-6 py-4 text-[15px] w-[150px] ">
                                <a
                                    href={`https://wa.me/${mahasiswa.no_telp}?text=Halo%20${mahasiswa.nama}Halo,%20saya%20adalah%20admin%20dari%20BPU%20UPN%20VETERAN%20JAWA%20TIMUR.%20Kami%20senang%20bisa%20berhubungan%20dengan%20Anda%20melalui%20WhatsApp.%20Jangan%20ragu%20untuk%20menghubungi%20kami%20jika%20Anda%20membutuhkan%20bantuan,%20informasi,%20atau%20pertanyaan%20lainnya%20terkait%20dengan%20UPN%20VETERAN%20JAWA%20TIMUR.%20Terima%20kasih!"`}
                                >
                                    {mahasiswa.no_telp}
                                </a>
                            </div>
                            <div className="px-6 py-4 text-[15px] w-[140px]">
                                <div className="cursor-pointer"></div>
                            </div>
                            {mahasiswa.status ? (
                                <div className="px-6 py-4 text-[15px] text-green-800 font-semibold w-[100px]">
                                    Aktif
                                </div>
                            ) : (
                                <div className="px-6 py-4 text-[15px] text-red-500 font-semibold w-[100px]">
                                    Tidak Aktif
                                </div>
                            )}
                            <div className="px-6 py-4  flex items-center justify-center w-[140px]">
                                {mahasiswa.status ? (
                                    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 text-[15px] rounded-full">
                                        DeActive
                                    </button>
                                ) : (
                                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 text-[15px] rounded-full">
                                        Approve
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TabMahasiswa;
