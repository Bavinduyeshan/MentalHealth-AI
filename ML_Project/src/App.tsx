import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home as HomeIcon, 
  BrainCircuit, 
  BarChart3, 
  Activity, 
  Heart, 
  Zap, 
  Info, 
  ChevronRight, 
  ArrowRight,
  ShieldCheck,
  Users,
  Lightbulb,
  CheckCircle2,
  Menu,
  X
} from 'lucide-react';
import { cn } from './lib/utils';
import Landing from './components/Landing';
import Predictor from './components/Predictor';
import Analytics from './components/Analytics';

type Page = 'home' | 'predictor' | 'analytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: HomeIcon },
    { id: 'predictor', label: 'Predictor', icon: BrainCircuit },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentPage('home')}>
              <div className="bg-teal-600 p-2 rounded-lg text-white">
                <BrainCircuit size={24} />
              </div>
              <span className="font-bold text-xl tracking-tight text-teal-900 hidden sm:block">
                MH & Lifestyle Intelligence
              </span>
              <span className="font-bold text-xl tracking-tight text-teal-900 sm:hidden">
                MHLI
              </span>
            </div>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentPage(item.id as Page)}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-teal-600",
                    currentPage === item.id ? "text-teal-600" : "text-slate-600"
                  )}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => setCurrentPage('predictor')}
                className="bg-teal-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-teal-700 transition-all shadow-md shadow-teal-600/20 active:scale-95"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-600"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentPage(item.id as Page);
                      setIsMenuOpen(false);
                    }}
                    className={cn(
                      "flex items-center gap-3 w-full px-3 py-3 rounded-md text-base font-medium",
                      currentPage === item.id 
                        ? "bg-teal-50 text-teal-700" 
                        : "text-slate-600 hover:bg-slate-50"
                    )}
                  >
                    <item.icon size={20} />
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-16 min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full"
          >
            {currentPage === 'home' && <Landing onStart={() => setCurrentPage('predictor')} />}
            {currentPage === 'predictor' && <Predictor />}
            {currentPage === 'analytics' && <Analytics />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center border-b border-white/10 pb-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="text-teal-400" size={28} />
                <span className="text-white font-bold text-xl">MHLI System</span>
              </div>
              <p className="max-w-md text-sm leading-relaxed">
                Using multi-output classification and regression to empower student wellness.
              </p>
            </div>
            <div className="flex md:justify-end gap-12">
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
                <ul className="space-y-2 text-sm">
                  <li><button onClick={() => setCurrentPage('home')} className="hover:text-teal-400 transition-colors">Home</button></li>
                  <li><button onClick={() => setCurrentPage('predictor')} className="hover:text-teal-400 transition-colors">Predictor</button></li>
                  <li><button onClick={() => setCurrentPage('analytics')} className="hover:text-teal-400 transition-colors">Analytics</button></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Powered By</h4>
                <ul className="space-y-2 text-sm">
                  <li>XGBoost & Gradient Boosting</li>
                  <li>Gemini Intelligence</li>
                  <li>React & Motion</li>
                </ul>
              </div>
            </div>
          </div>
          <p className="text-center text-xs">
            © 2026 NIBM HNDSE 25.1 Intake. Professional academic project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
