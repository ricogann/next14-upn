import { CoreAPI } from "../core";
class MiscApi extends CoreAPI {
    async getMisc() {
        const res = await this.fetch("/misc", "GET");
        return res;
    }

    async updateDataMisc(id: number, formData: any) {
        const res = await this.fetch(`/misc/${id}`, "PUT", {
            body: formData,
            isNeedToken: true,
        });
        return res;
    }
}

export default new MiscApi();
