interface Harga {
    nama: string;
}

export default interface Kamar {
    id_asrama: number;
    no_kamar: number;
    id: number;
    npm_bed1_a: string;
    npm_bed2_b: string;
    npm_bed3_c: string;
    status_kamar: boolean;
    Harga: Harga;
}

export default interface HistoryKamar {
    id_asrama: number;
    no_kamar: number;
    id: number;
    npm_bed1_a: string;
    npm_bed2_b: string;
    npm_bed3_c: string;
    status_kamar: boolean;
    year: number;
}
