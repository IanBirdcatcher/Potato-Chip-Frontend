// experienceResumeService.js
import apiClient from './services';

const experienceResumeService = {  
  // Get a specific experienceResume by resume ID
  getExperienceResumeById(experienceResumeId) {
    return apiClient.get(`/experienceResume/${experienceResumeId}`);
  },
  
  // Create a new experienceResume
  createExperienceResume(experienceResumeData) {
    return apiClient.post('/experienceResume', experienceResumeData);
  },
  
  // Update a specific experienceResume
  updateExperienceResume(experienceResumeId, experienceResumeData) {
    return apiClient.put(`/experienceResume/${experienceResumeId}`, experienceResumeData);
  },
  
  // Delete a specific experienceResume
  deleteExperienceResume(experienceResumeId) {
    return apiClient.delete(`/experienceResume/${experienceResumeId}`);
  },
};

export default ExperienceResumeService;
