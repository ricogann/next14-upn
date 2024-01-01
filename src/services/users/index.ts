import { CoreAPI } from "../core";

class UsersApi extends CoreAPI {
    async getUsers() {
        const res = await this.fetch("/users/account", "GET", {
            isNeedToken: true,
        });
        return res;
    }
}

export default new UsersApi();
