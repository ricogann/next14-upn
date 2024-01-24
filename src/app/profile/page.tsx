"use client";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CardProfile from "@/components/profile/card-profile";
import RiwayatPemesanan from "@/components/profile/riwayat-pemesanan";
import { parseJwt, getClientSideCookie } from "@/libs/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/ui/loading";

const Profile = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function initialize() {
            const cookie = getClientSideCookie();
            if (cookie.token === undefined) {
                router.push("/");
                return;
            } else if (!parseJwt(cookie.token).role) {
                router.push("/");
                return;
            }

            setLoading(false);
        }

        initialize();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="bg-[#2C666E] min-h-screen relative">
                <Navbar />
                {loading ? (
                    <div className="fixed top-0 w-screen h-screen z-[99999] backdrop-blur-md flex items-center justify-center">
                        <Loading />
                    </div>
                ) : (
                    <div className="bg-[#2C666E] min-h-screen relative">
                        <CardProfile />
                        <RiwayatPemesanan />
                        <Footer />
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
