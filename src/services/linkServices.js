// linkService.js
import apiClient from './services';

const linkService = {
  // Get all links for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/link/byUser/${userId}`);
  },
  
  // Get a specific link by ID
  getLinkById(linkId) {
    return apiClient.get(`/link/${linkId}`);
  },
  
  // Create a new link
  createLink(linkData) {
    return apiClient.post('/link', linkData);
  },
  
  // Update a specific link
  updateLink(linkId, linkData) {
    return apiClient.put(`/link/${linkId}`, linkData);
  },
  
  // Delete a specific link
  deleteLink(linkId) {
    return apiClient.delete(`/link/${linkId}`);
  },
};

export default LinkService;
