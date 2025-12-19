import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  Home, Building, Users, DollarSign, FileText, Settings, X, 
  Wrench, ChevronLeft, ChevronRight, PieChart
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isOpen: boolean;
  onClose: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  activeTab, onTabChange, isOpen, onClose, isCollapsed, onToggleCollapse 
}) => {
  const { user } = useAuth();
  const isLandlord = user?.roles.includes('ROLE_LANDLORD') ?? false;
  const isAdmin = user?.roles.includes('ROLE_ADMIN') ?? false;
  const isManager = isLandlord || isAdmin; 

  let menuItems = [];

  if (isManager) {
    menuItems = [
      { id: 'admin-dashboard', label: 'Overview', icon: Home },
      { id: 'admin-properties', label: 'Properties', icon: Building },
      { id: 'tenants', label: 'People', icon: Users },
      { id: 'maintenance', label: 'Maintenance', icon: Wrench },
      { id: 'payments', label: 'Financials', icon: DollarSign },
      { id: 'leases', label: 'Documents', icon: FileText },
    ];
    if (isAdmin) {
       menuItems.push({ id: 'admin-analytics', label: 'Analytics', icon: PieChart });
       menuItems.push({ id: 'admin-settings', label: 'Settings', icon: Settings });
    }
  } else {
    menuItems = [
      { id: 'dashboard', label: 'Home', icon: Home },
      { id: 'properties', label: 'My Unit', icon: Building },
      { id: 'maintenance', label: 'Service', icon: Wrench },
      { id: 'payments', label: 'Payments', icon: DollarSign },
      { id: 'leases', label: 'My Lease', icon: FileText },
      { id: 'settings', label: 'Settings', icon: Settings },
    ];
  }

  // Animation Variants
  const sidebarVariants: Variants = {
    expanded: { width: 260, transition: { type: "spring", damping: 22, stiffness: 120 } },
    collapsed: { width: 80, transition: { type: "spring", damping: 22, stiffness: 120 } },
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm" 
            onClick={onClose} 
          />
        )}
      </AnimatePresence>
      
      {/* SIDEBAR BACKGROUND: Dark Teal */}
      <motion.div 
        variants={sidebarVariants}
        animate={isCollapsed ? "collapsed" : "expanded"}
        className={`fixed inset-y-0 left-0 z-50 bg-[#042f2e] text-white shadow-2xl flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static border-r border-teal-900/50`}
      >
        
        {/* Logo Section */}
        <div className="h-24 flex items-center justify-center border-b border-teal-800/30 relative">
             <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                    <Building className="text-white w-6 h-6" />
                </div>
                {!isCollapsed && (
                    <motion.span 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="font-bold text-white text-xl tracking-tight"
                    >
                        PropertyHub
                    </motion.span>
                )}
             </div>
             {/* Mobile Close */}
             <button onClick={onClose} className="absolute right-4 md:hidden text-teal-100 hover:text-white">
                <X size={20} />
             </button>
        </div>

        {/* Toggle Button */}
        <div className="hidden md:block absolute -right-3 top-28 z-50">
          <button
            onClick={onToggleCollapse}
            className="bg-[#042f2e] border border-teal-700 rounded-full p-1.5 text-teal-100 hover:text-white hover:bg-teal-700 transition-all shadow-md"
          >
            {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 mt-8 px-4 space-y-2 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <div key={item.id} className="relative group">
                <button
                  onClick={() => { onTabChange(item.id); onClose(); }}
                  className={`w-full flex items-center relative py-3.5 rounded-xl transition-all duration-300 font-medium
                    ${isCollapsed ? 'justify-center px-0' : 'px-4'}
                    ${isActive 
                        ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/50' 
                        : 'text-teal-100/70 hover:bg-teal-800/40 hover:text-white'
                    }
                  `}
                >
                  <Icon className={`${isCollapsed ? 'w-6 h-6' : 'w-5 h-5 mr-3'} ${isActive ? 'text-white' : 'text-teal-200 group-hover:text-white'}`} />
                  
                  {!isCollapsed && (
                    <span className="text-sm tracking-wide">{item.label}</span>
                  )}
                  
                  {/* Active Glow for collapsed mode */}
                  {isActive && isCollapsed && (
                    <motion.div layoutId="active-dot" className="absolute right-2 top-2 w-2 h-2 bg-teal-300 rounded-full shadow-[0_0_8px_rgba(45,212,191,0.8)]" />
                  )}
                </button>

                {/* Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-2 bg-[#0f172a] text-white text-xs font-medium rounded-lg opacity-0 group-hover:opacity-100 transition-opacity z-50 shadow-xl whitespace-nowrap border border-teal-800">
                    {item.label}
                    <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-[#0f172a] rotate-45 border-l border-b border-teal-800" />
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* User Mini Profile (Footer) */}
        <div className="p-4 border-t border-teal-800/30 bg-[#022c2b]">
            <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm shadow-md ring-2 ring-teal-900">
                    {user?.name?.charAt(0) || 'U'}
                </div>
                {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                        <p className="text-xs text-teal-300/60 truncate capitalize mt-0.5">{user?.roles[0]?.replace('ROLE_', '').toLowerCase()}</p>
                    </div>
                )}
            </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar; 