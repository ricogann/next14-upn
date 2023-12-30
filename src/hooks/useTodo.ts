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

export const registration = async (data: any, role: string) => {
    if (role === "mahasiswa") {
        const { nik, nama_pj, ...mahasiswa } = data;
        const formData = new FormData();
        formData.append("nama", mahasiswa.nama);
        formData.append("npm", mahasiswa.npm);
        formData.append("email", mahasiswa.email);
        formData.append("password", mahasiswa.password);
        formData.append("id_tahun_ajaran", mahasiswa.tahun_ajaran);
        formData.append("id_fakultas", mahasiswa.fakultas);
        formData.append("id_prodi", mahasiswa.prodi);
        formData.append("no_telp", mahasiswa.no_telp);
        formData.append("bukti_identitas", mahasiswa.bukti as Blob);
        formData.append("status", "0");
        return await authApi.registerMahasiswa(formData);
    } else if (role === "umum") {
        const { npm, fakultas, prodi, tahun_ajaran, nama_pj, ...umum } = data;
        const formData = new FormData();
        formData.append("nama", umum.nama);
        formData.append("email", umum.email);
        formData.append("password", umum.password);
        formData.append("no_telp", umum.no_telp);
        formData.append("bukti_identitas", umum.bukti as Blob);
        formData.append("status", "0");
        return await authApi.registerUmum(formData);
    } else if (role === "ukm") {
        const { npm, fakultas, prodi, tahun_ajaran, nik, ...ukm } = data;
        const formData = new FormData();
        formData.append("nama", ukm.nama);
        formData.append("email", ukm.email);
        formData.append("password", ukm.password);
        formData.append("no_telp", ukm.no_telp);
        formData.append("nama_pj", ukm.nama_pj);
        formData.append("bukti_identitas", ukm.bukti as Blob);
        formData.append("status", "0");
        return await authApi.registerUkm(formData);
    } else {
        const { npm, fakultas, prodi, tahun_ajaran, nik, ...organisasi } = data;
        const formData = new FormData();
        formData.append("nama", organisasi.nama);
        formData.append("email", organisasi.email);
        formData.append("password", organisasi.password);
        formData.append("no_telp", organisasi.no_telp);
        formData.append("nama_pj", organisasi.nama_pj);
        formData.append("bukti_identitas", organisasi.bukti as Blob);
        formData.append("status", "0");
        return await authApi.registerOrganisasi(formData);
    }
};
