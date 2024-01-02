import jsCookie from "js-cookie";
import * as crypto from "crypto-js";

export const getClientSideCookie = () => {
    return {
        token: jsCookie.get("CERT"),
    };
};

export const parseJwt = (token: any) => {
    try {
        return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
        return null;
    }
};

export const decryptPassword = (password: string) => {
    const bytes = crypto.AES.decrypt(
        password,
        process.env.NEXT_PUBLIC_SECRET_KEY ?? ""
    );
    return bytes.toString(crypto.enc.Utf8);
};

export const encryptPassword = (password: string) => {
    return crypto.AES.encrypt(
        password,
        process.env.NEXT_PUBLIC_SECRET_KEY ?? ""
    ).toString();
};
