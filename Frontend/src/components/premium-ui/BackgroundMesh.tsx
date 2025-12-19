import React from 'react';

const BackgroundMesh: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none -z-10 bg-stone-50">
      
      {/* 1. PROFESSIONAL DOT GRID PATTERN */}
      {/* This creates a precise, engineering-style background */}
      <div className="absolute inset-0" 
           style={{
             backgroundImage: `radial-gradient(#cbd5e1 1.5px, transparent 1.5px)`, // Slate-300 dots
             backgroundSize: '40px 40px', // Distance between dots
             opacity: 0.4
           }}>
      </div>
      
      {/* 2. AMBIENT GRADIENT BLOBS (Your Teal Theme) */}
      {/* Moving Shape 1: Top Left Teal */}
      <div 
        className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[128px] opacity-40 animate-blob"
        style={{ backgroundColor: '#5eead4' }} // teal-300
      ></div>
      
      {/* Moving Shape 2: Top Right Emerald */}
      <div 
        className="absolute top-0 -right-20 w-[500px] h-[500px] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-2000"
        style={{ backgroundColor: '#6ee7b7' }} // emerald-300
      ></div>
      
      {/* Moving Shape 3: Bottom Center Blue (For depth) */}
      <div 
        className="absolute -bottom-64 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full mix-blend-multiply filter blur-[128px] opacity-30 animate-blob animation-delay-4000"
        style={{ backgroundColor: '#bae6fd' }} // sky-200
      ></div>

      {/* 3. NOISE TEXTURE OVERLAY */}
      {/* Adds a high-end matte finish that prevents color banding */}
      <div 
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{ 
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` 
        }}
      ></div>

      {/* 4. VIGNETTE FADE */}
      {/* Softens the edges of the screen */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-stone-50/80"></div>
    </div>
  );
};

export default BackgroundMesh;