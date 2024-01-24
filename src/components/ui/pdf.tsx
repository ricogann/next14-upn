/* eslint-disable jsx-a11y/alt-text */
import React from "react";
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Image,
} from "@react-pdf/renderer";
import InvoiceTable from "./table-pdf";

interface misc {
    id_misc: number;
    nama_instansi: string;
    logo_instansi: number;
    no_hp: string;
    email: number;
    instagram: string;
    laman_web: string;
    nama_pic: string;
    nip_pic: string;
    tanda_tangan: string;
}

interface inputMisc {
    nama: string;
    no_invoice: number;
    nama_fasilitas: string;
    harga: number;
    tanggal_pemesanan: string;
    data: misc;
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: "white",
        padding: 30,
    },
    header: {
        fontSize: 12,
        marginBottom: 15,
        marginLeft: 22,
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 130,
        height: 75,
    },
    upn: {
        fontSize: 18,
        fontWeight: "bold",
    },
    jawatimur: {
        fontSize: 18,
        fontWeight: "normal",
    },
    bpu: {
        fontSize: 21,
        fontWeight: "bold",
        marginTop: 10,
    },
    line: {
        width: "100%",
        backgroundColor: "black",
        height: 2,
        marginTop: 10,
    },
    center: {
        width: "70%",
        textAlign: "center",
    },
    info: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 14,
        gap: 9,
    },
    invoiceInfo: {
        marginTop: 20,
        fontSize: 14,
    },
    invoiceInfoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    status: {
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        fontWeight: "bold",
        color: "green",
    },
    signatureContainer: {
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "flex-end",
        marginTop: 40,
    },
    signature: {
        width: 150,
        height: 50,
        border: "1px solid black",
    },
    signatureText: {
        marginTop: 5,
        textAlign: "center",
    },
});

const PDFDocument: React.FC<inputMisc> = ({
    nama,
    no_invoice,
    nama_fasilitas,
    harga,
    tanggal_pemesanan,
    data,
}) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <Image
                        src={
                            `${process.env.NEXT_PUBLIC_API_URL}/assets/` +
                            data.logo_instansi
                        }
                        style={styles.image}
                    />

                    <View style={styles.center}>
                        <Text style={styles.upn}>
                            Universitas Pembangunan Nasional
                        </Text>
                        <Text style={styles.jawatimur}>Veteran Jawa Timur</Text>
                        <Text style={styles.bpu}>{data.nama_instansi}</Text>
                    </View>
                </View>

                <View style={styles.info}>
                    <Text>Email : {data.email}</Text>
                    <Text>Mobile : {data.no_hp}</Text>
                    <Text>Laman : {data.laman_web}</Text>
                </View>

                <Text style={styles.line}></Text>

                <View style={styles.invoiceInfo}>
                    <View style={styles.invoiceInfoRow}>
                        <Text>Date: {tanggal_pemesanan.split("T")[0]}</Text>
                        <Text>Invoice #: {no_invoice}</Text>
                    </View>
                    <View style={styles.invoiceInfoRow}>
                        <Text>Bill To:</Text>
                    </View>
                    <View style={styles.invoiceInfoRow}>
                        <Text>{nama}</Text>
                    </View>
                </View>

                <InvoiceTable
                    nama_fasilitas={nama_fasilitas}
                    harga={String(harga)}
                />
                <Text style={styles.status}>Status: Paid Off</Text>

                <View style={styles.signatureContainer}>
                    <Image
                        src={
                            `${process.env.NEXT_PUBLIC_API_URL}/assets/` +
                            data.tanda_tangan
                        } // Replace with the URL of your signature image
                        style={styles.signature}
                    />
                    <Text style={styles.signatureText}>{data.nama_pic}</Text>
                    <Text style={styles.signatureText}>
                        NIP. {data.nip_pic}
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

export default PDFDocument;
