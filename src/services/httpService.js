import axios from "axios";
import { toast } from "react-toastify";
import { getDynamics } from "../dynamics/getDynamics";

axios.create({
  baseURL: getDynamics.configs.apiEndpoint,
  headers: {
    Accept: 'application/json'
  }
})

axios.interceptors.request.use(request => {
  console.log(request.headers);
  return request;
})
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
  axios.defaults.withCredentials = true;
  axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  console.log(axios.defaults);
}
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
