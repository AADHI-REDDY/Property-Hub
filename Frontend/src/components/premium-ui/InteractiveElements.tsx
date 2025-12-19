import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';

// --- Magnetic Button ---
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className, onClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Max movement distance (20px)
    setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
        ref={ref}
        onMouseMove={handleMouse}
        onMouseLeave={reset}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={classNames("relative cursor-pointer", className)}
        onClick={onClick}
        whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  );
};


// --- Glassmorphism Card ---
interface GlassCardProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className }) => {
    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.01 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={classNames(
                // Base styles
                "relative overflow-hidden p-8 rounded-3xl transition-all duration-300 group",
                // Glassmorphism styles
                "bg-white/60 backdrop-blur-md border border-white/40 shadow-xl shadow-stone-200/40",
                // Hover state
                "hover:shadow-2xl hover:shadow-teal-900/10 hover:border-teal-100/50 hover:bg-white/80",
                className
            )}
        >
            {/* Subtle gradient reflection overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10"></div>
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}