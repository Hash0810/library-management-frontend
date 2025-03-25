// src/api.js
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://library-management-backend-6yne.onrender.com',
    withCredentials: true,
});

export default api;
