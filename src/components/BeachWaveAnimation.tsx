import { motion } from 'framer-motion';

export function BeachWaveAnimation() {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden pointer-events-none">
      {/* Sand base */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-amber-100 to-amber-50 opacity-80"></div>
      
      {/* Multiple wave layers for depth */}
      <svg 
        className="absolute bottom-0 left-0 w-full h-32" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(59, 130, 246, 0.3))' }}
      >
        {/* Back wave layer */}
        <motion.path
          d="M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
          fill="url(#waveGradient1)"
          animate={{
            d: [
              "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z",
              "M0,70 C200,30 400,110 600,70 C800,30 1000,110 1200,70 L1200,120 L0,120 Z",
              "M0,60 C200,100 400,20 600,60 C800,100 1000,20 1200,60 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
        
        {/* Middle wave layer */}
        <motion.path
          d="M0,80 C300,40 600,120 900,80 C1050,60 1150,100 1200,80 L1200,120 L0,120 Z"
          fill="url(#waveGradient2)"
          animate={{
            d: [
              "M0,80 C300,40 600,120 900,80 C1050,60 1150,100 1200,80 L1200,120 L0,120 Z",
              "M0,90 C300,130 600,50 900,90 C1050,110 1150,70 1200,90 L1200,120 L0,120 Z",
              "M0,80 C300,40 600,120 900,80 C1050,60 1150,100 1200,80 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 5.5,
            repeat: Infinity,
            ease: [0.65, 0, 0.35, 1],
            delay: 0.8
          }}
        />
        
        {/* Front foam wave */}
        <motion.path
          d="M0,100 C400,60 800,140 1200,100 L1200,120 L0,120 Z"
          fill="url(#foamGradient)"
          animate={{
            d: [
              "M0,100 C400,60 800,140 1200,100 L1200,120 L0,120 Z",
              "M0,110 C400,150 800,70 1200,110 L1200,120 L0,120 Z",
              "M0,100 C400,60 800,140 1200,100 L1200,120 L0,120 Z"
            ]
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: [0.4, 0, 0.2, 1],
            delay: 1.2
          }}
        />
        
        {/* Wave gradients */}
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0891b2" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" />
          </linearGradient>
          
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0891b2" stopOpacity="0.9" />
          </linearGradient>
          
          <linearGradient id="foamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#cffafe" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.7" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Animated foam particles */}
      <div className="absolute bottom-4 left-0 right-0">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 20}px`
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.7, 0.3, 0.7],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Subtle sand texture animation */}
      <div className="absolute bottom-0 left-0 right-0 h-8">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-200 rounded-full opacity-40"
            style={{
              left: `${i * 15}%`,
              bottom: `${2 + Math.random() * 6}px`
            }}
            animate={{
              opacity: [0.4, 0.1, 0.4],
              scale: [1, 0.8, 1]
            }}
            transition={{
              duration: 3 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>
    </div>
  );
}
