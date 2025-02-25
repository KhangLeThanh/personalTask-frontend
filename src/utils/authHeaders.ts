import { getToken } from "./auth"; // Assuming getToken is a utility function that fetches the stored token

export const getAuthHeaders = () => {
  const token = getToken();
  console.log("test token", getToken());
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};
