"use client";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import CardProfile from "@/components/profile/card-profile";
import RiwayatPemesanan from "@/components/profile/riwayat-pemesanan";

const Profile = () => {
    return (
        <>
            <div className="bg-[#2C666E] min-h-screen relative">
                <Navbar />
                <CardProfile />
                <RiwayatPemesanan />
                <Footer />
            </div>
        </>
    );
};

export default Profile;
