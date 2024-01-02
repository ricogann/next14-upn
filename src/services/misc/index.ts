import { CoreAPI } from "../core";
class MiscApi extends CoreAPI {
    async getMisc() {
        const res = await this.fetch("/misc", "GET");
        return res;
    }
}

export default new MiscApi();
