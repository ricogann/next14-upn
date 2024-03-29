import Image from "next/image";
import { useState, useEffect } from "react";
import FasilitasDTO from "@/interfaces/fasilitasDTO";
import Loading from "../ui/loading";

type CardFasilitasProps = {
    data: FasilitasDTO;
    className?: string;
};

const CardFasilitas: React.FC<CardFasilitasProps> = ({ data, className }) => {
    const [foto, setFoto] = useState([]);
    useEffect(() => {
        setFoto(JSON.parse(data.foto));
    }, []);
    return (
        <>
            <div className="relative">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${foto[0]}`}
                    width={150}
                    height={150}
                    alt="foto fasilitas"
                    className={className}
                    quality={80}
                    priority
                />
            </div>
            <div className="hidden md:flex bg-[#07393C] justify-center items-center rounded-b-xl">
                <p className="text-white font-bold text-md p-3">{data.nama}</p>
            </div>
        </>
    );
};

export default CardFasilitas;
