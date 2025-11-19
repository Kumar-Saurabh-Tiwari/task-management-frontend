import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

export const taskAPI = {
  getAllTasks: () => apiClient.get('/api/tasks'),
  getTaskById: (id) => apiClient.get(`/api/tasks/${id}`),
  createTask: (data) => apiClient.post('/api/tasks', data),
  updateTask: (id, data) => apiClient.put(`/api/tasks/${id}`, data),
  deleteTask: (id) => apiClient.delete(`/api/tasks/${id}`),
};

export default apiClient;
