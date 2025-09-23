import { useState } from 'react';
import { MessageSquare, Send, MapPin, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { motion } from 'framer-motion';

interface ChatMessage {
  id: number;
  type: 'user' | 'bot';
  message: string;
  timestamp: Date;
  location?: string;
  alertLevel?: 'low' | 'medium' | 'high';
}

export function LocationChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      type: 'bot',
      message: 'Hello! I can help you check coastal hazard alerts for any location. Please enter a location name or coordinates.',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const mockResponses = [
    {
      location: 'Mumbai Coast',
      alert: 'Medium alert: High waves expected 2-3m. Strong currents near Juhu Beach.',
      level: 'medium' as const
    },
    {
      location: 'Goa Beaches',
      alert: 'Low alert: Calm conditions. Safe for swimming and water activities.',
      level: 'low' as const
    },
    {
      location: 'Chennai Marina',
      alert: 'High alert: Cyclonic conditions approaching. Avoid coastal areas.',
      level: 'high' as const
    },
    {
      location: 'Kochi Backwaters',
      alert: 'Low alert: Normal tidal conditions. Light winds from southwest.',
      level: 'low' as const
    }
  ];

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: messages.length + 1,
      type: 'user',
      message: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      const botMessage: ChatMessage = {
        id: messages.length + 2,
        type: 'bot',
        message: randomResponse.alert,
        timestamp: new Date(),
        location: randomResponse.location,
        alertLevel: randomResponse.level
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getAlertColor = (level?: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-blue-600 bg-blue-50 border-blue-200';
    }
  };

  return (
    <Card className="flex flex-col h-96 bg-white shadow-lg">
      <div className="flex items-center space-x-2 p-4 border-b bg-slate-800/60 backdrop-blur-sm text-white rounded-t-lg shadow-lg border-cyan-400/20">
        <MessageSquare className="w-5 h-5 text-cyan-400" />
        <h3 className="font-semibold text-slate-100">Coastal Alert Assistant</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : `${getAlertColor(message.alertLevel)} border`
              }`}
            >
              {message.location && (
                <div className="flex items-center space-x-1 mb-2 text-xs opacity-75">
                  <MapPin className="w-3 h-3" />
                  <span>{message.location}</span>
                </div>
              )}
              <p className="text-sm">{message.message}</p>
              {message.alertLevel && (
                <div className="flex items-center space-x-1 mt-2">
                  <AlertTriangle className="w-3 h-3" />
                  <span className="text-xs font-medium capitalize">{message.alertLevel} Alert</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter location for hazard alerts..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={handleSend} disabled={!inputValue.trim() || isTyping}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}