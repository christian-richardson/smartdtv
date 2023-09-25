import { fetcher, fetcherToken } from "@/tools/apiHelper";
import { ModelAuthLogin, ModelAuthLoginResponse } from "@/types/auth/auth";
import { ModelElasticAggsResult, ModelElasticAggsResultItem, ModelElasticMultiAggsResult, ModelElasticMultiAggsResultItem } from "@/types/elastic/aggs";

const login = async (req: ModelAuthLogin): Promise<ModelAuthLoginResponse> => {
    let response: ModelAuthLoginResponse = await fetcherToken('/api/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    if(response.isLoggedIn){
        // const cookie = document.cookie;
        // cookie.

    }
    return response;
}

const register = async (req: ModelAuthLogin): Promise<ModelAuthLoginResponse> => {
    let response: ModelAuthLoginResponse = await fetcherToken('/api/auth/register', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req)
    })
    if(response.isLoggedIn){
        // const cookie = document.cookie;
        // cookie.

    }
    return response;
}

export const ApiAuthRepo = {
    login: login,
    register: register
}
