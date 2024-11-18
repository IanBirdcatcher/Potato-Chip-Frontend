// projectResumeService.js
import apiClient from './services';

const projectResumeService = {  
  // Get a specific projectResume by resume ID
  getProjectResumeById(projectResumeId) {
    return apiClient.get(`/projectResume/${projectResumeId}`);
  },
  
  // Create a new projectResume
  createProjectResume(projectResumeData) {
    return apiClient.post('/projectResume', projectResumeData);
  },
  
  // Update a specific projectResume
  updateProjectResume(projectResumeId, projectResumeData) {
    return apiClient.put(`/projectResume/${projectResumeId}`, projectResumeData);
  },
  
  // Delete a specific projectResume
  deleteProjectResume(projectResumeId) {
    return apiClient.delete(`/projectResume/${projectResumeId}`);
  },
};

export default projectResumeService;
