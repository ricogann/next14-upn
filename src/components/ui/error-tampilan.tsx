import sadAnimation from "../../../public/animation-sad.json";
import { useLottie } from "lottie-react";

export default function Error() {
    const options = {
        animationData: sadAnimation,
        loop: true,
        autoplay: true,
    };

    const { View } = useLottie(options);
    return (
        <>
            <div className="h-screen bg-white flex items-center justify-center">
                <div className="flex flex-col justify-center items-center">
                    <div className="w-1/2">{View}</div>
                    <div className="text-2xl font-bold text-gray-700 mx-4 text-center">
                        Yah, tampilan mobile tidak tersedia..
                    </div>
                    <div className="text-xl text-gray-600 mt-2">
                        Buka di desktop atau laptop ya!
                    </div>
                </div>
            </div>
        </>
    );
}
