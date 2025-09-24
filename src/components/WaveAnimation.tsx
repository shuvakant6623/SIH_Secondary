import { motion } from 'framer-motion';

export function WaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
      <svg
        viewBox="0 0 1200 200"
        className="w-full h-40"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(6, 182, 212, 0.4)" />
            <stop offset="50%" stopColor="rgba(14, 116, 144, 0.3)" />
            <stop offset="100%" stopColor="rgba(8, 145, 178, 0.2)" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 184, 166, 0.3)" />
            <stop offset="100%" stopColor="rgba(13, 148, 136, 0.2)" />
          </linearGradient>
          <linearGradient id="waveGradient3" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.25)" />
            <stop offset="100%" stopColor="rgba(21, 128, 61, 0.15)" />
          </linearGradient>
          <linearGradient id="waveGradient4" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
            <stop offset="100%" stopColor="rgba(37, 99, 235, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 - Deep Ocean */}
        <motion.path
          d="M0,80 C300,130 600,30 900,80 C1050,105 1150,55 1200,80 L1200,200 L0,200 Z"
          fill="url(#waveGradient1)"
          initial={{ x: -1200 }}
          animate={{ x: 0 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Wave 2 - Mid Ocean */}
        <motion.path
          d="M0,100 C300,50 600,150 900,100 C1050,75 1150,125 1200,100 L1200,200 L0,200 Z"
          fill="url(#waveGradient2)"
          initial={{ x: -1200 }}
          animate={{ x: 0 }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            delay: 2
          }}
        />
        
        {/* Wave 3 - Coastal */}
        <motion.path
          d="M0,120 C300,170 600,70 900,120 C1050,95 1150,145 1200,120 L1200,200 L0,200 Z"
          fill="url(#waveGradient3)"
          initial={{ x: -1200 }}
          animate={{ x: 0 }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
            delay: 4
          }}
        />

        {/* Wave 4 - Shore */}
        <motion.path
          d="M0,140 C300,190 600,90 900,140 C1050,115 1150,165 1200,140 L1200,200 L0,200 Z"
          fill="url(#waveGradient4)"
          initial={{ x: -1200 }}
          animate={{ x: 0 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: 6
          }}
        />

        {/* Foam Effect */}
        <motion.path
          d="M0,160 C200,180 400,140 600,160 C800,180 1000,140 1200,160 L1200,200 L0,200 Z"
          fill="rgba(255, 255, 255, 0.3)"
          initial={{ x: -1200 }}
          animate={{ x: 0 }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
            delay: 1
          }}
        />
      </svg>
    </div>
  );
}