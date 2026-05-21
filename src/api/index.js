import axios from 'axios';

let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1/';

// Normalize API_URL to have exactly one trailing slash and prevent double slashes
API_URL = API_URL.replace(/\/+$/, '') + '/';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kec_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('kec_admin_token');
      if (!window.location.pathname.includes('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const applicationService = {
  submit: (data) => api.post('applications', data),
  getAll: (params) => api.get('admin/applications', { params }),
  updateStatus: (id, status) => api.put(`admin/applications/${id}/status`, { status }),
};

export const uploadService = {
  upload: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('admin/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export const contentService = {
  getNotices: () => api.get('notices'),
  createNotice: (data) => api.post('admin/notices', data),
  getGallery: () => api.get('gallery'),
  addToGallery: (data) => api.post('admin/gallery', data),
  updateGallery: (id, data) => api.put(`admin/gallery/${id}`, data),
  deleteGallery: (id) => api.delete(`admin/gallery/${id}`),
  incrementLikes: (id) => api.post(`gallery/${id}/like`),
  incrementDownloads: (id) => api.post(`gallery/${id}/download`),
  getBaseUrl: () => API_URL.replace('/api/v1/', ''),
};

export const departmentService = {
  getAll: () => api.get('departments'),
  getByShortName: (shortName) => api.get(`departments/${shortName}`),
  getAllAdmin: () => api.get('admin/departments'),
  create: (data) => api.post('admin/departments', data),
  update: (id, data) => api.put(`admin/departments/${id}`, data),
  delete: (id) => api.delete(`admin/departments/${id}`),
};

export const facultyService = {
  getAll: () => api.get('faculty'),
  getAllAdmin: () => api.get('admin/faculty'),
  create: (data) => api.post('admin/faculty', data),
  update: (id, data) => api.put(`admin/faculty/${id}`, data),
  delete: (id) => api.delete(`admin/faculty/${id}`),
};

export const authService = {
  login: (credentials) => api.post('auth/login', credentials),
  logout: () => localStorage.removeItem('kec_admin_token'),
};

export const examService = {
  // Public
  getActive: () => api.get('exams/active'),
  getDetails: (id) => api.get(`exams/${id}`),
  submitResponse: (data) => api.post('exams/submit', data),
  getResults: (email, phone) => api.get(`exams/results?email=${email}&phone=${phone}`),
  
  // Admin
  create: (data) => api.post('admin/exams', data),
  getAllAdmin: () => api.get('admin/exams'),
  update: (id, data) => api.put(`admin/exams/${id}`, data),
  delete: (id) => api.delete(`admin/exams/${id}`),
  getResponses: (id) => api.get(`admin/exams/${id}/responses`),
  getDetailedResponse: (id) => api.get(`admin/responses/${id}`),
};

export const leadershipService = {
  getAll: () => api.get('leadership'),
  getAllAdmin: () => api.get('admin/leadership'),
  create: (data) => api.post('admin/leadership', data),
  update: (id, data) => api.put(`admin/leadership/${id}`, data),
  delete: (id) => api.delete(`admin/leadership/${id}`),
};

export const courseService = {
  getAll: () => api.get('courses'),
  getAllAdmin: () => api.get('admin/courses'),
  create: (data) => api.post('admin/courses', data),
  update: (id, data) => api.put(`admin/courses/${id}`, data),
  delete: (id) => api.delete(`admin/courses/${id}`),
};

export const researchService = {
  getAreas: () => api.get('research/areas'),
  getProjects: () => api.get('research/projects'),
  getFacilities: () => api.get('research/facilities'),
  getStats: () => api.get('research/stats'),
  
  // Admin methods
  getAllAreasAdmin: () => api.get('admin/research/areas'),
  createArea: (data) => api.post('admin/research/areas', data),
  updateArea: (id, data) => api.put(`admin/research/areas/${id}`, data),
  deleteArea: (id) => api.delete(`admin/research/areas/${id}`),

  getAllProjectsAdmin: () => api.get('admin/research/projects'),
  createProject: (data) => api.post('admin/research/projects', data),
  updateProject: (id, data) => api.put(`admin/research/projects/${id}`, data),
  deleteProject: (id) => api.delete(`admin/research/projects/${id}`),

  getAllFacilitiesAdmin: () => api.get('admin/research/facilities'),
  createFacility: (data) => api.post('admin/research/facilities', data),
  updateFacility: (id, data) => api.put(`admin/research/facilities/${id}`, data),
  deleteFacility: (id) => api.delete(`admin/research/facilities/${id}`),

  getStatsAdmin: () => api.get('admin/research/stats'),
  createStat: (data) => api.post('admin/research/stats', data),
  updateStat: (id, data) => api.put(`admin/research/stats/${id}`, data),
  deleteStat: (id) => api.delete(`admin/research/stats/${id}`),
};

export const admissionService = {
  // Public
  getGuide: () => api.get("admission/guide"),
  getSteps: () => api.get("admission/steps"),
  getEligibility: () => api.get("admission/eligibility"),
  getDocuments: () => api.get("admission/documents"),
  getFees: () => api.get("admission/fees"),

  // Admin
  updateGuide: (data) => api.post("admin/admission/guide", data),
  
  createStep: (data) => api.post("admin/admission/steps", data),
  updateStep: (id, data) => api.put(`admin/admission/steps/${id}`, data),
  deleteStep: (id) => api.delete(`admin/admission/steps/${id}`),

  createEligibility: (data) => api.post("admin/admission/eligibility", data),
  updateEligibility: (id, data) => api.put(`admin/admission/eligibility/${id}`, data),
  deleteEligibility: (id) => api.delete(`admin/admission/eligibility/${id}`),

  createDocument: (data) => api.post("admin/admission/documents", data),
  updateDocument: (id, data) => api.put(`admin/admission/documents/${id}`, data),
  deleteDocument: (id) => api.delete(`admin/admission/documents/${id}`),

  createFee: (data) => api.post("admin/admission/fees", data),
  updateFee: (id, data) => api.put(`admin/admission/fees/${id}`, data),
  deleteResponse: (id) => api.delete(`admin/exams/responses/${id}`),
};

export const facilityService = {
  // Public
  getAll: (category) => api.get('facilities', { params: { category } }),
  getStats: () => api.get('facilities/stats'),

  // Admin
  create: (data) => api.post('admin/facilities', data),
  update: (id, data) => api.put(`admin/facilities/${id}`, data),
  delete: (id) => api.delete(`admin/facilities/${id}`),
  createStat: (data) => api.post('admin/facilities/stats', data),
  updateStat: (id, data) => api.put(`admin/facilities/stats/${id}`, data),
  deleteStat: (id) => api.delete(`admin/facilities/stats/${id}`),
};

export const alumniService = {
  // Public
  getAll: (params) => api.get('alumni', { params }),
  getStats: () => api.get('alumni/stats'),

  // Admin
  create: (data) => api.post('admin/alumni', data),
  update: (id, data) => api.put(`admin/alumni/${id}`, data),
  delete: (id) => api.delete(`admin/alumni/${id}`),
  updateStats: (data) => api.post('admin/alumni/stats', data),
};

export const placementService = {
  // Public
  getStats: () => api.get('placements/stats'),
  getRecruiters: () => api.get('placements/recruiters'),
  getTestimonials: () => api.get('placements/testimonials'),

  // Admin
  updateStats: (data) => api.post('admin/placements/stats', data),
  createRecruiter: (data) => api.post('admin/placements/recruiters', data),
  updateRecruiter: (id, data) => api.put(`admin/placements/recruiters/${id}`, data),
  deleteRecruiter: (id) => api.delete(`admin/placements/recruiters/${id}`),
  createTestimonial: (data) => api.post('admin/placements/testimonials', data),
  updateTestimonial: (id, data) => api.put(`admin/placements/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`admin/placements/testimonials/${id}`),
};

export const pressMediaService = {
  // Public
  getAll: (params) => api.get('press-media', { params }),

  // Admin
  create: (data) => api.post('admin/press-media', data),
  update: (id, data) => api.put(`admin/press-media/${id}`, data),
  delete: (id) => api.delete(`admin/press-media/${id}`),
};

export const adminAccountService = {
  getAll: () => api.get('admin/accounts'),
  create: (data) => api.post('admin/accounts', data),
  delete: (id) => api.delete(`admin/accounts/${id}`),
};

export default api;
