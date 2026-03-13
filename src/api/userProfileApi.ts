// api/userProfileApi.ts

import axios from "axios";
import { APIURL } from "../constant/baseUrl";
import { getAuthHeaders } from "../utils/authHeaders";
import { Profile } from "../utils/types";

// Fetch user profile by userId
export const getUserProfile = async (userId: string | null) => {
  try {
    const response = await axios.get(`${APIURL}/profiles/${userId}/profile`, {
      headers: getAuthHeaders(),
    });
    if (!response.data.profile) {
      return {
        userName: response.data.userName,
        profile: {
          age: 0,
          bio: "",
          location: "",
        },
      };
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error fetching user profile"
      );
    }
    throw new Error("Error fetching user profile");
  }
};

// Update user profile (age, bio, location, etc.)
export const updateUserProfile = async (
  userId: string | null,
  profileData: Profile
) => {
  try {
    const response = await axios.patch(
      `${APIURL}/profiles/${userId}/profile`,
      profileData,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.message || "Error updating user profile"
      );
    }
    throw new Error("Error updating user profile");
  }
};
