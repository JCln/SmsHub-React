import axios from "axios";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, Authorization, BEARER, E200, E201, E400, E401, REFRESH_TOKEN } from "../constants/ActionTypes";
import { getDynamics } from "../dynamics/getDynamics";
import { ENRoutes } from "../constants/ENRoutes";
import { storageService } from '../services/storage.service';


axios.interceptors.request.use(
  config => {
    const accessToken = storageService.getItem(ACCESS_TOKEN);
    console.log(1);

    if (accessToken) {
      axios.defaults.headers.common[Authorization] = accessToken;
    }
    // if on root or login location no need to set anything

    else if (window.location.pathname === ENRoutes.Root) {
      console.log(1);
      return config
    }
    console.log(1);
    return config;
    // config.headers['Content-Type'] = 'application/json';
  },
  error => {
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    // 400 because server return 400 instead of 401
    if (
      error.response.status === E400 &&
      originalRequest.url === window['ENV'].apiEndpoint + getDynamics.apis.loginRefresh
    ) {
      console.log('you have to logout');
      // window.location = '/';
      return Promise.reject(error)
    }

    if (error.response.status === E401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = storageService.getItem(REFRESH_TOKEN);
      const res = await axios
        .post(`${window['ENV'].apiEndpoint}${getDynamics.apis.loginRefresh}`, {
          value: refreshToken &&
            refreshToken !== null &&
            refreshToken !== 'undefined'
            ? refreshToken
            : ''
        });
      if (res.status === E201 || res.status === E200) {

        storageService.setItem(ACCESS_TOKEN, BEARER + res.data.data.accessToken);
        storageService.setItem(REFRESH_TOKEN, res.data.data.refreshToken);

        axios.defaults.headers.common[Authorization] = storageService.getItem(ACCESS_TOKEN);
        return axios(originalRequest);
      }
    }
    //   if (error.dueToNoInternetConnection) {
    // alert('no internet connection');
    // dispatch({type: RELOAD});

    const possibleErrors = error.response.data.errors;
    for (let index = 0; index < possibleErrors.length; index++) {
      toast.error(error.response.data.errors[index].message);
    }

    if (!possibleErrors) {
      toast.error(error.response.data.errors);
      throw error;
    }

    return Promise.reject(error);
  });
export function setAxiosHeader(accessToken, refreshToken) {
  axios.defaults.headers.common[Authorization] = accessToken;
  storageService.setItem(ACCESS_TOKEN, accessToken);
  storageService.setItem(REFRESH_TOKEN, refreshToken);
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
