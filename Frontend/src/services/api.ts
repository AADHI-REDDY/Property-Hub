// src/services/api.ts

import axios, { AxiosInstance } from 'axios';
import {
  User,
  SignupPayload,
  LoginPayload,
  LoginResponse,
  CreateTenantRequest,
  Property,
  PropertyRequest, // Import the corrected type
  Lease,
  Payment
} from '../types';

// --- Base Configuration ---
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// --- Interceptors ---
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("API Request Error:", error);
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('🚨 API Response Error:', error.response?.status, error.message);
    if (error.response?.status === 401) {
      console.warn("Unauthorized request - logging out.");
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

/**
 * ====================================================
 * AUTH API Calls (/api/auth/...)
 * ====================================================
 */
export const apiLogin = (credentials: LoginPayload): Promise<LoginResponse> =>
  apiClient.post<LoginResponse>('/auth/login', credentials).then(res => res.data);

export const apiRegisterUser = (userData: SignupPayload): Promise<User> =>
  apiClient.post<User>('/auth/signup', userData).then(res => res.data);

export const apiGetCurrentUser = (): Promise<User> =>
  apiClient.get<User>('/auth/me').then(res => res.data);

/**
 * ====================================================
 * PROPERTIES API Calls (/api/properties/...)
 * ====================================================
 */
// ✅ Exporting the object
export const propertiesAPI = {
  getAll: (): Promise<Property[]> => apiClient.get<Property[]>('/properties').then(res => res.data),
  
  getById: (id: string): Promise<Property> => 
    apiClient.get<Property>(`/properties/${id}`).then(res => res.data),
  
  create: (propertyData: PropertyRequest): Promise<Property> => 
    apiClient.post<Property>('/properties', propertyData).then(res => res.data),

  update: (id: string, propertyData: PropertyRequest): Promise<Property> => 
    apiClient.put<Property>(`/properties/${id}`, propertyData).then(res => res.data),
    
  delete: (id: string): Promise<void> => 
    apiClient.delete<void>(`/properties/${id}`).then(res => res.data),
    
  getByLandlord: (landlordId: string): Promise<Property[]> => 
    apiClient.get<Property[]>(`/properties/landlord/${landlordId}`).then(res => res.data),
    
  getAvailable: (): Promise<Property[]> => 
    apiClient.get<Property[]>('/properties/available').then(res => res.data),
    
  // Add the image upload function
  uploadImages: (propertyId: string | number, files: File[]): Promise<string[]> => {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    return apiClient.post<string[]>(`/properties/${propertyId}/upload-images`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then(res => res.data);
  },
};

/**
 * ====================================================
 * USERS API Calls (/api/users/...)
 * ====================================================
 */
export const apiGetTenants = (): Promise<User[]> =>
  apiClient.get<User[]>('/users/tenants').then(res => res.data);

/**
 * ====================================================
 * LEASES API Calls (/api/leases/...)
 * ====================================================
 */
export const apiGetAllLeases = (): Promise<Lease[]> =>
  apiClient.get<Lease[]>('/leases').then(res => res.data);

/**
 * ====================================================
 * PAYMENTS API Calls (/api/payments/...)
 * ====================================================
 */
export const apiGetAllPayments = (): Promise<Payment[]> =>
  apiClient.get<Payment[]>('/payments').then(res => res.data);

/**
 * ====================================================
 * ADMIN API Calls (/api/admin/...)
 * ====================================================
 */
export const apiCreateTenantByAdmin = (tenantData: CreateTenantRequest): Promise<User> =>
  apiClient.post<User>('/admin/tenants', tenantData).then(res => res.data);

// Export for AddTenantModal
export const createTenant = apiCreateTenantByAdmin;
// src/services/api.ts (Add this to your existing file)

// ... existing imports

/**
 * ====================================================
 * FORGOT PASSWORD API
 * ====================================================
 */
export const apiForgotPassword = (email: string): Promise<void> =>
  apiClient.post<void>('/auth/forgot-password', { email }).then(res => res.data);