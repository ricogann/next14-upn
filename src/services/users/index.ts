import { CoreAPI } from "../core";

class UsersApi extends CoreAPI {
    async getUsers() {
        const res = await this.fetch("/users/account", "GET", {
            isNeedToken: true,
        });
        return res;
    }

    async getUsersUmum() {
        const res = await this.fetch("/users/umum", "GET", {
            isNeedToken: true,
        });
        return res;
    }

    async getUsersUkm() {
        const res = await this.fetch("/users/ukm", "GET", {
            isNeedToken: true,
        });
        return res;
    }

    async getUsersMahasiswa() {
        const res = await this.fetch("/users/mahasiswa", "GET", {
            isNeedToken: true,
        });
        return res;
    }

    async getUsersOrganisasi() {
        const res = await this.fetch("/users/organisasi", "GET", {
            isNeedToken: true,
        });
        return res;
    }
}

export default new UsersApi();
