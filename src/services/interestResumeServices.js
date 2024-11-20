// interestResumeService.js
import apiClient from './services';

const interestResumeService = {  
  // Get a specific interestResume by resume ID
  getInterestResumeById(interestResumeId) {
    return apiClient.get(`/interestResume/${interestResumeId}`);
  },
  
  // Create a new interestResume
  createInterestResume(interestResumeData) {
    return apiClient.post('/interestResume', interestResumeData);
  },
  
  // Update a specific interestResume
  updateInterestResume(interestResumeId, interestResumeData) {
    return apiClient.put(`/interestResume/${interestResumeId}`, interestResumeData);
  },
  
  // Delete a specific interestResume
  deleteInterestResume(interestResumeId) {
    return apiClient.delete(`/interestResume/${interestResumeId}`);
  },
};

export default InterestResumeService;
