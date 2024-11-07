// resumesService.js
import apiClient from '../services/services';

const resumesService = {
  // Get all resumes for a specific user
  getAllResumes(userId) {
    return apiClient.get(`/resume/byUser/${userId}`);
  },
  
  // Get a specific resume by ID
  getResumeById(resumeId) {
    return apiClient.get(`/resume/${resumeId}`);
  },
  
  // Create a new resume
  createResume(resumeData) {
    return apiClient.post('/resume', resumeData);
  },
  
  // Update a specific resume
  updateResume(resumeId, resumeData) {
    return apiClient.put(`/resume/${resumeId}`, resumeData);
  },
  
  // Delete a specific resume
  deleteResume(resumeId) {
    return apiClient.delete(`/resume/${resumeId}`);
  },
};

export default resumesService;
