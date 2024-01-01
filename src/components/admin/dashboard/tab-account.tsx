const TabAccount = ({ data }) => {
    console.log(data);
    function renderItems(items, keyName, isBold = false) {
        return items.map((item, index) => (
            <div key={index}>
                {isBold && <h1 className="font-bold">{keyName}</h1>}
                <h1>{item[keyName]}</h1>
            </div>
        ));
    }
    return (
        <>
            <div className="flex flex-col text-black">
                <div className="grid grid-cols-3 mr-32 gap-5">
                    {data.map((item, index) => (
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
                                <p className="font-bold mt-2">Daftar Sebagai</p>
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
                                    >
                                        Accept Request
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default TabAccount;
