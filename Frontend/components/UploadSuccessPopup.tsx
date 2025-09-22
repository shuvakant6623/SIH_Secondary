import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, X, Camera, MapPin, Clock } from 'lucide-react';
import { Button } from './ui/button';

interface UploadSuccessPopupProps {
  isOpen: boolean;
  onClose: () => void;
  uploadData?: {
    image: string;
    location: {
      latitude: number;
      longitude: number;
      address?: string;
    };
    timestamp: number;
  };
}

export function UploadSuccessPopup({ isOpen, onClose, uploadData }: UploadSuccessPopupProps) {
  useEffect(() => {
    if (isOpen) {
      // Auto close after 5 seconds
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.7, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.7, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-500 to-teal-600 p-6 text-white">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 400 }}
                className="flex items-center justify-center mb-4"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-xl font-bold text-center mb-2"
              >
                Upload Successful! 🌊
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center text-white/90 text-sm"
              >
                Your ocean hazard report has been submitted
              </motion.p>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {uploadData && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="space-y-4"
                >
                  {/* Image Preview */}
                  <div className="relative overflow-hidden rounded-lg">
                    <img
                      src={uploadData.image}
                      alt="Uploaded hazard"
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1">
                      <Camera className="w-3 h-3 text-green-600" />
                      <span className="text-xs font-medium text-green-800">Photo Captured</span>
                    </div>
                  </div>

                  {/* Location Info */}
                  <div className="bg-slate-50 rounded-lg p-3 space-y-2">
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-indigo-600" />
                      <span className="font-medium text-slate-900">Location Captured</span>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1 ml-6">
                      <div>📍 {uploadData.location.address || "Coastal Region"}</div>
                      <div>🌐 {uploadData.location.latitude.toFixed(6)}°, {uploadData.location.longitude.toFixed(6)}°</div>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="flex items-center justify-center space-x-2 text-xs text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>Reported at {new Date(uploadData.timestamp).toLocaleString()}</span>
                  </div>
                </motion.div>
              )}

              {/* Success Messages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="space-y-3"
              >
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                    <div className="text-sm text-green-800">
                      <strong>Photo uploaded</strong> - Your image has been successfully stored with GPS coordinates
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                    <div className="text-sm text-blue-800">
                      <strong>Report submitted</strong> - Coast Guard and authorities have been notified
                    </div>
                  </div>
                </div>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-teal-500 rounded-full mt-1.5"></div>
                    <div className="text-sm text-teal-800">
                      <strong>Community updated</strong> - Your report is now visible in Snap Reports section
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex space-x-3 pt-2"
              >
                <Button
                  onClick={onClose}
                  className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-500 hover:to-teal-500 text-white"
                >
                  Continue Reporting
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    onClose();
                    // In a real app, this would navigate to snap reports
                    window.dispatchEvent(new CustomEvent('navigate-to-snap-reports'));
                  }}
                  className="flex-1"
                >
                  View Reports
                </Button>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <div className="h-1 bg-slate-200">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-green-500 to-teal-600"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}