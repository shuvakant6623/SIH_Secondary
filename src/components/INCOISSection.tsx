/* ------------------------------------------------------------------ */
/*  INCOISSection.tsx  –  complete, ordered, error-free                */
/* ------------------------------------------------------------------ */
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Waves, Wind, Thermometer, Droplets, Sun, Navigation, MapPin, TrendingUp,
  AlertTriangle, Activity, Layers
} from 'lucide-react';
import 'leaflet/dist/leaflet.css';

/* ==================================================================== */
/*  TYPES                                                               */
/* ==================================================================== */
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
  location: [number, number]; // [lng, lat]
  status: 'active' | 'maintenance' | 'offline' | 'alert';
  lastUpdate: string;
  currentData: Partial<OCeanData>;
  type: 'deep_water' | 'coastal' | 'buoy' | 'tide_gauge';
}

/* ==================================================================== */
/*  STATIC DATA                                                         */
/* ==================================================================== */
const stations: StationData[] = [
  {
    id: 'MUM001',
    name: 'Mumbai Deep Water',
    location: [72.8777, 19.076],
    status: 'active',
    lastUpdate: '2 min ago',
    type: 'deep_water',
    currentData: { waveHeight: 2.3, windSpeed: 18, temperature: 28.5, tideLevel: 1.2, salinity: 34.8, current: 0.4 },
  },
  {
    id: 'CHN001',
    name: 'Chennai Port Station',
    location: [80.2707, 13.0827],
    status: 'active',
    lastUpdate: '1 min ago',
    type: 'coastal',
    currentData: { waveHeight: 1.8, windSpeed: 22, temperature: 30.2, tideLevel: 0.8, salinity: 35.1, current: 0.3 },
  },
  {
    id: 'GOA001',
    name: 'Goa Coastal Buoy',
    location: [73.8278, 15.2993],
    status: 'active',
    lastUpdate: '3 min ago',
    type: 'buoy',
    currentData: { waveHeight: 1.5, windSpeed: 15, temperature: 29.8, tideLevel: 1.0, salinity: 34.6, current: 0.2 },
  },
  {
    id: 'VZG001',
    name: 'Visakhapatnam Naval Base',
    location: [83.3018, 17.6868],
    status: 'maintenance',
    lastUpdate: '2h ago',
    type: 'coastal',
    currentData: { waveHeight: 2.1, windSpeed: 25, temperature: 27.9, tideLevel: 1.3, salinity: 34.9, current: 0.5 },
  },
  {
    id: 'KOL001',
    name: 'Kolkata Tide Gauge',
    location: [88.3639, 22.5726],
    status: 'active',
    lastUpdate: '1 min ago',
    type: 'tide_gauge',
    currentData: { waveHeight: 0.8, windSpeed: 12, temperature: 26.5, tideLevel: 2.1, salinity: 28.2, current: 0.1 },
  },
  {
    id: 'KOC001',
    name: 'Kochi Backwater Station',
    location: [76.2673, 9.9312],
    status: 'active',
    lastUpdate: '4 min ago',
    type: 'coastal',
    currentData: { waveHeight: 1.2, windSpeed: 14, temperature: 31.1, tideLevel: 0.7, salinity: 33.8, current: 0.2 },
  },
  {
    id: 'PDB001',
    name: 'Paradip Deep Sea',
    location: [86.6947, 20.2648],
    status: 'alert',
    lastUpdate: '30 sec ago',
    type: 'deep_water',
    currentData: { waveHeight: 2.8, windSpeed: 28, temperature: 27.2, tideLevel: 1.5, salinity: 35, current: 0.6 },
  },
  {
    id: 'PBL001',
    name: 'Port Blair Island Station',
    location: [92.7265, 11.6234],
    status: 'active',
    lastUpdate: '5 min ago',
    type: 'buoy',
    currentData: { waveHeight: 1.9, windSpeed: 20, temperature: 29.5, tideLevel: 0.9, salinity: 34.7, current: 0.3 },
  },
];

/* ==================================================================== */
/*  SSR-SAFE LEAFLET LOADER                                             */
/* ==================================================================== */
let L: any;
const loadLeaflet = async () => {
  if (typeof window === 'undefined') return;
  if (L) return L;
  const leaflet = await import('leaflet');
  L = leaflet.default;
  return L;
};

/* ==================================================================== */
/*  ICON & POPUP HELPERS                                                */
/* ==================================================================== */
const createStationIcon = (station: StationData) => {
  let color = '#3b82f6';
  let size: [number, number] = [24, 24];
  let pulseColor = color;
  switch (station.status) {
    case 'active': color = '#10b981'; pulseColor = '#10b981'; break;
    case 'maintenance': color = '#f59e0b'; pulseColor = '#f59e0b'; break;
    case 'offline': color = '#ef4444'; pulseColor = '#ef4444'; break;
    case 'alert': color = '#dc2626'; pulseColor = '#dc2626'; size = [28, 28]; break;
  }
  switch (station.type) {
    case 'deep_water': size = [26, 26]; break;
    case 'coastal': size = [22, 22]; break;
    case 'buoy': size = [20, 20]; break;
    case 'tide_gauge': size = [18, 18]; break;
  }
  const pulseAnimation = (station.status === 'alert' || station.status === 'active')
    ? `animation: pulse-ring 2s infinite;`
    : '';
  return L!.divIcon({
    className: 'incois-marker',
    html: `
      <div style="
        width: ${size[0]}px; height: ${size[1]}px; background: ${color};
        border: 3px solid white; border-radius: 50%; box-shadow: 0 3px 10px rgba(0,0,0,0.3);
        display: flex; align-items: center; justify-content: center; font-size: 10px;
        font-weight: bold; color: white; position: relative; ${pulseAnimation}
      " class="station-marker">
        ${station.type === 'deep_water' ? '🌊' : station.type === 'coastal' ? '🏖️' : station.type === 'buoy' ? '⚓' : '📊'}
      </div>
      <style>
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 ${pulseColor}60, 0 3px 10px rgba(0,0,0,0.3); }
          50% { box-shadow: 0 0 0 15px ${pulseColor}10, 0 3px 10px rgba(0,0,0,0.3); }
          100% { box-shadow: 0 0 0 0 ${pulseColor}00, 0 3px 10px rgba(0,0,0,0.3); }
        }
        .station-marker:hover { transform: scale(1.1); transition: transform 0.2s ease; }
      </style>
    `,
    iconSize: size,
    iconAnchor: [size[0] / 2, size[1] / 2],
  });
};

const buildPopupContent = (station: StationData) => `
  <div style="min-width: 280px; font-family: system-ui, sans-serif;">
    <div style="background: linear-gradient(135deg, #0ea5e9, #06b6d4); color: white; padding: 12px; margin: -8px -8px 12px -8px; border-radius: 6px 6px 0 0;">
      <div style="font-size: 16px; font-weight: 700; margin-bottom: 4px;">${station.name}</div>
      <div style="font-size: 12px; opacity: 0.9; display: flex; justify-content: space-between;">
        <span>${station.id}</span>
        <span style="background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 12px; font-size: 10px; text-transform: uppercase; font-weight: 600;">
          ${station.type.replace('_', ' ')}
        </span>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px;">
      <div style="text-align: center; padding: 8px; background: #f0f9ff; border-radius: 6px;">
        <div style="font-size: 18px; font-weight: 700; color: #0ea5e9;">${station.currentData.waveHeight?.toFixed(1) || 'N/A'}m</div>
        <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Wave Height</div>
      </div>
      <div style="text-align: center; padding: 8px; background: #f0fdf4; border-radius: 6px;">
        <div style="font-size: 18px; font-weight: 700; color: #22c55e;">${station.currentData.temperature?.toFixed(1) || 'N/A'}°C</div>
        <div style="font-size: 10px; color: #64748b; text-transform: uppercase;">Temperature</div>
      </div>
    </div>
    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-bottom: 12px; font-size: 12px;">
      <div style="display: flex; justify-content: space-between;"><span style="color: #64748b;">Wind:</span><span style="font-weight: 600;">${station.currentData.windSpeed || 'N/A'} km/h</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: #64748b;">Tide:</span><span style="font-weight: 600;">${station.currentData.tideLevel?.toFixed(1) || 'N/A'}m</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: #64748b;">Salinity:</span><span style="font-weight: 600;">${station.currentData.salinity?.toFixed(1) || 'N/A'} PSU</span></div>
      <div style="display: flex; justify-content: space-between;"><span style="color: #64748b;">Current:</span><span style="font-weight: 600;">${station.currentData.current?.toFixed(2) || 'N/A'} m/s</span></div>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 8px; background: ${
      station.status === 'active' ? '#f0fdf4' : station.status === 'maintenance' ? '#fffbeb' : station.status === 'alert' ? '#fef2f2' : '#f8fafc'
    }; border-radius: 6px;">
      <div style="display: flex; align-items: center; gap: 6px;">
        <div style="width: 8px; height: 8px; border-radius: 50%; background: ${
          station.status === 'active' ? '#22c55e' : station.status === 'maintenance' ? '#f59e0b' : station.status === 'alert' ? '#dc2626' : '#64748b'
        }; ${station.status === 'alert' ? 'animation: pulse 2s infinite;' : ''}"></div>
        <span style="font-size: 11px; font-weight: 600; text-transform: uppercase; color: ${
          station.status === 'active' ? '#16a34a' : station.status === 'maintenance' ? '#d97706' : station.status === 'alert' ? '#dc2626' : '#64748b'
        };">${station.status}</span>
      </div>
      <span style="font-size: 10px; color: #64748b;">Updated ${station.lastUpdate}</span>
    </div>
  </div>
`;

/* ==================================================================== */
/*  MINIATURE MAP COMPONENT                                             */
/* ==================================================================== */
const MiniMap: React.FC<{ station: StationData | null }> = ({ station }) => {
  const miniRef = useRef<HTMLDivElement>(null);
  const miniMapRef = useRef<any>(null);

  useEffect(() => {
    (async () => {
      await loadLeaflet();
      if (!L || !miniRef.current) return;

      // first render – create map
      if (!miniMapRef.current) {
        miniMapRef.current = L.map(miniRef.current, {
          zoomControl: false,
          scrollWheelZoom: false,
          doubleClickZoom: false,
          dragging: false,
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '',
        }).addTo(miniMapRef.current);
      }

      const m = miniMapRef.current;

      // remove old markers
      m.eachLayer((l: any) => {
        if (l instanceof L.Marker) m.removeLayer(l);
      });

      if (station) {
        const mk = L.marker([station.location[1], station.location[0]], {
          icon: createStationIcon(station),
        })
          .addTo(m)
          .bindPopup(buildPopupContent(station), { maxWidth: 250 });
        m.setView([station.location[1], station.location[0]], 8);
        mk.openPopup();
      } else {
        stations.forEach((st) =>
          L.marker([st.location[1], st.location[0]], {
            icon: createStationIcon(st),
          })
            .addTo(m)
            .bindPopup(buildPopupContent(st), { maxWidth: 250 })
        );
        m.fitBounds(
          stations.map((s) => [s.location[1], s.location[0]] as [number, number])
        );
      }
    })();
  }, [station]);

  return (
    <Card className="p-3">
      <div className="text-xs text-slate-500 mb-2">
        {station ? 'Station location' : 'INCOIS network overview'}
      </div>
      <div ref={miniRef} className="w-full h-48 rounded border border-slate-200" />
    </Card>
  );
};

/* ==================================================================== */
/*  MAIN COMPONENT                                                      */
/* ==================================================================== */
export default function INCOISSection() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const [oceanData, setOceanData] = useState<OCeanData[]>([]);
  const [selectedStation, setSelectedStation] = useState<StationData | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [mapLoaded, setMapLoaded] = useState(false);

  /* ------------------------------------------------------------------ */
  /*  synthetic data generator                                          */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    const generateData = () => {
      const now = Date.now();
      const data: OCeanData[] = [];
      for (let i = 0; i < 24; i++) {
        const time = new Date(now - (23 - i) * 60 * 60 * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
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
          current: 0.3 + Math.sin(i * 0.4) * 0.2 + Math.random() * 0.1,
        });
      }
      setOceanData(data);
    };
    generateData();
    const interval = setInterval(generateData, 30000);
    return () => clearInterval(interval);
  }, []);

  /* ------------------------------------------------------------------ */
  /*  big interactive map                                               */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    if (!mapRef.current) return;
    (async () => {
      await loadLeaflet();
      if (!L) return;

      const map = L.map(mapRef.current!, {
        center: [20.5937, 78.9629],
        zoom: 5,
        zoomControl: true,
        scrollWheelZoom: true,
        doubleClickZoom: true,
        touchZoom: true,
      });
      mapInstanceRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors | INCOIS Monitoring Network',
        maxZoom: 18,
      }).addTo(map);

      stations.forEach((st) => {
        const mk = L.marker([st.location[1], st.location[0]], { icon: createStationIcon(st) })
          .addTo(map)
          .bindPopup(buildPopupContent(st), { className: 'incois-popup', maxWidth: 300 })
          .on('click', () => setSelectedStation(st));
        markersRef.current.push(mk);
      });
      setMapLoaded(true);
    })();

    return () => {
      mapInstanceRef.current?.remove();
      markersRef.current = [];
    };
  }, []);

  /* ------------------------------------------------------------------ */
  /*  render helpers                                                    */
  /* ------------------------------------------------------------------ */
  const getCurrentData = () => oceanData[oceanData.length - 1] || {};
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'offline': return 'bg-red-100 text-red-800';
      case 'alert': return 'bg-red-100 text-red-800';
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
  const getStationStats = () => ({
    active: stations.filter((s) => s.status === 'active').length,
    maintenance: stations.filter((s) => s.status === 'maintenance').length,
    alert: stations.filter((s) => s.status === 'alert').length,
    offline: stations.filter((s) => s.status === 'offline').length,
    total: stations.length,
  });

  /* ------------------------------------------------------------------ */
  /*  RENDER                                                            */
  /* ------------------------------------------------------------------ */
  const currentData = getCurrentData();
  const uvCategory = getUVCategory(currentData.uvIndex || 0);
  const stats = getStationStats();

  return (
    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      {/* ------- header ------- */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center"><Waves className="w-8 h-8 text-white" /></div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">INCOIS Live Data</h2>
            <p className="text-blue-600">Indian National Centre for Ocean Information Services</p>
          </div>
        </div>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">Real-time oceanographic data from monitoring stations across India's coastline</p>
      </div>

      {/* ------- 4-up cards ------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}>
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2"><Waves className="w-5 h-5 text-blue-600" /><span className="font-medium text-blue-900">Wave Height</span></div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">Live</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-blue-900">{currentData.waveHeight?.toFixed(1) || '0.0'}m</p>
              <p className="text-sm text-blue-600">Period: {currentData.wavePeriod?.toFixed(1) || '0.0'}s</p>
              <p className="text-xs text-blue-500">Direction: {currentData.waveDirection?.toFixed(0) || '0'}°</p>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}>
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2"><TrendingUp className="w-5 h-5 text-green-600" /><span className="font-medium text-green-900">Tide Level</span></div>
              <Badge variant="secondary" className="bg-green-100 text-green-800">{currentData.tideLevel && currentData.tideLevel > 1 ? 'HIGH' : 'LOW'}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-green-900">{currentData.tideLevel?.toFixed(2) || '0.00'}m</p>
              <p className="text-sm text-green-600">Above MSL</p>
              <div className="w-full bg-green-100 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full transition-all duration-500" style={{ width: `${Math.min((currentData.tideLevel || 0) * 50, 100)}%` }}></div></div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
          <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2"><Wind className="w-5 h-5 text-orange-600" /><span className="font-medium text-orange-900">Wind</span></div>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">SW</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-orange-900">{currentData.windSpeed?.toFixed(1) || '0.0'} km/h</p>
              <p className="text-sm text-orange-600">Direction: {currentData.windDirection?.toFixed(0) || '0'}°</p>
              <div className="flex items-center space-x-1"><Navigation className="w-3 h-3 text-orange-500 transform" style={{ rotate: `${currentData.windDirection || 0}deg` }} /><span className="text-xs text-orange-500">Wind Arrow</span></div>
            </div>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2"><Sun className="w-5 h-5 text-purple-600" /><span className="font-medium text-purple-900">UV Index</span></div>
              <Badge variant="secondary" className={`${uvCategory.color.replace('text-', 'bg-').replace('-600', '-100')} ${uvCategory.color}`}>{uvCategory.label}</Badge>
            </div>
            <div className="space-y-1">
              <p className="text-2xl font-bold text-purple-900">{currentData.uvIndex?.toFixed(1) || '0.0'}</p>
              <p className="text-sm text-purple-600">Temp: {currentData.temperature?.toFixed(1) || '0.0'}°C</p>
              <p className="text-xs text-purple-500">Humidity: {currentData.humidity?.toFixed(0) || '0'}%</p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* ------- map + station panel ------- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* big map */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2"><Layers className="w-5 h-5 text-indigo-600" />INCOIS Monitoring Stations</h3>
              <div className="flex items-center gap-4">
                <Badge variant="secondary" className="bg-green-100 text-green-800">{stats.active} Active</Badge>
                {stats.alert > 0 && <Badge variant="destructive" className="animate-pulse">{stats.alert} Alert</Badge>}
              </div>
            </div>
            <div className="relative bg-slate-100 rounded-lg overflow-hidden border border-slate-300" style={{ height: '500px' }}>
              <div ref={mapRef} className="absolute inset-0 z-0" />
              {!mapLoaded && (
                <div className="absolute inset-0 bg-slate-100 flex items-center justify-center z-10">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                    <div className="text-sm text-slate-600">Loading INCOIS Network...</div>
                  </div>
                </div>
              )}
              {/* mini controls */}
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20">
                <div className="text-sm font-semibold text-slate-800 mb-3 flex items-center gap-2"><Activity className="w-4 h-4 text-blue-600" />Station Types</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2"><div className="text-base">🌊</div><span className="text-slate-700">Deep Water Stations</span></div>
                  <div className="flex items-center gap-2"><div className="text-base">🏖️</div><span className="text-slate-700">Coastal Monitoring</span></div>
                  <div className="flex items-center gap-2"><div className="text-base">⚓</div><span className="text-slate-700">Ocean Buoys</span></div>
                  <div className="flex items-center gap-2"><div className="text-base">📊</div><span className="text-slate-700">Tide Gauges</span></div>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-xs text-slate-500">💡 Click stations for live data</div>
              </div>
              {/* status panel */}
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg z-20">
                <div className="text-sm font-semibold text-slate-800 mb-2 flex items-center gap-2"><Activity className="w-4 h-4 text-green-600" />Network Status</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full"></div><span className="text-slate-700">Active</span></div><span className="font-semibold text-green-600">{stats.active}</span></div>
                  {stats.alert > 0 && <div className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div><span className="text-slate-700">Alert</span></div><span className="font-semibold text-red-600">{stats.alert}</span></div>}
                  {stats.maintenance > 0 && <div className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><div className="w-2 h-2 bg-orange-500 rounded-full"></div><span className="text-slate-700">Maintenance</span></div><span className="font-semibold text-orange-600">{stats.maintenance}</span></div>}
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200"><div className="text-xs text-slate-500">Total Stations</div><div className="text-lg font-bold text-indigo-600">{stats.total}</div></div>
              </div>
              {/* reset view */}
              <button
                onClick={() => mapInstanceRef.current?.setView([20.5937, 78.9629], 5)}
                className="absolute bottom-4 right-4 bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors z-20 flex items-center gap-2"
              >
                <MapPin className="w-4 h-4" />
                Reset View
              </button>
            </div>
          </Card>
        </div>

        {/* ------- station details + mini map ------- */}
        <div className="space-y-6">
          {selectedStation ? (
            <motion.div
              key={selectedStation.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                {/* station info */}
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
                  <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Station Type:</span><span className="text-sm font-medium capitalize">{selectedStation.type.replace('_', ' ')}</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Location:</span><span className="text-xs font-mono">{selectedStation.location[1].toFixed(4)}, {selectedStation.location[0].toFixed(4)}</span></div>
                  <div className="flex items-center justify-between"><span className="text-sm text-gray-600">Last Update:</span><span className="text-sm font-medium">{selectedStation.lastUpdate}</span></div>
                  <div className="border-t pt-3">
                    <h4 className="font-medium mb-3">Current Readings</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="text-center p-3 bg-blue-50 rounded-lg"><div className="text-lg font-bold text-blue-700">{selectedStation.currentData.waveHeight?.toFixed(1) || 'N/A'}m</div><div className="text-xs text-blue-600">Wave Height</div></div>
                      <div className="text-center p-3 bg-green-50 rounded-lg"><div className="text-lg font-bold text-green-700">{selectedStation.currentData.temperature?.toFixed(1) || 'N/A'}°C</div><div className="text-xs text-green-600">Temperature</div></div>
                      <div className="text-center p-3 bg-orange-50 rounded-lg"><div className="text-lg font-bold text-orange-700">{selectedStation.currentData.windSpeed || 'N/A'} km/h</div><div className="text-xs text-orange-600">Wind Speed</div></div>
                      <div className="text-center p-3 bg-cyan-50 rounded-lg"><div className="text-lg font-bold text-cyan-700">{selectedStation.currentData.tideLevel?.toFixed(1) || 'N/A'}m</div><div className="text-xs text-cyan-600">Tide Level</div></div>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Salinity:</span><span className="font-medium">{selectedStation.currentData.salinity?.toFixed(1) || 'N/A'} PSU</span></div>
                      <div className="flex justify-between text-sm"><span className="text-gray-600">Current Speed:</span><span className="font-medium">{selectedStation.currentData.current?.toFixed(2) || 'N/A'} m/s</span></div>
                    </div>
                  </div>
                </div>
              </Card>
              {/*  👇  miniature interactive map  */}
              <MiniMap station={selectedStation} />
            </motion.div>
          ) : (
            <>
              <Card className="p-6">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p className="mb-2">Select a monitoring station</p>
                  <p className="text-sm">Click on any station marker on the map to view detailed oceanographic data and real-time measurements.</p>
                </div>
              </Card>
              <MiniMap station={null} />
            </>
          )}

          {/* ------- alerts panel ------- */}
          <Card className="p-6 bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
            <div className="flex items-center space-x-2 mb-4"><AlertTriangle className="w-5 h-5 text-red-600" /><h4 className="font-semibold text-red-900">Active Alerts</h4></div>
            <div className="space-y-3">
              {stats.alert > 0 && (
                <div className="p-3 bg-red-100 rounded-lg">
                  <div className="flex justify-between items-start mb-1"><span className="font-medium text-red-800">High Wave Alert</span><Badge variant="destructive" className="text-xs animate-pulse">ACTIVE</Badge></div>
                  <p className="text-sm text-red-700">Paradip Station: Waves exceeding 2.5 m detected with strong currents</p>
                </div>
              )}
              <div className="p-3 bg-orange-100 rounded-lg">
                <div className="flex justify-between items-start mb-1"><span className="font-medium text-orange-800">Maintenance Notice</span><Badge className="bg-orange-200 text-orange-800 text-xs">SCHEDULED</Badge></div>
                <p className="text-sm text-orange-700">Visakhapatnam: Routine equipment calibration in progress</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <div className="flex justify-between items-start mb-1"><span className="font-medium text-blue-800">Network Status</span><Badge className="bg-blue-200 text-blue-800 text-xs">NORMAL</Badge></div>
                <p className="text-sm text-blue-700">All other stations reporting within normal parameters</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* ------- detailed charts ------- */}
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
