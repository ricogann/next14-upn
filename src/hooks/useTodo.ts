import {
    authApi,
    bookingApi,
    usersApi,
    miscApi,
    fasilitasApi,
} from "@/services";

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

export const loginAdmin = async (data: any) => {
    return await authApi.loginAdmin(data);
};

export const createBooking = async (data: any) => {
    return await bookingApi.createBooking(data);
};

export const uploadBukti = async (id: string, data: any) => {
    return await bookingApi.uploadBukti(id, data);
};

export const uploadSIK = async (id: string, data: any) => {
    return await bookingApi.uploadSIK(id, data);
};

export const updateUsersUmum = async (id: string, data: any) => {
    return await usersApi.updateUsersUmum(id, data);
};

export const updateUsersUkm = async (id: string, data: any) => {
    return await usersApi.updateUsersUkm(id, data);
};

export const updateUsersMahasiswa = async (id: string, data: any) => {
    return await usersApi.updateUsersMahasiswa(id, data);
};

export const updateUsersOrganisasi = async (id: string, data: any) => {
    return await usersApi.updateUsersOrganisasi(id, data);
};

export const checkExpiredMahasiswa = async (id: number) => {
    return await usersApi.checkExpiredMahasiswa(id);
};

export const addMahasiswaToKamar = async (id: number, data: any) => {
    return await bookingApi.addMahasiswaToKamar(id, data);
};

export const updateStatusBooking = async (id: number, data: any) => {
    return await bookingApi.updateStatusBooking(id, data);
};

export const updateStatusAccount = async (id: number, data: any) => {
    return await usersApi.updateStatusAccount(id, data);
};

export const updateDataMisc = async (id: number, data: any) => {
    const formData = new FormData();
    formData.append("nama_instansi", data.nama_instansi);
    formData.append("no_hp", data.no_hp);
    formData.append("email", data.email);
    formData.append("instagram", data.instagram);
    formData.append("laman_web", data.laman_web);
    formData.append("nama_pic", data.nama_pic);
    formData.append("nip_pic", data.nip_pic);
    formData.append("logo_instansi", data.logo_instansi as Blob);
    formData.append("tanda_tangan", data.tanda_tangan as Blob);
    formData.append("logo_instansi_old", data.logo_instansi_old);
    formData.append("tanda_tangan_old", data.tanda_tangan_old);

    return await miscApi.updateDataMisc(id, formData);
};

export const updateFasilitas = async (id: number, data: any) => {
    const formData = new FormData();
    formData.append("nama", data.nama);
    formData.append("alamat", data.alamat);
    formData.append("deskripsi", data.deskripsi);
    formData.append("jam_buka", data.jam_buka);
    formData.append("jam_tutup", data.jam_tutup);
    data.foto.forEach((foto: any) => {
        formData.append("foto", foto);
    });
    data.termservice.forEach((termService: any) => {
        formData.append("termservice", termService);
    });
    formData.append("durasi", String(1));
    formData.append("buka_hari", data.buka_hari);
    formData.append("no_va", data.no_va);
    formData.append("name_foto_old", data.name_foto_old);
    formData.append("name_termservice_old", data.name_termservice_old);

    return await fasilitasApi.updateFasilitas(id, formData);
};

export const addFasilitas = async (data: any) => {
    const formData = new FormData();
    formData.append("nama", data.nama);
    formData.append("alamat", data.alamat);
    formData.append("deskripsi", data.deskripsi);
    formData.append("jam_buka", data.jam_buka);
    formData.append("jam_tutup", data.jam_tutup);
    data.foto.forEach((foto: any) => {
        formData.append("foto", foto);
    });
    data.termservice.forEach((termService: any) => {
        formData.append("termservice", termService);
    });
    formData.append("durasi", String(1));
    formData.append("buka_hari", data.buka_hari);
    formData.append("no_va", data.no_va);

    return await fasilitasApi.addFasilitas(formData);
};

export const deleteFasilitas = async (id: string) => {
    return await fasilitasApi.deleteFasilitas(id);
};

export const addHargaFasilitas = async (data: any) => {
    return await fasilitasApi.addHargaFasilitas(data);
};
