// api/userApi.ts

import axios from "axios";
import { APIURL } from "../constant/baseUrl";
import { getAuthHeaders } from "../utils/authHeaders";
import { Task } from "../utils/types";

// Fetch user tasks by userId and optional status
export const getPersonalTask = async (
  userId: string | null,
  status?: string
) => {
  try {
    const response = await axios.get(`${APIURL}/tasks/${userId}/task`, {
      params: status ? { status } : {}, // Add status as a query parameter if provided
      headers: getAuthHeaders(),
    });
    console.log("test task", response.data.personalTasks);
    return response.data.personalTasks; // Only return the task list
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching user tasks"
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

// Delete user task (title, content, status)
export const deleteUserTask = async ({
  userId,
  taskId,
}: {
  userId: string | null;
  taskId: string | null;
}) => {
  try {
    const response = await axios.delete(
      `${APIURL}/tasks/${userId}/task/${taskId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data || { message: "Task deleted successfully" };
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error updating user task"
    );
  }
};
