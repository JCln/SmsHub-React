import axios from "axios";
import { toast } from "react-toastify";
import { ACCESS_TOKEN, Authorization } from "../constants/ActionTypes";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 600;

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
export function logout() {
  localStorage.removeItem(ACCESS_TOKEN);
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
