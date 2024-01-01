const TabUploadData = ({ data }) => {
    console.log(data);
    return (
        <>
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
                        <div className={`text-center`}>
                            <h2 className="text-[16px] lg:text-[15px] font-semibold">
                                Kode BNI VA
                            </h2>
                            <h2 className="text-[16px] lg:text-[20px] font-semibold text-[#FFA101]">
                                {item.Fasilitas.no_va}
                            </h2>
                        </div>

                        <div className={`text-center`}>
                            <h2 className="text-[16px] lg:text-[12px] font-bold xl:hidden mb-2">
                                Upload Bukti Pembayaran
                            </h2>

                            <div>
                                <input
                                    name="bukti_pembayaran"
                                    type="file"
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                />
                            </div>
                        </div>

                        <button className="border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-2">
                            SUBMIT
                        </button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TabUploadData;
