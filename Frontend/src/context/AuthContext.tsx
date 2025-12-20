// src/context/AuthContext.tsx

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User, LoginPayload, SignupPayload, LoginResponse } from '../types'; 
import { apiLogin, apiRegisterUser, apiGetCurrentUser, apiClient } from '../services/api';

// Define the shape/type of the context value
interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean; // Indicates if initial auth check is running
  error: string | null;
  isAuthenticated: boolean; 
  login: (credentials: LoginPayload) => Promise<void>;
  signup: (payload: SignupPayload) => Promise<void>; 
  logout: () => void;
  fetchUser: () => Promise<void>; 
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true, 
  error: null,
  isAuthenticated: false,
  login: async () => { console.warn("Login called before AuthProvider mounted"); },
  signup: async () => { console.warn("Signup called before AuthProvider mounted"); },
  logout: () => { console.warn("Logout called before AuthProvider mounted"); },
  fetchUser: async () => { console.warn("FetchUser called before AuthProvider mounted"); },
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('authToken'));
  
  // ✅ FIX: This loading state is ONLY for the initial page load (checking if user is logged in)
  // We do NOT use it for login/signup button clicks anymore.
  const [loading, setLoading] = useState<boolean>(true); 
  
  const [error, setError] = useState<string | null>(null);

  // Effect runs once on mount to check initial token validity
  useEffect(() => {
    const initializeAuth = async () => {
      if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        await fetchUser(); 
      } else {
        setLoading(false); 
      }
    };
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); 

  const fetchUser = async () => {
    if (loading && user) return; 
    
    // We keep setLoading here because this usually happens on page refresh/load
    if (!loading) setLoading(true); 
    setError(null);
    try {
      const fetchedUser: User = await apiGetCurrentUser();
      setUser(fetchedUser);
    } catch (err) {
      console.error("Failed to fetch current user:", err);
      logout();
    } finally {
      setLoading(false); 
    }
  };


  // ✅ UPDATED LOGIN FUNCTION (No Global Loading)
  const login = async (credentials: LoginPayload) => {
    // We removed setLoading(true) here so the page doesn't blink/reset
    setError(null);
    try {
      const response: LoginResponse = await apiLogin(credentials);

      const receivedToken = response.token;
      const loggedInUser = response.user;

      if (!receivedToken || !loggedInUser) {
        throw new Error("Invalid login response structure from API");
      }

      // Store token
      localStorage.setItem('authToken', receivedToken);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${receivedToken}`;

      setToken(receivedToken);
      setUser(loggedInUser);

    } catch (err: any) { 
      console.error("AuthContext login failed:", err);
      const message = err.response?.data?.message || err.message || "Login failed. Check credentials.";
      setError(message);
      throw err; // This allows AuthPage to catch the error and show the red box
    } 
    // We removed 'finally { setLoading(false) }'
  };

  // ✅ UPDATED SIGNUP FUNCTION (No Global Loading)
  const signup = async (payload: SignupPayload) => {
    // We removed setLoading(true) here
    setError(null);
    try {
      const createdUser: User = await apiRegisterUser(payload);
      console.log("Signup successful:", createdUser);

    } catch (err: any) { 
      console.error("AuthContext signup failed:", err);
       const message = err.response?.data?.message || err.message || 'Signup failed. Please try again.';
      setError(message);
      throw err; 
    } 
    // We removed 'finally { setLoading(false) }'
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    delete apiClient.defaults.headers.common['Authorization']; 
    setToken(null);
    setUser(null);
    setError(null); 
  };

  const isAuthenticated = !!token && !!user;

  const value = {
    user,
    token,
    loading,
    error,
    isAuthenticated,
    login,
    signup,
    logout,
    fetchUser
  };

  return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};