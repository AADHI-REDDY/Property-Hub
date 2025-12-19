// src/components/auth/SignupForm.tsx

import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { 
  User, Mail, Lock, Eye, EyeOff, Phone, 
  Building, Image as ImageIcon, Loader2, ArrowRight, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SignupFormProps {
  onToggleForm: () => void;
}

const SignupForm: React.FC<SignupFormProps> = ({ onToggleForm }) => {
  // --- EXISTING LOGIC ---
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'tenant' as 'landlord' | 'tenant',
    phone: '',
    profileImage: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { signup, loading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validations
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    // Payload Construction
    const signupPayload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone || '',
      profileImage: formData.profileImage || '',
      roles: [`ROLE_${formData.role.toUpperCase()}`] 
    };

    try {
      await signup(signupPayload);
    } catch (err: any) {
      console.error("Signup error details:", err);
      const errorMessage = err.response?.data?.message || 'Failed to create account.';
      setError(errorMessage);
    }
  };

  // --- ANIMATION VARIANTS (Teal Theme) ---
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.05 } 
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 }, 
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-stone-900 tracking-tight">Create Account</h2>
        <p className="text-stone-500 mt-2">Join our property management platform.</p>
      </div>

      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Error Message */}
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 text-sm flex items-center gap-2 rounded-r-md"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full Name */}
        <motion.div variants={itemVariants} className="space-y-1">
          <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wide">Full Name</label>
          <div className="relative group">
            <User className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
              placeholder="John Doe"
            />
          </div>
        </motion.div>

        {/* Email */}
        <motion.div variants={itemVariants} className="space-y-1">
          <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wide">Email Address</label>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
              placeholder="john@example.com"
            />
          </div>
        </motion.div>

        {/* Grid for Phone and Role */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phone */}
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wide">Phone</label>
            <div className="relative group">
              <Phone className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
                placeholder="(555) 000-0000"
              />
            </div>
          </motion.div>

          {/* Role */}
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wide">Account Type</label>
            <div className="relative group">
              <Building className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="tenant">Tenant</option>
                <option value="landlord">Landlord</option>
              </select>
              {/* Custom Arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <svg className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Profile Image URL */}
        <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wide">Profile Image <span className="text-stone-300 font-normal lowercase">(optional)</span></label>
            <div className="relative group">
              <ImageIcon className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
              <input
                type="url"
                name="profileImage"
                value={formData.profileImage}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
                placeholder="https://..."
              />
            </div>
        </motion.div>

        {/* Passwords Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wide">Password</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
                placeholder="Min 6 chars"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-teal-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1">
            <label className="text-xs font-bold text-stone-500 ml-1 uppercase tracking-wide">Confirm</label>
            <div className="relative group">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-stone-400 group-focus-within:text-teal-600 transition-colors" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-10 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-600 transition-all outline-none"
                placeholder="Confirm"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-stone-400 hover:text-teal-600 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        </div>

        {/* Submit Button */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center py-3.5 px-4 bg-teal-700 hover:bg-teal-800 text-white rounded-xl font-bold shadow-lg shadow-teal-700/20 transition-all mt-4"
        >
          {loading ? (
            <Loader2 className="animate-spin h-5 w-5" />
          ) : (
            <>
              Create Account
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </motion.button>

        {/* Login Toggle */}
        <motion.div variants={itemVariants} className="mt-8 text-center border-t border-stone-200 pt-6">
          <p className="text-sm text-stone-500">
            Already have an account?{' '}
            <button
              type="button"
              onClick={onToggleForm}
              className="font-bold text-teal-700 hover:text-teal-800 transition-colors"
            >
              Sign in
            </button>
          </p>
        </motion.div>
      </motion.form>
    </div>
  );
};

export default SignupForm;