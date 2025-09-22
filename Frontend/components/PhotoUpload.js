import { useState, useRef } from 'react';
import { Camera, MapPin, Upload, Image } from 'lucide-react';
import { Button } from './ui/button.js';
import { Card } from './ui/card.js';
import { motion } from 'motion/react';

export function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [location, setLocation] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result);
        getCurrentLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: Date.now()
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Mock location for demo
          setLocation({
            latitude: 19.0760,
            longitude: 72.8777,
            accuracy: 10,
            timestamp: Date.now()
          });
        }
      );
    } else {
      // Mock location for demo
      setLocation({
        latitude: 19.0760,
        longitude: 72.8777,
        accuracy: 10,
        timestamp: Date.now()
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedImage || !location) return;
    
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsUploading(false);
    
    // Reset form
    setSelectedImage(null);
    setLocation(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className="p-6 bg-white backdrop-blur-sm border-purple-300 shadow-lg hover:shadow-xl hover:shadow-purple-600/10 transition-all duration-300">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-purple-700" />
          <h3 className="font-semibold text-slate-900">Upload Ocean Hazard Photo</h3>
        </div>

        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            id="photo-upload"
          />
          
          {!selectedImage ? (
            <label
              htmlFor="photo-upload"
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer hover:bg-purple-50 transition-colors"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Image className="w-10 h-10 mb-3 text-purple-600" />
                <p className="mb-2 text-sm text-purple-700">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-purple-600">PNG, JPG or JPEG (MAX. 10MB)</p>
              </div>
            </label>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="relative">
                <img
                  src={selectedImage}
                  alt="Selected ocean hazard"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    setSelectedImage(null);
                    setLocation(null);
                    if (fileInputRef.current) fileInputRef.current.value = '';
                  }}
                >
                  Change
                </Button>
              </div>

              {location && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-green-50 border border-green-200 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-800">Location Captured</span>
                  </div>
                  <div className="text-sm text-green-700 space-y-1">
                    <p>Latitude: {location.latitude.toFixed(6)}</p>
                    <p>Longitude: {location.longitude.toFixed(6)}</p>
                    <p>Accuracy: ±{location.accuracy.toFixed(0)}m</p>
                  </div>
                </motion.div>
              )}

              <Button
                onClick={handleUpload}
                disabled={isUploading || !location}
                className="w-full bg-blue-700 hover:bg-blue-800"
              >
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Uploading...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Upload className="w-4 h-4" />
                    <span>Upload & Report Hazard</span>
                  </div>
                )}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </Card>
  );
}