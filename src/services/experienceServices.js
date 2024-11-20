// experienceService.js
import apiClient from './services';

const experienceService = {
  // Get all experiences for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/experience/byUser/${userId}`);
  },
  
  // Get a specific experience by ID
  getExperienceById(experienceId) {
    return apiClient.get(`/experience/${experienceId}`);
  },
  
  // Create a new experience
  createExperience(experienceData) {
    return apiClient.post('/experience', experienceData);
  },
  
  // Update a specific experience
  updateExperience(experienceId, experienceData) {
    return apiClient.put(`/experience/${experienceId}`, experienceData);
  },
  
  // Delete a specific experience
  deleteExperience(experienceId) {
    return apiClient.delete(`/experience/${experienceId}`);
  },
};

export default ExperienceService;
