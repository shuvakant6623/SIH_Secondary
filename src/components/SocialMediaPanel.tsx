import { useState } from 'react';
import { ChevronUp, ChevronDown, Twitter, Instagram, AlertTriangle, ExternalLink } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialPost {
  id: number;
  platform: 'twitter' | 'instagram';
  author: string;
  handle: string;
  content: string;
  timestamp: string;
  location: string;
  alertLevel: 'low' | 'medium' | 'high';
  likes: number;
  shares: number;
}

export function SocialMediaPanel() {
  const [isExpanded, setIsExpanded] = useState(false);

  const mockPosts: SocialPost[] = [
    {
      id: 1,
      platform: 'twitter',
      author: 'Coast Guard Mumbai',
      handle: '@CoastGuardMUM',
      content: 'HIGH ALERT: Cyclonic winds approaching Mumbai coast. All fishing vessels advised to return immediately. Avoid beaches till further notice.',
      timestamp: '2h ago',
      location: 'Mumbai, Maharashtra',
      alertLevel: 'high',
      likes: 234,
      shares: 89
    },
    {
      id: 2,
      platform: 'instagram',
      author: 'Goa Tourism',
      handle: '@goatourism',
      content: 'Beautiful sunset at Anjuna Beach today! Perfect conditions for evening walks. Water temperature: 28°C 🌅',
      timestamp: '4h ago',
      location: 'Goa',
      alertLevel: 'low',
      likes: 1205,
      shares: 156
    },
    {
      id: 3,
      platform: 'twitter',
      author: 'INCOIS',
      handle: '@incoisindia',
      content: 'Tsunami advisory issued for Andaman & Nicobar Islands. Coastal areas evacuated as precautionary measure.',
      timestamp: '6h ago',
      location: 'Andaman & Nicobar',
      alertLevel: 'high',
      likes: 567,
      shares: 423
    },
    {
      id: 4,
      platform: 'instagram',
      author: 'Chennai Beaches',
      handle: '@chennaibeaches',
      content: 'Marina Beach cleanup drive successful! Thanks to all volunteers. Beach conditions normal, safe for visitors.',
      timestamp: '8h ago',
      location: 'Chennai, Tamil Nadu',
      alertLevel: 'low',
      likes: 892,
      shares: 67
    }
  ];

  const getAlertColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      <motion.div
        initial={false}
        animate={{ y: isExpanded ? 0 : 300 }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="bg-white rounded-t-2xl shadow-2xl border-t border-gray-200"
      >
        {/* Handle */}
        <div 
          className="flex justify-center p-4 cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex items-center space-x-2">
            {isExpanded ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
            <span className="font-medium text-gray-700">Social Media Alerts</span>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {mockPosts.filter(p => p.alertLevel === 'high').length} Critical
            </Badge>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-h-96 overflow-y-auto p-4 pt-0"
            >
              <div className="space-y-4">
                {mockPosts.map((post) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 bg-gray-50"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {post.platform === 'twitter' ? (
                          <Twitter className="w-4 h-4 text-blue-500" />
                        ) : (
                          <Instagram className="w-4 h-4 text-pink-500" />
                        )}
                        <div>
                          <p className="font-medium text-sm">{post.author}</p>
                          <p className="text-xs text-gray-500">{post.handle}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className={getAlertColor(post.alertLevel)}>
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {post.alertLevel.toUpperCase()}
                        </Badge>
                        <span className="text-xs text-gray-500">{post.timestamp}</span>
                      </div>
                    </div>

                    <p className="text-sm text-gray-800 mb-3">{post.content}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>📍 {post.location}</span>
                        <span>❤️ {post.likes}</span>
                        <span>🔁 {post.shares}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800">
                        <ExternalLink className="w-3 h-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}