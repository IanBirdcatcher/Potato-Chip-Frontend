// skillService.js
import apiClient from './services';

const skillService = {
  // Get all skills for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/skill/byUser/${userId}`);
  },
  
  // Get a specific skill by ID
  getSkillById(skillId) {
    return apiClient.get(`/skill/${skillId}`);
  },
  
  // Create a new skill
  createSkill(skillData) {
    return apiClient.post('/skill', skillData);
  },
  
  // Update a specific skill
  updateSkill(skillId, skillData) {
    return apiClient.put(`/skill/${skillId}`, skillData);
  },
  
  // Delete a specific skill
  deleteSkill(skillId) {
    return apiClient.delete(`/skill/${skillId}`);
  },
};

export default SkillService;
