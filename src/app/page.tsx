"use client";
import Image from "next/image";
import Loading from "@/components/ui/loading";
import { useState, useEffect } from "react";
import CarouselFasilitas from "@/components/home/carousel-fasilitas";
import Navbar from "@/components/ui/navbar";

export default function Home() {
    const [loading, setLoading] = useState(false);
    return (
        <>
            <main className="bg-[#2C666E] h-screen md:h-full font-montserrat relative overflow-hidden">
                {loading && (
                    <div className="absolute w-full h-full flex justify-center items-center z-50 backdrop-blur-sm">
                        <Loading />
                    </div>
                )}
                <Navbar />
                {/* diisi oleh login component */}
                {/* diisi oleh register component */}
                <div className="p-10 xl:mx-24">
                    <CarouselFasilitas />
                </div>
            </main>
        </>
    );
}
