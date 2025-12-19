import React, { useRef } from 'react';
import { motion, useInView, HTMLMotionProps } from 'framer-motion';

// Extend HTMLMotionProps to allow standard div attributes like id, onClick, etc.
interface Props extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const RevealSection: React.FC<Props> = ({ children, delay = 0, className = "", ...props }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
      {...props} // This spreads 'id' and other props to the div
    >
      {children}
    </motion.div>
  );
};

export default RevealSection;