import { useQuery } from "react-query";
import { fasilitasApi } from "@/services";

// fasilitas
export const getFasilitas = async () => {
    return await fasilitasApi.getFasilitas();
};
