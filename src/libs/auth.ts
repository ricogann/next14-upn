import jsCookie from "js-cookie";

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
