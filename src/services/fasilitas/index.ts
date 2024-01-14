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
        const res = await this.fetch("/fasilitas", "POST", {
            body: formData,
            isNeedToken: true,
        });

        return res;
    }

    async deleteFasilitas(id: string) {
        const res = await this.fetch(`/fasilitas/${id}`, "DELETE", {
            isNeedToken: true,
        });

        return res;
    }
}

export default new FasilitasApi();
