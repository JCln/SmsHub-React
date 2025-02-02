import { getDynamics } from "../dynamics/getDynamics";
import httpService from "../services/httpService";

export const POST = async (API: string, BODY?: object): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
        const res = await httpService.post(`${getDynamics.configs.apiEndpoint}${API}`, BODY).catch(function (error: any) {
            console.log(error);
            rejects(error)
        })
        resolve(
            res
        )
    });
}
export const POSTBYID = async (API: string, ID?: string): Promise<any> => {
    return new Promise(async (resolve, rejects) => {
        const res = await httpService.post(`${getDynamics.configs.apiEndpoint}${API}/${ID}`).catch(function (error: any) {
            console.log(error);
            rejects(error)
        })
        resolve(
            res
        )
    });
}
export const GET = async (API: string) => {
    return new Promise(async (resolve, rejects) => {
        const res = await httpService.get(`${getDynamics.configs.apiEndpoint}${API}`).catch(function (error: any) {
            console.log(error);
            rejects(error)
        })
        resolve(
            res
        )
    })
}