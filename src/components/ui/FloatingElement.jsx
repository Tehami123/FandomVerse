import { motion } from 'motion/react';

export function FloatingElement({ children, className, delay = 0, yOffset = 15, duration = 4 }) {
  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
