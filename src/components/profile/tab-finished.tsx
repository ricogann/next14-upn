import React, { useState, useEffect } from "react";
import { getMisc } from "@/hooks";
import dynamic from "next/dynamic";
import PDFDocument from "@/components/ui/pdf";
import Misc from "@/interfaces/miscDTO";
import BookingDTO from "@/interfaces/bookingDTO";

interface TabFinishedProps {
    data: BookingDTO[];
}

const TabFinished: React.FC<TabFinishedProps> = ({ data }) => {
    const [misc, setMisc] = useState<any>([]);

    const PDFDownloadLink = dynamic(
        () => import("@react-pdf/renderer").then((m) => m.PDFDownloadLink),
        {
            ssr: false,
        }
    );

    useEffect(() => {
        async function initialize() {
            const misc = await getMisc();
            setMisc(misc.data);
        }

        initialize();
    }, []);

    return (
        <>
            <div className="flex flex-col gap-5 rounded-[15px] md:grid md:grid-cols-2 xl:grid-cols-4 xl:px-10 xl:py-5">
                {data.map((item, index) => (
                    <div
                        className="bg-[#FFFFFF] flex flex-col w-full p-5 gap-4 rounded-[15px] shadow-lg border-2 border-[#2EC114]  xl:min-w-[270px] xl:max-w-[320px]"
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
                                {`Tanggal : ${
                                    new Date(
                                        item.tanggal_pemesanan
                                    ).toLocaleDateString("id-ID", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                    }) || "-"
                                }`}
                            </h2>
                        </div>
                        <PDFDownloadLink
                            document={
                                <PDFDocument
                                    nama={"Test"}
                                    no_invoice={item.id_pemesanan}
                                    nama_fasilitas={item.Fasilitas.nama}
                                    harga={item.total_harga}
                                    tanggal_pemesanan={item.tanggal_pemesanan}
                                    data={misc}
                                />
                            }
                            fileName={`invoice-${item.id_pemesanan}.pdf`}
                        >
                            {({ blob, url, loading, error }) => (
                                <button className="border border-black w-full bg-[#07393C] p-3 rounded-lg text-white font-bold">
                                    Download Invoice
                                </button>
                            )}
                        </PDFDownloadLink>
                    </div>
                ))}
            </div>
        </>
    );
};

export default TabFinished;
