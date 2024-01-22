interface Prodi {
    id_prodi: number;
    nama_prodi: string;
}

interface Fakultas {
    id_fakultas: number;
    nama_fakultas: string;
}

export default interface Umum {
    id: number;
    id_account: number;
    NIK: string;
    nama: string;
    email: string;
    password: string;
    no_telp: string;
    status: boolean;
    bukti_identitas: string;
}

export default interface UKM {
    id: number;
    id_account: number;
    nama_ukm: string;
    email: string;
    password: string;
    no_telp: string;
    status: boolean;
    bukti_identitas: string;
    nama_pj: string;
}

export default interface Organisasi {
    id: number;
    id_account: number;
    nama_organisasi: string;
    email: string;
    password: string;
    no_telp: string;
    status: boolean;
    bukti_identitas: string;
    nama_pj: string;
}

export default interface Mahasiswa {
    id: number;
    id_account: number;
    npm: string;
    password: string;
    nama: string;
    email: string;
    bukti_identitas: string;
    no_telp: string;
    status: boolean;
    Fakultas: Fakultas;
    Prodi: Prodi;
}
