// src/layout/Layout.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useNavigate, useLocation } from 'react-router-dom'; 
import Sidebar from '../components/layout/Sidebar'; 
import Header from '../components/layout/Header';   

const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Get the current path (e.g., "dashboard") to highlight the sidebar tab
  // We remove the leading slash "/"
  const currentTab = location.pathname.substring(1) || 'dashboard';

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden font-sans text-stone-900">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={currentTab}
        // KEY CHANGE: Instead of setting state, we navigate to the URL
        onTabChange={(tabId) => {
            navigate(`/${tabId}`);
            setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300">
        <Header onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto w-full">
            {/* Page Transition Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname} 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* This renders the current page (Dashboard, Properties, etc.) */}
                <Outlet /> 
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;