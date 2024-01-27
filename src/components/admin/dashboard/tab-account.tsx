import React, { useState, useEffect } from "react";
import Loading from "@/components/ui/loading";
import splitData from "@/libs";
import Pagination from "@/components/ui/pagination";
import { updateStatusAccount } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";
import AccountDTO from "@/interfaces/accountDTO";
import ZoomComponent from "@/components/ui/zoom";

interface TabAccountProps {
    data: AccountDTO[];
}

const TabAccount: React.FC<TabAccountProps> = ({ data }) => {
    function renderItems(items: any, keyName: string, isBold = false) {
        return items.map((item: any, index: number) => (
            <div key={index}>
                {isBold && <h1 className="font-bold">{keyName}</h1>}
                <h1>{item[keyName]}</h1>
            </div>
        ));
    }

    const [loading, setLoading] = useState(true);
    const [dataShow, setDataShow] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [buktiIdentitas, setBuktiIdentitas] = useState<string[]>([]);
    const [buktiIdentitasShow, setBuktiIdentitasShow] = useState<string>("");
    const [page, setPage] = useState(0);

    useEffect(() => {
        const accountBukti: string[] = [];
        const buktiPembayaranFilter = data.filter((item) => {
            if (item.Mahasiswa.length > 0) {
                item.Mahasiswa.map((item) => {
                    accountBukti.push(item.bukti_identitas);
                });
            } else if (item.Dosen.length > 0) {
                item.Dosen.map((item) => {
                    accountBukti.push(item.bukti_identitas);
                });
            } else if (item.Umum.length > 0) {
                item.Umum.map((item) => {
                    accountBukti.push(item.bukti_identitas);
                });
            } else if (item.UKM.length > 0) {
                item.UKM.map((item) => {
                    accountBukti.push(item.bukti_identitas);
                });
            } else {
                item.Organisasi.map((item) => {
                    accountBukti.push(item.bukti_identitas);
                });
            }
        });

        setBuktiIdentitas(accountBukti);
        setDataShow(splitData(data, 6));

        if (dataShow.length > 0) {
            setLoading(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggleModal = (value: string) => {
        setIsModalOpen(!isModalOpen);
        setBuktiIdentitasShow(value);
    };

    const handleSubmit = async (
        id: number,
        id_account: number,
        status: boolean
    ) => {
        const data = {
            id: id_account,
            status_account: status,
        };

        const res = await updateStatusAccount(id, data);

        if (res.status === true) {
            toast.success("Berhasil mengubah status akun", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
            });
            window.location.reload();
        } else {
            toast.error(res.error, {
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
            {isModalOpen && (
                <ZoomComponent
                    bukti={buktiIdentitasShow}
                    toggle={() => toggleModal("")}
                />
            )}
            <ToastContainer />
            <div className="flex flex-col text-black">
                <div className="grid grid-cols-3 mr-32 gap-5">
                    {dataShow.length > 0 ? (
                        dataShow[page].map(
                            (item: AccountDTO, index: number) => (
                                <div
                                    className="bg-white rounded-lg shadow-xl p-5 mr-5 mb-5 flex flex-col justify-between min-h-[220px] w-[320px]"
                                    key={index}
                                >
                                    <div className="text-[16px]">
                                        <p className=" font-bold">Nama</p>
                                        {item.Mahasiswa.length > 0
                                            ? renderItems(
                                                  item.Mahasiswa,
                                                  "nama"
                                              )
                                            : item.Dosen.length > 0
                                            ? renderItems(
                                                  item.Dosen,
                                                  "nama",
                                                  true
                                              )
                                            : item.Umum.length > 0
                                            ? renderItems(item.Umum, "nama")
                                            : item.UKM.length > 0
                                            ? renderItems(item.UKM, "nama_ukm")
                                            : renderItems(
                                                  item.Organisasi,
                                                  "nama_organisasi"
                                              )}
                                        <p className="font-bold mt-2">
                                            Daftar Sebagai
                                        </p>
                                        <p className="font-regular mb-5 xl:mb-2">
                                            {item.Role.nama_role
                                                .charAt(0)
                                                .toUpperCase() +
                                                item.Role.nama_role.slice(1)}
                                        </p>
                                        <div className="flex flex-row mt-4">
                                            <div className="flex-col">
                                                <div className="text-[14] font-bold mb-3">
                                                    Bukti Registrasi
                                                </div>
                                                <div className="cursor-pointer h-[100px] w-[150px] ">
                                                    {buktiIdentitas[index]
                                                        .toLowerCase()
                                                        .endsWith(".pdf") ? (
                                                        <a
                                                            href={`${process.env.NEXT_PUBLIC_API_URL}/assets/${buktiIdentitas[index]}`}
                                                            target="_blank"
                                                            className="cursor-pointer font-bold text-[#F0EDEE] bg-[#07393C] px-5 py-2 rounded-xl"
                                                        >
                                                            View PDF
                                                        </a>
                                                    ) : (
                                                        <button
                                                            onClick={() =>
                                                                toggleModal(
                                                                    buktiIdentitas[
                                                                        index
                                                                    ]
                                                                )
                                                            }
                                                        >
                                                            <Image
                                                                src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${buktiIdentitas[index]}`}
                                                                alt="bukti-pembayaran"
                                                                width={120}
                                                                height={120}
                                                                className="rounded-lg h-[100px] w-[150px] object-cover"
                                                            />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row justify-between mt-6">
                                            <button>
                                                <p
                                                    className={`text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-red-500`}
                                                >
                                                    Decline Request
                                                </p>
                                            </button>
                                            <button
                                                className={`text-[14px] font-Bold text-white px-4 py-2 rounded-lg bg-[#07393C]`}
                                                onClick={() =>
                                                    handleSubmit(
                                                        item.id_account,
                                                        item.Mahasiswa.length >
                                                            0
                                                            ? item.Mahasiswa[0]
                                                                  .id
                                                            : item.Umum.length >
                                                              0
                                                            ? item.Umum[0].id
                                                            : item.UKM.length >
                                                              0
                                                            ? item.UKM[0].id
                                                            : item.Organisasi[0]
                                                                  .id,
                                                        true
                                                    )
                                                }
                                            >
                                                Accept Request
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )
                        )
                    ) : (
                        <div className="">
                            {loading ? (
                                <div
                                    className={`relative left-[120%] flex items-center justify-center`}
                                >
                                    <Loading />
                                </div>
                            ) : (
                                <div
                                    className={`text-white text-2xl w-[1000px]`}
                                >
                                    Data kosong.. Masih belum ada yang upload
                                    berkas
                                </div>
                            )}
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
        </>
    );
};

export default TabAccount;
