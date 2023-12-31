const TabReviewBerkas = () => {
    return (
        <>
            <div className="flex flex-col gap-5 rounded-[15px] xl:grid xl:grid-cols-3 xl:w-full xl:justify-items-center xl:mt-4">
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
                    <div className="text-black">
                        <h2 className="text-[16px] lg:text-[15px] font-semibold ">
                            Status
                        </h2>
                        <h1 className="text-[#FFA101] font-bold">
                            Menunggu Review Berkas
                        </h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TabReviewBerkas;
