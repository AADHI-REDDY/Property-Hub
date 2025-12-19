import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { 
  Building2, ArrowRight, CheckCircle2, 
  BarChart3, Users, Shield, Wallet, Layout, 
  ChevronLeft, ChevronRight
} from 'lucide-react';

// Import Premium UI Components
import AuroraBackground from '../components/premium-ui/AuroraBackground';
import FluidCursor from '../components/premium-ui/FluidCursor';
import RevealSection from '../components/premium-ui/RevealSection';
import { MagneticButton, GlassCard } from '../components/premium-ui/InteractiveElements';
import PillNav from '../components/premium-ui/PillNav';
import { StaggeredReveal, FadeUpText } from '../components/premium-ui/TextAnimations';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const navItems = [
    { label: 'Features', href: '#features' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Pricing', href: '#pricing' },
  ];

  const navVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-900 relative overflow-hidden">
      
      {/* --- PREMIUM VIBRANT BACKGROUND --- */}
      <AuroraBackground />
      <FluidCursor />
      
      {/* --- NAVBAR --- */}
      <motion.nav 
        initial="hidden"
        animate="visible"
        variants={navVariants}
        className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-lg border-b border-white/20 supports-[backdrop-filter]:bg-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between relative">
          
          {/* Logo */}
          <div className="flex items-center gap-2 z-20">
            <div className="bg-teal-700 p-2 rounded-lg shadow-sm">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">PropertyHub</span>
          </div>

          {/* Center Nav */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-5 z-10 [&_.pill-logo]:hidden">
             <PillNav 
                logo={null} 
                items={navItems}
                baseColor="#ffffff"       
                pillColor="transparent"   
                sliderColor="#0f766e"     
                pillTextColor="#44403c"   
                hoveredPillTextColor="#ffffff" 
                initialLoadAnimation={true}
             />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3 z-20">
             <Link 
              to="/auth" 
              className="text-stone-600 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-stone-100 hover:text-teal-700 transition-all duration-200"
            >
              Login
            </Link>
            
            <MagneticButton onClick={() => navigate('/auth')}>
                <span className="bg-teal-700 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-teal-800 transition-all shadow-lg shadow-teal-700/20 block border border-transparent hover:border-teal-600">
                  Get Started
                </span>
            </MagneticButton>
          </div>
        </div>
      </motion.nav>

      {/* --- HERO SECTION --- */}
      <RevealSection className="pt-48 pb-10 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            
            {/* Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-md border border-stone-200/50 rounded-full px-4 py-1.5 mb-8 shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse"></span>
              <span className="text-sm font-semibold text-stone-600">New: Maintenance Tracking 2.0</span>
            </motion.div>
            
            {/* Headline */}
            <div className="mb-6">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-stone-900 leading-tight drop-shadow-sm">
                    <StaggeredReveal text="Property Management" delay={0.4} />
                    <div className="block mt-2"> 
                      <motion.span
                        initial={{ opacity: 0, y: 20, filter: 'blur(10px)', scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                        transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                        className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 animate-gradient-x pb-2"
                      >
                        Simplified.
                      </motion.span>
                    </div>
                </h1>
            </div>
            
            {/* Subtext */}
            <FadeUpText 
                text="The all-in-one platform for landlords and property managers. Streamline rent collection, maintenance, and tenant communication."
                className="text-xl text-stone-600 mb-10 max-w-2xl mx-auto leading-relaxed"
                delay={1.0}
            />
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 z-20 relative">
              <MagneticButton onClick={() => navigate('/auth')} className="w-full sm:w-auto">
                 <span className="w-full sm:w-auto px-8 py-4 bg-teal-700 text-white rounded-full font-bold text-lg hover:bg-teal-800 transition-all shadow-xl shadow-teal-700/30 flex items-center justify-center gap-2">
                    Start Free Trial <ArrowRight className="w-5 h-5" />
                 </span>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <span className="block w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm text-stone-700 border border-stone-200/50 rounded-full font-bold text-lg hover:bg-white transition-all shadow-sm">
                    View Demo
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* --- 3D PROPERTY CAROUSEL (Scale/Blur Effect) --- */}
          <div className="mt-20 relative mx-auto max-w-7xl z-10 h-[500px] flex items-center justify-center">
             <PropertyCarousel />
             {/* Glow Behind */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-teal-500/20 blur-3xl -z-10 rounded-[100px] opacity-50"></div>
          </div>

        </div>
      </RevealSection>

      {/* --- SOCIAL PROOF LOGOS --- */}
      <div className="py-10 border-y border-stone-200/50 bg-white/30 backdrop-blur-sm relative z-10">
        <div className="max-w-7xl mx-auto px-6 text-center">
            <p className="text-sm font-semibold text-stone-500 uppercase tracking-widest mb-8">Trusted by 500+ Property Managers</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 text-xl font-bold text-stone-800"><Building2 className="h-6 w-6" /> EstateFlow</div>
                <div className="flex items-center gap-2 text-xl font-bold text-stone-800"><Shield className="h-6 w-6" /> SecureHome</div>
                <div className="flex items-center gap-2 text-xl font-bold text-stone-800"><Users className="h-6 w-6" /> TenantLoop</div>
                <div className="flex items-center gap-2 text-xl font-bold text-stone-800"><BarChart3 className="h-6 w-6" /> PropScale</div>
            </div>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <RevealSection id="features" className="py-32 relative z-10" delay={0.2}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-stone-900 mb-6">Streamline buying, selling, and property repairs.</h2>
            <p className="text-xl text-stone-500 max-w-3xl mx-auto">Powerful tools built for modern property management, wrapped in a beautiful interface.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCardGlass icon={Wallet} title="Automated Payments" desc="Collect rent automatically. Send invoices, track arrears, and handle deposits securely." />
            <FeatureCardGlass icon={Users} title="Tenant Screening" desc="Find the perfect tenants with integrated background checks and credit reports." />
            <FeatureCardGlass icon={Shield} title="Maintenance Hub" desc="Tenants report issues instantly. Assign contractors and track progress in real-time." />
            <FeatureCardGlass icon={BarChart3} title="Financial Reporting" desc="Generate tax-ready reports, profit & loss statements, and occupancy analytics." />
            <FeatureCardGlass icon={CheckCircle2} title="Digital Leases" desc="Create, sign, and store legally binding lease agreements completely online." />
            <FeatureCardGlass icon={Building2} title="Multi-Unit Management" desc="Scale from 1 unit to 1,000 without changing your workflow. Built for growth." />
          </div>
        </div>
      </RevealSection>

      {/* --- CTA BOTTOM --- */}
      <RevealSection className="py-32 px-6 relative z-10" delay={0.3}>
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-teal-900 to-emerald-950 rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-2xl shadow-teal-900/30">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-teal-500/30 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">Ready to streamline your properties?</h2>
            <p className="text-teal-100 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">Join thousands of landlords who save an average of 15 hours per month with PropertyHub.</p>
             <MagneticButton onClick={() => navigate('/auth')}>
                <span className="inline-block px-12 py-5 bg-white text-teal-950 rounded-full font-bold text-xl hover:bg-stone-100 transition-all shadow-xl hover:shadow-white/20 text-teal-900">
                Get Started for Free
                </span>
            </MagneticButton>
          </div>
        </div>
      </RevealSection>

      <footer className="bg-white/40 backdrop-blur-lg pt-20 pb-10 border-t border-white/40 relative z-10 font-medium">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-teal-700 p-2 rounded-lg">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">PropertyHub</span>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed pr-4">Making property management effortless, beautiful, and efficient since 2025.</p>
            </div>
            {/* Footer columns... */}
            <div><h4 className="font-bold text-stone-900 mb-6">Product</h4><ul className="space-y-4 text-sm text-stone-600"><li><a href="#" className="hover:text-teal-700">Features</a></li><li><a href="#" className="hover:text-teal-700">Pricing</a></li></ul></div>
            <div><h4 className="font-bold text-stone-900 mb-6">Company</h4><ul className="space-y-4 text-sm text-stone-600"><li><a href="#" className="hover:text-teal-700">About Us</a></li><li><a href="#" className="hover:text-teal-700">Contact</a></li></ul></div>
            <div><h4 className="font-bold text-stone-900 mb-6">Legal</h4><ul className="space-y-4 text-sm text-stone-600"><li><a href="#" className="hover:text-teal-700">Privacy</a></li><li><a href="#" className="hover:text-teal-700">Terms</a></li></ul></div>
          </div>
          <div className="text-center pt-8 border-t border-stone-200/50 text-sm text-stone-500">© 2025 PropertyHub Inc. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
};

// --- 3D PROPERTY CAROUSEL COMPONENT ---
// Implements the "Center Focus" logic: Center is big/clear, sides are small/blurred
const PropertyCarousel = () => {
    const images = [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Modern House
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Luxury Villa
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Apartment
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80", // Interior
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"  // Pool House
    ];

    const [position, setPosition] = useState(0);

    const onNext = () => {
        setPosition((prev) => (prev + 1) % images.length);
    };

    const onPrev = () => {
        setPosition((prev) => (prev - 1 + images.length) % images.length);
    };

    // Auto-play Effect
    useEffect(() => {
        const timer = setInterval(onNext, 4000); // Change slide every 4 seconds
        return () => clearInterval(timer);
    }, []);

    // Helper to calculate indexes cyclically
    const getIndex = (i: number) => {
        let index = i;
        if (index < 0) index += images.length;
        if (index >= images.length) index -= images.length;
        return index;
    };

    return (
        <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center perspective-1000">
            {images.map((img, i) => {
                // Determine the state of this image relative to the active position
                let status = "hidden"; 
                if (i === position) status = "center";
                else if (i === getIndex(position - 1)) status = "left";
                else if (i === getIndex(position + 1)) status = "right";

                // Animation Variants
                const variants = {
                    center: { 
                        x: "0%", 
                        scale: 1, 
                        zIndex: 10, 
                        opacity: 1, 
                        filter: "blur(0px)",
                        rotateY: 0
                    },
                    left: { 
                        x: "-60%", 
                        scale: 0.8, 
                        zIndex: 5, 
                        opacity: 0.7, 
                        filter: "blur(4px)",
                        rotateY: 15 // Slight tilt for 3D effect
                    },
                    right: { 
                        x: "60%", 
                        scale: 0.8, 
                        zIndex: 5, 
                        opacity: 0.7, 
                        filter: "blur(4px)",
                        rotateY: -15 // Slight tilt
                    },
                    hidden: { 
                        x: "0%", 
                        scale: 0.5, 
                        zIndex: 0, 
                        opacity: 0, 
                        filter: "blur(10px)",
                        rotateY: 0
                    }
                };

                return (
                    <motion.div
                        key={i}
                        initial={false}
                        animate={status}
                        variants={variants}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }} // Elegant easing
                        className="absolute w-[70%] md:w-[50%] aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border-4 border-white/40 bg-stone-100"
                        style={{
                           // Center item gets a bigger shadow
                           boxShadow: status === 'center' ? '0 25px 50px -12px rgba(0, 0, 0, 0.5)' : 'none'
                        }}
                    >
                        <img 
                            src={img} 
                            alt="Property" 
                            className="w-full h-full object-cover"
                        />
                        {/* Darken side images slightly */}
                        {status !== 'center' && <div className="absolute inset-0 bg-black/20" />}
                    </motion.div>
                );
            })}

            {/* Navigation Arrows */}
            <button 
                onClick={onPrev}
                className="absolute left-4 md:left-20 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all text-stone-700 hover:scale-110 active:scale-95"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
                onClick={onNext}
                className="absolute right-4 md:right-20 z-20 w-12 h-12 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center shadow-lg hover:bg-white transition-all text-stone-700 hover:scale-110 active:scale-95"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
        </div>
    );
};

const FeatureCardGlass = ({ icon: Icon, title, desc }: any) => (
  <GlassCard className="p-8 group">
    <div className="w-14 h-14 bg-stone-50/80 border border-stone-200/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:border-teal-600 transition-all duration-300 shadow-sm group-hover:shadow-teal-600/30 group-hover:scale-110 group-hover:-rotate-3">
      <Icon className="w-7 h-7 text-stone-600 group-hover:text-white transition-colors duration-300" />
    </div>
    <h3 className="text-xl font-bold text-stone-900 mb-4">{title}</h3>
    <p className="text-stone-600 leading-relaxed">{desc}</p>
  </GlassCard>
);

export default LandingPage;