// src/api/paymentAxiosInstance.js
import axios from "axios";


const agamiastroinstance = axios.create({
  baseURL: import.meta.env.VITE_AGAMI_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// If the second API also needs the same token
agamiastroinstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default agamiastroinstance;
