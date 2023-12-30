import { CoreAPI } from "../core";

class FasilitasApi extends CoreAPI {
    async getFasilitas() {
        const res = await this.fetch("/fasilitas", "GET");
        return res;
    }

    async getFasilitasById(id: string) {
        const res = await this.fetch(`/api/fasilitas/${id}`, "GET");
        return res;
    }

    async getHargaFasilitas(id: string) {
        const res = await this.fetch(`/api/fasilitas/${id}/harga`, "GET");
        return res;
    }

    async updateFasilitas(id: string, formData: any) {
        const res = await this.fetch(`/api/fasilitas/${id}`, "PUT", {
            body: formData,
            isNeedToken: true,
        });

        return res;
    }

    async addFasilitas(formData: any) {
        const res = await this.fetch("/api/fasilitas", "POST", {
            body: formData,
            isNeedToken: true,
        });

        return res;
    }

    async deleteFasilitas(id: string) {
        const res = await this.fetch(`/api/fasilitas/${id}`, "DELETE", {
            isNeedToken: true,
        });

        return res;
    }
}

export default new FasilitasApi();
