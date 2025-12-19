// src/components/auth/LoginForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; 
import { Mail, Lock, Eye, EyeOff, Loader2, ArrowRight, AlertCircle } from 'lucide-react'; 
import { useAuth } from '../../context/AuthContext';
import { LoginPayload } from '../../types';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  // ... (Keep your existing state: formData, showPassword, error, etc.) ...
  const [formData, setFormData] = useState<LoginPayload>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ... (Keep your existing submit logic) ...
    try { await login(formData); } catch (err: any) { setError('Invalid credentials'); }
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Welcome Back</h2>
        <p className="text-stone-500 mt-2">Please enter your details to sign in.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 text-sm flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" /> {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Inputs with Teal Focus */}
        <div className="space-y-1">
          <label className="text-sm font-semibold text-stone-700">Email</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
            <input
              type="email" name="email" required
              value={formData.email} onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
              placeholder="name@company.com"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold text-stone-700">Password</label>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
            <input
              type={showPassword ? 'text' : 'password'} name="password" required
              value={formData.password} onChange={handleChange}
              className="w-full pl-10 pr-12 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
              placeholder="••••••••"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-stone-400 hover:text-stone-600">
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div className="flex justify-end pt-1">
             <button type="button" className="text-xs font-medium text-teal-700 hover:text-teal-800 hover:underline">Forgot password?</button>
          </div>
        </div>

        {/* Teal Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-3.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-lg shadow-teal-700/20 transition-all"
        >
          {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <span className="flex items-center gap-2">Sign In <ArrowRight className="w-4 h-4" /></span>}
        </motion.button>
      </form>

      <div className="mt-8 text-center border-t border-stone-200 pt-6">
        <p className="text-sm text-stone-500">
          Don't have an account? <button onClick={onToggleForm} className="font-bold text-teal-700 hover:text-teal-800 transition-colors">Create Account</button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;