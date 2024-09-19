import axios, { AxiosRequestConfig } from "axios";
import { deleteCookie, getCookie } from "cookies-next";

const apiClient = axios.create({
  baseURL: "https://localhost:7164/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 3000,
});

// handle response (xử lý dữ liệu trả về)
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response && error.response.data) {
      const status = error.response.status;
      switch (status) {
        case 400:
          console.error("Bad Request: ", error.response.data.message);
          break;
        case 401:
          console.error("Unauthorized: ", error.response.data.message);
          // You can handle a redirect to login page here if needed
          deleteCookie("accessToken");
          window.location.href = "/login";
          break;
        case 404:
          console.error("Not Found: ", error.response.data.message);
          break;
        case 500:
          {
            console.error("Server Error: ", error.response.data.message);
            deleteCookie("accessToken");
            window.location.href = "/login";
          }
          break;
        default:
          console.error("Error: ", error.response.data.message);
      }
      return Promise.reject(error.response.data.message);
    }
    if (error.request) {
      console.error("Network Error: No response received from the server");
      return;
    }
    console.error("Error: ", error.message);
  }
);

apiClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    // console.log("🚀 ~ accessToken:", accessToken);
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const get = <T>({
  url,
  params,
  config,
}: {
  url: string;
  params?: AxiosRequestConfig["params"];
  config?: AxiosRequestConfig;
}): Promise<T> =>
  apiClient.get(url, {
    url,
    params,
    ...config,
  });

export const post = <T>({
  url,
  data,
  config,
}: {
  url: string;
  data: unknown;
  config?: AxiosRequestConfig;
}): Promise<T> => apiClient.post(url, data, config);

export const update = ({
  url,
  data,
  config,
}: {
  url: string;
  data: unknown;
  config?: AxiosRequestConfig;
}) => apiClient.put(url, data, config);

export const remove = ({ url }: { url: string }) => apiClient.delete(url);
