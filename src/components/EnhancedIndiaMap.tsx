import { motion } from 'framer-motion';
import { MapPin, AlertTriangle, Shield, Waves } from 'lucide-react';

interface CoastalPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  type: 'major' | 'port' | 'hazard' | 'safe';
  state: string;
  description: string;
}

export function EnhancedIndiaMap() {
  const coastalPoints: CoastalPoint[] = [
    // West Coast
    { id: '1', name: 'Mumbai', x: 280, y: 350, type: 'major', state: 'Maharashtra', description: 'Major commercial port' },
    { id: '2', name: 'Goa', x: 275, y: 400, type: 'port', state: 'Goa', description: 'Tourist coastal hub' },
    { id: '3', name: 'Kochi', x: 260, y: 480, type: 'port', state: 'Kerala', description: 'Major spice port' },
    { id: '4', name: 'Mangalore', x: 270, y: 450, type: 'port', state: 'Karnataka', description: 'Industrial port' },
    { id: '5', name: 'Surat', x: 290, y: 320, type: 'port', state: 'Gujarat', description: 'Diamond trading port' },
    { id: '6', name: 'Kandla', x: 310, y: 280, type: 'major', state: 'Gujarat', description: 'Major cargo port' },
    
    // East Coast
    { id: '7', name: 'Chennai', x: 420, y: 450, type: 'major', state: 'Tamil Nadu', description: 'Major automotive hub' },
    { id: '8', name: 'Kolkata', x: 480, y: 320, type: 'major', state: 'West Bengal', description: 'Cultural capital port' },
    { id: '9', name: 'Visakhapatnam', x: 460, y: 380, type: 'port', state: 'Andhra Pradesh', description: 'Naval base port' },
    { id: '10', name: 'Paradip', x: 470, y: 350, type: 'port', state: 'Odisha', description: 'Iron ore export port' },
    { id: '11', name: 'Tuticorin', x: 400, y: 500, type: 'port', state: 'Tamil Nadu', description: 'Pearl diving center' },
    
    // Islands
    { id: '12', name: 'Port Blair', x: 550, y: 450, type: 'safe', state: 'Andaman & Nicobar', description: 'Island territory capital' },
    { id: '13', name: 'Kavaratti', x: 220, y: 470, type: 'safe', state: 'Lakshadweep', description: 'Coral island capital' },
    
    // Hazard zones
    { id: '14', name: 'Cyclone Zone', x: 450, y: 400, type: 'hazard', state: 'Bay of Bengal', description: 'High cyclone activity' },
    { id: '15', name: 'Tsunami Risk', x: 380, y: 520, type: 'hazard', state: 'Indian Ocean', description: 'Tsunami vulnerable area' },
  ];

  const getPointColor = (type: string) => {
    switch (type) {
      case 'major': return 'fill-cyan-400 stroke-cyan-300';
      case 'port': return 'fill-blue-400 stroke-blue-300';
      case 'safe': return 'fill-emerald-400 stroke-emerald-300';
      case 'hazard': return 'fill-red-400 stroke-red-300';
      default: return 'fill-gray-400 stroke-gray-300';
    }
  };

  const getPointIcon = (type: string) => {
    switch (type) {
      case 'major': return <MapPin className="w-4 h-4" />;
      case 'port': return <Shield className="w-4 h-4" />;
      case 'safe': return <Waves className="w-4 h-4" />;
      case 'hazard': return <AlertTriangle className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative w-full h-full bg-slate-900/20 rounded-lg overflow-hidden">
      <svg viewBox="0 0 600 600" className="w-full h-full">
        <defs>
          <linearGradient id="indiaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)" />
            <stop offset="50%" stopColor="rgba(59, 130, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(168, 85, 247, 0.3)" />
          </linearGradient>
          <linearGradient id="coastGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>

        {/* Detailed India outline */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          d="M 240 180 
             L 280 160 L 320 150 L 360 145 L 400 140 L 440 135 L 480 140 L 520 145 L 560 155
             L 580 170 L 590 190 L 595 220 L 590 250 L 585 280 L 575 310 L 565 340
             L 555 370 L 545 400 L 535 430 L 525 460 L 515 490 L 500 515 L 480 535
             L 460 545 L 440 550 L 420 555 L 400 560 L 380 565 L 360 570 L 340 575
             L 320 570 L 300 565 L 280 555 L 260 540 L 245 520 L 235 495 L 230 470
             L 225 445 L 220 420 L 218 395 L 216 370 L 215 345 L 214 320 L 213 295
             L 212 270 L 211 245 L 215 220 L 220 195 L 230 180 Z"
          fill="url(#indiaGradient)"
          stroke="url(#coastGradient)"
          strokeWidth="3"
          className="drop-shadow-lg"
        />

        {/* Coastal highlights */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, ease: "easeInOut" }}
          d="M 240 180 L 280 160 L 320 150 L 360 145 L 400 140 L 440 135 L 480 140 L 520 145 L 560 155 L 580 170 L 590 190"
          fill="none"
          stroke="#22d3ee"
          strokeWidth="6"
          strokeDasharray="10,5"
          className="animate-pulse"
        />

        {/* West coast highlight */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1.5, ease: "easeInOut" }}
          d="M 240 180 L 235 220 L 230 260 L 225 300 L 220 340 L 218 380 L 216 420 L 215 460 L 220 500 L 230 535"
          fill="none"
          stroke="#06b6d4"
          strokeWidth="6"
          strokeDasharray="8,4"
          className="animate-pulse"
        />

        {/* East coast highlight */}
        <motion.path
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 2, ease: "easeInOut" }}
          d="M 590 190 L 585 230 L 575 270 L 565 310 L 555 350 L 545 390 L 535 430 L 525 470 L 515 500"
          fill="none"
          stroke="#0891b2"
          strokeWidth="6"
          strokeDasharray="12,6"
          className="animate-pulse"
        />

        {/* Coastal points */}
        {coastalPoints.map((point, index) => (
          <motion.g
            key={point.id}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2.5 + index * 0.1, duration: 0.5 }}
          >
            <motion.circle
              cx={point.x}
              cy={point.y}
              r={point.type === 'major' ? 8 : point.type === 'hazard' ? 6 : 5}
              className={`${getPointColor(point.type)} cursor-pointer`}
              strokeWidth="2"
              whileHover={{ scale: 1.3, opacity: 0.8 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Point labels */}
            <text
              x={point.x}
              y={point.y - 15}
              textAnchor="middle"
              className="text-xs font-medium fill-slate-200 pointer-events-none"
              style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))' }}
            >
              {point.name}
            </text>

            {/* Hover tooltip area */}
            <motion.rect
              x={point.x - 50}
              y={point.y - 35}
              width="100"
              height="50"
              fill="transparent"
              className="cursor-pointer"
              whileHover={{ 
                scale: 1.1,
              }}
            />
          </motion.g>
        ))}

        {/* Legend */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <rect x="20" y="500" width="200" height="80" fill="rgba(15, 20, 25, 0.8)" stroke="rgba(6, 182, 212, 0.3)" strokeWidth="1" rx="5" />
          <text x="30" y="520" className="text-xs font-semibold fill-cyan-300">Coastal Legend</text>
          
          <circle cx="35" cy="535" r="4" className="fill-cyan-400" />
          <text x="45" y="540" className="text-xs fill-slate-300">Major Ports</text>
          
          <circle cx="120" cy="535" r="4" className="fill-blue-400" />
          <text x="130" y="540" className="text-xs fill-slate-300">Commercial Ports</text>
          
          <circle cx="35" cy="555" r="4" className="fill-emerald-400" />
          <text x="45" y="560" className="text-xs fill-slate-300">Safe Zones</text>
          
          <circle cx="120" cy="555" r="4" className="fill-red-400" />
          <text x="130" y="560" className="text-xs fill-slate-300">Hazard Zones</text>
        </motion.g>

        {/* Animated water effects */}
        <motion.circle
          cx="300"
          cy="300"
          r="100"
          fill="none"
          stroke="rgba(34, 211, 238, 0.1)"
          strokeWidth="2"
          animate={{ r: [80, 120, 80], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        
        <motion.circle
          cx="400"
          cy="400"
          r="80"
          fill="none"
          stroke="rgba(6, 182, 212, 0.1)"
          strokeWidth="2"
          animate={{ r: [60, 100, 60], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, delay: 2 }}
        />
      </svg>

      {/* Interactive overlay */}
      <div className="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm rounded-lg p-3 border border-cyan-400/20">
        <div className="text-xs text-cyan-300 font-semibold mb-1">Live Coastal Status</div>
        <div className="text-xs text-slate-300">
          🟢 15 Safe Zones<br />
          🟡 8 Moderate Risk<br />
          🔴 3 High Alert
        </div>
      </div>
    </div>
  );
}
