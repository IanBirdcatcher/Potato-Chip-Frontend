// educationService.js
import apiClient from '../services/services';

const EducationService = {
  // Get all education for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/education/byuser/${userId}`);
  },
  
  // Get a specific education by ID
  getEducationById(educationId) {
    return apiClient.get(`/education/${educationId}`);
  },
  
  // Create a new education
  createEducation(educationData) {
    return apiClient.post('/education', educationData);
  },
  
  // Update a specific education
  updateEducation(educationId, educationData) {
    return apiClient.put(`/education/${educationId}`, educationData);
  },
  
  // Delete a specific education
  deleteEducation(educationId) {
    return apiClient.delete(`/education/${educationId}`);
  },
};

export default EducationService;
