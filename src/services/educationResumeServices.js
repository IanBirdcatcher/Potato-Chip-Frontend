// educationResumeService.js
import apiClient from './services';

const EducationResumeService = {  
  // Get a specific educationResume by resume ID
  getEducationResumeById(educationResumeId) {
    return apiClient.get(`/educationResume/${educationResumeId}`);
  },
  
  // Create a new educationResume
  createEducationResume(educationResumeData) {
    return apiClient.post('/educationResume', educationResumeData);
  },
  
  // Update a specific educationResume
  updateEducationResume(educationResumeId, educationResumeData) {
    return apiClient.put(`/educationResume/${educationResumeId}`, educationResumeData);
  },
  
  // Delete a specific educationResume
  deleteEducationResume(educationResumeId) {
    return apiClient.delete(`/educationResume/${educationResumeId}`);
  },
};

export default EducationResumeService;
