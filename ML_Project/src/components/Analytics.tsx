// Analytics.tsx

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  Activity,
  Moon,
  Zap,
  Users,
  ChevronRight,
  TrendingUp,
  BrainCircuit,
  Loader2
} from 'lucide-react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

import {
  PredictionData,
  PredictionResult,
  getMentalHealthPrediction
} from '../services/apiService.ts';

import { cn } from '../lib/utils';

export default function Analytics() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<PredictionResult | null>(null);

  const [formData, setFormData] = useState({
    sleepHours: 7,
    workHours: 8,
    physicalActivity: 5,
    dietQuality: 5,
    socialSupport: 7,
    screenTime: 6,
    stressLevel: 5,
    financialStress: 3
  });

  const handlePredict = async () => {
    setLoading(true);

    // Convert Analytics form → PredictionData
    const fullData: PredictionData = {
      age: 21,
      gender: 'Male',

      sleepHours: formData.sleepHours,

      studyHours: formData.workHours,

      screenTime: formData.screenTime,

      exercise:
          formData.physicalActivity >= 8
              ? 'High'
              : formData.physicalActivity >= 5
                  ? 'Moderate'
                  : 'Low',

      dietQuality:
          formData.dietQuality >= 8
              ? 'Excellent'
              : formData.dietQuality >= 5
                  ? 'Good'
                  : 'Fair',

      socialInteraction:
          formData.socialSupport >= 8
              ? 'High'
              : formData.socialSupport >= 5
                  ? 'Moderate'
                  : 'Low',

      academicPressure:
          formData.stressLevel >= 8
              ? 'Very High'
              : formData.stressLevel >= 5
                  ? 'High'
                  : 'Moderate',

      financialStress:
          formData.financialStress >= 7
              ? 'High'
              : formData.financialStress >= 4
                  ? 'Moderate'
                  : 'Low',

      relationshipStatus: 'Single',
      livingSituation: 'Hostel',
      therapy: 'No',
      medication: 'No',
      substanceUse: 'Never',
      gpa: 3.2,
      yearOfStudy: 2,
      familyHistory: 'No'
    };

    const data = await getMentalHealthPrediction(fullData);

    if (data) {
      setResults(data);
    }

    setLoading(false);
  };

  // Convert backend result → UI cards
  const lifestyleStats = results
      ? [
        {
          name: 'Sleep Quality',
          value: results.sleepQualityScore,
          icon: Moon,
          color: 'text-blue-600',
          bg: 'bg-blue-100',
          barColor: '#2563eb'
        },
        {
          name: 'Productivity',
          value: results.productivityImpact,
          icon: Zap,
          color: 'text-amber-600',
          bg: 'bg-amber-100',
          barColor: '#d97706'
        },
        {
          name: 'Social Health',
          value: 100 - results.socialIsolationScore,
          icon: Users,
          color: 'text-rose-600',
          bg: 'bg-rose-100',
          barColor: '#e11d48'
        }
      ]
      : [];

  return (
      <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT PANEL */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl space-y-8 sticky top-24">

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                  <BarChart3 className="text-teal-600" />
                  Analytics Input
                </h3>

                <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                  AI Lifestyle Engine
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    label: 'Sleep Hours',
                    field: 'sleepHours',
                    min: 0,
                    max: 15
                  },
                  {
                    label: 'Physical Activity',
                    field: 'physicalActivity',
                    min: 1,
                    max: 10
                  },
                  {
                    label: 'Stress Level',
                    field: 'stressLevel',
                    min: 1,
                    max: 10
                  },
                  {
                    label: 'Social Support',
                    field: 'socialSupport',
                    min: 1,
                    max: 10
                  }
                ].map((item) => (
                    <div key={item.field} className="space-y-3">
                      <div className="flex justify-between text-xs font-bold text-slate-500">
                        <span>{item.label}</span>

                        <span className="text-teal-600">
                      {(formData as any)[item.field]}
                    </span>
                      </div>

                      <input
                          type="range"
                          min={item.min}
                          max={item.max}
                          value={(formData as any)[item.field]}
                          onChange={(e) =>
                              setFormData((prev) => ({
                                ...prev,
                                [item.field]: parseInt(e.target.value)
                              }))
                          }
                          className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                      />
                    </div>
                ))}
              </div>

              <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="w-full py-4 bg-teal-600 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-teal-700 transition-all active:scale-[0.98] disabled:opacity-70"
              >
                {loading ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <TrendingUp size={20} />
                )}

                Generate Analytics
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="lg:col-span-2 space-y-8">
            {!results ? (
                <div className="h-full min-h-[400px] flex flex-col items-center justify-center bg-slate-50 rounded-[2.5rem] border border-dashed border-slate-300 text-slate-400 space-y-4">
                  <div className="bg-white p-6 rounded-full shadow-sm">
                    <BarChart3 size={48} className="text-slate-300" />
                  </div>

                  <div className="text-center">
                    <h4 className="text-lg font-bold text-slate-500">
                      No Analytics Generated
                    </h4>

                    <p className="max-w-xs text-sm">
                      Fill the parameters and generate predictions.
                    </p>
                  </div>
                </div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-8"
                >

                  {/* SCORE CARDS */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {lifestyleStats.map((stat, idx) => (
                        <motion.div
                            key={stat.name}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-md space-y-4"
                        >
                          <div className="flex items-center justify-between">
                            <div className={cn('p-3 rounded-2xl', stat.bg)}>
                              <stat.icon className={stat.color} size={24} />
                            </div>

                            <div className="text-slate-400 text-xs font-black uppercase tracking-widest">
                              {stat.name}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <div className="text-3xl font-black text-slate-800">
                              {Math.round(stat.value)}%
                            </div>

                            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                              <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${stat.value}%` }}
                                  transition={{ duration: 1 }}
                                  className={cn(
                                      'h-full rounded-full',
                                      stat.color.replace('text', 'bg')
                                  )}
                              />
                            </div>
                          </div>
                        </motion.div>
                    ))}
                  </div>

                  {/* CHART */}
                  <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl space-y-8">

                    <div className="flex items-center justify-between">
                      <h4 className="text-xl font-bold text-slate-800">
                        Visual Intelligence Report
                      </h4>

                      <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
                        <TrendingUp size={14} />
                        AI ANALYSIS
                      </div>
                    </div>

                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={lifestyleStats}>
                          <CartesianGrid
                              strokeDasharray="3 3"
                              vertical={false}
                              stroke="#E2E8F0"
                          />

                          <XAxis
                              dataKey="name"
                              axisLine={false}
                              tickLine={false}
                          />

                          <YAxis
                              axisLine={false}
                              tickLine={false}
                              domain={[0, 100]}
                          />

                          <Tooltip />

                          <Bar
                              dataKey="value"
                              radius={[8, 8, 0, 0]}
                              barSize={60}
                          >
                            {lifestyleStats.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={entry.barColor}
                                />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* INSIGHTS */}
                  <div className="grid md:grid-cols-2 gap-6">

                    <div className="bg-teal-900 p-8 rounded-[2rem] text-white space-y-4">
                      <div className="flex items-center gap-2">
                        <BrainCircuit className="text-teal-400" />

                        <h5 className="font-bold uppercase tracking-wider text-xs">
                          AI Recommendation
                        </h5>
                      </div>

                      <p className="text-lg font-medium leading-relaxed italic">
                        "
                        Maintaining healthy sleep and lower stress levels can
                        significantly improve your mental wellness score.
                        "
                      </p>
                    </div>

                    <div className="bg-blue-600 p-8 rounded-[2rem] text-white space-y-4">
                      <div className="flex items-center gap-2">
                        <Activity className="text-blue-300" />

                        <h5 className="font-bold uppercase tracking-wider text-xs">
                          Action Plan
                        </h5>
                      </div>

                      <ul className="space-y-3">
                        {[
                          'Reduce screen time',
                          'Improve sleep consistency',
                          'Increase physical activity'
                        ].map((item, i) => (
                            <li
                                key={i}
                                className="flex items-center gap-3 text-sm font-semibold"
                            >
                              <div className="bg-white/20 p-1 rounded-full">
                                <ChevronRight size={14} />
                              </div>

                              {item}
                            </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                </motion.div>
            )}
          </div>
        </div>
      </div>
  );
}