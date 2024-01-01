"use client";
import { useState, useEffect } from "react";

import Error from "@/components/ui/error-tampilan";
import Sidebar from "@/components/ui/sidebar";
import CardStats from "@/components/admin/dashboard/card-stats";
import TabBookings from "@/components/admin/dashboard/tab-bookings";
import TabBerkas from "@/components/admin/dashboard/tab-berkas";
import TabAccount from "@/components/admin/dashboard/tab-account";
import { getBooking, getUsers } from "@/hooks";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("bookings");
    const [totalBooking, setTotalBooking] = useState(0);
    const [bookingsPending, setBookingsPending] = useState([]);
    const [reviewBerkas, setReviewBerkas] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [usersPending, setUsersPending] = useState([]);

    const toggleTab = (tab: string) => {
        setActiveTab(tab);
    };

    const isTabActive = (tab: string) => activeTab === tab;

    useEffect(() => {
        async function initialize() {
            const booking = await getBooking();
            const bookingPending = booking.data.filter(
                (item) => item.status === "Menunggu Konfirmasi"
            );
            const reviewBerkas = booking.data.filter(
                (item) => item.status === "Review Berkas"
            );
            const users = await getUsers();
            const usersPending = users.data.filter(
                (item) => item.status_account === false
            );
            setTotalBooking(booking.data.length);
            setBookingsPending(bookingPending);
            setReviewBerkas(reviewBerkas);
            setTotalUsers(users.data.length);
            setUsersPending(usersPending);
        }

        initialize();
    }, []);

    return (
        <>
            <div className="xl:hidden">
                <Error />
            </div>

            <div className="hidden xl:flex">
                <div className="">
                    <Sidebar />
                </div>
                <div className="hidden xl:block bg-[#2C666E] min-h-screen flex-1">
                    <div className="p-10">
                        <div className="flex flex-col items-start justify-center">
                            <h1 className="text-[45px] font-bold">Dashboard</h1>
                            <h4 className="text-[15px] font-regular mb-5 text-dark-whiteText">
                                Welcome Back!
                            </h4>
                            <h4 className="text-[20px] font-bold mb-3">
                                Quick Stats
                            </h4>
                        </div>
                        <CardStats
                            booking={totalBooking}
                            bookingPending={bookingsPending.length}
                            account={totalUsers}
                            accountPending={usersPending.length}
                        />
                        <div className="flex flex-row items-start mb-5 border-b border-[#E2E7EE]">
                            <a
                                href="#"
                                onClick={() => toggleTab("bookings")}
                                className={`text-[18] ${
                                    isTabActive("bookings")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Bookings Fasilitas
                            </a>
                            <a
                                href="#"
                                onClick={() => toggleTab("berkas")}
                                className={`text-[18] ${
                                    isTabActive("berkas")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Berkas Bookings
                            </a>
                            <a
                                href="#"
                                onClick={() => toggleTab("account")}
                                className={`text-[18] ${
                                    isTabActive("account")
                                        ? "font-bold mb-3 mr-14 border-b-2 border-[#FFA101]"
                                        : "font-regular mb-3 mr-14"
                                }`}
                            >
                                Request Account
                            </a>
                        </div>
                        <div className="mt-5">
                            {activeTab === "bookings" && (
                                <TabBookings data={bookingsPending} />
                            )}
                        </div>
                        <div className="mt-5">
                            {activeTab === "berkas" && (
                                <TabBerkas data={reviewBerkas} />
                            )}
                        </div>
                        <div className="mt-5">
                            {activeTab === "account" && (
                                <TabAccount data={usersPending} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
