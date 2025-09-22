import { useState } from 'react';
import { motion } from 'framer-motion';
import { Waves, Menu, X, MapPin, Camera, Activity, MessageSquare, Shield } from 'lucide-react';
import { Button } from './ui/button';
import Sage from '../assets/SageLogo.png';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export function Navigation({ activeSection, setActiveSection }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const sections = [
    { id: 'home', label: 'Home', icon: Waves },
    { id: 'about', label: 'About', icon: MapPin },
    { id: 'snap-reports', label: 'Snap Reports', icon: Camera },
    { id: 'incois', label: 'INCOIS Data', icon: Activity },
    { id: 'llm-reports', label: 'AI Reports', icon: MessageSquare },
    { id: 'coast-guard', label: 'Coast Guard', icon: Shield }
  ];

  return (
    <header className="bg-slate-900/95 backdrop-blur-sm text-white shadow-xl sticky top-0 z-50 border-b border-cyan-400/20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setActiveSection('home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="w-12 h-12 bg-white/10 rounded-lg p-1 backdrop-blur-sm">
              <img src={Sage} alt="Sage" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-bold text-xl">Snapby</h1>
              <p className="text-xs text-cyan-100">Every Wave Tells a Story</p>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    activeSection === section.id
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-cyan-100 hover:bg-white/10 hover:text-white'
                  }`}
                  whileHover={{ y: -2 }}
                  whileTap={{ y: 0 }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.label}</span>
                </motion.button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white hover:bg-white/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-cyan-500 py-4"
          >
            <nav className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all ${
                      activeSection === section.id
                        ? 'bg-white/20 text-white'
                        : 'text-cyan-100 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{section.label}</span>
                  </button>
                );
              })}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
}