import { Waves, Menu, Bell } from 'lucide-react';
import { Button } from './ui/button';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 shadow-lg sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
            <Waves className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-bold text-xl">Snapby</h1>
            <p className="text-xs text-blue-100">Ocean Hazard Reporting</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
            <Bell className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 md:hidden">
            <Menu className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}