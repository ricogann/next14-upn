import FasilitasDTO from "@/interfaces/fasilitasDTO";

export default function splitData(
    data: FasilitasDTO[],
    dataPerPage: number
): FasilitasDTO[][] {
    try {
        const dataFasilitas: FasilitasDTO[][] = [];
        let groupFasilitas: FasilitasDTO[] = [];

        for (let i = 0; i < data.length; i++) {
            groupFasilitas.push(data[i]);

            if (
                groupFasilitas.length === dataPerPage ||
                i === data.length - 1
            ) {
                dataFasilitas.push(groupFasilitas);
                groupFasilitas = [];
            }
        }
        return dataFasilitas;
    } catch (error) {
        console.error("splitDataFasilitas error", error);
        throw error;
    }
}
