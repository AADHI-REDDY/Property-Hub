import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building2,
  ArrowRight,
  Mail,
  Eye,
  EyeOff,
  CheckCircle2,
  Sparkles,
  Loader2,
  ArrowLeft,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiForgotPassword } from '../services/api';

const AuthPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Modes: 'login' | 'signup' | 'forgot'
  const [authMode, setAuthMode] = useState('login'); 
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'TENANT',
    profileImage: '',
    password: '',
    confirmPassword: '',
  });

  // Parallax background effect
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccessMessage('');
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      // 1. FORGOT PASSWORD LOGIC
      if (authMode === 'forgot') {
        if (!formData.email) throw new Error("Please enter your email");
        
        await apiForgotPassword(formData.email);
        setSuccessMessage("If an account exists, a reset link has been sent to your email.");
        setIsLoading(false);
        return; 
      }

      // 2. SIGNUP VALIDATION
      if (authMode === 'signup') {
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters');
        }
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match');
        }
      }

      // 3. LOGIN / SIGNUP EXECUTION
      if (authMode === 'login') {
        await login({ email: formData.email, password: formData.password });
        navigate('/dashboard');
      } else if (authMode === 'signup') {
        const response = await fetch('http://localhost:8081/api/auth/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              role: formData.role,
              profileImage: formData.profileImage,
              password: formData.password,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Signup failed');

        await login({ email: formData.email, password: formData.password });
        navigate('/dashboard');
      }

    } catch (err: any) {
      console.error('Auth Error:', err);
      // Prioritize backend message
      const backendMessage = err.response?.data?.message;
      const genericMessage = err.message || 'Authentication failed';
      setError(backendMessage || genericMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center bg-slate-900 py-10">
      {/* Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{
            scale: [1.1, 1.15, 1.1],
            x: mousePosition.x * -1,
            y: mousePosition.y * -1,
          }}
          transition={{
            scale: { duration: 20, repeat: Infinity },
            x: { type: 'tween', ease: 'linear' },
            y: { type: 'tween', ease: 'linear' },
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab"
            className="w-full h-full object-cover"
            alt="Background"
          />
        </motion.div>
        <div className="absolute inset-0 bg-slate-900/80" />
      </div>

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-[520px] px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-xl bg-emerald-500 mb-4">
              <Building2 className="text-white" size={28} />
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div
                key={authMode}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-2xl font-bold text-white">
                  {authMode === 'login' && 'Welcome Back'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                </h1>
                <p className="text-slate-300 text-sm mt-1">
                  {authMode === 'login' && 'Access your dashboard'}
                  {authMode === 'signup' && 'Join our property management platform'}
                  {authMode === 'forgot' && 'Enter your email to receive a reset link'}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Messages */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 overflow-hidden"
              >
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-300 text-xs text-center font-medium">
                  {error}
                </div>
              </motion.div>
            )}
            {successMessage && (
               <motion.div 
               initial={{ opacity: 0, height: 0 }} 
               animate={{ opacity: 1, height: 'auto' }} 
               exit={{ opacity: 0, height: 0 }}
               className="mb-4 overflow-hidden"
             >
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-green-300 text-xs text-center font-medium">
                  {successMessage}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleAuth} className="space-y-4">
            
            {/* 1. SIGNUP DETAILS (Name, Phone, Role, Image) */}
            {/* ✅ FIXED: Added 'p-1' to prevent clipping of focus border */}
            <AnimatePresence>
              {authMode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 overflow-hidden p-1" 
                >
                  <input name="name" placeholder="Full Name" value={formData.name} onChange={handleInputChange} className="input-field" />
                  <div className="grid grid-cols-2 gap-4">
                    <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleInputChange} className="input-field" />
                    <select name="role" value={formData.role} onChange={handleInputChange} className="input-field">
                      <option value="TENANT">Tenant</option>
                      <option value="LANDLORD">Landlord</option>
                    </select>
                  </div>
                  <input name="profileImage" placeholder="Profile Image URL (optional)" value={formData.profileImage} onChange={handleInputChange} className="input-field" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* 2. EMAIL (Always visible) */}
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="input-field"
            />

            {/* 3. PASSWORD (Visible in Login & Signup, Hidden in Forgot) */}
            {/* ✅ FIXED: Added 'p-1' to prevent clipping of focus border */}
            <AnimatePresence>
            {authMode !== 'forgot' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden p-1"
              >
                <div className="relative pt-1"> 
                  <input
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required={authMode !== 'forgot'} 
                    className="input-field pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 mt-0.5 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>

            {/* 4. CONFIRM PASSWORD (Only for Signup, at the bottom) */}
            {/* ✅ FIXED: Added 'p-1' here too */}
            <AnimatePresence>
              {authMode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden p-1"
                >
                  <input 
                    name="confirmPassword" 
                    type="password" 
                    placeholder="Confirm Password" 
                    value={formData.confirmPassword} 
                    onChange={handleInputChange} 
                    className="input-field" 
                  /> 
                </motion.div>
              )}
            </AnimatePresence>

            {/* Forgot Password Link (Only in Login) */}
            <AnimatePresence>
            {authMode === 'login' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex justify-end overflow-hidden p-1" // Added p-1 just in case
              >
                <button 
                  type="button"
                  onClick={() => { setAuthMode('forgot'); setError(''); setSuccessMessage(''); }}
                  className="text-emerald-400 text-xs hover:text-emerald-300 transition-colors pt-1"
                >
                  Forgot Password?
                </button>
              </motion.div>
            )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl flex justify-center gap-2 transition-all active:scale-95"
            >
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <>
                  {authMode === 'login' && 'Sign In'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Send Reset Link'}
                  {authMode !== 'forgot' && <ArrowRight size={18} />}
                </>
              )}
            </button>
          </form>

          {/* Back to Sign In (Only in Forgot) */}
          <AnimatePresence>
            {authMode === 'forgot' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <button
                  onClick={() => { setAuthMode('login'); setError(''); setSuccessMessage(''); }}
                  className="w-full mt-4 text-slate-400 text-sm flex items-center justify-center gap-2 hover:text-white transition-colors"
                >
                  <ArrowLeft size={14} /> Back to Sign In
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Login/Signup */}
          <AnimatePresence>
          {authMode !== 'forgot' && (
             <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
             >
                <p className="text-center text-sm text-slate-400 mt-6">
                  {authMode === 'login' ? 'New to PropertyHub?' : 'Already have an account?'}{' '}
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}
                    className="text-white underline"
                  >
                    {authMode === 'login' ? 'Create Account' : 'Sign In'}
                  </button>
                </p>
            </motion.div>
          )}
          </AnimatePresence>
        </div>

        <div className="mt-6 flex justify-center gap-6 text-slate-400 text-xs">
          <span className="flex gap-1 items-center"><CheckCircle2 size={14} /> Enterprise Security</span>
          <span className="flex gap-1 items-center"><Sparkles size={14} /> Reddy Powered</span>
        </div>
      </motion.div>

      <style>{`
        .input-field {
          width: 100%;
          padding: 0.875rem 1rem;
          background: rgba(15, 23, 42, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 0.75rem;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AuthPage;