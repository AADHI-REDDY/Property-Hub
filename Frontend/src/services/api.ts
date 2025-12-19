// src/services/api.ts

import axios, { AxiosInstance } from 'axios';
import {
  User,
  SignupPayload,
  LoginPayload,
  LoginResponse,
  CreateTenantRequest,
  Property,
  PropertyRequest,
  Lease,
  Payment
} from '../types';

// --- Base Configuration ---
// Vercel will use VITE_API_BASE_URL. Localhost will fallback to http://localhost:8080
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

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
 * AUTH API Calls
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
 * PROPERTIES API Calls
 * ====================================================
 */
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
 * USERS & LEASES API Calls
 * ====================================================
 */
export const apiGetTenants = (): Promise<User[]> =>
  apiClient.get<User[]>('/users/tenants').then(res => res.data);

export const apiGetAllLeases = (): Promise<Lease[]> =>
  apiClient.get<Lease[]>('/leases').then(res => res.data);

export const apiGetAllPayments = (): Promise<Payment[]> =>
  apiClient.get<Payment[]>('/payments').then(res => res.data);

export const apiCreateTenantByAdmin = (tenantData: CreateTenantRequest): Promise<User> =>
  apiClient.post<User>('/admin/tenants', tenantData).then(res => res.data);

export const createTenant = apiCreateTenantByAdmin;