// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { SettingsProvider } from './context/SettingsContext';

// --- Pages & Layout ---
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Layout from './layout/Layout';

// --- Components ---
import Dashboard from './components/dashboard/Dashboard';
import PropertiesList from './components/properties/PropertiesList';
import AdminDashboard from './components/admin/AdminDashboard';
import UserManagement from './components/admin/UserManagement';
import AdminProperties from './components/admin/AdminProperties';
import AdminAnalytics from './components/admin/AdminAnalytics';
import AdminSettings from './components/admin/AdminSettings';
import { TenantsManagement } from './components/tenants/TenantsManagement';
import PaymentsManagement from './components/payments/PaymentsManagement';
import LeasesManagement from './components/leases/LeasesManagement';
import Settings from './components/settings/Settings';
import MaintenanceRequests from './components/maintenance/MaintenanceRequests';

// 1. Helper: Redirects users based on their role (Replaces your old useEffect)
const RoleBasedRedirect = () => {
  const { user } = useAuth();
  const isLandlordOrAdmin = user?.roles.includes('ROLE_LANDLORD') || user?.roles.includes('ROLE_ADMIN');
  
  if (isLandlordOrAdmin) {
    return <Navigate to="/admin-dashboard" replace />;
  }
  return <Navigate to="/dashboard" replace />;
};

// 2. Helper: Protects private routes
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  
  if (!isAuthenticated) return <Navigate to="/auth" />;
  return <>{children}</>;
};

// 3. Helper: Redirects logged-in users away from Landing/Auth pages
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return null; // Or a spinner
  
  // If user is logged in, send them to the root of the app (which triggers RoleBasedRedirect)
  if (isAuthenticated) return <Navigate to="/app" />;
  
  return <>{children}</>;
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SettingsProvider>
          <Routes>
            
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/" element={
              <PublicRoute>
                <LandingPage />
              </PublicRoute>
            } />
            
            <Route path="/auth" element={
              <PublicRoute>
                <AuthPage />
              </PublicRoute>
            } />

            {/* --- PROTECTED APP ROUTES --- */}
            {/* All these routes live inside the Layout component */}
            <Route path="/" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              {/* Virtual root "/app" redirects to specific dashboard based on role */}
              <Route path="app" element={<RoleBasedRedirect />} />

              {/* TENANT ROUTES */}
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<PropertiesList />} />
              <Route path="maintenance" element={<MaintenanceRequests />} />
              <Route path="payments" element={<PaymentsManagement />} />
              <Route path="leases" element={<LeasesManagement />} />
              <Route path="settings" element={<Settings />} />

              {/* ADMIN / LANDLORD ROUTES */}
              {/* Note: The Sidebar IDs (e.g. 'admin-users') must match these paths */}
              <Route path="admin-dashboard" element={<AdminDashboard />} />
              <Route path="admin-users" element={<UserManagement />} />
              <Route path="admin-properties" element={<AdminProperties />} />
              <Route path="tenants" element={<TenantsManagement />} />
              <Route path="admin-analytics" element={<AdminAnalytics />} />
              <Route path="admin-settings" element={<AdminSettings />} />
            </Route>

            {/* Catch-all: Redirect to Landing Page */}
            <Route path="*" element={<Navigate to="/" />} />

          </Routes>
        </SettingsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;