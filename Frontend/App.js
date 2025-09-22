import { useState } from 'react';
import { Navigation } from './components/Navigation.js';
import { AboutSection } from './components/AboutSection.js';
import { SnapReportsSection } from './components/SnapReportsSection.js';
import { INCOISSection } from './components/INCOISSection.js';
import { LLMReportsSection } from './components/LLMReportsSection.js';
import { CoastGuardSection } from './components/CoastGuardSection.js';
import { BeachWaveAnimation } from './components/BeachWaveAnimation.js';
import { OceanElements } from './components/OceanElements.js';
import { PhotoUpload } from './components/PhotoUpload.js';
import { LocationChat } from './components/LocationChat.js';
import { SocialMediaPanel } from './components/SocialMediaPanel.js';
import { motion } from 'motion/react';
import { ImageWithFallback } from './components/figma/ImageWithFallback.js';
import { Radio, Ship, Anchor, MapPin, BarChart3, Camera, Shield } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <AboutSection />;
      case 'snap-reports':
        return <SnapReportsSection />;
      case 'incois':
        return <INCOISSection />;
      case 'llm-reports':
        return <LLMReportsSection />;
      case 'coast-guard':
        return <CoastGuardSection />;
      default:
        return (
          <>
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 pb-32">
              {/* Photo Upload and Chat Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <PhotoUpload />
                </motion.div>
                
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <LocationChat />
                </motion.div>
              </div>

              {/* Quick Access Cards */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <motion.div 
                  className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-purple-600/20 transition-all duration-300 cursor-pointer border border-purple-300 hover:border-purple-500"
                  onClick={() => setActiveSection('about')}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <MapPin className="w-8 h-8 text-purple-700" />
                    </div>
                    <h3 className="font-semibold text-purple-800">Coastal Map</h3>
                    <p className="text-sm text-slate-800 mt-2">Interactive India coastline with hazard zones</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 cursor-pointer border border-blue-300 hover:border-blue-500"
                  onClick={() => setActiveSection('snap-reports')}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md"
                      >
                        <Camera className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="font-semibold text-blue-800">Community Reports</h3>
                    <p className="text-sm text-slate-800 mt-2">User-generated hazard photos and reports</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-green-600/20 transition-all duration-300 cursor-pointer border border-green-300 hover:border-green-500"
                  onClick={() => setActiveSection('incois')}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <motion.div
                        animate={{ scaleY: [1, 0.8, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="flex space-x-1"
                      >
                        <BarChart3 className="w-8 h-8 text-green-700" />
                      </motion.div>
                    </div>
                    <h3 className="font-semibold text-green-800">INCOIS Data</h3>
                    <p className="text-sm text-slate-800 mt-2">Live oceanographic monitoring</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-white backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 cursor-pointer border border-blue-300 hover:border-blue-500"
                  onClick={() => setActiveSection('coast-guard')}
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <motion.div
                        animate={{ 
                          x: [0, 2, -2, 0],
                          rotate: [0, 1, -1, 0]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Ship className="w-8 h-8 text-blue-700" />
                      </motion.div>
                    </div>
                    <h3 className="font-semibold text-blue-800">Coast Guard</h3>
                    <p className="text-sm text-slate-800 mt-2">Operations and safety advisories</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Social Media Panel */}
            <SocialMediaPanel />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" style={{ backgroundColor: '#ffffff' }}>
      <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
      
      {/* Hero Section - Only show on home */}
      {activeSection === 'home' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden min-h-[70vh]"
        >
          {/* Enhanced India Coastline Background Mosaic */}
          <div className="absolute inset-0 z-0">
            {/* Primary coastline background - full width */}
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1727276884922-34794bd40ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGNvYXN0bGluZSUyMGFlcmlhbCUyMGJlYWNofGVufDF8fHx8MTc1NzY5NzExOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="India Coastline Aerial View"
              className="w-full h-full object-cover opacity-35"
            />
            
            {/* Coastal regions overlay grid - Extended India Coastline */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-2 gap-0">
              {/* Gujarat - Mandvi Beach */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.25, 0.45, 0.25] }}
                transition={{ duration: 12, repeat: Infinity }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1709183227369-aad3a5805446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxHdWphcmF0JTIwY29hc3RsaW5lJTIwTWFuZHZpJTIwYmVhY2h8ZW58MXx8fHwxNzU3NzUyNDYyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Gujarat Mandvi Beach Coastline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-purple-700 font-semibold">Mandvi, Gujarat</span>
                  <div className="text-purple-600 text-xs">Kutch Coast</div>
                </div>
              </motion.div>

              {/* Maharashtra - Konkan Coast */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 14, repeat: Infinity, delay: 2 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1743749151223-a32f9adb67dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxNYWhhcmFzaHRyYSUyMGNvYXN0bGluZSUyMEtvbmthbiUyMHJlZ2lvbnxlbnwxfHx8fDE3NTc3NTI0ODB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Maharashtra Konkan Coastline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-blue-700 font-semibold">Konkan, Maharashtra</span>
                  <div className="text-blue-600 text-xs">Arabian Sea</div>
                </div>
              </motion.div>

              {/* Karnataka - Mangalore */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.15, 0.35, 0.15] }}
                transition={{ duration: 16, repeat: Infinity, delay: 4 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1708868065091-a6f0ac265dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLYXJuYXRha2ElMjBjb2FzdGxpbmUlMjBNYW5nYWxvcmUlMjBiZWFjaGVzfGVufDF8fHx8MTc1Nzc1MjQ3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Karnataka Mangalore Beaches"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-green-700 font-semibold">Mangalore, Karnataka</span>
                  <div className="text-green-600 text-xs">Coastal Karnataka</div>
                </div>
              </motion.div>

              {/* Kerala Backwaters */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.22, 0.42, 0.22] }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1743749149671-2c4f8c65b22a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBjb2FzdGxpbmUlMjBmaXNoaW5nJTIwYm9hdHN8ZW58MXx8fHwxNzU3Njk3MTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Kerala Backwaters and Coastline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-green-700 font-semibold">Backwaters, Kerala</span>
                  <div className="text-green-600 text-xs">Malabar Coast</div>
                </div>
              </motion.div>

              {/* Andhra Pradesh - Visakhapatnam */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.18, 0.38, 0.18] }}
                transition={{ duration: 18, repeat: Infinity, delay: 3 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1661173199938-febeb803cc5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxBbmRocmElMjBQcmFkZXNoJTIwY29hc3RsaW5lJTIwVmlzYWtoYXBhdG5hbXxlbnwxfHx8fDE3NTc3NTI0Njh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Andhra Pradesh Visakhapatnam Coast"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-blue-700 font-semibold">Visakhapatnam, AP</span>
                  <div className="text-blue-600 text-xs">Eastern Coast</div>
                </div>
              </motion.div>

              {/* Odisha - Puri Beach */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.28, 0.48, 0.28] }}
                transition={{ duration: 13, repeat: Infinity, delay: 5 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1734117426079-62d11be77570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxPZGlzaGElMjBjb2FzdGxpbmUlMjBQdXJpJTIwYmVhY2h8ZW58MXx8fHwxNzU3NzUyNDY1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Odisha Puri Beach Coastline"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-purple-700 font-semibold">Puri, Odisha</span>
                  <div className="text-purple-600 text-xs">Bay of Bengal</div>
                </div>
              </motion.div>

              {/* West Bengal - Sundarbans */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.24, 0.44, 0.24] }}
                transition={{ duration: 15, repeat: Infinity, delay: 6 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1715688729892-d0f7715d95e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxXZXN0JTIwQmVuZ2FsJTIwU3VuZGFyYmFucyUyMGNvYXN0bGluZXxlbnwxfHx8fDE3NTc3NTI0NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="West Bengal Sundarbans Mangrove Coast"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-green-700 font-semibold">Sundarbans, WB</span>
                  <div className="text-green-600 text-xs">Mangrove Delta</div>
                </div>
              </motion.div>

              {/* Chennai Marina - Tamil Nadu */}
              <motion.div
                className="relative overflow-hidden"
                animate={{ opacity: [0.26, 0.46, 0.26] }}
                transition={{ duration: 11, repeat: Infinity, delay: 7 }}
              >
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1739740628980-86909e3ce179?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVubmFpJTIwbWFyaW5hJTIwYmVhY2glMjBzdW5yaXNlfGVufDF8fHx8MTc1NzY5NjQ0NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Chennai Marina Beach Tamil Nadu"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg">
                  <span className="text-blue-700 font-semibold">Marina Beach, Chennai</span>
                  <div className="text-blue-600 text-xs">Coromandel Coast</div>
                </div>
              </motion.div>
            </div>
            
            {/* Enhanced light overlay with gradient for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-blue-50/80 to-white/85"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-white/75 via-green-50/90 to-white/95"></div>
          </div>

          {/* Ocean Elements */}
          <OceanElements />
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
            {/* Lighthouse Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                {/* Custom Lighthouse using available icons */}
                <div className="relative flex flex-col items-center">
                  <div className="relative">
                    <Radio className="w-16 h-16 text-purple-700" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gradient-to-t from-purple-600 to-blue-600 rounded-full shadow-lg"></div>
                    </div>
                  </div>
                </div>
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 border-2 border-blue-700 rounded-full"
                />
                {/* Light beam effect */}
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="absolute top-0 left-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-600/70 to-transparent transform -translate-x-1/2 origin-left"
                  style={{ transformOrigin: '0 50%' }}
                />
              </div>
            </motion.div>

            <motion.h1 
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-slate-900 text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            >
              Every Wave Tells a Story.
              <br />
              <span className="text-transparent bg-gradient-to-r from-purple-700 to-blue-700 bg-clip-text">Together, We Listen.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-slate-800 text-lg md:text-xl max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Empowering coastal communities with real-time ocean intelligence, 
              crowdsourced reporting, and AI-powered hazard detection across India's 7,516 km coastline.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.button
                onClick={() => setActiveSection('snap-reports')}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-purple-600/30 transition-all duration-300 flex items-center space-x-2"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(107, 70, 193, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Anchor className="w-5 h-5" />
                <span>Report Ocean Hazard</span>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveSection('about')}
                className="bg-white hover:bg-white text-purple-800 border-2 border-purple-600/60 hover:border-purple-700 px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-sm transition-all duration-300 flex items-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(107, 70, 193, 0.3)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Ship className="w-5 h-5" />
                <span>Explore Coastline</span>
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
            >
              <div className="text-center p-4 rounded-lg bg-white backdrop-blur-sm border border-purple-300 shadow-sm">
                <div className="text-3xl font-bold text-purple-700">7,516</div>
                <div className="text-sm text-slate-900">KM Coastline</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white backdrop-blur-sm border border-blue-300 shadow-sm">
                <div className="text-3xl font-bold text-blue-700">250M+</div>
                <div className="text-sm text-slate-900">Coastal Population</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white backdrop-blur-sm border border-green-300 shadow-sm">
                <div className="text-3xl font-bold text-green-700">150+</div>
                <div className="text-sm text-slate-900">Monitoring Stations</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-white backdrop-blur-sm border border-blue-300 shadow-sm">
                <div className="text-3xl font-bold text-blue-700">24/7</div>
                <div className="text-sm text-slate-900">Real-time Data</div>
              </div>
            </motion.div>
          </div>

          {/* Beach Wave Animation */}
          <BeachWaveAnimation />
        </motion.div>
      )}

      {/* Section Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderSection()}
      </div>
    </div>
  );
}