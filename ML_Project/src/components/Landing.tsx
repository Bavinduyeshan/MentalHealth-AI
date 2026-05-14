import React from 'react';
import { motion } from 'motion/react';
import menn from "../components/menn.jpeg";

import { 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  BarChart3, 
  BrainCircuit,
  Users
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Landing({ onStart }: { onStart: () => void }) {
  const steps = [
    {
      title: "Fill the Form",
      description: "Answer a series of questions across 18 unique lifestyle features.",
      icon: Users,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "AI Analysis",
      description: "Multi-output ML models process your data for precise outcomes.",
      icon: Zap,
      color: "bg-teal-100 text-teal-600"
    },
    {
      title: "Get Insights",
      description: "Receive 9 specific lifestyle insights and personalized wellness scores.",
      icon: BrainCircuit,
      color: "bg-indigo-100 text-indigo-600"
    }
  ];

  const benefits = [
    { title: "Early Stress Identification", icon: Activity },
    { title: "Personalized Wellness Insights", icon: ShieldCheck },
    { title: "Data-Driven Lifestyle Plans", icon: BarChart3 }
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 md:pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full border border-teal-100 text-sm font-medium"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                </span>
                Power-Up Student's Minds
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
              >
                Mental Health & <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                  Lifestyle Intelligence
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 max-w-xl leading-relaxed"
              >
                Harnessing the power of Multi-Output XGBoost and Gradient Boosting to predict 
                well-being outcomes and provide intelligent student lifestyle analytics.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <button 
                  onClick={onStart}
                  className="px-8 py-4 bg-teal-600 text-white rounded-2xl font-bold text-lg hover:bg-teal-700 transition-all hover:shadow-xl hover:shadow-teal-500/20 active:scale-95 flex items-center gap-2"
                >
                  Start Assessment <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-95">
                  Learn Tech Stack
                </button>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="absolute -top-12 -right-12 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl" />
              <img 
                src={menn}
                alt="Mental Health Visualization"
                className="relative rounded-3xl shadow-2xl border-4 border-white object-cover aspect-square"
                referrerPolicy="no-referrer"
              />
              {/* Floating Stat Card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4"
              >
                <div className="bg-green-100 p-3 rounded-xl text-green-600">
                  <Activity size={24} />
                </div>
                <div>
                  <div className="text-slate-400 text-xs font-bold uppercase tracking-wider">Accuracy</div>
                  <div className="text-2xl font-bold text-slate-900">98.2%</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-base font-bold text-teal-600 uppercase tracking-widest">Our Methodology</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">How the Intelligence System Works</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-all space-y-6"
            >
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", step.color)}>
                <step.icon size={28} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-bold text-slate-900">{step.title}</h4>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 bg-slate-50 rounded-[2rem] p-8 md:p-12 border border-slate-200">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h4 className="text-2xl font-bold text-slate-900">Advanced Engine Architecture</h4>
              <p className="text-slate-600">
                Our system utilizes <b>Multi-Output Classification</b> for predicting complex mental health statuses 
                and <b>Multi-Output Regression</b> for continuous wellness scoring. This dual approach provides 
                a holistic view of a student's mental landscape.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-teal-600 font-bold mb-1">XGBoost</div>
                <div className="text-slate-400 text-xs">Gradient Boosting Trees</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-blue-600 font-bold mb-1">9 Insights</div>
                <div className="text-slate-400 text-xs">Unique Data Points</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-indigo-600 font-bold mb-1">18 Features</div>
                <div className="text-slate-400 text-xs">Lifestyle Dimensions</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                <div className="text-purple-600 font-bold mb-1">Real-time</div>
                <div className="text-slate-400 text-xs">Prediction Engine</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-teal-900 py-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-teal-800/50 skew-x-[-20deg] transform translate-x-1/2" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-base font-bold text-teal-400 uppercase tracking-widest">Why it Matters</h2>
                <h3 className="text-3xl md:text-4xl font-bold text-white">Impactful Benefits for Students</h3>
                <p className="text-teal-100/70 text-lg">
                  Mental health is the foundation of academic success and personal growth. Our system provides the tools to maintain it.
                </p>
              </div>
              
              <div className="space-y-6">
                {benefits.map((benefit, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-center gap-4 text-white"
                  >
                    <div className="bg-teal-800 p-3 rounded-xl border border-teal-700">
                      <benefit.icon size={24} className="text-teal-400" />
                    </div>
                    <span className="text-lg font-semibold">{benefit.title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-teal-800/50 backdrop-blur-sm p-8 rounded-[2.5rem] border border-teal-700/50">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-teal-400 font-bold uppercase text-xs tracking-wider">Lifestyle Metrics</span>
                  <Activity size={18} className="text-teal-400" />
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Academic Resilience', value: 85, color: 'bg-teal-400' },
                    { label: 'Social Integration', value: 72, color: 'bg-blue-400' },
                    { label: 'Stress Management', value: 92, color: 'bg-indigo-400' }
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-white text-sm font-medium">
                        <span>{stat.label}</span>
                        <span>{stat.value}%</span>
                      </div>
                      <div className="h-2 w-full bg-teal-950 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.value}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={cn("h-full rounded-full", stat.color)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guide Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">How to Use</h2>
          <p className="text-slate-600">The process is designed to be seamless and informative.</p>
        </div>
        
        <div className="grid sm:grid-cols-2 gap-8 text-left">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4">
            <div className="text-teal-600 font-black text-2xl">01.</div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              Open the predictor and fill in your demographic and lifestyle details. 
              Be as honest as possible for best accuracy.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4">
            <div className="text-teal-600 font-black text-2xl">02.</div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              Submit the form to let the XGBoost engine and Gemini AI process the 18 lifestyle features.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4">
            <div className="text-teal-600 font-black text-2xl">03.</div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              Review your status prediction cards and explore the 9 unique lifestyle insights.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 flex gap-4">
            <div className="text-teal-600 font-black text-2xl">04.</div>
            <p className="text-sm text-slate-600 italic leading-relaxed">
              Check the Analytics page for detailed regression-based scores on sleep, productivity, and isolation.
            </p>
          </div>
        </div>
        
        <button 
          onClick={onStart}
          className="px-12 py-5 bg-teal-600 text-white rounded-2xl font-bold text-xl hover:bg-teal-700 transition-all hover:shadow-xl hover:shadow-teal-500/20 active:scale-95 mx-auto"
        >
          Begin Discovery
        </button>
      </section>
    </div>
  );
}
