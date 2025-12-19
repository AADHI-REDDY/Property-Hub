// src/components/premium-ui/TextAnimations.tsx
import React from 'react';
import { motion, Variants } from 'framer-motion';

interface TextProps {
  text: string;
  className?: string;
  delay?: number;
}

// 1. Staggered Word Reveal (For Headlines)
export const StaggeredReveal: React.FC<TextProps> = ({ text, className, delay = 0 }) => {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay }
    }
  };

  const child: Variants = {
    hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.25em' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {words.map((word, index) => (
        <motion.span variants={child} key={index}>
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// 2. Simple Fade Up (For Subtext/Paragraphs)
export const FadeUpText: React.FC<TextProps> = ({ text, className, delay = 0 }) => {
    return (
        <motion.p
            initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }} // Custom "apple-like" ease
            className={className}
        >
            {text}
        </motion.p>
    )
}