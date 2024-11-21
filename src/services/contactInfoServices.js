// contactInfoService.js
import apiClient from './services';

const ContactInfoService = {
  // Get all contactInfos for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/contactInfo/byUser/${userId}`);
  },
  
  // Get a specific contactInfo by ID
  getContactInfoById(contactInfoId) {
    return apiClient.get(`/contactInfo/${contactInfoId}`);
  },
  
  // Create a new contactInfo
  createContactInfo(contactInfoData) {
    return apiClient.post('/contactInfo', contactInfoData);
  },
  
  // Update a specific contactInfo
  updateContactInfo(contactInfoId, contactInfoData) {
    return apiClient.put(`/contactInfo/${contactInfoId}`, contactInfoData);
  },
  
  // Delete a specific contactInfo
  deleteContactInfo(contactInfoId) {
    return apiClient.delete(`/contactInfo/${contactInfoId}`);
  },
};

export default ContactInfoService;
