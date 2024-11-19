// userService.js
import apiClient from '../services/services';

const userService = {
  // Get all users
  getAllUsers() {
    return apiClient.get('/resume/user');
  },

  // Get a specific user by ID
  getUserById(userId) {
    return apiClient.get(`/resume/user/${userId}`);
  },

  // Create a new user
  createUser(userData) {
    return apiClient.post('/resume/user', userData);
  },

  // Update a specific user
  updateUser(userId, userData) {
    return apiClient.put(`/resume/user/${userId}`, userData);
  },

  // Delete a specific user
  deleteUser(userId) {
    return apiClient.delete(`/resume/user/${userId}`);
  }
};

export default userService;
