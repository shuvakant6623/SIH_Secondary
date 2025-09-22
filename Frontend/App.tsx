import { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { Navigation } from './components/Navigation';
import { AboutSection } from './components/AboutSection';
import { SnapReportsSection } from './components/SnapReportsSection';
import { INCOISSection } from './components/INCOISSection';
import { LLMReportsSection } from './components/LLMReportsSection';
import { CoastGuardSection } from './components/CoastGuardSection';
import { WaveAnimation } from './components/WaveAnimation';
import { BeachWaveAnimation } from './components/BeachWaveAnimation';
import { OceanElements } from './components/OceanElements';
import { PhotoUpload } from './components/PhotoUpload';
import { LocationChat } from './components/LocationChat';
import { SocialMediaPanel } from './components/SocialMediaPanel';
import { UploadProvider } from './components/UploadContext';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { SlideshowBackground } from './components/SlideshowBackground';
import { Button } from './components/ui/button';
import { Radio, Ship, Anchor, MapPin, BarChart3, Camera, Shield } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{ username: string; email: string } | null>(null);

  const handleLogin = (user: { username: string; email: string }) => {
    setUserData(user);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

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
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="transform-gpu"
                >
                  <PhotoUpload />
                </motion.div>
                
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                  className="transform-gpu"
                >
                  <LocationChat />
                </motion.div>
              </div>

              {/* Quick Access Cards */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <motion.div 
                  className="bg-slate-50/95 backdrop-blur-enhanced rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-500 ease-wave cursor-pointer border border-slate-300 hover:border-indigo-400"
                  onClick={() => setActiveSection('about')}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <MapPin className="w-8 h-8 text-indigo-700" />
                    </div>
                    <h3 className="font-semibold text-indigo-800">Coastal Map</h3>
                    <p className="text-sm text-slate-700 mt-2">Interactive India coastline with hazard zones</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-slate-50/95 backdrop-blur-enhanced rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-teal-500/20 transition-all duration-500 ease-wave cursor-pointer border border-slate-300 hover:border-teal-400"
                  onClick={() => setActiveSection('snap-reports')}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <motion.div
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        className="w-8 h-8 bg-gradient-to-br from-teal-600 to-teal-700 rounded-lg flex items-center justify-center shadow-md"
                      >
                        <Camera className="w-5 h-5 text-white" />
                      </motion.div>
                    </div>
                    <h3 className="font-semibold text-teal-800">Community Reports</h3>
                    <p className="text-sm text-slate-700 mt-2">User-generated hazard photos and reports</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-slate-50/95 backdrop-blur-enhanced rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-slate-500/20 transition-all duration-500 ease-wave cursor-pointer border border-slate-300 hover:border-slate-400"
                  onClick={() => setActiveSection('incois')}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <motion.div
                        animate={{ scaleY: [1, 0.8, 1.2, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        className="flex space-x-1"
                      >
                        <BarChart3 className="w-8 h-8 text-slate-700" />
                      </motion.div>
                    </div>
                    <h3 className="font-semibold text-slate-800">INCOIS Data</h3>
                    <p className="text-sm text-slate-700 mt-2">Live oceanographic monitoring</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="bg-slate-50/95 backdrop-blur-enhanced rounded-xl p-6 shadow-lg hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-500 ease-wave cursor-pointer border border-slate-300 hover:border-blue-500"
                  onClick={() => setActiveSection('coast-guard')}
                  whileHover={{ y: -8, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <div className="text-center">
                    <div className="flex justify-center mb-3">
                      <motion.div
                        animate={{ 
                          x: [0, 2, -2, 0],
                          rotate: [0, 1, -1, 0]
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Ship className="w-8 h-8 text-blue-700" />
                      </motion.div>
                    </div>
                    <h3 className="font-semibold text-blue-800">Coast Guard</h3>
                    <p className="text-sm text-slate-700 mt-2">Operations and safety advisories</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Latest Activity Stream */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="bg-white/90 backdrop-blur-enhanced rounded-2xl p-6 shadow-lg border border-slate-200"
              >
                <h3 className="font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Live Activity Stream</span>
                </h3>
                <div className="space-y-3">
                  {[
                    { icon: "🌊", text: "High waves reported at Marina Beach, Chennai", time: "2 min ago", type: "alert" },
                    { icon: "✅", text: "Coast Guard verified pollution report in Mumbai", time: "5 min ago", type: "success" },
                    { icon: "📸", text: "New photo uploaded from Goa coastline", time: "8 min ago", type: "info" },
                    { icon: "⚠️", text: "Cyclone warning issued for Odisha coast", time: "12 min ago", type: "warning" }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className={`flex items-start space-x-3 p-3 rounded-lg border-l-4 ${
                        activity.type === 'alert' ? 'bg-red-50 border-red-400' :
                        activity.type === 'success' ? 'bg-green-50 border-green-400' :
                        activity.type === 'warning' ? 'bg-orange-50 border-orange-400' :
                        'bg-blue-50 border-blue-400'
                      }`}
                    >
                      <span className="text-lg">{activity.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-slate-800">{activity.text}</p>
                        <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline" size="sm" onClick={() => setActiveSection('snap-reports')}>
                    View All Activity
                  </Button>
                </div>
              </motion.div>

              {/* Weather Highlights */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-blue-900">Wave Conditions</h4>
                    <div className="text-2xl">🌊</div>
                  </div>
                  <div className="text-3xl font-bold text-blue-800 mb-1">2.1m</div>
                  <div className="text-sm text-blue-600">Average height • Moderate conditions</div>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 bg-blue-200 rounded-full h-2">
                      <div className="w-1/3 bg-blue-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-xs text-blue-600">Safe</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-green-900">Wind Speed</h4>
                    <div className="text-2xl">💨</div>
                  </div>
                  <div className="text-3xl font-bold text-green-800 mb-1">15 kts</div>
                  <div className="text-sm text-green-600">Light breeze • Good for sailing</div>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 bg-green-200 rounded-full h-2">
                      <div className="w-2/5 bg-green-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-xs text-green-600">Ideal</span>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-orange-900">Tide Level</h4>
                    <div className="text-2xl">🏄</div>
                  </div>
                  <div className="text-3xl font-bold text-orange-800 mb-1">High</div>
                  <div className="text-sm text-orange-600">Rising • Peak at 3:45 PM</div>
                  <div className="mt-3 flex items-center space-x-2">
                    <div className="flex-1 bg-orange-200 rounded-full h-2">
                      <div className="w-4/5 bg-orange-500 h-2 rounded-full"></div>
                    </div>
                    <span className="text-xs text-orange-600">High</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Social Media Panel */}
            <SocialMediaPanel />
          </>
        );
    }
  };

  return (
    <UploadProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-indigo-50" style={{ backgroundColor: '#ffffff' }}>
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        
        {/* Hero Section - Only show on home */}
        {activeSection === 'home' && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative overflow-hidden min-h-[70vh]"
        >
          {/* India Coastline Slideshow Background */}
          <SlideshowBackground />

          {/* Ocean Elements */}
          <OceanElements />
          
          <div className="relative z-20 max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
            {/* Snapby Logo Hero */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                {/* Main Snapby Logo */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative"
                >

                </motion.div>
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
              <span className="text-transparent bg-gradient-to-r from-indigo-700 to-teal-700 bg-clip-text">Together, We Listen.</span>
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
                className="bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-indigo-500/30 transition-all duration-500 ease-wave flex items-center space-x-2"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(79, 70, 229, 0.4)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Anchor className="w-5 h-5" />
                <span>Report Ocean Hazard</span>
              </motion.button>
              
              <motion.button
                onClick={() => setActiveSection('about')}
                className="bg-slate-50/95 hover:bg-slate-100 text-indigo-800 border-2 border-slate-400/60 hover:border-indigo-500 px-8 py-4 rounded-full font-semibold text-lg backdrop-blur-enhanced transition-all duration-500 ease-wave flex items-center space-x-2 shadow-lg"
                whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(71, 85, 105, 0.3)" }}
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
              transition={{ delay: 1, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto"
            >
              <motion.div 
                className="text-center p-4 rounded-lg bg-slate-50/95 backdrop-blur-enhanced border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-indigo-700">7,516</div>
                <div className="text-sm text-slate-800">KM Coastline</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg bg-slate-50/95 backdrop-blur-enhanced border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-teal-700">250M+</div>
                <div className="text-sm text-slate-800">Coastal Population</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg bg-slate-50/95 backdrop-blur-enhanced border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-slate-700">150+</div>
                <div className="text-sm text-slate-800">Monitoring Stations</div>
              </motion.div>
              <motion.div 
                className="text-center p-4 rounded-lg bg-slate-50/95 backdrop-blur-enhanced border border-slate-300 shadow-sm hover:shadow-md transition-all duration-300"
                whileHover={{ y: -2, scale: 1.02 }}
              >
                <div className="text-3xl font-bold text-blue-800">24/7</div>
                <div className="text-sm text-slate-800">Real-time Data</div>
              </motion.div>
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
    </UploadProvider>
  );
}