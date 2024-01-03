import { CoreAPI } from "../core";

class BookingApi extends CoreAPI {
    async getBooking() {
        const res = await this.fetch("/booking", "GET");
        return res;
    }

    async getBookingByIdUser(id: string) {
        const res = await this.fetch(`/booking/user/${id}`, "GET", {
            isNeedToken: true,
        });
        return res;
    }

    async createBooking(json: any) {
        const res = await this.fetch("/booking/add", "POST", {
            json: { ...json },
            isNeedToken: true,
        });
        return res;
    }

    async uploadBukti(id: string, formData: any) {
        const res = await this.fetch(`/booking/upload-bukti/${id}`, "PUT", {
            body: formData,
            isNeedToken: true,
        });
        return res;
    }

    async uploadSIK(id: string, formData: any) {
        const res = await this.fetch(`/booking/upload-sik/${id}`, "PUT", {
            body: formData,
            isNeedToken: true,
        });
        return res;
    }

    async addMahasiswaToKamar(id: number, json: any) {
        try {
            const res = await this.fetch(`/booking/kamarAsrama/${id}`, "PUT", {
                json: { ...json },
                isNeedToken: true,
            });
            return res;
        } catch (error) {
            return error;
        }
    }
}

export default new BookingApi();
