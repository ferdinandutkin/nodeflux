import {AxiosError, AxiosRequestConfig} from "axios";
import {client} from "./requests";
import {StoreType} from "../state/store";

export const setUpInterceptor = (store: StoreType) => {
    const handleError = async (error: AxiosError) => {
        return Promise.reject(error)
    }

    client.interceptors.request.use(
        async (config: AxiosRequestConfig) => {
            config.headers =  {
                Authorization: "Bearer " + store.getState().users.token
            }
            return config
        }, handleError
    )

}