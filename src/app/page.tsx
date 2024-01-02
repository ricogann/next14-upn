"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

import CarouselFasilitas from "@/components/home/carousel-fasilitas";
import Navbar from "@/components/ui/navbar";
import TermService from "@/components/home/term-service";
import Footer from "@/components/ui/footer";

export default function Home() {
    return (
        <>
            <main className="bg-[#2C666E] h-full md:h-full font-montserrat relative overflow-hidden">
                <Navbar />
                <div className="p-10 pb-5 xl:mx-24">
                    <CarouselFasilitas />
                </div>
                <div className="px-10 xl:mx-24">
                    <TermService />
                </div>
                <Footer />
            </main>
        </>
    );
}
