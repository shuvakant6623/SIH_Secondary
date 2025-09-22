import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UploadedPhoto {
  id: number;
  image: string;
  location: {
    latitude: number;
    longitude: number;
    accuracy: number;
    address?: string;
    altitude?: number;
    timestamp: number;
  };
  description?: string;
  hazardType?: string;
  urgency?: string;
  username: string;
  verified: boolean;
  votes: number;
}

interface UploadContextType {
  uploadedPhotos: UploadedPhoto[];
  addUploadedPhoto: (photo: UploadedPhoto) => void;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export function UploadProvider({ children }: { children: ReactNode }) {
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);

  const addUploadedPhoto = (photo: UploadedPhoto) => {
    setUploadedPhotos(prev => [photo, ...prev]);
  };

  return (
    <UploadContext.Provider value={{ uploadedPhotos, addUploadedPhoto }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useUpload() {
  const context = useContext(UploadContext);
  if (context === undefined) {
    throw new Error('useUpload must be used within an UploadProvider');
  }
  return context;
}