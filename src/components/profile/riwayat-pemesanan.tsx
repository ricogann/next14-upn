import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import TabOnProcess from "./tab-onprocess";
import TabUploadData from "./tab-uploaddata";
import TabReviewBerkas from "./tab-reviewberkas";
import TabCanceled from "./tab-cancelled";
import TabFinished from "./tab-finished";

import { getBookingByIdUser } from "@/hooks";
import { parseJwt } from "@/libs/auth";

export default function RiwayatPemesanan() {
    const [activeTab, setActiveTab] = useState("onProcess");
    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };
    const [dataOnProcess, setDataOnProcess] = useState([]);
    const [dataOnGoing, setDataOnGoing] = useState([]);
    const [dataReview, setDataReview] = useState([]);
    const [dataCanceled, setDataCanceled] = useState([]);
    const [dataFinished, setDataFinished] = useState([]);

    useEffect(() => {
        async function initialize() {
            const account = parseJwt(Cookies.get("CERT"));
            const data = await getBookingByIdUser(account.id_account);

            const onProcess = data.data.filter(
                (item) => item.status === "Menunggu Konfirmasi"
            );
            const onGoing = data.data.filter(
                (item) => item.status === "Menunggu Berkas"
            );
            const review = data.data.filter(
                (item) => item.status === "Review Berkas"
            );
            const canceled = data.data.filter(
                (item) => item.status === "Dibatalkan"
            );
            const finished = data.data.filter(
                (item) => item.status === "Dikonfirmasi"
            );

            setDataOnProcess(onProcess);
            setDataOnGoing(onGoing);
            setDataReview(review);
            setDataCanceled(canceled);
            setDataFinished(finished);
        }

        initialize();
    }, []);

    return (
        <>
            <div className="bg-white shadow-lg mx-8 p-8 rounded-xl text-[#0A090C] xl:mx-36">
                <div className="flex flex-col">
                    <h1 className="text-[20px] text-[#11141A] font-bold">
                        Riwayat Pemesanan
                    </h1>
                    <div className="bg-[#07393C] w-[220px] py-[1px] mt-2"></div>
                </div>
                <div className="flex flex-row items-start border-b border-[#E2E7EE] mt-3 overflow-auto">
                    <button onClick={() => toggleTab("onProcess")}>
                        <h2
                            className={`text-[14px] font-regular w-[90px] mr-2 ${
                                activeTab === "onProcess"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            On Process
                        </h2>
                    </button>
                    <button onClick={() => toggleTab("onGoing")}>
                        <h2
                            className={`text-[14px] font-regular w-[90px] mr-2 ${
                                activeTab === "onGoing"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Upload Data
                        </h2>
                    </button>
                    <button onClick={() => toggleTab("Review")}>
                        <h2
                            className={`text-[14px] font-regular w-[110px] mr-3${
                                activeTab === "Review"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Review Berkas
                        </h2>
                    </button>
                    <button onClick={() => toggleTab("Finished")}>
                        <h2
                            className={`text-[14px] font-regular mb-3 mr-5 ${
                                activeTab === "Finished"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Finished
                        </h2>
                    </button>
                    <button onClick={() => toggleTab("Canceled")}>
                        <h2
                            className={`text-[14px] font-regular mb-3 mr-5 ${
                                activeTab === "Canceled"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Canceled
                        </h2>
                    </button>
                </div>
                <div className="mt-5">
                    {activeTab === "onProcess" && (
                        <TabOnProcess data={dataOnProcess} />
                    )}
                </div>
                <div className="mt-5">
                    {activeTab === "onGoing" && (
                        <TabUploadData data={dataOnGoing} />
                    )}
                </div>
                <div className="mt-5">
                    {activeTab === "Review" && (
                        <TabReviewBerkas data={dataReview} />
                    )}
                </div>
                <div className="mt-5">
                    {activeTab === "Canceled" && (
                        <TabCanceled data={dataCanceled} />
                    )}
                </div>
                <div className="mt-5">
                    {activeTab === "Finished" && (
                        <TabFinished data={dataFinished} />
                    )}
                </div>
            </div>
        </>
    );
}
