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
    
    // 🚀 DEMO MODE INTERCEPTOR 🚀
    // If we are in "Demo Mode", we STOP the request here and return fake data immediately.
    // This prevents the app from trying to hit a missing backend.
    if (token === 'demo-token-123') {
      config.adapter = async (config) => {
        return new Promise((resolve) => {
          const url = config.url || '';
          let data: any = {};
          
          // Mock /auth/me (The Verify User Call)
          if (url.includes('/auth/me')) {
            data = {
              id: 'demo-user',
              name: 'Demo Landlord',
              email: 'demo@property.com',
              role: 'landlord'
            };
          }
          // Mock /properties (The Dashboard Data)
          else if (url.includes('/properties')) {
            data = [
              { id: 1, title: "Sunset Apartments", location: "Downtown", price: 1200, status: "Occupied" },
              { id: 2, title: "Ocean View Villa", location: "Coastal Rd", price: 2500, status: "Available" }
            ];
          }
          // Mock /users/tenants
          else if (url.includes('/users/tenants')) {
            data = [
              { id: 101, name: "John Doe", email: "john@test.com", status: "Active" }
            ];
          }

          // Return successful fake response
          resolve({
            data: data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config,
          });
        });
      };
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // If it's a real 401 error from a real backend, log out
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
    // Mock upload if in demo mode
    if (localStorage.getItem('authToken') === 'demo-token-123') {
        return Promise.resolve(["https://images.unsplash.com/photo-1564013799919-ab600027ffc6"]);
    }
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