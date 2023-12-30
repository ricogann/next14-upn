import jsCookie from "js-cookie";

export const getClientSideCookie = () => {
    return {
        token: jsCookie.get("accessToken"),
    };
};
