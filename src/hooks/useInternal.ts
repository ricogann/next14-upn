import { fasilitasApi, campusApi } from "@/services";

// fasilitas
export const getFasilitas = async () => {
    return await fasilitasApi.getFasilitas();
};

// campus
export const getFakultas = async () => {
    return await campusApi.getFakultas();
};

export const getProdi = async () => {
    return await campusApi.getProdi();
};

export const getTahunAjaran = async () => {
    return await campusApi.getTahunAjaran();
};
