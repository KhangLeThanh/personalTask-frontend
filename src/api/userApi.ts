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
    console.log("Test response", response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching user ");
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
  } catch (error) {
    throw new Error(error.response?.data?.message || "Error fetching user ");
  }
};
