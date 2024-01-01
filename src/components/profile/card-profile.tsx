import Cookies from "js-cookie";

export default function CardProfile() {
    return (
        <>
            <div className="bg-[#FFFFFF] flex m-8 mt-7 flex-col gap-3 p-8 rounded-[15px] shadow-lg text-[#0A090C] xl:px-14 xl:py-10 xl:mx-36">
                <div className="">
                    <h1 className="text-[22px] font-bold">Profile</h1>
                    <div className="bg-[#07393C] w-[150px] py-[1px] mt-1"></div>
                </div>
                <div className="">
                    <h1 className="text-[16px] lg:text-[18px] font-semibold">
                        Nama
                    </h1>
                    <h4 className="text-[16px] lg:text-[18px] font-regular ">
                        Rico
                    </h4>
                </div>
                <div className="">
                    <h2 className="text-[16px] lg:text-[18px] font-semibold">
                        No. Telpon
                    </h2>
                    <h2 className="text-[16px] lg:text-[18px] font-regular ">
                        089682285841
                    </h2>
                </div>
                <div className="">
                    <h2 className="text-[16px] lg:text-[18px] font-semibold">
                        Nama Penanggung Jawab
                    </h2>
                    <h2 className="text-[16px] lg:text-[18px] font-regular ">
                        Fanesa Dhea Putri Liskarina
                    </h2>
                </div>
                <button className="border border-black w-full bg-[#07393C] p-2 rounded-lg text-white font-bold uppercase mt-5">
                    Edit Profile
                </button>
            </div>
        </>
    );
}
