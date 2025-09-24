import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function SlideshowBackground() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const coastlineImages = [
    {
      src: "https://images.unsplash.com/photo-1720798377880-2a1b656848ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwY29jb251dCUyMHBhbG1zfGVufDF8fHx8MTc1NzgzNjExNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Kerala Backwaters with Coconut Palms",
      location: "Alappuzha, Kerala"
    },
    {
      src: "https://images.unsplash.com/photo-1710232883376-491f627d0baa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjB2YXJrYWxhJTIwY2xpZmYlMjBiZWFjaCUyMHN1bnNldHxlbnwxfHx8fDE3NTc4MzgxNDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Kerala Varkala Cliff Beach",
      location: "Varkala, Kerala"
    },
    {
      src: "https://images.unsplash.com/photo-1756797949315-c13d9e3f1301?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGNvYXN0bGluZSUyMHN1bnNldHxlbnwxfHx8fDE3NTc4MzYxMTl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Goa Beach Sunset",
      location: "Goa"
    },
    {
      src: "https://images.unsplash.com/photo-1625216843977-57ea506970e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWhhcmFzaHRyYSUyMGFsaWJhdWclMjBjb2FzdGxpbmUlMjBzdW5zZXR8ZW58MXx8fHwxNzU3ODM4MTM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Maharashtra Alibaug Coastline",
      location: "Alibaug, Maharashtra"
    },
    {
      src: "https://images.unsplash.com/photo-1654366758812-2163c2a24ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVubmFpJTIwbWFyaW5hJTIwYmVhY2glMjBmaXNoaW5nJTIwYm9hdHN8ZW58MXx8fHwxNzU3ODM2MTI5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Chennai Marina Beach",
      location: "Chennai, Tamil Nadu"
    },
    {
      src: "https://images.unsplash.com/photo-1652466148272-2cee711250d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW1pbCUyMG5hZHUlMjByYW1lc3dhcmFtJTIwYmVhY2glMjBicmlkZ2V8ZW58MXx8fHwxNzU3ODM4MTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Tamil Nadu Rameswaram Bridge",
      location: "Rameswaram, Tamil Nadu"
    },
    {
      src: "https://images.unsplash.com/photo-1705330409537-e6476e6ca90c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb25kaWNoZXJyeSUyMGJlYWNoJTIwY29hc3RsaW5lJTIwZnJlbmNoJTIwcXVhcnRlcnxlbnwxfHx8fDE3NTc4MzgxNDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Pondicherry French Quarter Beach",
      location: "Pondicherry"
    },
    {
      src: "https://images.unsplash.com/photo-1726553616541-f5ab424d358a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmRocmElMjBwcmFkZXNoJTIwY29hc3RhbCUyMGZpc2hlcm1lbnxlbnwxfHx8fDE3NTc4MzYxMzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Andhra Pradesh Coastal Fishermen",
      location: "Visakhapatnam, Andhra Pradesh"
    },
    {
      src: "https://images.unsplash.com/photo-1592900548634-e2fbad4a9fa0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZGlzaGElMjBwdXJpJTIwYmVhY2glMjBjb2FzdGxpbmUlMjB0ZW1wbGV8ZW58MXx8fHwxNzU3ODM3OTQxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Odisha Puri Beach",
      location: "Puri, Odisha"
    },
    {
      src: "https://images.unsplash.com/photo-1675612741823-ba2eef444b7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZXN0JTIwYmVuZ2FsJTIwZGlnaGElMjBiZWFjaCUyMGNvYXN0bGluZXxlbnwxfHx8fDE3NTc4MzgxMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "West Bengal Digha Beach",
      location: "Digha, West Bengal"
    },
    {
      src: "https://images.unsplash.com/photo-1709183227369-aad3a5805446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWphcmF0JTIwbWFuZHZpJTIwYmVhY2glMjBjb2FzdGxpbmV8ZW58MXx8fHwxNzU3ODM3OTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Gujarat Mandvi Beach",
      location: "Mandvi, Gujarat"
    },
    {
      src: "https://images.unsplash.com/photo-1752006477507-dacb080cbc5f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXUlMjBiZWFjaCUyMGxpZ2h0aG91c2UlMjBjb2FzdGxpbmUlMjBzdW5zZXR8ZW58MXx8fHwxNzU3ODM4MTU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Diu Beach Lighthouse",
      location: "Diu"
    },
    {
      src: "https://images.unsplash.com/photo-1708868065091-a6f0ac265dfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrYXJuYXRha2ElMjB1ZHVwaSUyMG1hbmdhbG9yZSUyMGJlYWNofGVufDF8fHx8MTc1NzgzNzkzN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Karnataka Udupi Coast",
      location: "Udupi, Karnataka"
    },
    {
      src: "https://images.unsplash.com/photo-1580926322501-915b15fd09dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmRhbWFuJTIwaXNsYW5kcyUyMGJlYWNoJTIwdHJvcGljYWwlMjBjb2FzdGxpbmV8ZW58MXx8fHwxNzU3ODM4MTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Andaman Islands Tropical Beach",
      location: "Port Blair, Andaman & Nicobar Islands"
    },
    {
      src: "https://images.unsplash.com/photo-1646109900203-50b80ee648a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYWtzaGFkd2VlcCUyMGlzbGFuZHMlMjB0dXJxdW9pc2UlMjB3YXRlciUyMGJlYWNofGVufDF8fHx8MTc1NzgzODE1Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "Lakshadweep Turquoise Waters",
      location: "Kavaratti, Lakshadweep"
    },
    {
      src: "https://images.unsplash.com/photo-1727276884922-34794bd40ad5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMGNvYXN0bGluZSUyMGFlcmlhbHxlbnwxfHx8fDE3NTc4MzUxOTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      title: "India Coastline Aerial View",
      location: "Indian Ocean Coast"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % coastlineImages.length);
    }, 7000); // Change slide every 7 seconds for better viewing

    return () => clearInterval(interval);
  }, [coastlineImages.length]);

  return (
    <div className="absolute inset-0 z-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ 
            duration: 1.5,
            ease: [0.4, 0, 0.2, 1]
          }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src={coastlineImages[currentSlide].src}
            alt={coastlineImages[currentSlide].title}
            className="w-full h-full object-cover"
          />
          
          {/* Location Label */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute bottom-8 left-8 bg-slate-900/85 backdrop-blur-sm px-4 py-3 rounded-xl shadow-xl border border-slate-700/30"
          >
            <div className="text-lg font-semibold text-white">
              {coastlineImages[currentSlide].title}
            </div>
            <div className="text-sm text-slate-200 flex items-center space-x-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{coastlineImages[currentSlide].location}</span>
            </div>
          </motion.div>

          {/* Slide Indicators */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="absolute bottom-8 right-8 flex space-x-2"
          >
            {coastlineImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg scale-125' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Very light overlay for text readability - reduced opacity to show photos clearly */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 via-transparent to-white/10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-transparent to-white/10"></div>
    </div>
  );
}