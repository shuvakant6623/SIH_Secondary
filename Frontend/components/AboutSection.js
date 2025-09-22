import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.js';
import { Badge } from './ui/badge.js';
import { MapPin, Waves, Users, Shield } from 'lucide-react';

const coastalStates = [
  { name: "Gujarat", coastline: "1,663 km", population: "60M", hazards: ["Cyclones", "High Tides"] },
  { name: "Maharashtra", coastline: "753 km", population: "112M", hazards: ["Monsoon Flooding", "Erosion"] },
  { name: "Goa", coastline: "160 km", population: "1.5M", hazards: ["Beach Erosion", "Tourist Safety"] },
  { name: "Karnataka", coastline: "320 km", population: "61M", hazards: ["Rip Currents", "Fishing Hazards"] },
  { name: "Kerala", coastline: "590 km", population: "33M", hazards: ["Tsunami Risk", "Backwater Changes"] },
  { name: "Tamil Nadu", coastline: "1,076 km", population: "72M", hazards: ["Cyclones", "Storm Surge"] },
  { name: "Andhra Pradesh", coastline: "974 km", population: "49M", hazards: ["Cyclones", "Fishing Industry"] },
  { name: "Odisha", coastline: "485 km", population: "42M", hazards: ["Super Cyclones", "Coastal Erosion"] },
  { name: "West Bengal", coastline: "158 km", population: "91M", hazards: ["Cyclones", "Mangrove Loss"] }
];

const keyStats = [
  { icon: <MapPin className="h-6 w-6" />, label: "Total Coastline", value: "7,516 km", color: "text-purple-700" },
  { icon: <Users className="h-6 w-6" />, label: "Coastal Population", value: "560M+", color: "text-blue-700" },
  { icon: <Waves className="h-6 w-6" />, label: "Major Ports", value: "200+", color: "text-green-700" },
  { icon: <Shield className="h-6 w-6" />, label: "Coast Guard Stations", value: "150+", color: "text-blue-700" }
];

export function AboutSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-green-50" id="about">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            About India's Coastline
          </h2>
          <p className="text-lg text-slate-800 max-w-3xl mx-auto">
            India has one of the longest coastlines in the world, spanning over 7,516 kilometers 
            across 9 states and 4 union territories, protecting millions of lives and livelihoods.
          </p>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          {keyStats.map((stat, index) => (
            <Card key={index} className="text-center border-none shadow-lg">
              <CardContent className="p-6">
                <div className={`${stat.color} mb-3 flex justify-center`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-slate-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-800">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* India Map Placeholder and Coastal States */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Map Section */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-purple-700" />
                Coastal Map of India
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="relative bg-purple-50 rounded-lg p-8 h-80 flex items-center justify-center border-2 border-dashed border-purple-300">
                <div className="text-center">
                  <MapPin className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-slate-800 mb-2">Interactive Map Integration</p>
                  <p className="text-sm text-slate-700">Source: Maps of India (mapsofindia.com)</p>
                  <p className="text-xs text-slate-600 mt-2">
                    Real-time coastal monitoring stations<br />
                    and hazard reporting locations across<br />
                    9 states and 4 union territories
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Coastal States Info */}
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5 text-blue-700" />
                Coastal States Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {coastalStates.map((state, index) => (
                  <div key={index} className="border-l-4 border-blue-300 pl-4 py-2">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900">{state.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {state.coastline}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-700 mb-2">
                      Population: {state.population}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {state.hazards.map((hazard, hIndex) => (
                        <Badge key={hIndex} variant="secondary" className="text-xs">
                          {hazard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            Snapby empowers coastal communities across India to report, monitor, and respond to ocean hazards 
            through crowdsourced data collection, real-time social media analytics, and integration with 
            official monitoring systems like INCOIS and the Indian Coast Guard.
          </p>
        </div>
      </div>
    </section>
  );
}