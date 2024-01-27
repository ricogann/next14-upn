import Image from "next/image";
import React from "react";

interface IProps {
    bukti: string;
    toggle: () => void;
}

const ZoomComponent: React.FC<IProps> = ({ bukti, toggle }) => {
    return (
        <>
            <div className="w-full h-full fixed flex top-0 left-0 justify-center items-center z-50 backdrop-blur-sm">
                <div className="rounded-lg p-10 flex flex-col justify-center items-center">
                    <div className="flex flex-row justify-end w-full mb-5">
                        <button
                            className="text-[20px] font-bold text-[#F0EDEE] bg-[#07393C] px-5 py-2 rounded-xl"
                            onClick={toggle}
                        >
                            Close
                        </button>
                    </div>
                    {bukti.toLowerCase().endsWith(".pdf") ? (
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}/assets/${bukti}`}
                            target="_blank"
                        >
                            <button>View PDF</button>
                        </a>
                    ) : (
                        <a
                            href={`${process.env.NEXT_PUBLIC_API_URL}/assets/${bukti}`}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_API_URL}/assets/${bukti}`}
                                width={500}
                                height={500}
                                alt="bukti-upload"
                            />
                        </a>
                    )}
                </div>
            </div>
        </>
    );
};

export default ZoomComponent;
