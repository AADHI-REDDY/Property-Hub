import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, ArrowRight, Mail, Lock, Eye, EyeOff, 
  Sparkles, User, CheckCircle2, Phone, Image as ImageIcon, 
  Briefcase 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'tenant',
    profileImage: '',
    password: '',
    confirmPassword: ''
  });

  // Mouse move effect for parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center font-sans bg-slate-900 py-10">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          animate={{ 
            scale: [1.1, 1.15, 1.1],
            x: mousePosition.x * -1,
            y: mousePosition.y * -1 
          }}
          transition={{ scale: { duration: 20, repeat: Infinity, repeatType: "reverse" }, x: { type: "tween", ease: "linear" }, y: { type: "tween", ease: "linear" } }}
        >
          <img 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
            alt="City Background" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-emerald-950/80 to-slate-900/90 backdrop-blur-[2px]"></div>
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-emerald-500/20 via-transparent to-transparent blend-screen pointer-events-none"
        />
      </div>

      {/* --- MAIN CARD CONTENT --- */}
      <motion.div 
        layout // Animates size changes automatically
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 w-full px-6 transition-all duration-500 ${isLogin ? 'max-w-[480px]' : 'max-w-[600px]'}`}
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden relative group">
          
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-50"></div>

          <div className="p-8 md:p-10 relative">
            
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div 
                layout
                className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30 mb-6"
              >
                <Building2 size={32} className="text-white" />
              </motion.div>
              
              <motion.h1 layout className="text-3xl font-bold text-white tracking-tight mb-2">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </motion.h1>
              <motion.p layout className="text-slate-300 text-sm">
                {isLogin ? 'Enter your details to access your dashboard.' : 'Join our property management platform.'}
              </motion.p>
            </div>

            {/* FORM CONTAINER */}
            <div className="space-y-4">
              
              {/* --- SIGN UP FIELDS (Grid Layout) --- */}
              <AnimatePresence>
                {!isLogin && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
                    {/* Full Name */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-emerald-300/70" />
                      </div>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Full Name"
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70"
                      />
                    </div>

                    {/* Email (Moved up for signup) */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-emerald-300/70" />
                      </div>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                        placeholder="Email Address"
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70"
                      />
                    </div>

                    {/* Phone & Role (Side by Side) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Phone className="h-5 w-5 text-emerald-300/70" />
                        </div>
                        <input
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          type="tel"
                          placeholder="Phone Number"
                          className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70"
                        />
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Briefcase className="h-5 w-5 text-emerald-300/70" />
                        </div>
                        <select
                          name="role"
                          value={formData.role}
                          onChange={handleInputChange}
                          className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70 appearance-none"
                        >
                          <option value="tenant" className="bg-slate-900">Tenant</option>
                          <option value="landlord" className="bg-slate-900">Landlord</option>
                        </select>
                        {/* Custom Arrow */}
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>

                    {/* Profile Image URL */}
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <ImageIcon className="h-5 w-5 text-emerald-300/70" />
                      </div>
                      <input
                        name="profileImage"
                        value={formData.profileImage}
                        onChange={handleInputChange}
                        type="text"
                        placeholder="Profile Image URL (Optional)"
                        className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* --- LOGIN FIELDS (Only show email here if Login mode) --- */}
              {isLogin && (
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className={`h-5 w-5 transition-colors ${focusedInput === 'email' ? 'text-emerald-400' : 'text-emerald-300/50'}`} />
                  </div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    type="email"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder="Email address"
                    className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70"
                  />
                </div>
              )}

              {/* --- PASSWORD FIELDS (Shared but Layout Changes) --- */}
              <div className={`grid gap-4 ${!isLogin ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'}`}>
                
                {/* Password */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className={`h-5 w-5 transition-colors ${focusedInput === 'password' ? 'text-emerald-400' : 'text-emerald-300/50'}`} />
                  </div>
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type={showPassword ? 'text' : 'password'}
                    onFocus={() => setFocusedInput('password')}
                    onBlur={() => setFocusedInput(null)}
                    placeholder={!isLogin ? "Password (Min 6 chars)" : "Password"}
                    className="block w-full pl-11 pr-12 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Confirm Password (Signup Only) */}
                {!isLogin && (
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-emerald-300/70" />
                    </div>
                    <input
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      type="password"
                      placeholder="Confirm Password"
                      className="block w-full pl-11 pr-4 py-3.5 bg-slate-900/50 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all hover:bg-slate-900/70"
                    />
                  </div>
                )}
              </div>

              {/* Forgot Password Link */}
              {isLogin && (
                <div className="flex justify-end">
                  <a href="#" className="text-xs font-medium text-emerald-300 hover:text-emerald-200 transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Action Button */}
              <motion.button
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate('/dashboard')}
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all relative overflow-hidden group mt-4"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              </motion.button>
            </div>

            {/* Switch Mode */}
            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                {isLogin ? "New to PropertyHub? " : "Already have an account? "}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-white font-semibold hover:text-emerald-300 transition-colors underline decoration-emerald-500/30 underline-offset-4"
                >
                  {isLogin ? "Create Account" : "Sign In"}
                </button>
              </p>
            </div>

          </div>
          
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 opacity-80"></div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center gap-6 text-slate-400/60 text-xs font-medium"
        >
          <div className="flex items-center gap-1.5"><CheckCircle2 size={14} /> Enterprise Security</div>
          <div className="flex items-center gap-1.5"><Sparkles size={14} /> AI Powered</div>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default AuthPage;