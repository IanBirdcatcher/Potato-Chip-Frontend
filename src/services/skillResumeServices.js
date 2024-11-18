// skillResumeService.js
import apiClient from './services';

const skillResumeService = {  
  // Get a specific skillResume by resume ID
  getSkillResumeById(skillResumeId) {
    return apiClient.get(`/skillResume/${skillResumeId}`);
  },
  
  // Create a new skillResume
  createSkillResume(skillResumeData) {
    return apiClient.post('/skillResume', skillResumeData);
  },
  
  // Update a specific skillResume
  updateSkillResume(skillResumeId, skillResumeData) {
    return apiClient.put(`/skillResume/${skillResumeId}`, skillResumeData);
  },
  
  // Delete a specific skillResume
  deleteSkillResume(skillResumeId) {
    return apiClient.delete(`/skillResume/${skillResumeId}`);
  },
};

export default skillResumeService;
