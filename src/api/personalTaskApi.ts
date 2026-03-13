import axios from "axios";
import { APIURL } from "../constant/baseUrl";
import { getAuthHeaders } from "../utils/authHeaders";
import { Task } from "../utils/types";

export const getPersonalTask = async (userId: string, status?: string) => {
  const response = await axios.get(`${APIURL}/tasks/${userId}/task`, {
    params: status ? { status } : {},
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createUserTask = async ({
  userId,
  personalTask,
}: {
  userId: string;
  personalTask: Task;
}) => {
  const response = await axios.post(
    `${APIURL}/tasks/${userId}/task`,
    personalTask,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const updateUserTask = async ({
  userId,
  taskId,
  personalTask,
}: {
  userId: string;
  taskId: string;
  personalTask: Task;
}) => {
  const response = await axios.patch(
    `${APIURL}/tasks/${userId}/task/${taskId}`,
    personalTask,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};

export const deleteUserTask = async ({
  userId,
  taskId,
}: {
  userId: string;
  taskId: string;
}) => {
  const response = await axios.delete(
    `${APIURL}/tasks/${userId}/task/${taskId}`,
    {
      headers: getAuthHeaders(),
    }
  );
  return response.data;
};
