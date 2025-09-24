import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { motion } from 'framer-motion';
import { Radio, Mail, User, Lock } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userData: { username: string; email: string }) => void;
}

export function LoginPage({ onLogin }: LoginPageProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email) {
      onLogin({ username, email });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-teal-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -50, 50, 0],
            opacity: [0.3, 0.6, 0.3, 0.3]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-indigo-600/20 to-teal-600/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            x: [0, -80, 80, 0],
            y: [0, 60, -60, 0],
            opacity: [0.2, 0.5, 0.2, 0.2]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 5
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-teal-600/20 to-slate-600/20 rounded-full blur-3xl"
        />
      </div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-slate-800/80 backdrop-blur-enhanced border-slate-600/50 shadow-2xl">
          <CardHeader className="space-y-6 text-center pb-8">
            {/* Snapby Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex justify-center mb-4"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative"
              >
                <img 
                  src='../assets/SageLogo.png'
                  alt="SAGE Logo"
                  className="w-20 h-20 object-contain"
                />
                <motion.div
                  animate={{ 
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-indigo-400/20 rounded-full blur-lg"
                />
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <h1 className="text-3xl font-bold text-slate-100">Snapby</h1>
              <p className="text-slate-300 text-sm mt-2">Every Wave Tells a Story</p>
            </motion.div>

            <CardTitle className="text-xl font-semibold text-slate-100">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="username" className="text-slate-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-400" />
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-400 focus:ring-teal-400/20"
                  placeholder="Enter your username"
                  required
                />
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-slate-200 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-400" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-400 focus:ring-teal-400/20"
                  placeholder="Enter your email"
                  required
                />
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-slate-200 flex items-center gap-2">
                  <Lock className="w-4 h-4 text-teal-400" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-slate-700/50 border-slate-600 text-slate-100 placeholder:text-slate-400 focus:border-teal-400 focus:ring-teal-400/20"
                  placeholder="Enter your password"
                  required
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-500 hover:to-teal-500 text-white font-semibold py-2.5 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </Button>
              </motion.div>
            </form>

            {/* Toggle Sign Up / Sign In */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="text-center pt-4 border-t border-slate-600/50"
            >
              <p className="text-slate-300 text-sm">
                {isSignUp ? 'Already have an account?' : "Don't have an account?"}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 text-teal-400 hover:text-teal-300 font-medium transition-colors duration-200"
                >
                  {isSignUp ? 'Sign In' : 'Sign Up'}
                </button>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
