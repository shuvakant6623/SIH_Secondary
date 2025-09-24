import { motion } from 'framer-motion';
import { Fish, Anchor, Compass, Waves } from 'lucide-react';

export function OceanElements() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating sea creatures */}
      <motion.div
        className="absolute top-20 left-10"
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <Fish className="w-8 h-8 text-teal-300 opacity-30" />
      </motion.div>

      <motion.div
        className="absolute top-40 right-20"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <Anchor className="w-6 h-6 text-cyan-400 opacity-25" />
      </motion.div>

      <motion.div
        className="absolute bottom-40 left-1/4"
        animate={{
          rotate: [0, 360]
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <Compass className="w-10 h-10 text-blue-300 opacity-20" />
      </motion.div>

      {/* Bubble effect */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-cyan-200 rounded-full opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: 0,
          }}
          animate={{
            y: [-100, -window.innerHeight],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{
            duration: Math.random() * 8 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeOut"
          }}
        />
      ))}

      {/* Seaweed swaying */}
      <motion.div
        className="absolute bottom-0 left-16"
        animate={{
          rotate: [-5, 5, -5]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="w-1 h-32 bg-gradient-to-t from-emerald-400 to-emerald-200 opacity-20 rounded-full transform-gpu"></div>
      </motion.div>

      <motion.div
        className="absolute bottom-0 right-32"
        animate={{
          rotate: [3, -3, 3]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <div className="w-1 h-24 bg-gradient-to-t from-teal-400 to-teal-200 opacity-25 rounded-full transform-gpu"></div>
      </motion.div>

      {/* Wave particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute"
          style={{
            left: `${i * 15}%`,
            top: `${60 + Math.random() * 20}%`,
          }}
          animate={{
            x: [0, 50, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.5,
            ease: "easeInOut"
          }}
        >
          <Waves className="w-4 h-4 text-blue-200 opacity-40" />
        </motion.div>
      ))}
    </div>
  );
}