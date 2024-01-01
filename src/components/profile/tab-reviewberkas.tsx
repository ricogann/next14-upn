const TabReviewBerkas = ({ data }) => {
    return (
        <>
            <div className="flex flex-col gap-5 rounded-[15px] md:grid md:grid-cols-2 xl:grid-cols-4 xl:px-10 xl:py-5">
                {data.map((item, index) => (
                    <div
                        className="bg-[#FFFFFF] flex flex-col w-full p-5 gap-4 rounded-[15px] shadow-lg border-2 border-[#FFA101]  xl:min-w-[270px] xl:max-w-[320px]"
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
                        <div className="text-black">
                            <h2 className="text-[16px] lg:text-[15px] font-semibold ">
                                Status
                            </h2>
                            <h1 className="text-[#FFA101] font-bold">
                                {item.status}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TabReviewBerkas;
