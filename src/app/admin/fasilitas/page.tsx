"use client";
import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";

export default function FasilitasPage() {
    return (
        <>
            <div className="">
                <div className="xl:hidden">
                    <Error />
                </div>

                <div className="hidden xl:flex">
                    <Sidebar />

                    <div className="hidden xl:block bg-[#2C666E] min-h-screen flex-1 overflow-hidden">
                        <div className="p-10">
                            <div className="flex flex-col items-start justify-center">
                                <h1 className="text-[45px] font-bold">
                                    Fasilitas
                                </h1>
                                <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                    Tabel data fasilitas
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
