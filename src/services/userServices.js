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
  }
};

export default userService;