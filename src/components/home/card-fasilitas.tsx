import Image from "next/image";
import { useState, useEffect } from "react";
import FasilitasDTO from "@/interfaces/fasilitasDTO";

type CardFasilitasProps = {
    data: FasilitasDTO;
};

const CardFasilitas: React.FC<CardFasilitasProps> = ({ data }) => {
    const [foto, setFoto] = useState([]);
    useEffect(() => {
        setFoto(JSON.parse(data.foto));
    }, []);
    return (
        <>
            <div className="">
                <div className="relative w-full">
                    <Image
                        src={`https://api.ricogann.com/assets/${foto[0]}`}
                        width={150}
                        height={150}
                        alt="asrama"
                        className="rounded-[13px] w-[167px] h-[167px]"
                    />
                </div>
                <div className="hidden md:flex justify-center items-center">
                    <p className="text-white font-bold text-2xl mt-5">
                        {data.nama}
                    </p>
                </div>
            </div>
        </>
    );
};

export default CardFasilitas;
