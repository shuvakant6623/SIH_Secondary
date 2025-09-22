import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.js';
import { Badge } from './ui/badge.js';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Waves, Thermometer, Wind, Eye, MapPin } from 'lucide-react';

const mockStations = [
  {
    id: 1,
    name: 'Mumbai High',
    location: 'Maharashtra',
    coordinates: { lat: 19.0760, lng: 72.8777 },
    waveHeight: 2.8,
    temperature: 28.5,
    windSpeed: 12.3,
    status: 'active',
    lastUpdate: '2 min ago'
  },
  {
    id: 2,
    name: 'Chennai Port',
    location: 'Tamil Nadu',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    waveHeight: 1.9,
    temperature: 29.1,
    windSpeed: 8.7,
    status: 'active',
    lastUpdate: '1 min ago'
  },
  {
    id: 3,
    name: 'Kochi Buoy',
    location: 'Kerala',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    waveHeight: 1.2,
    temperature: 30.2,
    windSpeed: 6.4,
    status: 'active',
    lastUpdate: '3 min ago'
  },
  {
    id: 4,
    name: 'Visakhapatnam',
    location: 'Andhra Pradesh',
    coordinates: { lat: 17.6868, lng: 83.2185 },
    waveHeight: 2.1,
    temperature: 27.8,
    windSpeed: 15.2,
    status: 'maintenance',
    lastUpdate: '1 hr ago'
  }
];

const trendData = [
  { time: '00:00', waves: 1.2, temp: 28.1, wind: 8.5 },
  { time: '06:00', waves: 1.8, temp: 28.3, wind: 10.2 },
  { time: '12:00', waves: 2.4, temp: 29.1, wind: 12.8 },
  { time: '18:00', waves: 2.1, temp: 28.9, wind: 11.3 },
  { time: '24:00', waves: 1.6, temp: 28.2, wind: 9.1 }
];

export function INCOISSection() {
  const [selectedStation, setSelectedStation] = useState(mockStations[0]);
  const [liveData, setLiveData] = useState({
    totalStations: 26,
    activeStations: 23,
    avgWaveHeight: 2.1,
    alerts: 3
  });

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        avgWaveHeight: (2.0 + Math.random() * 0.4).toFixed(1)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getWaveColor = (height) => {
    if (height >= 3) return 'text-red-600';
    if (height >= 2) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <section className="py-16" id="incois">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            INCOIS Oceanographic Data
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Real-time oceanographic data from the Indian National Centre for Ocean Information Services,
            providing crucial insights for coastal safety and marine operations.
          </p>
        </div>

        {/* Live Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center border-green-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-green-700 mb-2">
                  {liveData.totalStations}
                </div>
                <div className="text-sm text-slate-600">Total Stations</div>
                <div className="flex items-center justify-center mt-2">
                  <MapPin className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-xs text-green-600">Nationwide</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="text-center border-blue-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-blue-700 mb-2">
                  {liveData.activeStations}
                </div>
                <div className="text-sm text-slate-600">Active Now</div>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                  <span className="text-xs text-green-600">Live Feed</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="text-center border-purple-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-purple-700 mb-2">
                  {liveData.avgWaveHeight}m
                </div>
                <div className="text-sm text-slate-600">Avg Wave Height</div>
                <div className="flex items-center justify-center mt-2">
                  <TrendingUp className="w-4 h-4 text-purple-600 mr-1" />
                  <span className="text-xs text-purple-600">+0.2m</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="text-center border-orange-200">
              <CardContent className="p-6">
                <div className="text-3xl font-bold text-orange-700 mb-2">
                  {liveData.alerts}
                </div>
                <div className="text-sm text-slate-600">Active Alerts</div>
                <div className="flex items-center justify-center mt-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
                  <span className="text-xs text-orange-600">Monitoring</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Station Data */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Station List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Monitoring Stations
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {mockStations.map((station) => (
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
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900">{station.name}</h4>
                        <Badge className={`text-xs ${getStatusColor(station.status)}`}>
                          {station.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-slate-600 mb-2">{station.location}</div>
                      <div className="flex items-center justify-between text-xs">
                        <span className={`font-medium ${getWaveColor(station.waveHeight)}`}>
                          {station.waveHeight}m waves
                        </span>
                        <span className="text-slate-500">{station.lastUpdate}</span>
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
                  <Waves className="h-5 w-5 text-blue-600" />
                  {selectedStation.name} - Live Data
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Waves className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className={`text-2xl font-bold mb-1 ${getWaveColor(selectedStation.waveHeight)}`}>
                      {selectedStation.waveHeight}m
                    </div>
                    <div className="text-sm text-slate-600">Wave Height</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Thermometer className="w-8 h-8 text-red-500" />
                    </div>
                    <div className="text-2xl font-bold text-red-600 mb-1">
                      {selectedStation.temperature}°C
                    </div>
                    <div className="text-sm text-slate-600">Sea Temperature</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Wind className="w-8 h-8 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {selectedStation.windSpeed} kt
                    </div>
                    <div className="text-sm text-slate-600">Wind Speed</div>
                  </div>
                </div>

                {/* Simple trend visualization */}
                <div className="mt-6">
                  <h4 className="font-medium text-slate-900 mb-4">24-Hour Trend</h4>
                  <div className="space-y-3">
                    {trendData.map((point, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-slate-600 w-12">{point.time}</span>
                        <div className="flex-1 mx-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-xs">{point.waves}m</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span className="text-xs">{point.temp}°C</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span className="text-xs">{point.wind}kt</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* INCOIS Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <Eye className="w-12 h-12 text-blue-600 mx-auto" />
                <h3 className="text-xl font-semibold text-slate-900">
                  About INCOIS Integration
                </h3>
                <p className="text-slate-600 max-w-2xl mx-auto">
                  Snapby integrates with the Indian National Centre for Ocean Information Services 
                  to provide authoritative oceanographic data. This ensures our platform delivers 
                  accurate, real-time information for coastal safety and marine operations.
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-slate-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Real-time Data</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>26 Stations</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>24/7 Monitoring</span>
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