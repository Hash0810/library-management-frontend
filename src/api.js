// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://library-management-backend-cosv.onrender.com',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // Custom error messages based on status code
      switch (error.response.status) {
        case 401:
          return Promise.reject('Invalid credentials');
        case 403:
          return Promise.reject('Forbidden - check permissions');
        case 404:
          return Promise.reject('Resource not found');
        case 405:
          return Promise.reject('Method not allowed - check endpoint');
        case 500:
          return Promise.reject('Server error - please try later');
        default:
          return Promise.reject(error.response.data?.message || 'Request failed');
      }
    }
    return Promise.reject('Network error - check connection');
  }
);

export default api;
