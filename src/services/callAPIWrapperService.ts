import httpService from "../services/httpService";
import * as Spinner from '../components/spinner';

export const POST = async (API: string, BODY?: object) => {
    Spinner.startSpinner();
    return new Promise(async (resolve, rejects) => {
        const res = await httpService.post(`${(window as any).ENV.apiEndpoint}${API}`, BODY).catch(function (error: any) {
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
        const res = await httpService.post(`${(window as any).ENV.apiEndpoint}${API}/${ID}`).catch(function (error: any) {
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
        const res = await httpService.get(`${(window as any).ENV.apiEndpoint}${API}`).catch(function (error: any) {
            rejects(error)
        })
        resolve(
            res
        )
    }).finally(() => {
        Spinner.stopSpinner();
    })
}