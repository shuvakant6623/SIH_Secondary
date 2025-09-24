import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, MapPin, Clock, Shield, ShieldCheck, AlertTriangle, Users, Filter } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useUpload } from './UploadContext';

interface SnapReport {
  id: number;
  username: string;
  location: string;
  coordinates: [number, number];
  timestamp: string;
  image: string;
  description: string;
  hazardType: 'tsunami' | 'cyclone' | 'highwaves' | 'pollution' | 'erosion';
  verified: boolean;
  votes: number;
  urgency: 'low' | 'medium' | 'high';
}

export function SnapReportsSection() {
  const [selectedReport, setSelectedReport] = useState<SnapReport | null>(null);
  const [filterType, setFilterType] = useState<'all' | 'verified' | 'unverified'>('all');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadedPhotos } = useUpload();

  const mockReports: SnapReport[] = [
    {
      id: 1,
      username: 'CoastalGuardian',
      location: 'Marina Beach, Chennai',
      coordinates: [80.2707, 13.0827],
      timestamp: '2h ago',
      image: 'https://images.unsplash.com/photo-1625224588466-56616e65dc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaCUyMHJlZCUyMGZsYWclMjB3YXJuaW5nJTIwZGFuZ2Vyb3VzfGVufDF8fHx8MTc1NzgzMTgzOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Unusual wave patterns observed. Waves reaching 4-5 meters height with strong undercurrents.',
      hazardType: 'highwaves',
      verified: true,
      votes: 24,
      urgency: 'high'
    },
    {
      id: 2,
      username: 'FisherManRaj',
      location: 'Kovalam Beach, Kerala',
      coordinates: [76.9366, 8.4004],
      timestamp: '4h ago',
      image: 'https://images.unsplash.com/photo-1559608520-25d5b139f1c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHBvbGx1dGlvbiUyMHBsYXN0aWMlMjBkZWJyaXN8ZW58MXx8fHwxNzU3ODMxODIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Oil spill spotted near fishing area. Dead fish washing ashore. Urgent cleanup needed.',
      hazardType: 'pollution',
      verified: true,
      votes: 18,
      urgency: 'high'
    },
    {
      id: 3,
      username: 'TouristAlert',
      location: 'Calangute Beach, Goa',
      coordinates: [73.7549, 15.5437],
      timestamp: '6h ago',
      image: 'https://images.unsplash.com/photo-1737470369789-7d10d3287e1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaXAlMjBjdXJyZW50JTIwd2FybmluZyUyMG9jZWFuJTIwc2FmZXR5fGVufDF8fHx8MTc1NzgzMTgzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Strong rip currents observed. Warning signs posted but conditions deteriorating.',
      hazardType: 'highwaves',
      verified: false,
      votes: 12,
      urgency: 'medium'
    },
    {
      id: 4,
      username: 'LocalReporter',
      location: 'Puri Beach, Odisha',
      coordinates: [85.8315, 19.8135],
      timestamp: '8h ago',
      image: 'https://images.unsplash.com/photo-1703586014119-4209c3151381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwZmxvb2RpbmclMjBiZWFjaCUyMGVyb3Npb258ZW58MXx8fHwxNzU3ODMxODE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Coastal erosion accelerating. Beach width reduced by 30% in past month.',
      hazardType: 'erosion',
      verified: true,
      votes: 31,
      urgency: 'medium'
    },
    {
      id: 5,
      username: 'WeatherWatcher',
      location: 'Vizag Port, Andhra Pradesh',
      coordinates: [83.3018, 17.6868],
      timestamp: '10h ago',
      image: 'https://images.unsplash.com/photo-1443376133869-19bce1f036e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXNoaW5nJTIwYm9hdHMlMjBzdG9ybSUyMHdhcm5pbmd8ZW58MXx8fHwxNzU3ODMxODI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Cyclonic winds building up. Fishing boats advised to return immediately.',
      hazardType: 'cyclone',
      verified: false,
      votes: 7,
      urgency: 'high'
    },
    {
      id: 6,
      username: 'LifeguardMumbai',
      location: 'Juhu Beach, Mumbai',
      coordinates: [72.8261, 19.0990],
      timestamp: '12h ago',
      image: 'https://images.unsplash.com/photo-1728863020566-2dc91f1ebce6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHN0b3JtJTIwd2F2ZXMlMjBkYW5nZXJvdXN8ZW58MXx8fHwxNTc3ODMxODE0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Severe storm approaching. Waves exceeding 6 meters. All beach activities suspended.',
      hazardType: 'tsunami',
      verified: true,
      votes: 89,
      urgency: 'high'
    },
    {
      id: 7,
      username: 'FishermanGuild',
      location: 'Karwar Harbor, Karnataka',
      coordinates: [74.1240, 14.8142],
      timestamp: '14h ago',
      image: 'https://images.unsplash.com/photo-1678038871396-11a556621764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjb2FzdGxpbmUlMjBvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc1NzY5MTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Chemical spill reported 5km offshore. Marine life affected. Immediate intervention required.',
      hazardType: 'pollution',
      verified: true,
      votes: 156,
      urgency: 'high'
    },
    {
      id: 8,
      username: 'TouristSafety',
      location: 'Mahabalipuram Beach, Tamil Nadu',
      coordinates: [80.1927, 12.6269],
      timestamp: '16h ago',
      image: 'https://images.unsplash.com/photo-1625224588466-56616e65dc59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHdhdmVzJTIwdHN1bmFtaSUyMHdhcm5pbmd8ZW58MXx8fHwxNzU3NjkyNDM0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Dangerous undertow currents detected. Several rescue operations conducted today.',
      hazardType: 'highwaves',
      verified: false,
      votes: 43,
      urgency: 'medium'
    },
    {
      id: 9,
      username: 'EnviroWatch',
      location: 'Sundarbans Delta, West Bengal',
      coordinates: [88.8023, 22.1575],
      timestamp: '18h ago',
      image: 'https://images.unsplash.com/photo-1703586014119-4209c3151381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwZmxvb2RpbmclMjBiZWFjaCUyMGVyb3Npb258ZW58MXx8fHwxNzU3ODMxODE4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Mangrove destruction accelerating due to high tide surges. Ecosystem at risk.',
      hazardType: 'erosion',
      verified: true,
      votes: 78,
      urgency: 'medium'
    },
    {
      id: 10,
      username: 'PortAuthority',
      location: 'Paradip Port, Odisha',
      coordinates: [86.6109, 20.3059],
      timestamp: '20h ago',
      image: 'https://images.unsplash.com/photo-1753024818769-b7211bd55587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwZ3VhcmQlMjBzaGlwJTIwaW5kaWF8ZW58MXx8fHwxNzU3NjkxNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      description: 'Cyclone Yaas remnants causing unusual wave patterns. Port operations suspended.',
      hazardType: 'cyclone',
      verified: true,
      votes: 203,
      urgency: 'high'
    }
  ];

  const getHazardColor = (type: string) => {
    switch (type) {
      case 'tsunami': return 'bg-red-100 text-red-800 border-red-200';
      case 'cyclone': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'highwaves': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'pollution': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'erosion': return 'bg-brown-100 text-brown-800 border-brown-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getHazardIcon = (type: string) => {
    switch (type) {
      case 'tsunami': return '🌊';
      case 'cyclone': return '🌀';
      case 'highwaves': return '〰️';
      case 'pollution': return '☣️';
      case 'erosion': return '⛰️';
      default: return '⚠️';
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500';
      case 'medium': return 'bg-orange-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Convert uploaded photos to report format
  const convertedUploads: SnapReport[] = uploadedPhotos.map(photo => ({
    id: photo.id,
    username: photo.username,
    location: photo.location.address || "Indian Coastline",
    coordinates: [photo.location.longitude, photo.location.latitude],
    timestamp: new Date(photo.location.timestamp).toLocaleTimeString() + " (just uploaded)",
    image: photo.image,
    description: photo.description || "Recently uploaded hazard report",
    hazardType: (photo.hazardType as any) || 'highwaves',
    verified: photo.verified,
    votes: photo.votes,
    urgency: (photo.urgency as any) || 'medium'
  }));

  const allReports = [...convertedUploads, ...mockReports];
  
  const filteredReports = allReports.filter(report => {
    if (filterType === 'verified') return report.verified;
    if (filterType === 'unverified') return !report.verified;
    return true;
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Community Snap Reports</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Real-time hazard reports from our community of coastal observers, fishermen, and safety personnel.
        </p>
      </div>

      <Tabs defaultValue="reports" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="reports" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Community Reports</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>Upload Snapby</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Filter Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium">Filter:</span>
              </div>
              <div className="flex space-x-2">
                {['all', 'verified', 'unverified'].map((filter) => (
                  <Button
                    key={filter}
                    variant={filterType === filter ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterType(filter as any)}
                    className="capitalize"
                  >
                    {filter}
                  </Button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>Low</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>Medium</span>
              </span>
              <span className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>High</span>
              </span>
            </div>
          </div>

          {/* Reports Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredReports.map((report) => (
              <motion.div
                key={report.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                className="cursor-pointer"
                onClick={() => setSelectedReport(report)}
              >
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <ImageWithFallback
                      src={report.image}
                      alt={`Report from ${report.location}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-2 left-2 flex space-x-2">
                      <div className={`w-3 h-3 rounded-full ${getUrgencyColor(report.urgency)}`}></div>
                      {report.verified ? (
                        <Badge className="bg-green-100 text-green-800">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          <Shield className="w-3 h-3 mr-1" />
                          Pending
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge className={getHazardColor(report.hazardType)}>
                        <span className="mr-1">{getHazardIcon(report.hazardType)}</span>
                        {report.hazardType.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">@{report.username}</span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {report.timestamp}
                      </span>
                    </div>
                    
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {report.location}
                    </div>
                    
                    <p className="text-sm text-gray-700 line-clamp-2 mb-3">
                      {report.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        👍 {report.votes} votes
                      </span>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upload" className="space-y-6">
          <Card className="p-8 bg-gradient-to-br from-cyan-50 to-blue-50">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-blue-900 mb-2">Upload Your Snapby</h3>
              <p className="text-blue-700">
                Help your community by reporting ocean hazards with GPS-enabled photos
              </p>
            </div>

            <div className="max-w-2xl mx-auto space-y-6">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="snapby-upload"
              />

              {!uploadedImage ? (
                <label
                  htmlFor="snapby-upload"
                  className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-12 h-12 mb-4 text-blue-400" />
                    <p className="mb-2 text-lg text-blue-600">
                      <span className="font-semibold">Click to upload</span> your hazard photo
                    </p>
                    <p className="text-sm text-blue-500">
                      PNG, JPG or JPEG (MAX. 10MB) • GPS location will be automatically captured
                    </p>
                  </div>
                </label>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="relative">
                    <ImageWithFallback
                      src={uploadedImage}
                      alt="Uploaded hazard report"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <Button
                      variant="secondary"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setUploadedImage(null);
                        if (fileInputRef.current) fileInputRef.current.value = '';
                      }}
                    >
                      Change Photo
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Hazard Type</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>High Waves</option>
                        <option>Pollution</option>
                        <option>Coastal Erosion</option>
                        <option>Cyclone Warning</option>
                        <option>Tsunami Alert</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Urgency Level</label>
                      <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                        <option>High Priority</option>
                        <option>Medium Priority</option>
                        <option>Low Priority</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows={4}
                      placeholder="Describe the hazard you observed..."
                    ></textarea>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">GPS Location Captured</span>
                    </div>
                    <p className="text-sm text-green-700">
                      Lat: 19.0760, Lng: 72.8777 (±10m accuracy)
                    </p>
                  </div>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
                    <Upload className="w-4 h-4 mr-2" />
                    Submit Snapby Report
                  </Button>
                </motion.div>
              )}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Report Detail Modal */}
      {selectedReport && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedReport(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <ImageWithFallback
                src={selectedReport.image}
                alt={`Report from ${selectedReport.location}`}
                className="w-full h-64 object-cover rounded-t-lg"
              />
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setSelectedReport(null)}
              >
                ✕
              </Button>
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Report #{selectedReport.id}</h3>
                <div className="flex space-x-2">
                  {selectedReport.verified ? (
                    <Badge className="bg-green-100 text-green-800">
                      <ShieldCheck className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  ) : (
                    <Badge variant="outline">
                      <Shield className="w-3 h-3 mr-1" />
                      Pending Verification
                    </Badge>
                  )}
                  <Badge className={getHazardColor(selectedReport.hazardType)}>
                    <span className="mr-1">{getHazardIcon(selectedReport.hazardType)}</span>
                    {selectedReport.hazardType.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Reporter</h4>
                  <p className="text-gray-600">@{selectedReport.username}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Location</h4>
                  <p className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {selectedReport.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    {selectedReport.coordinates[1]}, {selectedReport.coordinates[0]}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-700">{selectedReport.description}</p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {selectedReport.timestamp}
                    </span>
                    <span className="text-sm text-gray-500">
                      👍 {selectedReport.votes} votes
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      👍 Upvote
                    </Button>
                    <Button variant="outline" size="sm">
                      📍 View on Map
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}