const TabUploadData = () => {
    return (
        <>
            <div className="flex flex-col gap-5 rounded-[15px] xl:m-4 xl:grid xl:grid-cols-3 xl:gap-10 xl:ml-10">
                <div className="bg-[#FFFFFF] flex flex-col w-full p-5 gap-4 rounded-[15px] shadow-lg border-2 border-[#FFA101] xl:w-[300px]">
                    <div className="flex flex-col">
                        <h2 className="text-[16px] lg:text-[20px] font-bold">
                            Giri Loka
                        </h2>
                        <h2 className="text-[12px] lg:text-[15px] font-regular ">
                            {`Booking ref # : 123456`}
                        </h2>
                        <h2 className="text-[12px] lg:text-[15px] font-regular ">
                            {`Tanggal : 12/12/2021`}
                        </h2>
                    </div>

                    <div className="border-t border-gray-500 xl:hidden"></div>
                    <div className={`text-center`}>
                        <h2 className="text-[16px] lg:text-[15px] font-semibold">
                            Kode BNI VA
                        </h2>
                        <h2 className="text-[16px] lg:text-[20px] font-semibold text-[#FFA101]">
                            1693547942887
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
            </div>
        </>
    );
};

export default TabUploadData;
