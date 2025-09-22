import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.js';
import { Badge } from './ui/badge.js';
import { Button } from './ui/button.js';
import { motion } from 'motion/react';
import { Camera, MapPin, Clock, AlertTriangle, Eye, ThumbsUp } from 'lucide-react';

const mockReports = [
  {
    id: 1,
    title: 'High Waves at Marina Beach',
    location: 'Marina Beach, Chennai',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    timestamp: '15 minutes ago',
    severity: 'high',
    category: 'waves',
    description: 'Unusually high waves observed, approximately 3-4 meters. Strong undertow present.',
    image: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=400',
    reporter: 'LocalFisherman_123',
    views: 45,
    upvotes: 23,
    verified: true
  },
  {
    id: 2,
    title: 'Oil Spill Detected',
    location: 'Kandla Port, Gujarat',
    coordinates: { lat: 23.0225, lng: 70.2208 },
    timestamp: '1 hour ago',
    severity: 'critical',
    category: 'pollution',
    description: 'Small oil spill noticed near the port area. Approximately 50m diameter.',
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400',
    reporter: 'PortWorker_456',
    views: 128,
    upvotes: 67,
    verified: true
  },
  {
    id: 3,
    title: 'Jellyfish Bloom Warning',
    location: 'Calangute Beach, Goa',
    coordinates: { lat: 15.5558, lng: 73.7539 },
    timestamp: '2 hours ago',
    severity: 'medium',
    category: 'marine-life',
    description: 'Large number of jellyfish spotted near shore. Swimmers advised to be cautious.',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400',
    reporter: 'BeachGuard_789',
    views: 89,
    upvotes: 34,
    verified: false
  },
  {
    id: 4,
    title: 'Coastal Erosion Progress',
    location: 'Puducherry Coast',
    coordinates: { lat: 11.9416, lng: 79.8083 },
    timestamp: '3 hours ago',
    severity: 'medium',
    category: 'erosion',
    description: 'Continued erosion of the coastline observed. Approximately 2m retreat from last month.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
    reporter: 'ResearchTeam_101',
    views: 156,
    upvotes: 89,
    verified: true
  }
];

const categoryColors = {
  'waves': 'bg-blue-100 text-blue-800',
  'pollution': 'bg-red-100 text-red-800',
  'marine-life': 'bg-green-100 text-green-800',
  'erosion': 'bg-yellow-100 text-yellow-800',
  'weather': 'bg-purple-100 text-purple-800'
};

const severityColors = {
  'critical': 'bg-red-500',
  'high': 'bg-orange-500',
  'medium': 'bg-yellow-500',
  'low': 'bg-green-500'
};

export function SnapReportsSection() {
  const [selectedReport, setSelectedReport] = useState(null);
  const [filter, setFilter] = useState('all');

  const filteredReports = filter === 'all' 
    ? mockReports 
    : mockReports.filter(report => report.category === filter);

  return (
    <section className="py-16" id="snap-reports">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Community Snap Reports
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Real-time reports from coastal communities across India. Help us monitor ocean hazards 
            and keep our coastlines safe for everyone.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {['all', 'waves', 'pollution', 'marine-life', 'erosion', 'weather'].map((category) => (
            <Button
              key={category}
              variant={filter === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter(category)}
              className="capitalize"
            >
              {category === 'all' ? 'All Reports' : category.replace('-', ' ')}
            </Button>
          ))}
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer border-l-4 border-blue-400">
                <div className="relative">
                  <img
                    src={report.image}
                    alt={report.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3 flex space-x-2">
                    <div className={`w-3 h-3 rounded-full ${severityColors[report.severity]}`}></div>
                    {report.verified && (
                      <Badge className="bg-green-600 text-white text-xs">
                        ✓ Verified
                      </Badge>
                    )}
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className={`text-xs ${categoryColors[report.category]}`}>
                      {report.category.replace('-', ' ')}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-semibold text-slate-900 mb-1">{report.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">{report.description}</p>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span className="truncate">{report.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{report.timestamp}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1">
                          <Eye className="w-3 h-3" />
                          <span>{report.views}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="w-3 h-3" />
                          <span>{report.upvotes}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-xs text-slate-500">by {report.reporter}</span>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setSelectedReport(report)}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Upload CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Card className="p-8 bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
            <div className="space-y-4">
              <Camera className="w-12 h-12 text-purple-600 mx-auto" />
              <h3 className="text-xl font-semibold text-slate-900">
                Spotted an Ocean Hazard?
              </h3>
              <p className="text-slate-600 max-w-md mx-auto">
                Help your coastal community stay safe by reporting hazards. Every report makes a difference.
              </p>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Camera className="w-4 h-4 mr-2" />
                Upload Your Report
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}