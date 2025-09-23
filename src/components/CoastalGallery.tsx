import { motion } from 'framer-motion';
import { MapPin, Camera } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CoastalImage {
  id: number;
  src: string;
  location: string;
  state: string;
  description: string;
  coordinates: [number, number];
}

export function CoastalGallery() {
  const coastalImages: CoastalImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1680599022555-57fb95b64b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrZXJhbGElMjBiYWNrd2F0ZXJzJTIwaW5kaWF8ZW58MXx8fHwxNzU3NjkzOTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Alleppey Backwaters",
      state: "Kerala",
      description: "Serene backwaters with traditional houseboats and lush greenery",
      coordinates: [76.3388, 9.4981]
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1727276883315-53b22b811f43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnb2ElMjBiZWFjaCUyMGNvYXN0bGluZSUyMGluZGlhfGVufDF8fHx8MTc1NzY5MzkwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Anjuna Beach",
      state: "Goa",
      description: "Golden sandy beaches with vibrant coastal culture and palm trees",
      coordinates: [73.7549, 15.5437]
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1679249010086-b8a932c8cafc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdW1iYWklMjBtYXJpbmUlMjBkcml2ZSUyMGNvYXN0bGluZXxlbnwxfHx8fDE3NTc2OTM5MDR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Marine Drive",
      state: "Mumbai, Maharashtra", 
      description: "Iconic seafront promenade with the Queen's Necklace view",
      coordinates: [72.8238, 18.9432]
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1699441319814-534d4b045317?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGVubmFpJTIwbWFyaW5hJTIwYmVhY2h8ZW58MXx8fHwxNzU3NTk1NzA5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Marina Beach",
      state: "Chennai, Tamil Nadu",
      description: "World's second longest urban beach with historic lighthouse",
      coordinates: [80.2785, 13.0475]
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1724227106989-b862915c9514?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmRhbWFuJTIwaXNsYW5kcyUyMGNvYXN0bGluZXxlbnwxfHx8fDE3NTc2OTM5MDV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      location: "Havelock Island",
      state: "Andaman & Nicobar",
      description: "Pristine tropical beaches with crystal clear turquoise waters",
      coordinates: [93.0094, 12.0067]
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-sky-900 mb-4 flex items-center justify-center space-x-2">
          <Camera className="w-6 h-6 text-cyan-600" />
          <span>Coastal Photography Gallery</span>
        </h3>
        <p className="text-sky-700 max-w-2xl mx-auto">
          Capturing the diverse beauty of India's coastline - from tropical beaches to urban waterfronts
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {coastalImages.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500"
            whileHover={{ y: -5 }}
          >
            <div className="relative overflow-hidden">
              <ImageWithFallback
                src={image.src}
                alt={`${image.location}, ${image.state}`}
                className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              
              {/* Location badge */}
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
                <MapPin className="w-3 h-3 text-cyan-600" />
                <span className="text-xs font-medium text-gray-800">{image.state}</span>
              </div>

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h4 className="font-bold text-lg mb-1">{image.location}</h4>
                <p className="text-sm text-gray-200 mb-2 line-clamp-2">{image.description}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-300">
                  <span>📍</span>
                  <span>{image.coordinates[1].toFixed(4)}, {image.coordinates[0].toFixed(4)}</span>
                </div>
              </div>

              {/* Hover effect overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-cyan-500/20 flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1 }}
                  className="bg-white/90 backdrop-blur-sm rounded-full p-3"
                >
                  <Camera className="w-6 h-6 text-cyan-600" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center p-6 bg-gradient-to-r from-cyan-50 to-sky-50 rounded-xl border border-cyan-200"
      >
        <p className="text-sm text-sky-700 mb-2">
          <strong>Photo Sources:</strong> High-quality coastal imagery representing India's diverse maritime landscapes
        </p>
        <p className="text-xs text-sky-600">
          Images showcase the natural beauty and cultural significance of India's 7,516 km coastline
        </p>
      </motion.div>
    </motion.div>
  );
}