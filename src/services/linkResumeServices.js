// linkResumeService.js
import apiClient from './services';

const linkResumeService = {  
  // Get a specific linkResume by resume ID
  getLinkResumeById(linkResumeId) {
    return apiClient.get(`/linkResume/${linkResumeId}`);
  },
  
  // Create a new linkResume
  createLinkResume(linkResumeData) {
    return apiClient.post('/linkResume', linkResumeData);
  },
  
  // Update a specific linkResume
  updateLinkResume(linkResumeId, linkResumeData) {
    return apiClient.put(`/linkResume/${linkResumeId}`, linkResumeData);
  },
  
  // Delete a specific linkResume
  deleteLinkResume(linkResumeId) {
    return apiClient.delete(`/linkResume/${linkResumeId}`);
  },
};

export default linkResumeService;
