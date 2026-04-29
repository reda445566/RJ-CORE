import api from "./axios.js";
// auth.js
export const registerUser = (data) => api.post("/signup", data);
export const loginUser = (data) => api.post("/login", data);

