import axios from "axios";

import { getAccessToken } from "@/utils/functions/getUser";
import variables from "@/utils/constants/variables";
import { BASE_URL } from "@/utils/constants/base";

const axiosClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const accessToken = getAccessToken();

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

axiosClient.interceptors.response.use(
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

export default axiosClient;
