import jsCookie from "js-cookie";
import { encode } from "qss";
import { UniversalType } from "@/@types";
import { getClientSideCookie } from "@/libs/auth";

interface FetchOptions {
    body: FormData;
    json: object;
    mode: string;
    params: object;
    prefix: string;
    headers: object;
    isNeedToken: boolean;
    local: boolean;
    manualUrl: boolean;
    version: number;
    isUsingException: boolean;
}

export class CoreAPI {
    private baseUrl = "https://api.ricogann.com";

    setToken = ({
        token,
        expireable = true,
    }: {
        token: string;
        expireable: boolean;
    }) => {
        jsCookie.set("CERT", token, {
            expires: expireable ? 7 : undefined,
            path: "/",
            secure: true,
            sameSite: "Lax",
        });
    };

    private getToken = (): string => {
        const { token } = getClientSideCookie();

        return token as string;
    };

    private intercept500Error = async (err: UniversalType) => {
        if (err?.status === 500) {
            const customErr = {
                ...err,
                message:
                    "Oops. Something went wrong :(. Please try again later",
            };
            await Promise.reject(customErr);
        }
    };

    private intercept401Error = async (err: UniversalType) => {
        if (err?.status !== 401) return;
    };

    private getUrl = (
        params: object | undefined,
        path: string,
        manualUrl: boolean
    ) => {
        const search = params ? encode(params, "?") : "";

        const url = manualUrl ? path : `${this.baseUrl}/api${path}${search}`;

        return url;
    };

    fetch = async <TResult = UniversalType>(
        path = "/",
        method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH" = "GET",
        {
            body,
            json,
            params,
            headers,
            isNeedToken = false,
            manualUrl = false,
        }: Partial<FetchOptions> = {}
    ): Promise<TResult> => {
        const url = this.getUrl(params, path, manualUrl);

        if (isNeedToken) {
            const token = this.getToken();

            if (token) {
                headers = {
                    ...headers,
                    Authorization: `Bearer ${token}`,
                };
            }
        }

        try {
            const resp = await fetch(url, {
                method,
                headers: {
                    ...(json && { "content-type": "application/json" }),
                    Accept: "application/json",
                    ...headers,
                },
                body: body ?? (json ? JSON.stringify(json) : null),
            });

            if (resp?.statusText === "No Content") {
                return await Promise.resolve({} as TResult);
            }

            const jsonBody = await resp?.json();

            let responseBody = { ...jsonBody };

            if (method !== "GET") {
                if (!resp?.ok) return await Promise.reject(jsonBody);
            }

            if (Array.isArray(jsonBody)) {
                responseBody = [...jsonBody];
            }

            return await Promise.resolve(responseBody);
        } catch (err: UniversalType) {
            if (err.name === "TypeError" && err.message === "Failed to fetch") {
                console.error(
                    "Failed to get proper response from api server",
                    err
                );
            }

            this.intercept500Error(err);
            this.intercept401Error(err);

            if (typeof err.json === "function") {
                const data = await err.json();
                err.response = { data };
            }

            if (typeof err?.response?.json === "function") {
                const data = await err.response.json();
                err.response = { data };
            }

            return await Promise.reject(err);
        }
    };
}
