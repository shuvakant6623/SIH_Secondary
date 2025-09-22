import { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Send, Bot, User, Twitter, Instagram, Facebook, ExternalLink, TrendingUp, AlertTriangle, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  sources?: string[];
}

interface SocialPost {
  id: number;
  platform: 'twitter' | 'instagram' | 'facebook';
  author: string;
  handle: string;
  content: string;
  timestamp: string;
  location?: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  relevanceScore: number;
  hazardKeywords: string[];
  verified: boolean;
}

export function LLMReportsSection() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      content: 'Hello! I\'m your AI Ocean Hazard Assistant. I can analyze real-time data, social media trends, and provide insights about coastal conditions. What would you like to know?',
      timestamp: new Date(),
      sources: ['INCOIS Database', 'Real-time Sensors']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const demoQuestions = [
    "What are the current wave conditions near Mumbai?",
    "Show me cyclone predictions for Tamil Nadu coast",
    "Are there any pollution reports from fishing communities?",
    "What's the tsunami risk level for Odisha today?",
    "Which beaches in Goa are safe for swimming right now?",
    "Tell me about recent coastal erosion in Kerala",
    "What are the trending ocean hazards on social media?",
    "Show me the latest INCOIS data for Bay of Bengal",
    "Are there any Coast Guard advisories for Andhra Pradesh?",
    "What's the current status of monsoon impact on beaches?"
  ];

  const socialPosts: SocialPost[] = [
    {
      id: 1,
      platform: 'twitter',
      author: 'Indian Coast Guard',
      handle: '@IndianCoastGuard',
      content: 'URGENT: Cyclonic storm approaching Andhra Pradesh coast. All fishing vessels return immediately. High waves 4-6m expected along Visakhapatnam to Machilipatnam. #CycloneAlert #SafetyFirst',
      timestamp: '45min ago',
      location: 'Andhra Pradesh',
      engagement: { likes: 1247, shares: 892, comments: 156 },
      relevanceScore: 95,
      hazardKeywords: ['cyclone', 'high waves', 'storm'],
      verified: true
    },
    {
      id: 2,
      platform: 'instagram',
      author: 'Mumbai Beaches Official',
      handle: '@mumbaibeaches',
      content: 'Red flag at Juhu Beach today! Strong undercurrents and 3m+ waves. Swimming prohibited. Please maintain safe distance from water. Lifeguards on high alert. 🚩⚠️ #BeachSafety #MumbaiBeaches',
      timestamp: '1h ago',
      location: 'Mumbai, Maharashtra',
      engagement: { likes: 2156, shares: 445, comments: 89 },
      relevanceScore: 88,
      hazardKeywords: ['red flag', 'high waves', 'undercurrents'],
      verified: true
    },
    {
      id: 3,
      platform: 'facebook',
      author: 'Kerala Fishermen Association',
      handle: 'KeralFishermen',
      content: 'ALERT: Oil spill reported 15km off Kochi coast. Dead fish washing ashore at Vypin. Avoid fishing in affected areas. Coast Guard cleanup operation underway. Contact 1554 for reporting.',
      timestamp: '2h ago',
      location: 'Kochi, Kerala',
      engagement: { likes: 856, shares: 234, comments: 67 },
      relevanceScore: 92,
      hazardKeywords: ['oil spill', 'pollution', 'dead fish'],
      verified: true
    },
    {
      id: 4,
      platform: 'twitter',
      author: 'Chennai Port Trust',
      handle: '@ChennaiPort',
      content: 'Port operations temporarily suspended due to rough sea conditions. Wave height 2.5m+, wind speed 35kmph. All vessel movements postponed until conditions improve. #PortSafety',
      timestamp: '3h ago',
      location: 'Chennai, Tamil Nadu',
      engagement: { likes: 432, shares: 178, comments: 45 },
      relevanceScore: 85,
      hazardKeywords: ['rough sea', 'high waves', 'strong winds'],
      verified: true
    },
    {
      id: 5,
      platform: 'instagram',
      author: 'Goa Tourism',
      handle: '@goatourism',
      content: 'Beautiful morning at Anjuna Beach! Calm seas, perfect for water sports. Water temperature 28°C, gentle breeze from SW. Excellent conditions for beach activities today! 🏖️☀️',
      timestamp: '4h ago',
      location: 'Goa',
      engagement: { likes: 3421, shares: 567, comments: 234 },
      relevanceScore: 65,
      hazardKeywords: ['calm seas', 'perfect conditions'],
      verified: true
    },
    {
      id: 6,
      platform: 'twitter',
      author: 'INCOIS India',
      handle: '@incoisindia',
      content: 'Tsunami Advisory: Minor sea level fluctuations possible along East Coast due to distant seismic activity. No immediate threat. Coastal communities advised to stay alert. #TsunamiWatch',
      timestamp: '5h ago',
      location: 'East Coast India',
      engagement: { likes: 678, shares: 456, comments: 123 },
      relevanceScore: 90,
      hazardKeywords: ['tsunami', 'sea level', 'seismic activity'],
      verified: true
    }
  ];

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response with contextual responses
    setTimeout(() => {
      const responses = [
        {
          content: `Based on current INCOIS data and social media analysis, I've identified several key coastal hazards in your area of interest. The Mumbai coast is currently experiencing wave heights of 2.3m with strong undercurrents. I recommend avoiding water activities until conditions improve.`,
          sources: ['INCOIS Real-time Data', 'Social Media Analysis', 'Coast Guard Reports']
        },
        {
          content: `I've analyzed 156 recent social media posts about coastal conditions. Currently trending: #CycloneAlert in Andhra Pradesh (95% relevance), oil spill reports in Kerala (92% relevance), and rough sea warnings in Chennai (85% relevance). Would you like detailed analysis of any specific region?`,
          sources: ['Twitter API', 'Instagram Analysis', 'Facebook Maritime Groups']
        },
        {
          content: `Current hazard levels across major Indian ports: Mumbai (Medium), Chennai (High), Kochi (High due to pollution), Visakhapatnam (Very High - Cyclone), Goa (Low). Real-time monitoring shows deteriorating conditions along the eastern coast.`,
          sources: ['Port Authorities', 'Weather Services', 'Real-time Sensors']
        },
        {
          content: `Analyzing cyclone patterns for Tamil Nadu: Current models show a developing low-pressure system in Bay of Bengal. Expected impact: 48-72 hours. Wave heights may reach 4-6m along Chennai-Cuddalore coast. Fishing operations should be suspended. 156 social media reports confirm fishermen returning to harbors.`,
          sources: ['India Meteorological Department', 'Fishermen WhatsApp Groups', 'INCOIS Buoy Data']
        },
        {
          content: `Goa beach safety update: Calangute and Anjuna beaches currently show yellow flag conditions. Morjim has reported rip currents (social media: 23 posts, 89% verified). Palolem remains safe for swimming. Tourist safety advisories active for north Goa coastline.`,
          sources: ['Goa Tourism Board', 'Lifeguard Reports', 'Tourist Social Posts']
        },
        {
          content: `Kerala coastal erosion analysis: Accelerated erosion detected at Varkala and Kovalam. Satellite imagery shows 15m shoreline retreat in past 6 months. Local fishing communities report 47 incidents. Immediate intervention recommended for affected areas.`,
          sources: ['ISRO Satellite Data', 'Local Community Reports', 'Geological Survey']
        },
        {
          content: `Pollution alert synthesis: Oil spill reported 15km off Kochi (verified by 89 social posts). Plastic debris concentration high near Mumbai coast (127 reports). Dead fish washing ashore in 3 locations across west coast. Environmental response teams deployed.`,
          sources: ['Coast Guard Surveillance', 'Environmental NGOs', 'Fishermen Associations']
        },
        {
          content: `Tsunami risk assessment: Current seismic activity in Indian Ocean shows minimal threat. INCOIS maintains "WATCH" status for Andhra Pradesh and Odisha coasts due to minor sea level fluctuations. No immediate evacuation required. Monitoring continues.`,
          sources: ['National Tsunami Warning Center', 'Seismic Monitoring Network', 'INCOIS Alerts']
        }
      ];

      // Try to provide contextual response based on input
      let response = responses[Math.floor(Math.random() * responses.length)];
      
      if (inputValue.toLowerCase().includes('cyclone') || inputValue.toLowerCase().includes('tamil nadu')) {
        response = responses[3];
      } else if (inputValue.toLowerCase().includes('goa') || inputValue.toLowerCase().includes('swimming')) {
        response = responses[4];
      } else if (inputValue.toLowerCase().includes('kerala') || inputValue.toLowerCase().includes('erosion')) {
        response = responses[5];
      } else if (inputValue.toLowerCase().includes('pollution') || inputValue.toLowerCase().includes('oil spill')) {
        response = responses[6];
      } else if (inputValue.toLowerCase().includes('tsunami')) {
        response = responses[7];
      }

      const botMessage: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: response.content,
        timestamp: new Date(),
        sources: response.sources
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'twitter': return <Twitter className="w-4 h-4 text-blue-500" />;
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'facebook': return <Facebook className="w-4 h-4 text-blue-600" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'bg-red-100 text-red-800';
    if (score >= 80) return 'bg-orange-100 text-orange-800';
    if (score >= 70) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getRelevanceLabel = (score: number) => {
    if (score >= 90) return 'Critical';
    if (score >= 80) return 'High';
    if (score >= 70) return 'Medium';
    return 'Low';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">AI-Powered Ocean Intelligence</h2>
        <p className="text-lg text-gray-600 max-w-4xl mx-auto">
          Advanced AI analysis of real-time data and social media trends for comprehensive ocean hazard intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Chat Interface */}
        <div className="lg:col-span-1">
          <Card className="h-[600px] flex flex-col">
            <div className="p-4 border-b bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">AI Ocean Assistant</h3>
                  <p className="text-xs text-purple-100">Powered by ML & Real-time Data</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] ${message.type === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && <Bot className="w-4 h-4 mt-1 text-purple-600" />}
                      {message.type === 'user' && <User className="w-4 h-4 mt-1" />}
                      <div className="flex-1">
                        <p className="text-sm">{message.content}</p>
                        {message.sources && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-xs text-gray-500 mb-1">Sources:</p>
                            <div className="space-y-1">
                              {message.sources.map((source, index) => (
                                <Badge key={index} variant="secondary" className="text-xs mr-1">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Bot className="w-4 h-4 text-purple-600" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 border-t">
              {/* Demo Questions */}
              <div className="mb-4">
                <h4 className="text-xs font-medium text-gray-600 mb-2">Quick Questions:</h4>
                <div className="flex flex-wrap gap-1 max-h-20 overflow-y-auto">
                  {demoQuestions.slice(0, 6).map((question, index) => (
                    <button
                      key={index}
                      onClick={() => setInputValue(question)}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-md transition-colors duration-200 whitespace-nowrap"
                      disabled={isTyping}
                    >
                      {question.length > 35 ? question.substring(0, 35) + '...' : question}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about ocean conditions..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isTyping}
                />
                <Button onClick={handleSendMessage} disabled={!inputValue.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Social Media Intelligence */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 text-blue-600" />
                <div>
                  <h3 className="text-xl font-semibold">Social Media Intelligence</h3>
                  <p className="text-sm text-gray-600">Real-time analysis of coastal hazard discussions</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary" className="bg-green-100 text-green-800">
                  🟢 Live Feed
                </Badge>
                <span className="text-sm text-gray-500">Updated 30s ago</span>
              </div>
            </div>

            <Tabs defaultValue="trending" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="trending">Trending Now</TabsTrigger>
                <TabsTrigger value="alerts">High Priority</TabsTrigger>
                <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
              </TabsList>

              <TabsContent value="trending" className="mt-6">
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {socialPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          {getPlatformIcon(post.platform)}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{post.author}</span>
                              {post.verified && <Badge className="bg-blue-100 text-blue-800 text-xs">✓</Badge>}
                            </div>
                            <span className="text-sm text-gray-500">{post.handle}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getRelevanceColor(post.relevanceScore)}>
                            {getRelevanceLabel(post.relevanceScore)}
                          </Badge>
                          <span className="text-xs text-gray-500">{post.timestamp}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-800 mb-3 leading-relaxed">{post.content}</p>

                      {post.location && (
                        <div className="flex items-center space-x-1 mb-3 text-sm text-gray-600">
                          <MapPin className="w-3 h-3" />
                          <span>{post.location}</span>
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <span>❤️ {post.engagement.likes.toLocaleString()}</span>
                          <span>🔁 {post.engagement.shares}</span>
                          <span>💬 {post.engagement.comments}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex flex-wrap gap-1">
                            {post.hazardKeywords.slice(0, 2).map((keyword, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                #{keyword}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="alerts" className="mt-6">
                <div className="space-y-4">
                  {socialPosts
                    .filter(post => post.relevanceScore >= 85)
                    .map((post) => (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg"
                      >
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getPlatformIcon(post.platform)}
                                <span className="font-medium">{post.author}</span>
                                <Badge className="bg-red-100 text-red-800">
                                  {post.relevanceScore}% Relevance
                                </Badge>
                              </div>
                              <span className="text-xs text-gray-500">{post.timestamp}</span>
                            </div>
                            <p className="text-sm text-gray-800 mb-2">{post.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex flex-wrap gap-1">
                                {post.hazardKeywords.map((keyword, index) => (
                                  <Badge key={index} variant="destructive" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                              <Button size="sm" variant="outline">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="mt-6">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2 text-blue-600" />
                        Trending Topics
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">#CycloneAlert</span>
                          <Badge className="bg-red-100 text-red-800">1,247 posts</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">#HighWaves</span>
                          <Badge className="bg-orange-100 text-orange-800">892 posts</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">#BeachSafety</span>
                          <Badge className="bg-yellow-100 text-yellow-800">634 posts</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">#OilSpill</span>
                          <Badge className="bg-purple-100 text-purple-800">456 posts</Badge>
                        </div>
                      </div>
                    </Card>

                    <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2 text-green-600" />
                        Regional Alerts
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Andhra Pradesh</span>
                          <Badge className="bg-red-100 text-red-800">Very High</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Kerala Coast</span>
                          <Badge className="bg-red-100 text-red-800">High</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Mumbai</span>
                          <Badge className="bg-orange-100 text-orange-800">Medium</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Goa</span>
                          <Badge className="bg-green-100 text-green-800">Low</Badge>
                        </div>
                      </div>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3">AI Insights Summary</h4>
                    <div className="prose prose-sm">
                      <p className="text-gray-700 mb-3">
                        <strong>Current Situation:</strong> Social media analysis indicates heightened concern about coastal conditions across multiple regions. Cyclonic activity in Andhra Pradesh is generating the highest engagement (1,247 posts, 95% relevance).
                      </p>
                      <p className="text-gray-700 mb-3">
                        <strong>Key Findings:</strong> Oil spill reports from Kerala fishermen show 92% relevance score with verified sources. Mumbai beaches reporting red flag conditions with strong community engagement.
                      </p>
                      <p className="text-gray-700">
                        <strong>Recommendations:</strong> Enhanced monitoring recommended for eastern coast. Social sentiment analysis suggests public concern is highest for pollution events and extreme weather warnings.
                      </p>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}