// src/components/premium-ui/FluidCursor.tsx
import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const FluidCursor: React.FC = () => {
  // FIX: Removed the space in the variable name below (was 'cursor X')
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Use springs for smooth trailing effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    // Only activate on non-touch devices
    if (window.matchMedia("(pointer: fine)").matches) {
        window.addEventListener('mousemove', moveCursor);
    }

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  // Hide on touch devices entirely
  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return (
    <>
      {/* The main trailing follower */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-teal-500/20 rounded-full pointer-events-none z-[100] backdrop-blur-[1px] border border-teal-500/30"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          marginLeft: -16, // Center the div on the mouse tip
          marginTop: -16,
        }}
      />
      {/* The small center dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-teal-600 rounded-full pointer-events-none z-[101]"
        style={{
            translateX: cursorX,
            translateY: cursorY,
            marginLeft: -4,
            marginTop: -4,
        }}
      />
    </>
  );
};

export default FluidCursor;