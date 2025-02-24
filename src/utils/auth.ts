export const getToken = () => localStorage.getItem("token");
export const getUserId = () => localStorage.getItem("userId");

export const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
