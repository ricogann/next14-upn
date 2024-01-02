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

    async getUsersUmumById(id: string) {
        const res = await this.fetch(`/users/umum/${id}`, "GET", {
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

    async getUsersUkmById(id: string) {
        const res = await this.fetch(`/users/ukm/${id}`, "GET", {
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

    async getUsersMahasiswaById(id: string) {
        const res = await this.fetch(`/users/mahasiswa/${id}`, "GET", {
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

    async getUsersOrganisasiById(id: string) {
        const res = await this.fetch(`/users/organisasi/${id}`, "GET", {
            isNeedToken: true,
        });
        return res;
    }

    async updateUsersUmum(id: string, json: any) {
        const res = await this.fetch(`/users/umum/${id}`, "PUT", {
            json: { ...json },
            isNeedToken: true,
        });
        return res;
    }

    async updateUsersUkm(id: string, json: any) {
        const res = await this.fetch(`/users/ukm/${id}`, "PUT", {
            json: { ...json },
            isNeedToken: true,
        });
        return res;
    }

    async updateUsersMahasiswa(id: string, json: any) {
        const res = await this.fetch(`/users/mahasiswa/${id}`, "PUT", {
            json: { ...json },
            isNeedToken: true,
        });
        return res;
    }

    async updateUsersOrganisasi(id: string, json: any) {
        const res = await this.fetch(`/users/organisasi/${id}`, "PUT", {
            json: { ...json },
            isNeedToken: true,
        });
        return res;
    }
}

export default new UsersApi();
