// awardService.js
import apiClient from './services';

const AwardService = {
  // Get all awards for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/award/byUser/${userId}`);
  },
  
  // Get a specific award by ID
  getAwardById(awardId) {
    return apiClient.get(`/award/${awardId}`);
  },
  
  // Create a new award
  createAward(awardData) {
    return apiClient.post('/award', awardData);
  },
  
  // Update a specific award
  updateAward(awardId, awardData) {
    return apiClient.put(`/award/${awardId}`, awardData);
  },
  
  // Delete a specific award
  deleteAward(awardId) {
    return apiClient.delete(`/award/${awardId}`);
  },
};

export default AwardService;
