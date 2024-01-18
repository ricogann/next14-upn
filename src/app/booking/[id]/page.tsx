"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CardFasilitas from "@/components/booking/card-fasilitas";
import FormBooking from "@/components/booking/form-booking";
import FasilitasDTO from "@/interfaces/fasilitasDTO";
import BookingDTO from "@/interfaces/bookingDTO";
import { getFasilitasById, getBooking } from "@/hooks";
import { useRouter } from "next/navigation";
import Loading from "@/components/ui/loading";

export default function Booking() {
    const path = usePathname();
    const [fasilitas, setFasilitas] = useState<FasilitasDTO>();
    const [booking, setBooking] = useState<BookingDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        async function initialize() {
            const fasilitas = await getFasilitasById(path.split("/")[2]);
            const booking = await getBooking();

            if (fasilitas.data.active === false) {
                router.push("/");
            } else {
                setLoading(false);
            }
            setBooking(booking.data);
            setFasilitas(fasilitas.data);
        }
        initialize();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <>
            <div
                className={`fixed w-screen h-screen z-[99999] backdrop-blur-xl flex items-center justify-center ${
                    loading ? "block" : "hidden"
                }`}
            >
                <Loading />
            </div>
            <div className="min-h-screen bg-[#2C666E] relative">
                <Navbar />
                <div className="p-10 xl:px-28">
                    <div className=" flex flex-col rounded-[13px] xl:mb-5">
                        <h1 className="text-[14px] font-regular text-[#F0EDEE]">
                            Step 1 of 2
                        </h1>
                        <h1 className="text-[29px] font-bold text-[#F0EDEE]">
                            Form Sewa Fasilitas
                        </h1>
                    </div>
                    <div className="xl:flex">
                        <CardFasilitas
                            booking={booking}
                            fasilitas={fasilitas}
                        />
                        <FormBooking booking={booking} fasilitas={fasilitas} />
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}
