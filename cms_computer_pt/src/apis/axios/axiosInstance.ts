import axios from "axios";

import variables from "../../utils/constants/variables";
import { API_URL } from "../../utils/constants/urls";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = localStorage.getItem(variables.ACCESS_TOKEN);

    if (accessToken) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${accessToken}`,
      });
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,

  (error) => {
    const { status } = error.response;

    if (status === 401) {
      sessionStorage.removeItem(variables.ACCESS_TOKEN);
      localStorage.removeItem(variables.ACCESS_TOKEN);
      window.location.href = `/Login?redirect=${window.location.pathname}`;
      console.warn("Hết phiên truy cập, vui lòng đăng nhập lại");
    } else if (status === 400) {
      console.error(error.response.data.messageDetail);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
