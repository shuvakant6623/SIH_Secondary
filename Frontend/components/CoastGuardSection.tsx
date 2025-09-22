import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Radio, Camera, AlertTriangle, MapPin, Phone, Clock, Users, Ship, Binoculars } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Operation {
  id: string;
  type: 'rescue' | 'patrol' | 'surveillance' | 'cleanup';
  location: string;
  coordinates: [number, number];
  status: 'active' | 'completed' | 'standby';
  priority: 'low' | 'medium' | 'high' | 'critical';
  startTime: string;
  description: string;
  personnelCount: number;
  vesselType: string;
}

interface SurveillanceCamera {
  id: string;
  name: string;
  location: string;
  coordinates: [number, number];
  status: 'online' | 'offline' | 'maintenance';
  lastUpdate: string;
  capabilities: string[];
  currentView: string;
}

export function CoastGuardSection() {
  const [selectedOperation, setSelectedOperation] = useState<Operation | null>(null);
  const [selectedCamera, setSelectedCamera] = useState<SurveillanceCamera | null>(null);

  const operations: Operation[] = [
    {
      id: 'OP-2024-001',
      type: 'rescue',
      location: 'Mumbai Coast, 15nm offshore',
      coordinates: [72.8777, 19.0760],
      status: 'active',
      priority: 'critical',
      startTime: '14:30',
      description: 'Fishing vessel in distress, 12 crew members. Engine failure in rough seas.',
      personnelCount: 25,
      vesselType: 'Fast Patrol Vessel + Helicopter'
    },
    {
      id: 'OP-2024-002',
      type: 'cleanup',
      location: 'Kochi Backwaters',
      coordinates: [76.2673, 9.9312],
      status: 'active',
      priority: 'high',
      startTime: '08:00',
      description: 'Oil spill containment and cleanup operation. 500L diesel leak from cargo vessel.',
      personnelCount: 35,
      vesselType: 'Pollution Response Vessel'
    },
    {
      id: 'OP-2024-003',
      type: 'patrol',
      location: 'Goa Coastal Waters',
      coordinates: [73.8278, 15.2993],
      status: 'active',
      priority: 'medium',
      startTime: '06:00',
      description: 'Routine coastal patrol and fishermen safety check during monsoon season.',
      personnelCount: 12,
      vesselType: 'Interceptor Boat'
    },
    {
      id: 'OP-2024-004',
      type: 'surveillance',
      location: 'Andaman Sea',
      coordinates: [92.7265, 11.6234],
      status: 'standby',
      priority: 'medium',
      startTime: '20:00',
      description: 'Maritime border surveillance and anti-smuggling operation.',
      personnelCount: 18,
      vesselType: 'Offshore Patrol Vessel'
    }
  ];

  const cameras: SurveillanceCamera[] = [
    {
      id: 'CAM-MUM-01',
      name: 'Mumbai Port Entry',
      location: 'Mumbai Harbor',
      coordinates: [72.8777, 19.0760],
      status: 'online',
      lastUpdate: '30 seconds ago',
      capabilities: ['4K Video', 'Night Vision', 'Pan/Tilt/Zoom', 'Weather Monitoring'],
      currentView: 'Harbor entrance with 12 vessels in queue'
    },
    {
      id: 'CAM-CHN-01',
      name: 'Chennai Marina',
      location: 'Marina Beach',
      coordinates: [80.2707, 13.0827],
      status: 'online',
      lastUpdate: '1 minute ago',
      capabilities: ['HD Video', 'Thermal Imaging', 'Motion Detection'],
      currentView: 'Beach area with high wave activity, red flag conditions'
    },
    {
      id: 'CAM-GOA-01',
      name: 'Panaji Jetty',
      location: 'Mandovi River Mouth',
      coordinates: [73.8278, 15.2993],
      status: 'online',
      lastUpdate: '45 seconds ago',
      capabilities: ['4K Video', 'Night Vision', 'Auto-tracking'],
      currentView: 'Normal vessel traffic, calm water conditions'
    },
    {
      id: 'CAM-VZG-01',
      name: 'Visakhapatnam Port',
      location: 'Vizag Harbor',
      coordinates: [83.3018, 17.6868],
      status: 'maintenance',
      lastUpdate: '2 hours ago',
      capabilities: ['HD Video', 'Pan/Tilt', 'Weather Station'],
      currentView: 'Scheduled maintenance - Expected online by 18:00'
    },
    {
      id: 'CAM-AND-01',
      name: 'Andaman Gateway',
      location: 'Port Blair Approach',
      coordinates: [92.7265, 11.6234],
      status: 'online',
      lastUpdate: '15 seconds ago',
      capabilities: ['4K Video', 'Radar Integration', 'Long Range'],
      currentView: 'Clear visibility, 3 fishing vessels approaching harbor'
    }
  ];

  const safetyAdvisories = [
    {
      id: 1,
      title: 'Cyclone Warning - Eastern Coast',
      region: 'Andhra Pradesh to Odisha',
      severity: 'critical',
      issued: '2 hours ago',
      details: 'Severe cyclonic storm approaching. All fishing operations suspended. Coastal evacuation advised.',
      validUntil: '72 hours'
    },
    {
      id: 2,
      title: 'High Seas Advisory - Western Coast',
      region: 'Mumbai to Goa',
      severity: 'high',
      issued: '4 hours ago',
      details: 'Wave heights 3-4m expected. Small craft operators exercise caution. Monitor weather updates.',
      validUntil: '24 hours'
    },
    {
      id: 3,
      title: 'Navigation Warning - Kerala Coast',
      region: 'Kochi to Kollam',
      severity: 'medium',
      issued: '6 hours ago',
      details: 'Oil spill cleanup in progress. Maintain 500m distance from marked areas. Alternative routes advised.',
      validUntil: '48 hours'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'online': return 'bg-green-100 text-green-800';
      case 'standby': case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'completed': case 'offline': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      default: return 'border-l-blue-500 bg-blue-50';
    }
  };

  const getOperationIcon = (type: string) => {
    switch (type) {
      case 'rescue': return '🚁';
      case 'patrol': return '⛵';
      case 'surveillance': return '👁️';
      case 'cleanup': return '🧹';
      default: return '🚢';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1753024818769-b7211bd55587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwZ3VhcmQlMjBzaGlwJTIwaW5kaWF8ZW58MXx8fHwxNzU3NjkxNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Indian Coast Guard"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-600"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Indian Coast Guard</h2>
            <p className="text-blue-600">समुद्री सुरक्षा - हमारी प्राथमिकता</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          24/7 maritime safety operations, surveillance, and emergency response across India's coastline
        </p>
      </div>

      {/* Emergency Contact */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl p-6 text-center"
      >
        <div className="flex items-center justify-center space-x-4">
          <Phone className="w-8 h-8" />
          <div>
            <h3 className="text-2xl font-bold">Emergency Helpline</h3>
            <p className="text-xl">1554</p>
            <p className="text-sm opacity-90">24x7 Maritime Emergency Response</p>
          </div>
          <Radio className="w-8 h-8" />
        </div>
      </motion.div>

      <Tabs defaultValue="operations" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="operations" className="flex items-center space-x-2">
            <Ship className="w-4 h-4" />
            <span>Current Operations</span>
          </TabsTrigger>
          <TabsTrigger value="surveillance" className="flex items-center space-x-2">
            <Camera className="w-4 h-4" />
            <span>Surveillance</span>
          </TabsTrigger>
          <TabsTrigger value="advisories" className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Safety Advisories</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="operations" className="space-y-6">
          {/* Operations Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-gradient-to-br from-red-50 to-red-100 border-red-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-600">Critical Operations</p>
                  <p className="text-2xl font-bold text-red-700">
                    {operations.filter(op => op.priority === 'critical').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Active Operations</p>
                  <p className="text-2xl font-bold text-blue-700">
                    {operations.filter(op => op.status === 'active').length}
                  </p>
                </div>
                <Ship className="w-8 h-8 text-blue-500" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Personnel Deployed</p>
                  <p className="text-2xl font-bold text-green-700">
                    {operations.reduce((sum, op) => sum + op.personnelCount, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600">Assets Deployed</p>
                  <p className="text-2xl font-bold text-purple-700">
                    {operations.length}
                  </p>
                </div>
                <Shield className="w-8 h-8 text-purple-500" />
              </div>
            </Card>
          </div>

          {/* Operations List */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {operations.map((operation) => (
              <motion.div
                key={operation.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="cursor-pointer"
                onClick={() => setSelectedOperation(operation)}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{getOperationIcon(operation.type)}</span>
                      <div>
                        <h3 className="font-semibold capitalize">{operation.type} Operation</h3>
                        <p className="text-sm text-gray-600">{operation.id}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={getStatusColor(operation.status)}>
                        {operation.status.toUpperCase()}
                      </Badge>
                      <Badge className={getPriorityColor(operation.priority)}>
                        {operation.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{operation.location}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Started at {operation.startTime}</span>
                    </div>

                    <p className="text-sm text-gray-700 line-clamp-2">
                      {operation.description}
                    </p>

                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <Users className="w-4 h-4" />
                          <span>{operation.personnelCount} Personnel</span>
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="surveillance" className="space-y-6">
          {/* Camera Network Status */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600">Online Cameras</p>
                  <p className="text-2xl font-bold text-green-700">
                    {cameras.filter(cam => cam.status === 'online').length}
                  </p>
                </div>
                <Camera className="w-8 h-8 text-green-500" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600">Maintenance</p>
                  <p className="text-2xl font-bold text-orange-700">
                    {cameras.filter(cam => cam.status === 'maintenance').length}
                  </p>
                </div>
                <Binoculars className="w-8 h-8 text-orange-500" />
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600">Coverage Areas</p>
                  <p className="text-2xl font-bold text-blue-700">12</p>
                </div>
                <MapPin className="w-8 h-8 text-blue-500" />
              </div>
            </Card>
          </div>

          {/* Surveillance Cameras */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {cameras.map((camera) => (
              <motion.div
                key={camera.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedCamera(camera)}
              >
                <Card className="p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Camera className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{camera.name}</h3>
                        <p className="text-sm text-gray-600">{camera.id}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(camera.status)}>
                      {camera.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{camera.location}</span>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>Updated {camera.lastUpdate}</span>
                    </div>

                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-700 font-medium mb-2">Current View:</p>
                      <p className="text-sm text-gray-600">{camera.currentView}</p>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {camera.capabilities.slice(0, 3).map((capability, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {capability}
                        </Badge>
                      ))}
                      {camera.capabilities.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{camera.capabilities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Live Feed Simulation */}
          <Card className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold">Live Surveillance Feed</h3>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-sm">LIVE</span>
              </div>
            </div>
            
            <div className="bg-black rounded-lg p-8 text-center">
              <Camera className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-400 mb-2">Select a camera from above to view live feed</p>
              <p className="text-sm text-gray-500">
                {selectedCamera ? `Viewing: ${selectedCamera.name}` : 'No camera selected'}
              </p>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="advisories" className="space-y-6">
          {/* Safety Advisories */}
          <div className="space-y-4">
            {safetyAdvisories.map((advisory) => (
              <motion.div
                key={advisory.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`border-l-4 p-6 rounded-r-lg ${getSeverityColor(advisory.severity)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className={`w-6 h-6 ${
                      advisory.severity === 'critical' ? 'text-red-500' :
                      advisory.severity === 'high' ? 'text-orange-500' :
                      advisory.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                    }`} />
                    <div>
                      <h3 className="font-bold text-lg">{advisory.title}</h3>
                      <p className="text-sm text-gray-600">{advisory.region}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className={getPriorityColor(advisory.severity)}>
                      {advisory.severity.toUpperCase()}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">Issued {advisory.issued}</p>
                  </div>
                </div>

                <p className="text-gray-700 mb-4">{advisory.details}</p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Valid for: {advisory.validUntil}
                  </span>
                  <Button variant="outline" size="sm">
                    Full Advisory
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Actions */}
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <h3 className="font-semibold mb-4 flex items-center">
              <Phone className="w-5 h-5 mr-2 text-blue-600" />
              Emergency Contacts & Procedures
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Emergency Numbers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Maritime Emergency:</span>
                    <span className="font-mono font-bold text-red-600">1554</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Search & Rescue:</span>
                    <span className="font-mono font-bold">1545</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marine Pollution:</span>
                    <span className="font-mono font-bold">1800-425-9999</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VHF Emergency:</span>
                    <span className="font-mono font-bold">Channel 16</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Quick Actions</h4>
                <div className="space-y-2">
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Radio className="w-4 h-4 mr-2" />
                    Report Emergency
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <MapPin className="w-4 h-4 mr-2" />
                    Share Location
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Weather Update
                  </Button>
                  <Button variant="outline" size="sm" className="w-full justify-start">
                    <Shield className="w-4 h-4 mr-2" />
                    Safety Guidelines
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
}