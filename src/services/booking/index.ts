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
}

export default new BookingApi();
