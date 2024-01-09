export default function splitData(data, dataPerPage) {
    try {
        const dataArray = [];
        let group = [];
        for (let i = 0; i < data.length; i++) {
            group.push(data[i]);
            if (group.length === dataPerPage || i === data.length - 1) {
                dataArray.push(group);
                group = [];
            }
        }
        return dataArray;
    } catch (error) {
        console.error("splitDataFasilitas error", error);
        throw error;
    }
}
