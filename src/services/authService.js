import BASE_URL from "../api/axiosInstance";

export const register = (user) => {
  const response = BASE_URL.post("auth/register", user);

  return response;
};
