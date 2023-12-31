const TabFinished = () => {
    return (
        <>
            <div className="flex flex-col gap-5 rounded-[15px] xl:grid xl:grid-cols-3 xl:w-full xl:justify-items-center xl:mt-4">
                <div className="bg-[#FFFFFF] flex flex-col w-full p-5 gap-4 rounded-[15px] shadow-lg border-2 border-[#2EC114] xl:w-[300px]">
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

                    <button className="border border-black w-full bg-[#07393C] p-3 rounded-lg text-white font-bold mt-5">
                        Download Invoice
                    </button>
                </div>
            </div>
        </>
    );
};

export default TabFinished;
