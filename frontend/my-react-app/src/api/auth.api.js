import api from "./axios";

// register
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};
