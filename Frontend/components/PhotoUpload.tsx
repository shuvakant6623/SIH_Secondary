import { useState, useRef } from 'react';
import { Camera, MapPin, Upload, Image, Map, Crosshair } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useUpload } from './UploadContext';
import { UploadSuccessPopup } from './UploadSuccessPopup';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
  altitude?: number;
  speed?: number;
}

export function PhotoUpload() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [uploadedData, setUploadedData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { addUploadedPhoto } = useUpload();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        getCurrentLocation();
      };
      reader.readAsDataURL(file);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude || undefined,
            speed: position.coords.speed || undefined,
            timestamp: Date.now(),
            address: getLocationAddress(position.coords.latitude, position.coords.longitude)
          };
          setLocation(locationData);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Mock location for demo with more precise coordinates
          const mockCoords = getMockCoastalLocation();
          setLocation(mockCoords);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    } else {
      // Mock location for demo
      const mockCoords = getMockCoastalLocation();
      setLocation(mockCoords);
    }
  };

  const getMockCoastalLocation = () => {
    // Random Indian coastal locations for demo
    const coastalLocations = [
      { name: "Marine Drive, Mumbai", lat: 18.943582, lng: 72.823776, acc: 8 },
      { name: "Marina Beach, Chennai", lat: 13.048319, lng: 80.282463, acc: 12 },
      { name: "Calangute Beach, Goa", lat: 15.543697, lng: 73.755035, acc: 6 },
      { name: "Kovalam Beach, Kerala", lat: 8.400568, lng: 76.978016, acc: 15 },
      { name: "Puri Beach, Odisha", lat: 19.813542, lng: 85.831329, acc: 10 }
    ];
    
    const randomLocation = coastalLocations[Math.floor(Math.random() * coastalLocations.length)];
    
    return {
      latitude: randomLocation.lat + (Math.random() - 0.5) * 0.001, // Add small random offset
      longitude: randomLocation.lng + (Math.random() - 0.5) * 0.001,
      accuracy: randomLocation.acc + Math.floor(Math.random() * 5),
      altitude: Math.floor(Math.random() * 50) + 5,
      timestamp: Date.now(),
      address: randomLocation.name
    };
  };

  const getLocationAddress = (lat: number, lng: number) => {
    // Mock reverse geocoding for demo
    if (lat >= 18.9 && lat <= 19.1 && lng >= 72.8 && lng <= 73.0) return "Marine Drive, Mumbai";
    if (lat >= 13.0 && lat <= 13.1 && lng >= 80.2 && lng <= 80.3) return "Marina Beach, Chennai";
    if (lat >= 15.5 && lat <= 15.6 && lng >= 73.7 && lng <= 73.8) return "Calangute Beach, Goa";
    return "Indian Coastline";
  };

  const handleUpload = async () => {
    if (!selectedImage || !location) return;
    
    setIsUploading(true);
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add to uploaded photos context
    const newUpload = {
      id: Date.now(),
      image: selectedImage,
      location: location,
      description: "User-uploaded hazard report from PhotoUpload component",
      hazardType: "highwaves", // Default for demo
      urgency: "medium",
      username: "SnapbyUser",
      verified: false,
      votes: 0,
    };
    
    addUploadedPhoto(newUpload);
    setIsUploading(false);
    
    // Store upload data for popup
    setUploadedData({
      image: selectedImage,
      location: location,
      timestamp: Date.now()
    });
    
    // Reset form
    setSelectedImage(null);
    setLocation(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Show success popup
    setShowSuccessPopup(true);
  };

  return (
    <>
      <Card className="p-6 bg-white/95 backdrop-blur-enhanced border-teal-200 shadow-lg hover:shadow-xl hover:shadow-violet-500/15 transition-all duration-500 ease-wave">
        <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-violet-600" />
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
              className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-teal-300 hover:border-violet-400 rounded-lg cursor-pointer hover:bg-teal-50/50 transition-all duration-300 ease-wave"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Image className="w-10 h-10 mb-3 text-teal-600" />
                <p className="mb-2 text-sm text-violet-700">
                  <span className="font-semibold">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-teal-600">PNG, JPG or JPEG (MAX. 10MB)</p>
              </div>
            </label>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              <div className="relative">
                <ImageWithFallback
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
                  className="space-y-4"
                >
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Crosshair className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">GPS Location Captured</span>
                    </div>
                    <div className="text-sm text-green-700 space-y-1">
                      <p>📍 <strong>Address:</strong> {location.address || "Coastal Region"}</p>
                      <p>🌐 <strong>Latitude:</strong> {location.latitude.toFixed(8)}°</p>
                      <p>🌐 <strong>Longitude:</strong> {location.longitude.toFixed(8)}°</p>
                      <div className="flex items-center justify-between">
                        <span>📶 <strong>Accuracy:</strong> ±{location.accuracy.toFixed(1)}m</span>
                        {location.altitude && (
                          <span>⛰️ <strong>Altitude:</strong> {location.altitude.toFixed(1)}m</span>
                        )}
                      </div>
                      <p>⏰ <strong>Captured:</strong> {new Date(location.timestamp).toLocaleTimeString()}</p>
                    </div>
                  </div>

                  {/* Demo Map View */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Map className="w-4 h-4 text-slate-600" />
                        <span className="font-medium text-slate-800">Location Preview</span>
                      </div>
                      <Button variant="outline" size="sm" className="text-xs">
                        View Full Map
                      </Button>
                    </div>
                    
                    <div className="relative bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg h-32 overflow-hidden">
                      {/* Mock map with pinpoint */}
                      <div className="absolute inset-0 opacity-40">
                        <div className="w-full h-full bg-gradient-to-br from-blue-200 via-cyan-100 to-teal-200"></div>
                        {/* Mock coastline pattern */}
                        <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-r from-yellow-200 via-amber-100 to-yellow-200 opacity-60"></div>
                        <div className="absolute bottom-4 left-0 w-full h-4 bg-gradient-to-r from-blue-300 via-cyan-200 to-blue-300 opacity-80"></div>
                      </div>
                      
                      {/* Animated pinpoint */}
                      <motion.div
                        initial={{ scale: 0, y: -20 }}
                        animate={{ scale: 1, y: 0 }}
                        transition={{ delay: 0.5, type: "spring" }}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                      >
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="relative"
                        >
                          <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                          <motion.div
                            animate={{ scale: [1, 2, 1], opacity: [0.7, 0, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-0 w-4 h-4 bg-red-500 rounded-full"
                          ></motion.div>
                        </motion.div>
                      </motion.div>
                      
                      {/* Location coordinates overlay */}
                      <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs font-mono text-slate-700">
                        {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
                      </div>
                      
                      {/* Accuracy circle indicator */}
                      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded text-xs text-slate-600">
                        ±{location.accuracy.toFixed(0)}m
                      </div>
                    </div>
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

    <UploadSuccessPopup
      isOpen={showSuccessPopup}
      onClose={() => setShowSuccessPopup(false)}
      uploadData={uploadedData}
    />
    </>
  );
}