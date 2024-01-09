import { useState, useEffect } from "react";
import Loading from "@/components/ui/loading";
import splitData from "@/libs";
import Pagination from "@/components/ui/pagination";
import { updateStatusAccount } from "@/hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TabAccount = ({ data }) => {
    function renderItems(items, keyName, isBold = false) {
        return items.map((item, index) => (
            <div key={index}>
                {isBold && <h1 className="font-bold">{keyName}</h1>}
                <h1>{item[keyName]}</h1>
            </div>
        ));
    }

    const [loading, setLoading] = useState(true);
    const [dataShow, setDataShow] = useState<any[]>([]);
    const [page, setPage] = useState(0);

    useEffect(() => {
        setDataShow(splitData(data, 6));

        if (dataShow.length > 0) {
            setLoading(false);
        }
    }, []);

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
            <ToastContainer />
            <div className="flex flex-col text-black">
                <div className="grid grid-cols-3 mr-32 gap-5">
                    {dataShow.length > 0 ? (
                        dataShow[page].map((item, index) => (
                            <div
                                className="bg-white rounded-lg shadow-xl p-5 mr-5 mb-5 flex flex-col justify-between min-h-[220px] w-[320px]"
                                key={index}
                            >
                                <div className="text-[16px]">
                                    <p className=" font-bold">Nama</p>
                                    {item.Mahasiswa.length > 0
                                        ? renderItems(item.Mahasiswa, "nama")
                                        : item.Dosen.length > 0
                                        ? renderItems(item.Dosen, "nama", true)
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
                                    <p className="font-bold">Bukti Identitas</p>
                                    <p className="font-regular mb-5 xl:mb-2">
                                        Mahasiswaa
                                    </p>
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
                                                    item.Mahasiswa.length > 0
                                                        ? item.Mahasiswa[0].id
                                                        : item.Umum.length > 0
                                                        ? item.Umum[0].id
                                                        : item.UKM.length > 0
                                                        ? item.UKM[0].id
                                                        : item.Organisasi[0].id,
                                                    true
                                                )
                                            }
                                        >
                                            Accept Request
                                        </button>
                                    </div>
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
        </>
    );
};

export default TabAccount;
