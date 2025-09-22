import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card.js';
import { Badge } from './ui/badge.js';
import { Button } from './ui/button.js';
import { motion } from 'motion/react';
import { MessageSquare, Bot, TrendingUp, AlertCircle, Clock, MapPin } from 'lucide-react';

const mockAnalysis = [
  {
    id: 1,
    title: 'Cyclone Formation Analysis',
    summary: 'AI detected potential cyclone formation patterns in Bay of Bengal based on social media reports and satellite data.',
    confidence: 85,
    region: 'Bay of Bengal',
    timestamp: '10 minutes ago',
    category: 'weather',
    severity: 'high',
    sources: 156,
    insights: [
      'Increased mentions of heavy winds in Odisha coastal areas',
      'Temperature anomalies reported by fishing communities',
      'Satellite imagery confirms cloud formation patterns'
    ]
  },
  {
    id: 2,
    title: 'Tourist Safety Alert - Goa',
    summary: 'Analysis of social media posts indicates rising concern about rip currents at popular Goa beaches.',
    confidence: 72,
    region: 'Goa Coastline',
    timestamp: '25 minutes ago',
    category: 'safety',
    severity: 'medium',
    sources: 89,
    insights: [
      'Multiple tourist posts about strong currents at Calangute',
      'Lifeguard reports align with social media observations',
      'Recommendation for enhanced warning systems'
    ]
  },
  {
    id: 3,
    title: 'Pollution Spike Detection',
    summary: 'LLM analysis reveals coordinated reports of water discoloration along Mumbai coastline, suggesting pollution event.',
    confidence: 91,
    region: 'Mumbai Marine Drive',
    timestamp: '1 hour ago',
    category: 'pollution',
    severity: 'high',
    sources: 234,
    insights: [
      'Consistent reports of unusual water color near Marine Drive',
      'Industrial activity correlation detected in posts',
      'Cross-referenced with official pollution monitoring data'
    ]
  }
];

const chatMessages = [
  {
    id: 1,
    type: 'bot',
    content: 'I\'m analyzing real-time social media data for coastal hazards. What would you like to know?',
    timestamp: new Date(Date.now() - 300000)
  },
  {
    id: 2,
    type: 'user',
    content: 'What\'s the current situation along the Kerala coast?',
    timestamp: new Date(Date.now() - 240000)
  },
  {
    id: 3,
    type: 'bot',
    content: 'Based on 47 recent posts from Kerala coastal areas: ✅ Generally safe conditions reported. 🌊 Calm seas at Kovalam and Varkala. ⚠️ Minor warning: Strong winds expected tomorrow evening near Kochi.',
    timestamp: new Date(Date.now() - 180000)
  }
];

export function LLMReportsSection() {
  const [selectedAnalysis, setSelectedAnalysis] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(chatMessages);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'weather': return '🌪️';
      case 'safety': return '⚠️';
      case 'pollution': return '🏭';
      case 'marine-life': return '🐟';
      default: return '📊';
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: newMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: 'Analyzing your query against current social media data and official reports. Please wait...',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <section className="py-16" id="llm-reports">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            AI-Powered Coastal Intelligence
          </h2>
          <p className="text-lg text-slate-700 max-w-3xl mx-auto">
            Advanced language models analyze thousands of social media posts, news reports, and 
            community updates to provide real-time coastal intelligence and hazard detection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LLM Analysis Results */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                  Latest AI Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {mockAnalysis.map((analysis, index) => (
                    <motion.div
                      key={analysis.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-4 rounded-lg border-l-4 ${
                        analysis.severity === 'high' ? 'border-red-400' :
                        analysis.severity === 'medium' ? 'border-yellow-400' : 'border-green-400'
                      } bg-white shadow-sm hover:shadow-md transition-all cursor-pointer`}
                      onClick={() => setSelectedAnalysis(analysis)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getCategoryIcon(analysis.category)}</span>
                          <h3 className="font-medium text-slate-900">{analysis.title}</h3>
                        </div>
                        <Badge className={`text-xs ${getSeverityColor(analysis.severity)}`}>
                          {analysis.confidence}% confidence
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-slate-600 mb-3">{analysis.summary}</p>
                      
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{analysis.region}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{analysis.timestamp}</span>
                          </div>
                        </div>
                        <span>{analysis.sources} sources analyzed</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detailed Analysis Modal/Expanded View */}
            {selectedAnalysis && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                onClick={() => setSelectedAnalysis(null)}
              >
                <Card className="max-w-2xl w-full max-h-96 overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{selectedAnalysis.title}</span>
                      <Button variant="outline" size="sm" onClick={() => setSelectedAnalysis(null)}>
                        ✕
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-slate-700">{selectedAnalysis.summary}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Confidence:</span> {selectedAnalysis.confidence}%
                        </div>
                        <div>
                          <span className="font-medium">Sources:</span> {selectedAnalysis.sources}
                        </div>
                        <div>
                          <span className="font-medium">Region:</span> {selectedAnalysis.region}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {selectedAnalysis.category}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Key Insights:</h4>
                        <ul className="space-y-1 text-sm text-slate-600">
                          {selectedAnalysis.insights.map((insight, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <span className="text-purple-600 mt-1">•</span>
                              <span>{insight}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* AI Chat Interface */}
          <div className="lg:col-span-1">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-blue-600" />
                  Ask Coastal AI
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {/* Chat messages */}
                  <div className="h-64 overflow-y-auto space-y-3 bg-gray-50 rounded-lg p-3">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                            message.type === 'user'
                              ? 'bg-blue-600 text-white'
                              : 'bg-white text-gray-800 shadow-sm border'
                          }`}
                        >
                          {message.type === 'bot' && (
                            <div className="flex items-center space-x-1 mb-1">
                              <Bot className="w-3 h-3" />
                              <span className="text-xs font-medium">Coastal AI</span>
                            </div>
                          )}
                          <p>{message.content}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message input */}
                  <form onSubmit={handleSendMessage} className="flex space-x-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Ask about coastal conditions..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <Button type="submit" size="sm">
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* AI Stats */}
            <Card className="mt-6">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <h4 className="font-medium text-slate-900">AI Processing Stats</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Posts analyzed today:</span>
                      <span className="font-medium">12,458</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Active sources:</span>
                      <span className="font-medium">89</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Alerts generated:</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Accuracy rate:</span>
                      <span className="font-medium text-green-600">94.2%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}