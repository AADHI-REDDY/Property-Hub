import React from 'react';

const AuroraBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10 bg-white">
      
      {/* 1. MAIN COLOR CURVES (The "Bends") */}
      <div className="absolute inset-0 opacity-80">
        {/* Layer 1: Teal/Cyan Flow */}
        <div 
          className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full mix-blend-multiply filter blur-[80px] animate-aurora-1"
          style={{ background: 'radial-gradient(circle, #2dd4bf 0%, rgba(45, 212, 191, 0) 70%)' }} 
        />
        
        {/* Layer 2: Deep Blue Flow (Adds contrast) */}
        <div 
          className="absolute top-[20%] -right-[10%] w-[60%] h-[80%] rounded-full mix-blend-multiply filter blur-[80px] animate-aurora-2"
          style={{ background: 'radial-gradient(circle, #60a5fa 0%, rgba(96, 165, 250, 0) 70%)' }} 
        />
        
        {/* Layer 3: Emerald/Lime Flow (Bottom accent) */}
        <div 
          className="absolute -bottom-[20%] left-[20%] w-[80%] h-[60%] rounded-full mix-blend-multiply filter blur-[80px] animate-aurora-3"
          style={{ background: 'radial-gradient(circle, #34d399 0%, rgba(52, 211, 153, 0) 70%)' }} 
        />
      </div>

      {/* 2. NOISE TEXTURE (Essential for the "SaaS" look) */}
      <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay bg-repeat"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
      </div>

      {/* 3. WHITE FADE OVERLAY (Keeps text readable) */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/50 to-white/90"></div>
    </div>
  );
};

export default AuroraBackground;