import { getDynamics } from "../dynamics/getDynamics";
import httpService from "../services/httpService";
import * as Spinner from '../components/spinner';

export const POST = async (API: string, BODY?: object) => {
    Spinner.startSpinner();
    return new Promise(async (resolve, rejects) => {
        const res = await httpService.post(`${getDynamics.configs.apiEndpoint}${API}`, BODY).catch(function (error: any) {
            rejects(error)
        })
        resolve(
            res
        )
    }).finally(() => Spinner.stopSpinner());
}
export const POSTBYID = async (API: string, ID?: string) => {
    Spinner.startSpinner();
    return new Promise(async (resolve, rejects) => {
        const res = await httpService.post(`${getDynamics.configs.apiEndpoint}${API}/${ID}`).catch(function (error: any) {
            console.log(error);
            rejects(error)
        })
        resolve(
            res
        )
    }).finally(() => Spinner.stopSpinner());
}
export const GET = async (API: string) => {
    Spinner.startSpinner();
    return new Promise(async (resolve, rejects) => {
        const res = await httpService.get(`${getDynamics.configs.apiEndpoint}${API}`).catch(function (error: any) {
            console.log(error);
            rejects(error)
        })
        resolve(
            res
        )
    }).finally(() => {
        Spinner.stopSpinner();
    })
}