import { useState } from 'react';
import { Send, MapPin, AlertTriangle, MessageCircle } from 'lucide-react';
import { Button } from './ui/button.js';
import { Card } from './ui/card.js';
import { Badge } from './ui/badge.js';
import { motion } from 'motion/react';

const mockMessages = [
  {
    id: 1,
    type: 'system',
    content: 'Welcome to Snapby coastal monitoring! How can I help you today?',
    timestamp: new Date(Date.now() - 60000),
  },
  {
    id: 2,
    type: 'user',
    content: 'Is it safe to swim at Marina Beach today?',
    timestamp: new Date(Date.now() - 45000),
  },
  {
    id: 3,
    type: 'assistant',
    content: 'Based on current conditions at Marina Beach, Chennai: ⚠️ Moderate risk due to high waves (2.5m). Swimming not recommended. Strong undercurrents reported.',
    timestamp: new Date(Date.now() - 30000),
    location: { lat: 13.0827, lng: 80.2707, name: 'Marina Beach, Chennai' }
  }
];

const hazardAlerts = [
  { type: 'high-waves', location: 'Puri Beach, Odisha', severity: 'high', time: '5 min ago' },
  { type: 'rip-current', location: 'Goa Beaches', severity: 'medium', time: '12 min ago' },
  { type: 'storm-warning', location: 'Gujarat Coast', severity: 'high', time: '25 min ago' }
];

export function LocationChat() {
  const [messages, setMessages] = useState(mockMessages);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'assistant',
        content: 'I understand your concern about coastal conditions. Let me check the latest data for your location...',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="p-6 bg-white border-blue-300 shadow-lg">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-blue-700" />
          <h3 className="font-semibold text-slate-900">Coastal AI Assistant</h3>
          <Badge variant="secondary" className="text-xs">Live</Badge>
        </div>

        {/* Recent Alerts */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-700">Recent Hazard Alerts</h4>
          {hazardAlerts.map((alert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-3 rounded-lg border ${getSeverityColor(alert.severity)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-medium capitalize">{alert.type.replace('-', ' ')}</span>
                </div>
                <span className="text-xs">{alert.time}</span>
              </div>
              <div className="flex items-center space-x-1 mt-1">
                <MapPin className="w-3 h-3" />
                <span className="text-xs">{alert.location}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chat Messages */}
        <div className="h-64 overflow-y-auto space-y-3 bg-gray-50 rounded-lg p-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  message.type === 'user'
                    ? 'bg-blue-600 text-white'
                    : message.type === 'system'
                    ? 'bg-gray-200 text-gray-800'
                    : 'bg-white text-gray-800 shadow-sm border'
                }`}
              >
                <p className="text-sm">{message.content}</p>
                {message.location && (
                  <div className="flex items-center space-x-1 mt-2 text-xs text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{message.location.name}</span>
                  </div>
                )}
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white text-gray-800 shadow-sm border px-4 py-2 rounded-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about coastal conditions..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Button type="submit" size="sm" className="bg-blue-700 hover:bg-blue-800">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  );
}