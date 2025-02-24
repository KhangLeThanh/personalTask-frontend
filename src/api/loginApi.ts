import axios from "axios";
import { APIURL } from "../constant/baseUrl";

export const loginUser = async (userLogin: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${APIURL}/login`, userLogin);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error logging in");
  }
};
