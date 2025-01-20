import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    console.log("Error", error);
    toast.error(error.message);
    throw error;
  }
  return Promise.reject(error);
});
export function setAxiosHeader(AUTH_TOKEN) {
  console.log(AUTH_TOKEN);
  axios.defaults.withCredentials = true;
  axios.defaults.timeout = 5000;
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
