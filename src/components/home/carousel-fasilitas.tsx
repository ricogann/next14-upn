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
        }
        initialize();
    }, []);
    return (
        <>
            <div className="">
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
                                            <CardFasilitas data={item} />
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
                {infoFasilitas && <InfoFasilitas data={infoFasilitas} />}
            </div>
        </>
    );
}
