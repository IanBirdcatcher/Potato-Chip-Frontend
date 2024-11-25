// educationService.js
import apiClient from './services';

const EducationService = {
  // Get all educations for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/education/byUser/${userId}`);
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
