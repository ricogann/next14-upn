import { useState } from "react";
import TabOnProcess from "./tab-onprocess";
import TabUploadData from "./tab-uploaddata";
import TabReviewBerkas from "./tab-reviewberkas";
import TabCanceled from "./tab-cancelled";
import TabFinished from "./tab-finished";

export default function RiwayatPemesanan() {
    const [activeTab, setActiveTab] = useState("onProcess");
    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };
    return (
        <>
            <div className="bg-white shadow-lg mx-8 p-6 rounded-xl text-[#0A090C]">
                <div className="flex flex-col">
                    <h1 className="text-[20px] text-[#11141A] font-bold">
                        Riwayat Pemesanan
                    </h1>
                    <div className="bg-[#07393C] w-[220px] py-[1px] mt-2"></div>
                </div>
                <div className="flex flex-row items-start border-b border-[#E2E7EE] mt-3 overflow-auto">
                    <a href="#" onClick={() => toggleTab("onProcess")}>
                        <h2
                            className={`text-[14px] font-regular w-[90px] mr-2 ${
                                activeTab === "onProcess"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            On Process
                        </h2>
                    </a>
                    <a href="#" onClick={() => toggleTab("onGoing")}>
                        <h2
                            className={`text-[14px] font-regular w-[90px] mr-2 ${
                                activeTab === "onGoing"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Upload Data
                        </h2>
                    </a>
                    <a href="#" onClick={() => toggleTab("Review")}>
                        <h2
                            className={`text-[14px] font-regular w-[110px] mr-2${
                                activeTab === "Review"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Review Berkas
                        </h2>
                    </a>
                    <a href="#" onClick={() => toggleTab("Finished")}>
                        <h2
                            className={`text-[14px] font-regular mb-3 mr-5 ${
                                activeTab === "Finished"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Finished
                        </h2>
                    </a>
                    <a href="#" onClick={() => toggleTab("Canceled")}>
                        <h2
                            className={`text-[14px] font-regular mb-3 mr-5 ${
                                activeTab === "Canceled"
                                    ? "border-b-2 border-[#FFA101] font-bold"
                                    : ""
                            }`}
                        >
                            Canceled
                        </h2>
                    </a>
                </div>
                <div className="mt-5">
                    {activeTab === "onProcess" && <TabOnProcess />}
                </div>
                <div className="mt-5">
                    {activeTab === "onGoing" && <TabUploadData />}
                </div>
                <div className="mt-5">
                    {activeTab === "Review" && <TabReviewBerkas />}
                </div>
                <div className="mt-5">
                    {activeTab === "Canceled" && <TabCanceled />}
                </div>
                <div className="mt-5">
                    {activeTab === "Finished" && <TabFinished />}
                </div>
            </div>
        </>
    );
}
