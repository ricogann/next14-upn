import { CoreAPI } from "../core";

class BookingApi extends CoreAPI {
    async getBooking() {
        const res = await this.fetch("/booking", "GET");
        return res;
    }
}

export default new BookingApi();
