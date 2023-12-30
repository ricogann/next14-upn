import { authApi } from "@/services";

export const login = async (data: any) => {
    if (data.role === "mahasiswa") {
        const mahasiswa = {
            npm: data.npm,
            password: data.password,
        };
        return await authApi.loginMahasiswa(mahasiswa);
    } else if (data.role === "umum") {
        const umum = {
            email: data.email,
            password: data.password,
        };
        return await authApi.loginUmum(umum);
    } else if (data.role === "ukm") {
        const ukm = {
            email: data.email,
            password: data.password,
        };
        return await authApi.loginUkm(ukm);
    } else if (data.role === "organisasi") {
        const organisasi = {
            email: data.email,
            password: data.password,
        };
        return await authApi.loginOrganisasi(organisasi);
    }
};
