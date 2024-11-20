// contactInfoResumeService.js
import apiClient from './services';

const contactInfoResumeService = {  
  // Get a specific contactInfoResume by resume ID
  getContactInfoResumeById(contactInfoResumeId) {
    return apiClient.get(`/contactInfoResume/${contactInfoResumeId}`);
  },
  
  // Create a new contactInfoResume
  createContactInfoResume(contactInfoResumeData) {
    return apiClient.post('/contactInfoResume', contactInfoResumeData);
  },
  
  // Update a specific contactInfoResume
  updateContactInfoResume(contactInfoResumeId, contactInfoResumeData) {
    return apiClient.put(`/contactInfoResume/${contactInfoResumeId}`, contactInfoResumeData);
  },
  
  // Delete a specific contactInfoResume
  deleteContactInfoResume(contactInfoResumeId) {
    return apiClient.delete(`/contactInfoResume/${contactInfoResumeId}`);
  },
};

export default ContactInfoResumeService;
