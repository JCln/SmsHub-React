import { getDynamics } from "../dynamics/getDynamics";
import httpService from "../services/httpService";

export const POST = async (API: string, body?: object) => {
    return new Promise(async (resolve) => {
        const res = await httpService.post(`${getDynamics.configs.apiEndpoint}${API}`, body).catch(function (error: any) {
            console.log(error);
        })
        resolve(
            res
        )
    });

}
export const GET = async (API: string, body: object) => {
    return new Promise(async (resolve) => {
        const res = await httpService.post(`${getDynamics.configs.apiEndpoint}${API}`, body).catch(function (error: any) {
            console.log(error);
        })
        resolve(
            res
        )
    })
}