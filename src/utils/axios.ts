import axios from "axios";
import { BASE_URL } from "./BaseURL";

// Create a reusable API function
export const apiRequest = async ({
  url,
  method = "GET",
  params = {},
  data = {},
  headers = {},
  // token,
}) => {
  try {
    const response = await axios({
      url: `${BASE_URL}${url}`,
      method,
      params: method === "GET" ? params : {},
      data: method !== "GET" ? data : {},
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        ...headers,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || error.message);
  }
};
