import axios from "axios";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, Authorization } from "../constants/ActionTypes";
import routerService from "./routerService";

axios.interceptors.response.use(config => {
  console.log(1);

  console.log(config);
  return config;
}, error => { })
axios.interceptors.response.use(response => {
  console.log(2);
  return response;
}, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 600;
  if (error.response.status === 401) {
    alert('logout please');
    routerService.logout();
  }
  if (error.dueToNoInternetConnection) {
    alert('no internet connection');
    // dispatch({type: RELOAD});
  }
  console.log(expectedError);

  const possibleErrors = error.response.data.errors;
  for (let index = 0; index < possibleErrors.length; index++) {
    toast.error(error.response.data.errors[index].message);
  }

  if (!expectedError) {
    toast.error(error.response.data.errors);
    throw error;
  }

  return Promise.reject(error);
});
export function setAxiosHeader(AUTH_TOKEN) {
  axios.defaults.headers.common[Authorization] = AUTH_TOKEN;
  localStorage.setItem(ACCESS_TOKEN, AUTH_TOKEN);
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
