interface Fasilitas {
    id_fasilitas: number;
    nama: string;
    deskripsi: string;
    alamat: string;
    biaya: number;
    foto: string;
}

export default interface Harga {
    id: number;
    id_fasilitas: number;
    nama: string;
    harga: number;
    Fasilitas: Fasilitas;
}
