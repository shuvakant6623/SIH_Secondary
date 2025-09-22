import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Waves, Users, Shield, Anchor, Cloud, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import { ImageWithFallback } from './figma/ImageWithFallback';
import INDIA_Coastal_map from "./assets/INDIA_Coastal_map.png";

const coastalStates = [
  { 
    name: "Gujarat", 
    coastline: "1,663 km", 
    population: "60M", 
    hazards: ["Cyclones", "High Tides"],
    region: "Western Coast",
    division: "Kutch & Kathiawar Plains",
    features: ["Gulf of Khambhat", "Porbandar Port", "Kandla Port"]
  },
  { 
    name: "Maharashtra", 
    coastline: "753 km", 
    population: "112M", 
    hazards: ["Monsoon Flooding", "Erosion"],
    region: "Western Coast",
    division: "Konkan Coast",
    features: ["Mumbai Port", "Arabian Sea", "Estuaries"]
  },
  { 
    name: "Goa", 
    coastline: "160 km", 
    population: "1.5M", 
    hazards: ["Beach Erosion", "Tourist Safety"],
    region: "Western Coast",
    division: "Konkan Coast",
    features: ["Mormugao Port", "Tourism Beaches", "River Mouths"]
  },
  { 
    name: "Karnataka", 
    coastline: "320 km", 
    population: "61M", 
    hazards: ["Rip Currents", "Fishing Hazards"],
    region: "Western Coast",
    division: "Karnataka Coast",
    features: ["Mangalore Port", "New Mangalore", "Fishing Harbors"]
  },
  { 
    name: "Kerala", 
    coastline: "590 km", 
    population: "33M", 
    hazards: ["Tsunami Risk", "Backwater Changes"],
    region: "Western Coast",
    division: "Malabar Coast",
    features: ["Kochi Port", "Backwaters", "Kanniyakumari"]
  },
  { 
    name: "Tamil Nadu", 
    coastline: "1,076 km", 
    population: "72M", 
    hazards: ["Cyclones", "Storm Surge"],
    region: "Eastern Coast",
    division: "Coromandel Coast",
    features: ["Chennai Port", "Tuticorin Port", "Cauvery Delta"]
  },
  { 
    name: "Andhra Pradesh", 
    coastline: "974 km", 
    population: "49M", 
    hazards: ["Cyclones", "Fishing Industry"],
    region: "Eastern Coast",
    division: "Andhra Coast",
    features: ["Visakhapatnam Port", "Krishna Delta", "Godavari Delta"]
  },
  { 
    name: "Odisha", 
    coastline: "485 km", 
    population: "42M", 
    hazards: ["Super Cyclones", "Coastal Erosion"],
    region: "Eastern Coast",
    division: "Utkal Coast",
    features: ["Paradip Port", "Mahanadi Delta", "Chilika Lake"]
  },
  { 
    name: "West Bengal", 
    coastline: "158 km", 
    population: "91M", 
    hazards: ["Cyclones", "Mangrove Loss"],
    region: "Eastern Coast",
    division: "Ganga Delta",
    features: ["Kolkata Port", "Sundarbans", "Mangrove Forests"]
  }
];

const unionTerritories = [
  {
    name: "Andaman & Nicobar Islands",
    coastline: "1,962 km",
    population: "380K",
    features: ["Port Blair", "Strategic Location", "Coral Reefs"]
  },
  {
    name: "Lakshadweep Islands",
    coastline: "132 km", 
    population: "65K",
    features: ["Coral Atolls", "Marine Conservation", "Coconut Groves"]
  },
  {
    name: "Puducherry",
    coastline: "45 km",
    population: "1.2M", 
    features: ["French Heritage", "Beach Tourism", "Fishing Communities"]
  },
  {
    name: "Daman and Diu",
    coastline: "50 km",
    population: "585K",
    features: ["Portuguese Heritage", "Salt Production", "Industrial Coast"]
  }
];

const keyStats = [
  { icon: <MapPin className="h-6 w-6" />, label: "Total Coastline", value: "11,099 km", color: "text-indigo-700", detail: "Mainland + Islands" },
  { icon: <Users className="h-6 w-6" />, label: "Coastal Population", value: "250M+", color: "text-teal-700", detail: "Living within 50km" },
  { icon: <Anchor className="h-6 w-6" />, label: "Major Ports", value: "200+", color: "text-slate-700", detail: "12 Major + Minor" },
  { icon: <Shield className="h-6 w-6" />, label: "Coast Guard Stations", value: "150+", color: "text-blue-800", detail: "24/7 Monitoring" }
];

const coastlineBreakdown = [
  { label: "Mainland Coastline", value: "7,871 km", color: "text-indigo-600" },
  { label: "Island Coastline", value: "3,228 km", color: "text-teal-600" },
  { label: "Western Coast", value: "3,140 km", color: "text-purple-600" },
  { label: "Eastern Coast", value: "4,731 km", color: "text-blue-600" }
];

export function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-slate-100 to-indigo-100" id="about">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            About India's <span className="text-transparent bg-gradient-to-r from-indigo-700 to-teal-700 bg-clip-text">Coastline</span>
          </motion.h2>
          <motion.p 
            className="text-lg text-slate-700 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            India boasts one of the world's longest coastlines at 11,098.81 km, encompassing 13 states and union territories. 
            Surrounded by the Arabian Sea, Bay of Bengal, and Indian Ocean, our coastline supports over 250 million people 
            while facing diverse oceanic challenges from tsunamis to cyclones.
          </motion.p>
        </motion.div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {keyStats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Card className="text-center border-teal-100 shadow-lg hover:shadow-xl transition-all duration-500 ease-wave bg-white/95 backdrop-blur-enhanced">
                <CardContent className="p-6">
                  <motion.div 
                    className={`${stat.color} mb-3 flex justify-center`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    {stat.icon}
                  </motion.div>
                  <div className="text-2xl font-bold text-slate-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-slate-700">{stat.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{stat.detail}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Coastline Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="bg-gradient-to-r from-indigo-50 to-teal-50 rounded-2xl p-8 mb-12 border border-indigo-100"
        >
          <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">India's Coastline Breakdown</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coastlineBreakdown.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl font-bold ${item.color} mb-2`}>{item.value}</div>
                <div className="text-sm text-slate-700">{item.label}</div>
              </motion.div>
            ))}
          </div>
          <div className="mt-6 text-center text-sm text-slate-600 bg-white/70 rounded-lg p-4">
            <strong>Updated April 2025:</strong> India's coastline length updated based on new survey methodology, 
            including 7,870.51 km for mainland and 3,228.30 km for Indian islands.
          </div>
        </motion.div>

        {/* Integrated Coastal Information Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* India Coastal States Map */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="lg:col-span-2"
          >
            <Card className="border-slate-300 shadow-lg hover:shadow-xl bg-slate-50/95 backdrop-blur-enhanced transition-all duration-500 ease-wave h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-indigo-600" />
                  India Coastal States Map
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="relative bg-white rounded-lg overflow-hidden border border-slate-300 mb-4">
                  <ImageWithFallback
                    src={INDIA_Coastal_map}
                    alt="India Coastal States Map"
                    className="w-full h-56 object-contain"
                  />
                  <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-md text-xs shadow-lg border border-slate-300">
                    <div className="text-indigo-700 font-semibold mb-1">Coastal Regions</div>
                    <div className="text-slate-600 text-xs">
                      • Western Coast: Arabian Sea<br />
                      • Eastern Coast: Bay of Bengal<br />
                      • Southern Tip: Indian Ocean
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-md text-xs shadow-lg border border-slate-300">
                    <span className="text-violet-700 font-semibold">13 Coastal States & UTs</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Monitoring Status */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.7 }}
          >
            <Card className="border-slate-300 shadow-lg hover:shadow-xl bg-slate-50/95 backdrop-blur-enhanced transition-all duration-500 ease-wave h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Live Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  {[
                    { state: "Gujarat", status: "active", reports: 12, weather: "Clear" },
                    { state: "Maharashtra", status: "alert", reports: 8, weather: "Rough Seas" },
                    { state: "Tamil Nadu", status: "active", reports: 15, weather: "Moderate" },
                    { state: "Andhra Pradesh", status: "warning", reports: 6, weather: "Cyclone Watch" },
                    { state: "Kerala", status: "active", reports: 9, weather: "Calm" },
                    { state: "Odisha", status: "alert", reports: 4, weather: "Windy" }
                  ].map((point, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.1 }}
                      className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full ${
                          point.status === 'active' ? 'bg-green-500' :
                          point.status === 'alert' ? 'bg-orange-500' : 'bg-red-500'
                        }`}></div>
                        <span className="text-sm font-medium">{point.state}</span>
                      </div>
                      <div className="text-xs text-slate-600 text-right">
                        <div>{point.reports} reports</div>
                        <div className="text-xs">{point.weather}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Detailed Coastal Information */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          {/* Western Coast */}
          <Card className="border-slate-300 shadow-lg bg-slate-50/95 backdrop-blur-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5 text-purple-600" />
                Western Coastal Plains
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <p className="text-sm text-purple-800 mb-3">
                    <strong>Location:</strong> Gulf of Khambhat to Kanniyakumari, between Arabian Sea and Western Ghats
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white rounded p-2 text-center">
                      <div className="font-semibold text-purple-700">Konkan Coast</div>
                      <div className="text-purple-600">Northern region</div>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <div className="font-semibold text-purple-700">Karnataka Coast</div>
                      <div className="text-purple-600">Central region</div>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <div className="font-semibold text-purple-700">Malabar Coast</div>
                      <div className="text-purple-600">Kerala coast</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Estuaries and backwaters",
                      "Major ports: Mumbai, Kandla, Mangalore",
                      "Narrow coastal plains",
                      "High rainfall regions"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Eastern Coast */}
          <Card className="border-slate-300 shadow-lg bg-slate-50/95 backdrop-blur-enhanced">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5 text-blue-600" />
                Eastern Coastal Plains
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800 mb-3">
                    <strong>Location:</strong> Ganga delta to Kanniyakumari, between Eastern Ghats and Bay of Bengal
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div className="bg-white rounded p-2 text-center">
                      <div className="font-semibold text-blue-700">Utkal Coast</div>
                      <div className="text-blue-600">Odisha region</div>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <div className="font-semibold text-blue-700">Andhra Coast</div>
                      <div className="text-blue-600">AP coastline</div>
                    </div>
                    <div className="bg-white rounded p-2 text-center">
                      <div className="font-semibold text-blue-700">Coromandel Coast</div>
                      <div className="text-blue-600">Tamil Nadu</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">Key Features:</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Large river deltas: Mahanadi, Godavari, Krishna, Cauvery",
                      "Major ports: Chennai, Visakhapatnam, Paradip",
                      "Wider coastal plains",
                      "Cyclone-prone regions"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* States and Union Territories Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="mb-8"
        >
          <Card className="border-slate-300 shadow-lg hover:shadow-xl bg-slate-50/95 backdrop-blur-enhanced transition-all duration-500 ease-wave">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-indigo-600" />
                Coastal States & Union Territories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coastal States */}
                <div className="lg:col-span-2">
                  <h4 className="font-semibold text-slate-900 mb-4">Coastal States</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {coastalStates.map((state, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1.8 + index * 0.05, duration: 0.5 }}
                        className="border-l-4 border-teal-300 hover:border-violet-400 pl-3 py-2 rounded-r-lg hover:bg-teal-50/50 transition-all duration-300 ease-wave"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-slate-900 text-sm">{state.name}</h5>
                          <Badge variant="outline" className="text-xs border-teal-300 text-teal-700">
                            {state.coastline}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-700 mb-1">
                          <strong>{state.division}</strong> • {state.population}
                        </p>
                        <div className="text-xs text-slate-600 mb-1">
                          {state.features.slice(0, 2).join(" • ")}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {state.hazards.map((hazard, hIndex) => (
                            <Badge key={hIndex} variant="secondary" className="text-xs bg-violet-100 text-violet-700">
                              {hazard}
                            </Badge>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Union Territories */}
                <div>
                  <h4 className="font-semibold text-slate-900 mb-4">Union Territories</h4>
                  <div className="space-y-3 mb-4">
                    {unionTerritories.map((ut, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.0 + index * 0.1, duration: 0.5 }}
                        className="border-l-4 border-emerald-300 hover:border-blue-400 pl-3 py-2 rounded-r-lg hover:bg-emerald-50/50 transition-all duration-300 ease-wave"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-medium text-slate-900 text-sm">{ut.name}</h5>
                          <Badge variant="outline" className="text-xs border-emerald-300 text-emerald-700">
                            {ut.coastline}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-700 mb-1">
                          Pop: {ut.population}
                        </p>
                        <div className="text-xs text-slate-600">
                          {ut.features.slice(0, 2).join(" • ")}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <h5 className="font-medium text-emerald-800 mb-2 text-sm">Island Territories</h5>
                    <p className="text-xs text-emerald-700">
                      3,228 km of island coastline featuring unique coral ecosystems and strategic maritime importance.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          className="bg-gradient-to-r from-slate-800 via-indigo-800 to-teal-800 rounded-2xl p-8 text-white text-center shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500"
        >
          <motion.h3 
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Our Mission
          </motion.h3>
          <motion.p 
            className="text-lg leading-relaxed max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            Snapby empowers coastal communities across India to report, monitor, and respond to ocean hazards 
            through crowdsourced data collection, real-time social media analytics, and integration with 
            official monitoring systems like INCOIS and the Indian Coast Guard.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}