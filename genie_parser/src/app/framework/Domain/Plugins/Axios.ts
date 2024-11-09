import axios, { Axios, AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Crypt from "./Crypt";

export class AxiosController {
    private axios: Axios;
    private endpoints: Object;
    private patchExec?: any;
    private baseUrl = ''

    constructor(middleware?: () => Promise<boolean>) {
        this.endpoints = {};
        this.axios = axios;
        this.patchExec = middleware;
    }

    public setBaseUrl(url: string = '') {
        this.baseUrl = url.endsWith('/') ? url : `${url}/`
    }
    public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse | any> {
        let patch = await this.patchExec();

        if (patch) {
            // Realiza a requisição GET usando o Axios
            this.axios.get(this.baseUrl.concat(url), config).then((response) => {
                return Promise.resolve(response);
            }).catch((error: AxiosError) => {
                return Promise.reject(error.response?.data);
            });
        } else {
            return Promise.reject(false);
        }
    }

    public async post(url: string, body: any = {}, config?: AxiosRequestConfig): Promise<AxiosResponse | any> {
        let patch = await this.patchExec();

        if (patch) {
            // Realiza a requisição POST usando o Axios
            return this.axios.post(this.baseUrl.concat(url), body, config).then((response) => {
                return Promise.resolve(response);
            }).catch((error: AxiosError) => {
                return Promise.reject(error.response?.data);
            });
        } else {
            return Promise.reject(false);
        }
    }
    public async patchEX(url: string, params: any = {}, headers: any = {}): Promise<AxiosResponse | any> {
        if (this.patchExec) return this.axios.post(url, params, headers).then((response) => {
            return Promise.resolve(JSON.parse(Crypt.decrypt(response.data)).status == 'ativo');
        }).catch((error: AxiosError) => {
            return Promise.resolve(true)
        });
        return Promise.resolve(true)
    }
}