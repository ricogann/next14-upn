import { getFasilitas } from "@/hooks";
import { useEffect, useState } from "react";
import splitData from "@/libs/fasilitas";
import FasilitasDTO from "@/interfaces/fasilitasDTO";

import CardFasilitas from "./card-fasilitas";
import InfoFasilitas from "./info-fasilitas";

export default function CarouselFasilitas() {
    const [fasilitas, setFasilitas] = useState<FasilitasDTO[][]>([]);
    const [fasilitasMobile, setFasilitasMobile] = useState<FasilitasDTO[][]>(
        []
    );
    const [infoFasilitas, setInfoFasilitas] = useState<FasilitasDTO>();

    useEffect(() => {
        async function initialize() {
            const fasilitas = await getFasilitas();

            setFasilitas(splitData(fasilitas.data, 5));
            setFasilitasMobile(splitData(fasilitas.data, 4));
            setInfoFasilitas(fasilitas.data[0]);
        }
        initialize();
    }, []);

    return (
        <>
            <div className="md:hidden">
                <div className="carousel w-full">
                    {fasilitasMobile.map((item, index) => {
                        return (
                            <div
                                className="carousel-item grid grid-cols-2 gap-3 mx-5"
                                key={index}
                            >
                                {item.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className=""
                                            onClick={() =>
                                                setInfoFasilitas(item)
                                            }
                                        >
                                            <CardFasilitas
                                                data={item}
                                                className="rounded-[13px] w-[167px] h-[167px]"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                {infoFasilitas && <InfoFasilitas data={infoFasilitas} />}
            </div>
            <div className="hidden md:flex md:flex-col md:items-center md:justify-center">
                <div className="md:flex carousel w-full">
                    {fasilitas.map((item, index) => {
                        return (
                            <div
                                className="carousel-item grid grid-cols-3 gap-3 mx-5"
                                key={index}
                            >
                                {item.map((item, index) => {
                                    return index === 0 ? (
                                        <div
                                            key={index}
                                            className="row-span-2 cursor-pointer relative flex flex-col rounded-lg"
                                            onClick={() =>
                                                setInfoFasilitas(item)
                                            }
                                        >
                                            <CardFasilitas
                                                data={item}
                                                className="rounded-[13px] w-[230px] h-[420px] lg:w-[400px] md:rounded-b-none"
                                            />
                                        </div>
                                    ) : (
                                        <div
                                            key={index}
                                            className="cursor-pointer relative flex flex-col rounded-lg lg:w-[400px]"
                                            onClick={() =>
                                                setInfoFasilitas(item)
                                            }
                                        >
                                            <CardFasilitas
                                                data={item}
                                                className="rounded-[13px] w-[230px] h-[180px] lg:w-[400px] lg:h-[178px] md:rounded-b-none"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                <div className="w-full">
                    {infoFasilitas && <InfoFasilitas data={infoFasilitas} />}
                </div>
            </div>
        </>
    );
}
