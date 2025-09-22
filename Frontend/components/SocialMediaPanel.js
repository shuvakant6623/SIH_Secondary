import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronUp, ChevronDown, Twitter, MessageSquare, TrendingUp, Clock } from 'lucide-react';
import { Card } from './ui/card.js';
import { Badge } from './ui/badge.js';

const mockPosts = [
  {
    id: 1,
    platform: 'twitter',
    user: '@ChennaiPorts',
    content: 'High tide alert for Marina Beach. Wave heights reaching 2.8m. Fishermen advised to avoid venturing out. #ChennaiCoast #SafetyFirst',
    timestamp: '5 min ago',
    engagement: { likes: 124, shares: 45 },
    sentiment: 'warning',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: 2,
    platform: 'twitter',
    user: '@GoaCoastGuard',
    content: 'Beautiful sunrise at Calangute Beach! Perfect conditions for morning activities. Water temperature: 27°C 🌊☀️',
    timestamp: '12 min ago',
    engagement: { likes: 89, shares: 23 },
    sentiment: 'positive',
    location: 'Goa'
  },
  {
    id: 3,
    platform: 'twitter',
    user: '@MumbaiWeather',
    content: 'Monsoon swells building up along Marine Drive. Expected wave heights 3-4m by evening. Citizens advised caution near shoreline.',
    timestamp: '18 min ago',
    engagement: { likes: 256, shares: 89 },
    sentiment: 'warning',
    location: 'Mumbai, Maharashtra'
  },
  {
    id: 4,
    platform: 'twitter',
    user: '@KeralaFishermen',
    content: 'Excellent fishing conditions in Kochi backwaters. Calm seas and good visibility reported by local boats. 🎣',
    timestamp: '25 min ago',
    engagement: { likes: 67, shares: 12 },
    sentiment: 'positive',
    location: 'Kerala'
  }
];

export function SocialMediaPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'warning': return 'bg-red-100 text-red-800';
      case 'positive': return 'bg-green-100 text-green-800';
      case 'neutral': return 'bg-gray-100 text-gray-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <motion.div
        initial={false}
        animate={{ y: isExpanded ? 0 : 400 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white border-t-2 border-purple-200 shadow-2xl"
      >
        {/* Header */}
        <div 
          className="flex items-center justify-between p-4 cursor-pointer bg-gradient-to-r from-purple-50 to-blue-50"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-slate-900">Live Social Media Feed</h3>
            </div>
            <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
              4 new posts
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">
              {isExpanded ? 'Collapse' : 'Expand'} Feed
            </span>
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-slate-600" />
            ) : (
              <ChevronUp className="w-5 h-5 text-slate-600" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="max-h-96 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
            {mockPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-4 hover:shadow-lg transition-all duration-200 border-l-4 border-blue-400">
                  <div className="space-y-3">
                    {/* Post header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Twitter className="w-4 h-4 text-blue-500" />
                        <span className="font-medium text-sm text-slate-700">{post.user}</span>
                      </div>
                      <Badge className={`text-xs ${getSentimentColor(post.sentiment)}`}>
                        {post.sentiment}
                      </Badge>
                    </div>

                    {/* Content */}
                    <p className="text-sm text-slate-800 leading-relaxed">{post.content}</p>

                    {/* Location */}
                    <div className="flex items-center space-x-1 text-xs text-slate-500">
                      <span>📍</span>
                      <span>{post.location}</span>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center space-x-3 text-xs text-slate-500">
                        <span>❤️ {post.engagement.likes}</span>
                        <span>🔄 {post.engagement.shares}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" />
                        <span>{post.timestamp}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mini preview when collapsed */}
        {!isExpanded && (
          <div className="px-4 pb-2">
            <div className="flex items-center space-x-4 text-sm text-slate-600">
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>3 warnings</span>
              </div>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>2 safe conditions</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageSquare className="w-3 h-3" />
                <span>Latest: Chennai high tide alert</span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}