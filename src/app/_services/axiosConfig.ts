import axios, { AxiosRequestConfig } from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:7164/api",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, 
});

// handle response (xử lý dữ liệu trả về)
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = <T,>({
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

export const post = <T,>({
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
