// src/components/layout/Header.tsx

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, LogOut, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import NotificationCenter from '../notifications/NotificationCenter';
import ProfileAvatar from '../common/ProfileAvatar';

interface HeaderProps {
  onMenuToggle: () => void;
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle }) => {
  const { user, logout } = useAuth();

  // FIX: Helper to get a displayable role string from the roles array
  const displayRole = user?.roles && user.roles.length > 0 
    ? user.roles[0].replace('ROLE_', '').toLowerCase() 
    : 'User';

  const isAdmin = user?.roles.includes('ROLE_ADMIN');

  return (
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-gray-200/80 shadow-sm"
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left Section: Logo & Toggle */}
          <div className="flex items-center">
            <button
              onClick={onMenuToggle}
              className="md:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center ml-2 md:ml-0 gap-2">
              <motion.div 
                whileHover={{ rotate: 10 }}
                // UPDATED: Changed from blue-600 to emerald-600
                className="bg-emerald-600 p-1.5 rounded-lg shadow-md shadow-emerald-500/20"
              >
                <Building2 className="w-6 h-6 text-white" />
              </motion.div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 hidden sm:block">
                PropertyHub
              </h1>
            </div>
          </div>

          {/* Right Section: Actions & Profile */}
          <div className="flex items-center gap-4">
            <NotificationCenter />
            
            <div className="h-8 w-px bg-gray-200 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 pl-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <div className="flex items-center justify-end gap-1">
                    {/* UPDATED: Changed non-admin status dot to emerald-500 */}
                    <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-purple-500' : 'bg-emerald-500'}`}></span>
                    <p className="text-xs text-gray-500 capitalize">
                      {isAdmin ? 'Administrator' : displayRole}
                    </p>
                  </div>
                </div>
                
                <ProfileAvatar 
                  user={{
                    name: user?.name || '',
                    // FIX: Convert null to undefined for TypeScript
                    profileImage: user?.profileImage || undefined, 
                    role: displayRole
                  }}
                  size="md"
                  showBorder
                />
              </div>
              
              <motion.button
                onClick={logout}
                whileHover={{ scale: 1.1, backgroundColor: '#FEF2F2', color: '#EF4444' }} 
                whileTap={{ scale: 0.9 }}
                className="p-2 text-gray-400 rounded-full transition-colors ml-1"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;