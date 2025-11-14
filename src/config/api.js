// API Configuration
// This file centralizes all backend API URLs

// Determine the API base URL based on environment
const API_BASE_URL = process.env.VUE_APP_API_URL || 
  (process.env.NODE_ENV === 'production' 
    ? 'https://episd-backend.onrender.com'  // Render backend URL
    : 'http://localhost:3000');

export default API_BASE_URL;

// Helper function to build API endpoints
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/${cleanEndpoint}`;
};

// Example usage in components:
// import API_BASE_URL, { getApiUrl } from '@/config/api';
// const response = await axios.post(getApiUrl('/appIndex'), data);

