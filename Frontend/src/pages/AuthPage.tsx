import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, ArrowRight, Mail, Lock, Eye, EyeOff, 
  Sparkles, User, CheckCircle2, Loader2 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 

const AuthPage = () => {
  const { login } = useAuth(); 
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Mouse move effect for parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    setError(''); 
  };

  // --- AUTH LOGIC WITH DEMO MODE ---
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 🚀 DEMO MODE BYPASS
    if (formData.email === 'demo@property.com' && formData.password === 'demo123') {
      setTimeout(() => {
        // Manually set fake tokens so the app thinks we are logged in
        localStorage.setItem('authToken', 'demo-token-123');
        localStorage.setItem('user', JSON.stringify({
          id: 'demo-user',
          name: 'Demo Admin',
          email: 'demo@property.com',
          role: 'landlord' // You can change this to 'tenant' to test tenant view
        }));
        
        setIsLoading(false);
        // Force a reload to ensure AuthContext picks up the new "token"
        window.location.href = '/dashboard'; 
      }, 1000);
      return;
    }

    try {
      if (isLogin) {
        // Real Login
        await login({
          email: formData.email,
          password: formData.password,
        });
        navigate('/dashboard');
      } else {
        // Real Signup
        setError("Registration requires backend connection.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center font-sans bg-slate-900 py-10">
      
      {/* Background Layers */}
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
      </div>

      {/* Main Card */}
      <motion.div 
        layout 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className={`relative z-10 w-full px-6 transition-all duration-500 ${isLogin ? 'max-w-[480px]' : 'max-w-[600px]'}`}
      >
        <div className="bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-3xl overflow-hidden relative group">
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent opacity-50"></div>

          <div className="p-8 md:p-10 relative">
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

            {/* DEMO CREDENTIALS HINT */}
            <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-200 text-xs text-center">
              <span className="font-bold">Demo Mode Available:</span><br/>
              Email: <code>demo@property.com</code> | Pass: <code>demo123</code>
            </div>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-200 text-xs text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="space-y-4 overflow-hidden"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>

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

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-emerald-300/70" />
                </div>
                <input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
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

              <motion.button
                layout
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                type="submit"
                className="w-full py-4 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all relative overflow-hidden group mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <>
                    <span className="relative z-10 flex items-center gap-2">
                      {isLogin ? 'Sign In' : 'Create Account'} <ArrowRight size={18} />
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-slate-400 text-sm">
                {isLogin ? "New to PropertyHub? " : "Already have an account? "}
                <button 
                  type="button"
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
          <div className="flex items-center gap-1.5"><Sparkles size={14} /> Reddy Powered</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;