// interestService.js
import apiClient from './services';

const InterestService = {
  // Get all interests for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/interest/byUser/${userId}`);
  },
  
  // Get a specific interest by ID
  getInterestById(interestId) {
    return apiClient.get(`/interest/${interestId}`);
  },
  
  // Create a new interest
  createInterest(interestData) {
    return apiClient.post('/interest', interestData);
  },
  
  // Update a specific interest
  updateInterest(interestId, interestData) {
    return apiClient.put(`/interest/${interestId}`, interestData);
  },
  
  // Delete a specific interest
  deleteInterest(interestId) {
    return apiClient.delete(`/interest/${interestId}`);
  },
};

export default InterestService;
