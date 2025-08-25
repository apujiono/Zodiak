import axios from 'axios';

const api = axios.create({
  baseURL: process.env.BACKEND_URL || 'https://your-backend-service.up.railway.app',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    throw error;
  }
);

export default api;