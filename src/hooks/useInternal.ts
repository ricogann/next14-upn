import {
    fasilitasApi,
    campusApi,
    bookingApi,
    usersApi,
    miscApi,
} from "@/services";

// fasilitas
export const getFasilitas = async () => {
    return await fasilitasApi.getFasilitas();
};

export const getFasilitasById = async (id: string) => {
    return await fasilitasApi.getFasilitasById(id);
};

export const getHargaFasilitas = async (id: number) => {
    return await fasilitasApi.getHargaFasilitas(id);
};

export const getAllHargaFasilitas = async () => {
    return await fasilitasApi.getAllHargaFasilitas();
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

// booking
export const getBooking = async () => {
    return await bookingApi.getBooking();
};

export const getBookingByIdUser = async (id: string) => {
    return await bookingApi.getBookingByIdUser(id);
};

// user
export const getUsers = async () => {
    return await usersApi.getUsers();
};

export const getUsersUmum = async () => {
    return await usersApi.getUsersUmum();
};

export const getUsersUkm = async () => {
    return await usersApi.getUsersUkm();
};

export const getUsersMahasiswa = async () => {
    return await usersApi.getUsersMahasiswa();
};

export const getUsersOrganisasi = async () => {
    return await usersApi.getUsersOrganisasi();
};

// misc
export const getMisc = async () => {
    return await miscApi.getMisc();
};
