interface Mahasiswa {
    nama: string;
    no_telp: string;
}

interface Dosen {
    nama: string;
    no_telp: string;
}

interface Umum {
    nama: string;
    no_telp: string;
}

interface UKM {
    nama_ukm: string;
    no_telp: string;
}

interface Organisasi {
    nama_organisasi: string;
    no_telp: string;
}

interface Fasilitas {
    nama: string;
}

interface Harga {
    harga: number;
}

interface Account {
    Dosen: Dosen[];
    Mahasiswa: Mahasiswa[];
    Umum: Umum[];
    UKM: UKM[];
    Organisasi: Organisasi[];
}

export default interface BookingDTO {
    Account: Account;
    Fasilitas: Fasilitas;
    Harga: Harga;
    id_pemesanan: number;
    id_fasilitas: number;
    jam_checkin: string;
    jam_checkout: string;
    durasi: number;
    total_harga: number;
    tanggal_pemesanan: string;
    bukti_pembayaran: string;
    SIK: string;
    status: string;
    createdAt: string;
}
