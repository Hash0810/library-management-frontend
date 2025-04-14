// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://library-management-backend-cosv.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

// 🔐 Add JWT to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ❗ Handle errors + Auto logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const logoutAndRedirect = () => {
        localStorage.clear();
        window.location.href = "/login"; // Change if your login path is different
      };

      switch (status) {
        case 401:
        case 403:
          logoutAndRedirect();
          return Promise.reject("Session expired. Please login again.");
        case 404:
          return Promise.reject("Resource not found");
        case 405:
          return Promise.reject("Method not allowed - check endpoint");
        case 500:
          return Promise.reject("Server error - please try later");
        default:
          return Promise.reject(error.response.data?.message || "Request failed");
      }
    }
    return Promise.reject("Network error - check connection");
  }
);

export default api;
