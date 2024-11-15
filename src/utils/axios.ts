import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "./BaseURL";
import { useRTL } from "../hooks/useRTL";
interface ApiRequestOptions {
  url: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  params?: Record<string, any>;
  data?: Record<string, any>;
  headers?: Record<string, string>;
  token?: string;
}

type ApiResponse<T> = T;

export const apiRequest = async <T>({
  url,
  method = "GET",
  params = {},
  data = {},
  headers = {},
  token,
}: ApiRequestOptions): Promise<ApiResponse<T>> => {
  try {
    const localStorageToken = localStorage.getItem("token");
    const language = localStorage.getItem("lang");

    const response: AxiosResponse<T> = await axios({
      url: `${BASE_URL}${url}`,
      method,
      params: method === "GET" ? params : {},
      data: method !== "GET" ? data : {},
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token || localStorageToken}`,
        "Accept-Language": language,
        ...headers,
      },
    });

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw error;
    }
    throw new Error("An unknown error occurred");
  }
};
