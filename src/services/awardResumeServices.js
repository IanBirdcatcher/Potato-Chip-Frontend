// awardResumeService.js
import apiClient from './services';

const awardResumeService = {  
  // Get a specific awardResume by resume ID
  getAwardResumeById(awardResumeId) {
    return apiClient.get(`/awardResume/${awardResumeId}`);
  },
  
  // Create a new awardResume
  createAwardResume(awardResumeData) {
    return apiClient.post('/awardResume', awardResumeData);
  },
  
  // Update a specific awardResume
  updateAwardResume(awardResumeId, awardResumeData) {
    return apiClient.put(`/awardResume/${awardResumeId}`, awardResumeData);
  },
  
  // Delete a specific awardResume
  deleteAwardResume(awardResumeId) {
    return apiClient.delete(`/awardResume/${awardResumeId}`);
  },
};

export default awardResumeService;
