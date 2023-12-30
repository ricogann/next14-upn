import { CoreAPI } from "../core";

class CampusApi extends CoreAPI {
    async getFakultas() {
        const res = await this.fetch("/campus/fakultas", "GET");
        return res;
    }

    async getProdi() {
        const res = await this.fetch("/campus/prodi", "GET");
        return res;
    }

    async getTahunAjaran() {
        const res = await this.fetch("/campus/tahun-ajaran", "GET");
        return res;
    }
}

export default new CampusApi();
