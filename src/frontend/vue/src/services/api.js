import axios from 'axios';

// API base URL - in production, this would be your deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens (if needed in future)
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);
    
    // Handle common errors
    if (error.response) {
      // Server responded with an error status
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          console.error('Bad Request:', data.message);
          break;
        case 401:
          console.error('Unauthorized:', data.message);
          // Redirect to login if needed
          break;
        case 403:
          console.error('Forbidden:', data.message);
          break;
        case 404:
          console.error('Not Found:', data.message);
          break;
        case 500:
          console.error('Server Error:', data.message);
          break;
        default:
          console.error('API Error:', data.message || 'Unknown error');
      }
    } else if (error.request) {
      // Network error
      console.error('Network Error: Unable to reach the server');
    } else {
      // Other error
      console.error('Error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// API service methods
export const apiService = {
  // Health check
  async checkHealth() {
    try {
      const response = await api.get('/health');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Portfolio methods
  async getPortfolio() {
    try {
      const response = await api.get('/portfolio');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getPortfolioItem(id) {
    try {
      const response = await api.get(`/portfolio/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Contact methods
  async submitContact(contactData) {
    try {
      const response = await api.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  async getContacts() {
    try {
      const response = await api.get('/contacts');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Company information
  async getCompanyInfo() {
    try {
      const response = await api.get('/company');
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Search functionality
  async search(query, type = 'all') {
    try {
      const response = await api.get('/search', {
        params: { q: query, type }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
};

export default api;