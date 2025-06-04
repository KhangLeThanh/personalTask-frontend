// api/userApi.ts

import axios from "axios";
import { APIURL } from "../constant/baseUrl";
import { getAuthHeaders } from "../utils/authHeaders";

// Fetch user profile by userId
export const getUser = async (userId: string | null) => {
  try {
    const response = await axios.get(`${APIURL}/users/${userId}`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error is now typed as AxiosError
      throw new Error(error.response?.data?.message || "Error fetching user");
    }
    // fallback for unknown error types
    throw new Error("Error fetching user");
  }
};

// Create user
export const createUser = async (userData: {
  userName: string;
  password: string;
}) => {
  try {
    const response = await axios.post(`${APIURL}/users`, userData, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // error is now typed as AxiosError
      throw new Error(error.response?.data?.message || "Error creating user");
    }
    // fallback for unknown error types
    throw new Error("Error creating user");
  }
};
