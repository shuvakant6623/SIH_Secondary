import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar } from 'recharts';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Waves, Wind, Thermometer, Droplets, Sun, Navigation, MapPin, TrendingUp, AlertTriangle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface OCeanData {
  time: string;
  waveHeight: number;
  wavePeriod: number;
  waveDirection: number;
  tideLevel: number;
  windSpeed: number;
  windDirection: number;
  temperature: number;
  humidity: number;
  uvIndex: number;
  salinity: number;
  current: number;
}

interface StationData {
  id: string;
  name: string;
  location: [number, number];
  status: 'active' | 'maintenance' | 'offline';
  lastUpdate: string;
  currentData: Partial<OCeanData>;
}

export function INCOISSection() {
  const [oceanData, setOceanData] = useState<OCeanData[]>([]);
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const stations: StationData[] = [
    {
      id: 'MUM001',
      name: 'Mumbai Deep Water',
      location: [72.8777, 19.0760],
      status: 'active',
      lastUpdate: '2 min ago',
      currentData: {
        waveHeight: 2.3,
        windSpeed: 18,
        temperature: 28.5,
        tideLevel: 1.2
      }
    },
    {
      id: 'CHN001', 
      name: 'Chennai Port',
      location: [80.2707, 13.0827],
      status: 'active',
      lastUpdate: '1 min ago',
      currentData: {
        waveHeight: 1.8,
        windSpeed: 22,
        temperature: 30.2,
        tideLevel: 0.8
      }
    },
    {
      id: 'GOA001',
      name: 'Goa Coastal',
      location: [73.8278, 15.2993],
      status: 'active',
      lastUpdate: '3 min ago',
      currentData: {
        waveHeight: 1.5,
        windSpeed: 15,
        temperature: 29.8,
        tideLevel: 1.0
      }
    },
    {
      id: 'VZG001',
      name: 'Visakhapatnam',
      location: [83.3018, 17.6868],
      status: 'maintenance',
      lastUpdate: '2h ago',
      currentData: {
        waveHeight: 2.1,
        windSpeed: 25,
        temperature: 27.9,
        tideLevel: 1.3
      }
    }
  ];

  useEffect(() => {
    const generateData = () => {
      const now = Date.now();
      const data: OCeanData[] = [];

      for (let i = 0; i < 24; i++) {
        const time = new Date(now - (23 - i) * 60 * 60 * 1000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });

        data.push({
          time,
          waveHeight: 1.5 + Math.sin(i * 0.5) * 0.8 + Math.random() * 0.4,
          wavePeriod: 8 + Math.sin(i * 0.3) * 2 + Math.random() * 1,
          waveDirection: 225 + Math.sin(i * 0.2) * 30 + Math.random() * 10,
          tideLevel: 0.5 + Math.sin(i * 0.26) * 0.4 + Math.random() * 0.1,
          windSpeed: 15 + Math.sin(i * 0.4) * 5 + Math.random() * 3,
          windDirection: 180 + Math.sin(i * 0.3) * 45 + Math.random() * 20,
          temperature: 28 + Math.sin(i * 0.25) * 3 + Math.random() * 2,
          humidity: 65 + Math.sin(i * 0.35) * 15 + Math.random() * 5,
          uvIndex: Math.max(0, 6 + Math.sin((i - 6) * 0.26) * 4 + Math.random() * 2),
          salinity: 34.5 + Math.random() * 0.5,
          current: 0.3 + Math.sin(i * 0.4) * 0.2 + Math.random() * 0.1
        });
      }

      setOceanData(data);
    };

    generateData();
    const interval = setInterval(generateData, 30000);
    return () => clearInterval(interval);
  }, []);

  const getCurrentData = () => oceanData[oceanData.length - 1] || {};

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUVCategory = (uvIndex: number) => {
    if (uvIndex <= 2) return { label: 'Low', color: 'text-green-600' };
    if (uvIndex <= 5) return { label: 'Moderate', color: 'text-yellow-600' };
    if (uvIndex <= 7) return { label: 'High', color: 'text-orange-600' };
    if (uvIndex <= 10) return { label: 'Very High', color: 'text-red-600' };
    return { label: 'Extreme', color: 'text-purple-600' };
  };

  const currentData = getCurrentData();
  const uvCategory = getUVCategory(currentData.uvIndex || 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1546833998-07256bcc76ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYSUyMG1hcCUyMG91dGxpbmV8ZW58MXx8fHwxNzU3NTcxNzAxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="INCOIS"
            className="w-16 h-16 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-3xl font-bold text-gray-900">INCOIS Live Data</h2>
            <p className="text-blue-600">Indian National Centre for Ocean Information Services</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Real-time oceanographic data from monitoring stations across India's coastline
        </p>
      </div>

      {/* Real-time Monitoring Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Wave Height</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Live
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-900">
                {currentData.waveHeight?.toFixed(1) || '0.0'}m
              </p>
              <p className="text-sm text-blue-600">
                Period: {currentData.wavePeriod?.toFixed(1) || '0.0'}s
              </p>
              <p className="text-xs text-blue-500">
                Direction: {currentData.waveDirection?.toFixed(0) || '0'}°
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Tide Level</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {currentData.tideLevel && currentData.tideLevel > 1 ? 'HIGH' : 'LOW'}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-900">
                {currentData.tideLevel?.toFixed(2) || '0.00'}m
              </p>
              <p className="text-sm text-green-600">Above MSL</p>
              <div className="w-full bg-green-100 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((currentData.tideLevel || 0) * 50, 100)}%` }}
                ></div>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">Wind</span>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                SW
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-orange-900">
                {currentData.windSpeed?.toFixed(1) || '0.0'} km/h
              </p>
              <p className="text-sm text-orange-600">
                Direction: {currentData.windDirection?.toFixed(0) || '0'}°
              </p>
              <div className="flex items-center space-x-1">
                <Navigation 
                  className="w-3 h-3 text-orange-500 transform" 
                  style={{ rotate: `${currentData.windDirection || 0}deg` }}
                />
                <span className="text-xs text-orange-500">Wind Arrow</span>
              </div>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Sun className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-purple-900">UV Index</span>
              </div>
              <Badge variant="secondary" className={`${uvCategory.color.replace('text-', 'bg-').replace('-600', '-100')} ${uvCategory.color}`}>
                {uvCategory.label}
              </Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-purple-900">
                {currentData.uvIndex?.toFixed(1) || '0.0'}
              </p>
              <p className="text-sm text-purple-600">
                Temp: {currentData.temperature?.toFixed(1) || '0.0'}°C
              </p>
              <p className="text-xs text-purple-500">
                Humidity: {currentData.humidity?.toFixed(0) || '0'}%
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Monitoring Stations</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {stations.filter(s => s.status === 'active').length} Active
              </Badge>
            </div>

            <div className="relative bg-blue-50 rounded-lg overflow-hidden" style={{ height: '400px' }}>
              <svg viewBox="0 0 1000 600" className="w-full h-full">
                {/* Simplified India coastline */}
                <path
                  d="M300,100 L350,90 L400,95 L450,85 L500,90 L550,95 L600,105 L650,120 L680,140 L700,170 L710,200 L705,230 L700,260 L690,290 L680,320 L670,350 L660,380 L650,410 L640,440 L620,470 L600,490 L580,510 L560,520 L540,530 L520,535 L500,540 L480,535 L460,530 L440,525 L420,515 L400,505 L380,490 L360,470 L340,450 L320,430 L305,410 L295,390 L290,370 L285,350 L280,330 L275,310 L270,290 L265,270 L260,250 L255,230 L250,210 L245,190 L240,170 L235,150 L240,130 L250,110 L270,100 Z"
                  fill="rgba(34, 197, 94, 0.2)"
                  stroke="#22c55e"
                  strokeWidth="2"
                />

                {/* Station markers */}
                {stations.map((station) => (
                  <g key={station.id}>
                    <motion.circle
                      cx={station.location[0] * 8}
                      cy={station.location[1] * 25}
                      r="12"
                      className={`cursor-pointer ${
                        station.status === 'active' 
                          ? 'fill-green-500 hover:fill-green-600' 
                          : station.status === 'maintenance'
                          ? 'fill-orange-500 hover:fill-orange-600'
                          : 'fill-red-500 hover:fill-red-600'
                      }`}
                      whileHover={{ scale: 1.2 }}
                      onClick={() => setSelectedStation(station)}
                    />
                    <circle
                      cx={station.location[0] * 8}
                      cy={station.location[1] * 25}
                      r="20"
                      fill="none"
                      stroke={station.status === 'active' ? '#22c55e' : '#f97316'}
                      strokeWidth="2"
                      opacity="0.5"
                      className="animate-pulse"
                    />
                    <text
                      x={station.location[0] * 8}
                      y={station.location[1] * 25 - 25}
                      textAnchor="middle"
                      className="text-xs font-medium fill-gray-700"
                    >
                      {station.name}
                    </text>
                  </g>
                ))}
              </svg>

              {/* Data overlay */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <h4 className="font-medium mb-2">Live Data Streams</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span>Wave Height: {currentData.waveHeight?.toFixed(1)}m</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                    <span>Wind Speed: {currentData.windSpeed?.toFixed(1)} km/h</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                    <span>Temperature: {currentData.temperature?.toFixed(1)}°C</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Station Details */}
        <div className="space-y-6">
          {selectedStation ? (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{selectedStation.name}</h3>
                    <p className="text-sm text-gray-600">{selectedStation.id}</p>
                  </div>
                  <Badge className={getStatusColor(selectedStation.status)}>
                    {selectedStation.status.toUpperCase()}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Location:</span>
                    <span className="text-xs font-mono">
                      {selectedStation.location[1].toFixed(4)}, {selectedStation.location[0].toFixed(4)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Last Update:</span>
                    <span className="text-sm font-medium">{selectedStation.lastUpdate}</span>
                  </div>

                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-2">Current Readings</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Wave Height:</span>
                        <span className="font-medium">{selectedStation.currentData.waveHeight?.toFixed(1)}m</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Wind Speed:</span>
                        <span className="font-medium">{selectedStation.currentData.windSpeed} km/h</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Temperature:</span>
                        <span className="font-medium">{selectedStation.currentData.temperature}°C</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Tide Level:</span>
                        <span className="font-medium">{selectedStation.currentData.tideLevel}m</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ) : (
            <Card className="p-6">
              <div className="text-center text-gray-500">
                <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Click on a station marker to view live data</p>
              </div>
            </Card>
          )}

          {/* Alert Panel */}
          <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <div className="flex items-center space-x-2 mb-4">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <h4 className="font-semibold text-red-900">Active Alerts</h4>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-red-800">High Wave Alert</span>
                  <Badge variant="destructive" className="text-xs">ACTIVE</Badge>
                </div>
                <p className="text-sm text-red-700">
                  Mumbai Coast: Waves exceeding 2.5m detected
                </p>
              </div>
              
              <div className="p-3 bg-orange-100 rounded-lg">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-medium text-orange-800">Wind Advisory</span>
                  <Badge className="bg-orange-200 text-orange-800 text-xs">WATCH</Badge>
                </div>
                <p className="text-sm text-orange-700">
                  Eastern Coast: Sustained winds 25+ km/h
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Detailed Charts */}
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="waves">Waves & Tides</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
            <TabsTrigger value="water">Water Quality</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <h4 className="font-medium mb-4">24-Hour Wave Height Trend</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={oceanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(2)}m`, 'Wave Height']} />
                    <Area type="monotone" dataKey="waveHeight" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="h-64">
                <h4 className="font-medium mb-4">Temperature & Humidity</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={oceanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="temperature" stroke="#f97316" name="Temperature (°C)" />
                    <Line type="monotone" dataKey="humidity" stroke="#06b6d4" name="Humidity (%)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="waves" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <h4 className="font-medium mb-4">Wave Height vs Tide Level</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={oceanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="waveHeight" stroke="#3b82f6" name="Wave Height (m)" />
                    <Line type="monotone" dataKey="tideLevel" stroke="#22c55e" name="Tide Level (m)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-80">
                <h4 className="font-medium mb-4">Wave Period Distribution</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={oceanData.slice(-12)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(1)}s`, 'Wave Period']} />
                    <Bar dataKey="wavePeriod" fill="#8b5cf6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <h4 className="font-medium mb-4">Wind Speed & Direction</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={oceanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="windSpeed" stroke="#f97316" name="Wind Speed (km/h)" />
                    <Line type="monotone" dataKey="windDirection" stroke="#8b5cf6" name="Direction (°)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-80">
                <h4 className="font-medium mb-4">UV Index Levels</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={oceanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => [Number(value).toFixed(1), 'UV Index']} />
                    <Area type="monotone" dataKey="uvIndex" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.4} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="water" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <h4 className="font-medium mb-4">Salinity Levels</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={oceanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} PSU`, 'Salinity']} />
                    <Line type="monotone" dataKey="salinity" stroke="#06b6d4" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="h-80">
                <h4 className="font-medium mb-4">Ocean Current Speed</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={oceanData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${Number(value).toFixed(2)} m/s`, 'Current Speed']} />
                    <Area type="monotone" dataKey="current" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </motion.div>
  );
}