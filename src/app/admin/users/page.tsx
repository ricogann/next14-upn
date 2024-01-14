"use client";
import { useState, useEffect } from "react";

import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import {
    getUsersUmum,
    getUsersUkm,
    getUsersOrganisasi,
    getUsersMahasiswa,
} from "@/hooks";
import TabUmum from "@/components/admin/users/tab-umum";
import TabMahasiswa from "@/components/admin/users/tab-mahasiswa";
import TabUkm from "@/components/admin/users/tab-ukm";
import TabOrganisasi from "@/components/admin/users/tab-organisasi";

export default function UsersPage() {
    const [activeTab, setActiveTab] = useState("umum");
    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const [usersUmum, setUsersUmum] = useState([]);
    const [usersUkm, setUsersUkm] = useState([]);
    const [usersOrganisasi, setUsersOrganisasi] = useState([]);
    const [usersMahasiswa, setUsersMahasiswa] = useState([]);

    useEffect(() => {
        async function initialize() {
            const umum = await getUsersUmum();
            const ukm = await getUsersUkm();
            const organisasi = await getUsersOrganisasi();
            const mahasiswa = await getUsersMahasiswa();

            setUsersUmum(umum.data);
            setUsersUkm(ukm.data);
            setUsersOrganisasi(organisasi.data);
            setUsersMahasiswa(mahasiswa.data);
        }

        initialize();
    }, []);
    return (
        <>
            <div className="xl:hidden">
                <Error />
            </div>

            <div className="hidden xl:flex">
                <div className="min-h-screen">
                    <Sidebar />
                </div>

                <div className="hidden xl:block bg-[#2C666E] min-h-screen flex-1 overflow-hidden">
                    <div className="p-10 text-white">
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="text-[45px] font-bold">Users</h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                Tabel data users
                            </h4>
                        </div>
                        <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE] mt-3">
                            <button onClick={() => toggleTab("umum")}>
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 ${
                                        activeTab === "umum"
                                            ? "border-b-2 border-[#FFA101] font-bold"
                                            : ""
                                    }`}
                                >
                                    Umum
                                </h2>
                            </button>
                            <button onClick={() => toggleTab("ukm")}>
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 ${
                                        activeTab === "ukm"
                                            ? "border-b-2 border-[#FFA101] font-bold"
                                            : ""
                                    }`}
                                >
                                    Ukm
                                </h2>
                            </button>
                            <button onClick={() => toggleTab("organisasi")}>
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 ${
                                        activeTab === "organisasi"
                                            ? "border-b-2 border-[#FFA101] font-bold"
                                            : ""
                                    }`}
                                >
                                    Organisasi
                                </h2>
                            </button>
                            <button onClick={() => toggleTab("mahasiswa")}>
                                <h2
                                    className={`text-[18] font-regular mb-3 mr-14 ${
                                        activeTab === "mahasiswa"
                                            ? "border-b-2 border-[#FFA101] font-bold"
                                            : ""
                                    }`}
                                >
                                    Mahasiswa
                                </h2>
                            </button>
                        </div>
                        <div className="">
                            {
                                {
                                    umum: <TabUmum data={usersUmum} />,
                                    mahasiswa: (
                                        <TabMahasiswa data={usersMahasiswa} />
                                    ),
                                    ukm: <TabUkm data={usersUkm} />,
                                    organisasi: (
                                        <TabOrganisasi data={usersOrganisasi} />
                                    ),
                                }[activeTab]
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
