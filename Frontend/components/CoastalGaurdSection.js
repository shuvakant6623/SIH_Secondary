import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.js';
import { Badge } from './ui/badge.js';
import { Button } from './ui/button.js';
import { motion } from 'motion/react';
import { Ship, Anchor, Phone, MapPin, Clock, AlertTriangle, Radio, Shield } from 'lucide-react';

const coastGuardStations = [
  {
    id: 1,
    name: 'Mumbai Coast Guard Station',
    location: 'Mumbai, Maharashtra',
    coordinates: { lat: 18.9220, lng: 72.8347 },
    phone: '+91-22-2632-8100',
    emergency: '1554',
    status: 'operational',
    vessels: 12,
    coverage: '150 nautical miles',
    lastUpdate: '5 min ago'
  },
  {
    id: 2,
    name: 'Chennai Coast Guard District',
    location: 'Chennai, Tamil Nadu',
    coordinates: { lat: 13.0878, lng: 80.2785 },
    phone: '+91-44-2534-4600',
    emergency: '1554',
    status: 'operational',
    vessels: 15,
    coverage: '200 nautical miles',
    lastUpdate: '2 min ago'
  },
  {
    id: 3,
    name: 'Kochi Coast Guard Station',
    location: 'Kochi, Kerala',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    phone: '+91-484-266-8221',
    emergency: '1554',
    status: 'operational',
    vessels: 8,
    coverage: '120 nautical miles',
    lastUpdate: '1 min ago'
  },
  {
    id: 4,
    name: 'Visakhapatnam Station',
    location: 'Visakhapatnam, AP',
    coordinates: { lat: 17.6868, lng: 83.2185 },
    phone: '+91-891-256-4151',
    emergency: '1554',
    status: 'operational',
    vessels: 10,
    coverage: '180 nautical miles',
    lastUpdate: '8 min ago'
  }
];

const activeOperations = [
  {
    id: 1,
    type: 'search-rescue',
    title: 'Fishing Vessel Assistance',
    location: 'Off Gujarat Coast',
    status: 'ongoing',
    priority: 'high',
    startTime: '2 hours ago',
    description: 'Assisting fishing vessel with engine failure, 15 crew members on board'
  },
  {
    id: 2,
    type: 'patrol',
    title: 'Routine Maritime Patrol',
    location: 'Kerala Backwaters',
    status: 'scheduled',
    priority: 'normal',
    startTime: 'In 1 hour',
    description: 'Regular patrol for illegal fishing and safety monitoring'
  },
  {
    id: 3,
    type: 'medical',
    title: 'Medical Evacuation',
    location: 'Near Andaman Islands',
    status: 'completed',
    priority: 'critical',
    startTime: '6 hours ago',
    description: 'Emergency medical evacuation from merchant vessel completed successfully'
  }
];

const safetyAdvisories = [
  {
    id: 1,
    title: 'High Wave Warning - West Coast',
    severity: 'high',
    region: 'Maharashtra to Kerala',
    validUntil: '24 hours',
    content: 'Wave heights of 3-4 meters expected. Fishing boats advised to return to harbor.',
    timestamp: '30 min ago'
  },
  {
    id: 2,
    title: 'Navigation Alert - Chennai Port',
    severity: 'medium',
    region: 'Chennai Approaches',
    validUntil: '12 hours',
    content: 'Temporary navigation restrictions due to port maintenance operations.',
    timestamp: '1 hour ago'
  },
  {
    id: 3,
    title: 'Monsoon Preparedness',
    severity: 'low',
    region: 'All Indian Coasts',
    validUntil: '7 days',
    content: 'Monsoon season preparations. All vessels advised to check safety equipment.',
    timestamp: '4 hours ago'
  }
];

export function CoastGuardSection() {
  const [selectedStation, setSelectedStation] = useState(coastGuardStations[0]);
  const [selectedOperation, setSelectedOperation] = useState(null);

  const getOperationColor = (type) => {
    switch (type) {
      case 'search-rescue': return 'bg-red-100 text-red-800 border-red-200';
      case 'patrol': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'medical': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ongoing': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  return (
    <section className="py-16" id="coast-guard">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Indian Coast Guard Operations
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Real-time information from Indian Coast Guard operations, safety advisories, 
            and emergency contacts for coastal and maritime safety.
          </p>
        </div>

        {/* Emergency Contact Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg p-6 mb-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Emergency Maritime Assistance</h3>
                <p className="text-red-100">24/7 Coast Guard Emergency Helpline</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">1554</div>
              <div className="text-sm text-red-100">Toll-free from anywhere in India</div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Coast Guard Stations */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Anchor className="h-5 w-5 text-blue-600" />
                  Coast Guard Stations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {coastGuardStations.map((station) => (
                    <motion.div
                      key={station.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedStation(station)}
                      className={`p-3 rounded-lg cursor-pointer transition-all ${
                        selectedStation.id === station.id
                          ? 'bg-blue-50 border-2 border-blue-200'
                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-slate-900 text-sm">{station.name}</h4>
                          <Badge className="bg-green-100 text-green-800 text-xs">
                            {station.status}
                          </Badge>
                        </div>
                        <div className="text-xs text-slate-600">{station.location}</div>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{station.vessels} vessels</span>
                          <span>{station.lastUpdate}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Selected Station Details */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ship className="h-5 w-5 text-blue-600" />
                  {selectedStation.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-green-600" />
                          <span>{selectedStation.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-4 h-4 text-red-600" />
                          <span>Emergency: {selectedStation.emergency}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-blue-600" />
                          <span>{selectedStation.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-slate-900 mb-2">Operational Details</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Active Vessels:</span>
                          <span className="font-medium">{selectedStation.vessels}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Coverage Area:</span>
                          <span className="font-medium">{selectedStation.coverage}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Last Update:</span>
                          <span className="font-medium">{selectedStation.lastUpdate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-2" />
                        Emergency Call
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Radio className="w-4 h-4 mr-2" />
                        Radio Contact
                      </Button>
                      <Button variant="outline" className="w-full">
                        <MapPin className="w-4 h-4 mr-2" />
                        View on Map
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Operations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Active Operations
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {activeOperations.map((operation, index) => (
                  <motion.div
                    key={operation.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border ${getOperationColor(operation.type)} cursor-pointer hover:shadow-md transition-all`}
                    onClick={() => setSelectedOperation(operation)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{operation.title}</h4>
                      <Badge className={`text-xs ${getStatusColor(operation.status)}`}>
                        {operation.status}
                      </Badge>
                    </div>
                    <p className="text-sm mb-2">{operation.description}</p>
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{operation.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{operation.startTime}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Safety Advisories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600" />
                Safety Advisories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {safetyAdvisories.map((advisory, index) => (
                  <motion.div
                    key={advisory.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-lg border-l-4 ${getSeverityColor(advisory.severity)}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{advisory.title}</h4>
                      <Badge className={`text-xs ${
                        advisory.severity === 'high' ? 'bg-red-100 text-red-800' :
                        advisory.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {advisory.severity}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 mb-2">{advisory.content}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>Region: {advisory.region}</span>
                      <span>Valid: {advisory.validUntil}</span>
                    </div>
                    <div className="text-xs text-slate-400 mt-1">{advisory.timestamp}</div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coast Guard Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <Ship className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="text-xl font-semibold text-slate-900">
                  About Indian Coast Guard Integration
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Snapby collaborates with the Indian Coast Guard to provide real-time maritime safety 
                  information, emergency contacts, and operational updates to enhance coastal security 
                  and marine safety across India's vast coastline.
                </p>
                <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
                  <div className="text-center">
                    <div className="font-bold text-blue-600">150+</div>
                    <div>Coast Guard Stations</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-green-600">24/7</div>
                    <div>Emergency Response</div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-purple-600">1554</div>
                    <div>Emergency Helpline</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}