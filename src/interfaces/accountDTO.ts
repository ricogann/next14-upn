interface Mahasiswa {
    id: number;
    nama: string;
    bukti_identitas: string;
    npm: string;
}

interface Dosen {
    id: number;
    nama: string;
    bukti_identitas: string;
    NIP: string;
}

interface UKM {
    id: number;
    nama_ukm: string;
    bukti_identitas: string;
}

interface Organisasi {
    id: number;
    nama_organisasi: string;
    bukti_identitas: string;
}

interface Umum {
    id: number;
    nama: string;
    bukti_identitas: string;
    NIK: string;
}

interface Fasilitas {
    nama: string;
}

interface Role {
    nama_role: string;
}

export default interface Account {
    Dosen: Dosen[];
    Mahasiswa: Mahasiswa[];
    Umum: Umum[];
    UKM: UKM[];
    Organisasi: Organisasi[];
    Role: Role;
    id_account: number;
    status_account: boolean;
}
