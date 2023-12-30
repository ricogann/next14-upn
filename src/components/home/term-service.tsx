import { useState } from "react";
import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";

export default function TermService() {
    const [toggle, setToggle] = useState(false);
    return (
        <>
            <div
                className="p-5 bg-[#FFFFFF] rounded-[13px] border-[#07393C] border-2 shadow-xl justify-center items-center flex flex-col"
                onClick={() => setToggle(!toggle)}
            >
                <h1 className="text-xl text-center text-[#222222] font-bold md:text-[25px] xl:text-[35px] mt-2 ">
                    Tata Cara Booking Fasilitas UPN
                </h1>
                {toggle ? (
                    <RiArrowDropDownFill
                        style={{ fontSize: "60px", color: "#FFA500" }}
                    />
                ) : (
                    <RiArrowDropUpFill
                        style={{ fontSize: "60px", color: "#FFA500" }}
                    />
                )}
                {toggle && (
                    <div className="flex flex-col gap-3 lg:m-12 p-4 text-black">
                        <div className="bg-white p-4 rounded-[13px] border-[#07393C] border-2">
                            <p>
                                <span className="text-[#FFA500]">1. </span>
                                Login ke akun Anda di website ini
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-[13px] border-[#07393C] border-2">
                            <p>
                                <span className="text-[#FFA500]">2. </span>
                                Pilih tanggal yang tersedia untuk reservasi.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-[13px] border-[#07393C] border-2">
                            <p>
                                <span className="text-[#FFA500]">3. </span>
                                Tunggu persetujuan dari admin untuk reservasi
                                Anda.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-[13px] border-[#07393C] border-2">
                            <p>
                                <span className="text-[#FFA500]">4. </span>
                                Setelah mendapat persetujuan, lakukan pembayaran
                                dan kirim bukti transfer atau lengkapi berkas
                                SIK (Surat Izin Kegiatan) paling lambat satu
                                bulan sebelum tanggal reservasi.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-[13px] border-[#07393C] border-2">
                            <p>
                                <span className="text-[#FFA500]">5. </span>
                                Admin akan melakukan pengecekan dan jika
                                semuanya sesuai, reservasi Anda akan di-approve.
                            </p>
                        </div>
                        <div className="bg-white p-4 rounded-[13px] border-[#07393C] border-2">
                            <p>
                                <span className="text-[#FFA500]">6. </span>
                                Anda akan mendapatkan Invoice berupa PDF yang
                                nantinya dapat Anda gunakan saat registrasi
                                ulang di kantor BPU.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
