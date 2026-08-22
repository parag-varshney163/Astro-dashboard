import axios from "axios";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", 
  },
});


axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status;

//     if (status === 401) {
//       console.warn("⛔ Token expired. Redirecting to login...");

//       // clear token
//       localStorage.removeItem("token");

//       // redirect to login
//       window.location.href = "/login";  
//     }

//     return Promise.reject(error);
//   }
// );
// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     // ❌ NEVER auto-logout from interceptor
//     // Auth handling must be done in ProtectedRoute

//     return Promise.reject(error);
//   }
// );

let isRedirecting = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401 && !isRedirecting) {
      isRedirecting = true;

      localStorage.clear(); // clear token + any stored user data
      window.location.replace("/login"); // redirect to login
    }

    return Promise.reject(error);
  }
);


export default axiosInstance;


