import Image from "next/image";

const InfoData = ({ data }) => {
    return (
        <>
            <div className="flex flex-full w-[900px] overflow-hidden rounded-lg">
                <div className="min-w-full divide-y divide-gray-200 rounded-lg overflow-hidden">
                    <div className="flex flex-col gap-5 ">
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Nama Instansi
                            </h1>
                            <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                {data?.nama_instansi}
                            </h1>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                No HP BPU
                            </h1>
                            <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                {data?.no_hp}
                            </h1>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                NIP
                            </h1>
                            <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                {data?.nip_pic}
                            </h1>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Nama Pimpinan BPU
                            </h1>
                            <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                {data?.nama_pic}
                            </h1>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Instagram
                            </h1>
                            <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                {data?.instagram}
                            </h1>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Website
                            </h1>
                            <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                {data?.laman_web}
                            </h1>
                        </div>
                        <div className="flex flex-fit gap-3 bg-white rounded-lg">
                            <h1 className="flex-auto px-6 py-3  text-left text-xs leading-4 font-medium text-black tracking-wider ">
                                Email
                            </h1>
                            <h1 className="px-6 py-3 text-left text-xs leading-4 font-medium text-black tracking-wider">
                                {data?.email}
                            </h1>
                        </div>
                        <div className="flex flex-row gap-3 rounded-lg">
                            <div className="flex flex-col p-5 gap-3 bg-white rounded-lg">
                                <h1 className="text-center text-md font-medium text-black">
                                    Logo BPU
                                </h1>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${data?.logo_instansi}`}
                                    width={100}
                                    height={100}
                                    className="h-[100px] w-full bg-[#FFFFFF]"
                                    alt="test"
                                />
                            </div>
                            <div className="flex flex-col p-5 gap-3 bg-white rounded-lg">
                                <h1 className="text-center text-md font-medium text-black">
                                    Tanda Tangan Pimpinan
                                </h1>
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${data?.tanda_tangan}`}
                                    width={100}
                                    height={100}
                                    className="h-[100px] w-full bg-[#FFFFFF]"
                                    alt="test"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InfoData;
