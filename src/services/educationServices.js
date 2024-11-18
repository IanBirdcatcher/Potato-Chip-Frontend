// EducationsService.js
import apiClient from './services';

const EducationsService = {
  // Get all Educations for a specific user
  getAllEducations(userId) {
    return apiClient.get(`/Education/byuser/${userId}`);
  },
  
  // Get a specific Education by ID
  getEducationById(EducationId) {
    return apiClient.get(`/Education/${EducationId}`);
  },
  
  // Create a new Education
  createEducation(EducationData) {
    return apiClient.post('/Education', EducationData);
  },
  
  // Update a specific Education
  updateEducation(EducationId, EducationData) {
    return apiClient.put(`/Education/${EducationId}`, EducationData);
  },
  
  // Delete a specific Education
  deleteEducation(EducationId) {
    return apiClient.delete(`/Education/${EducationId}`);
  },
};

export default educationService;
