import { CoreAPI } from "../core";

class FasilitasApi extends CoreAPI {
    async getFasilitas() {
        const res = await this.fetch("/fasilitas", "GET");
        return res;
    }

    async getFasilitasById(id: string) {
        const res = await this.fetch(`/fasilitas/${id}`, "GET");
        return res;
    }

    async getHargaFasilitas(id: number) {
        const res = await this.fetch(`/harga/fasilitas/${id}`, "GET");
        return res;
    }

    async getAllHargaFasilitas() {
        const res = await this.fetch(`/harga/`, "GET");
        return res;
    }

    async updateFasilitas(id: number, formData: any) {
        const res = await this.fetch(`/fasilitas/${id}`, "PUT", {
            body: formData,
            isNeedToken: true,
        });

        return res;
    }

    async addFasilitas(formData: any) {
        const res = await this.fetch("/fasilitas/add", "POST", {
            body: formData,
            isNeedToken: true,
        });

        return res;
    }

    async deleteFasilitas(id: string) {
        const res = await this.fetch(`/fasilitas/delete/${id}`, "DELETE", {
            isNeedToken: true,
        });

        return res;
    }

    async addHargaFasilitas(data: any) {
        const res = await this.fetch("/harga/add", "POST", {
            json: { ...data },
            isNeedToken: true,
        });

        return res;
    }

    async deleteHargaFasilitas(id: number) {
        const res = await this.fetch(`/Harga/delete/${id}`, "DELETE", {
            isNeedToken: true,
        });

        return res;
    }

    async editHargaFasilitas(id: number, data: any) {
        const res = await this.fetch(`/harga/update/${id}`, "PUT", {
            json: { ...data },
            isNeedToken: true,
        });

        return res;
    }

    async getDataKamar() {
        const res = await this.fetch("/kamar", "GET", {
            isNeedToken: true,
        });
        return res;
    }

    async getDataHistoryKamar() {
        const res = await this.fetch("/kamar/history", "GET", {
            isNeedToken: true,
        });
        return res;
    }
}

export default new FasilitasApi();
