// projectService.js
import apiClient from './services';

const projectService = {
  // Get all projects for a specific user
  getAllForUser(userId) {
    return apiClient.get(`/project/byUser/${userId}`);
  },
  
  // Get a specific project by ID
  getProjectById(projectId) {
    return apiClient.get(`/project/${projectId}`);
  },
  
  // Create a new project
  createProject(projectData) {
    return apiClient.post('/project', projectData);
  },
  
  // Update a specific project
  updateProject(projectId, projectData) {
    return apiClient.put(`/project/${projectId}`, projectData);
  },
  
  // Delete a specific project
  deleteProject(projectId) {
    return apiClient.delete(`/project/${projectId}`);
  },
};

export default ProjectService;
