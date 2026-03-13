import axios from "axios";
import { APIURL } from "../constant/baseUrl";

export const loginUser = async (userLogin: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${APIURL}/login`, userLogin);
    return response;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Error logging");
    }
    throw new Error("Error logging");
  }
};
