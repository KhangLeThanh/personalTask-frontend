import axios from "axios";
import { APIURL } from "../constant/baseUrl";

export const loginUser = async (userLogin: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${APIURL}/login`, userLogin);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error is now typed as AxiosError
      throw new Error(error.response?.data?.message || "Error logging");
    }
    // fallback for unknown error types
    throw new Error("Error logging");
  }
};
