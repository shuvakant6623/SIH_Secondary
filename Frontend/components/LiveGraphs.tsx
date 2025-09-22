import { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { TrendingUp, Waves, Wind, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WaveData {
  time: string;
  height: number;
  period: number;
  direction: number;
}

interface TideData {
  time: string;
  level: number;
  type: 'high' | 'low';
}

interface WeatherData {
  time: string;
  windSpeed: number;
  windDirection: number;
  temperature: number;
  humidity: number;
}

export function LiveGraphs() {
  const [waveData, setWaveData] = useState<WaveData[]>([]);
  const [tideData, setTideData] = useState<TideData[]>([]);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    // Generate mock live data
    const generateMockData = () => {
      const now = Date.now();
      const waves: WaveData[] = [];
      const tides: TideData[] = [];
      const weather: WeatherData[] = [];

      for (let i = 0; i < 24; i++) {
        const time = new Date(now - (23 - i) * 60 * 60 * 1000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit' 
        });

        waves.push({
          time,
          height: 1.5 + Math.sin(i * 0.5) * 0.8 + Math.random() * 0.3,
          period: 8 + Math.sin(i * 0.3) * 2 + Math.random() * 1,
          direction: 225 + Math.sin(i * 0.2) * 30 + Math.random() * 10
        });

        tides.push({
          time,
          level: 0.5 + Math.sin(i * 0.26) * 0.4 + Math.random() * 0.1,
          type: Math.sin(i * 0.26) > 0 ? 'high' : 'low'
        });

        weather.push({
          time,
          windSpeed: 15 + Math.sin(i * 0.4) * 5 + Math.random() * 3,
          windDirection: 180 + Math.sin(i * 0.3) * 45 + Math.random() * 20,
          temperature: 28 + Math.sin(i * 0.25) * 3 + Math.random() * 2,
          humidity: 65 + Math.sin(i * 0.35) * 15 + Math.random() * 5
        });
      }

      setWaveData(waves);
      setTideData(tides);
      setWeatherData(weather);
    };

    generateMockData();
    const interval = setInterval(generateMockData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const currentWave = waveData[waveData.length - 1];
  const currentTide = tideData[tideData.length - 1];
  const currentWeather = weatherData[weatherData.length - 1];

  return (
    <div className="space-y-6">
      {/* Real-time Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Waves className="w-5 h-5 text-blue-600" />
                <span className="font-medium text-blue-900">Wave Height</span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                Live
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold text-blue-900">
                {currentWave?.height.toFixed(1)}m
              </p>
              <p className="text-sm text-blue-600">
                Period: {currentWave?.period.toFixed(1)}s
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-900">Tide Level</span>
              </div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                {currentTide?.type.toUpperCase()}
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold text-green-900">
                {currentTide?.level.toFixed(2)}m
              </p>
              <p className="text-sm text-green-600">Above mean sea level</p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Wind className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-orange-900">Wind Speed</span>
              </div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                SW
              </Badge>
            </div>
            <div className="mt-2">
              <p className="text-2xl font-bold text-orange-900">
                {currentWeather?.windSpeed.toFixed(1)} km/h
              </p>
              <p className="text-sm text-orange-600">
                Temp: {currentWeather?.temperature.toFixed(1)}°C
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* INCOIS Graphs */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1678038871396-11a556621764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjb2FzdGxpbmUlMjBvY2VhbiUyMHdhdmVzfGVufDF8fHx8MTc1NzY5MTQ1M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="INCOIS"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-bold text-lg">INCOIS Live Data</h3>
              <p className="text-sm text-gray-600">Indian National Centre for Ocean Information Services</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            ● Online
          </Badge>
        </div>

        <Tabs defaultValue="waves" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="waves">Wave Data</TabsTrigger>
            <TabsTrigger value="tides">Tide Levels</TabsTrigger>
            <TabsTrigger value="weather">Weather</TabsTrigger>
          </TabsList>

          <TabsContent value="waves" className="mt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${Number(value).toFixed(2)}${name === 'height' ? 'm' : 's'}`, 
                      name === 'height' ? 'Wave Height' : 'Period'
                    ]}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="height" 
                    stroke="#2563eb" 
                    fill="#3b82f6" 
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="tides" className="mt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={tideData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${Number(value).toFixed(2)}m`, 'Tide Level']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="level" 
                    stroke="#059669" 
                    strokeWidth={2}
                    dot={{ fill: '#059669', r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="weather" className="mt-6">
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value, name) => [
                      `${Number(value).toFixed(1)}${name === 'windSpeed' ? ' km/h' : name === 'temperature' ? '°C' : '%'}`, 
                      name === 'windSpeed' ? 'Wind Speed' : name === 'temperature' ? 'Temperature' : 'Humidity'
                    ]}
                  />
                  <Bar dataKey="windSpeed" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      {/* Coastal Guard Info */}
      <Card className="p-6 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1753024818769-b7211bd55587?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2FzdGFsJTIwZ3VhcmQlMjBzaGlwJTIwaW5kaWF8ZW58MXx8fHwxNzU3NjkxNDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Indian Coast Guard"
            className="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <div>
            <h3 className="font-bold text-xl">Indian Coast Guard</h3>
            <p className="text-blue-200">Emergency: 1554 | VHF: Channel 16</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Current Operations</h4>
            <ul className="text-sm space-y-1 text-blue-100">
              <li>• 12 vessels on patrol</li>
              <li>• 3 rescue operations active</li>
              <li>• Weather monitoring: Normal</li>
            </ul>
          </div>
          <div className="bg-blue-800 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Safety Advisories</h4>
            <ul className="text-sm space-y-1 text-blue-100">
              <li>• Fishing vessels: Return by 6 PM</li>
              <li>• Tourist boats: Normal operations</li>
              <li>• Beach activities: Safe conditions</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}