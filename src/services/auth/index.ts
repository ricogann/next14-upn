import { CoreAPI } from "../core";

class AuthApi extends CoreAPI {
    async loginMahasiswa(json: any) {
        try {
            const res = await this.fetch("/auth/login/mahasiswa", "POST", {
                json: { ...json },
            });
            if (res.data.token) {
                this.setToken({ token: res.data.token, expireable: true });
            }
            return res;
        } catch (error) {
            return error;
        }
    }

    async loginUmum(json: any) {
        const res = await this.fetch("/auth/login/umum", "POST", {
            json: { ...json },
        });

        if (res.data.accessToken) {
            this.setToken({ token: res.data.accessToken, expireable: true });
        }
    }

    async loginUkm(json: any) {
        const res = await this.fetch("/auth/login/ukm", "POST", {
            json: { ...json },
        });

        if (res.data.accessToken) {
            this.setToken({ token: res.data.accessToken, expireable: true });
        }
    }

    async loginOrganisasi(json: any) {
        const res = await this.fetch("/auth/login/organisasi", "POST", {
            json: { ...json },
        });

        if (res.data.accessToken) {
            this.setToken({ token: res.data.accessToken, expireable: true });
        }
    }

    async loginAdmin(json: any) {
        const res = await this.fetch("/auth/login/admin", "POST", {
            json: { ...json },
        });

        if (res.data.accessToken) {
            this.setToken({ token: res.data.accessToken, expireable: true });
        }
    }

    async registerMahasiswa(formData: any) {
        const res = await this.fetch("/auth/register/mahasiswa", "POST", {
            body: formData,
        });

        return res;
    }

    async registerUmum(formData: any) {
        const res = await this.fetch("/auth/register/umum", "POST", {
            body: formData,
        });

        return res;
    }

    async registerUkm(formData: any) {
        const res = await this.fetch("/auth/register/ukm", "POST", {
            body: formData,
        });

        return res;
    }

    async registerOrganisasi(formData: any) {
        const res = await this.fetch("/auth/register/organisasi", "POST", {
            body: formData,
        });

        return res;
    }
}

export default new AuthApi();
