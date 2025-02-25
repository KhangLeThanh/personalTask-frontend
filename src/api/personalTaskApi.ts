// api/userApi.ts

import axios from "axios";
import { APIURL } from "../constant/baseUrl";
import { getAuthHeaders } from "../utils/authHeaders";
import { Task } from "../utils/types";

// Fetch user profile by userId
export const getPersonalTask = async (userId: string | null) => {
  try {
    const response = await axios.get(`${APIURL}/tasks/${userId}/task`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user task"
    );
  }
};

// Create user task (title, content, status)
export const createUserTask = async ({
  userId,
  personalTask,
}: {
  userId: string | null;
  personalTask: Task;
}) => {
  try {
    const response = await axios.post(
      `${APIURL}/tasks/${userId}/task`,
      personalTask,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error creating user task"
    );
  }
};
// Update user task (title, content, status)
export const updateUserTask = async ({
  userId,
  taskId,
  personalTask,
}: {
  userId: string | null;
  taskId: string | null;
  personalTask: Task;
}) => {
  try {
    const response = await axios.patch(
      `${APIURL}/tasks/${userId}/task/${taskId}`,
      personalTask,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error updating user task"
    );
  }
};
