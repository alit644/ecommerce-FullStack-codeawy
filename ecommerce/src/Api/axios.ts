import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // غيّر هذا إذا كان السيرفر على رابط آخر
});


export default api;
