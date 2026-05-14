import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BrainCircuit, Loader2, AlertCircle,
  Moon, Monitor, BookOpen, Heart, Zap,
  Pill, GraduationCap, Users, RotateCcw
} from 'lucide-react';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip,
  Cell, CartesianGrid
} from 'recharts';
import { PredictionData, PredictionResult } from '../types';
import { getMentalHealthPrediction } from '../services/apiService';
import { cn } from '../lib/utils';

// ─── Default Form State ───────────────────────────────────────────────────────
const DEFAULT: PredictionData = {
  age: 21,
  gender: 'Male',
  sleepHours: 6.5,
  studyHours: 5,
  screenTime: 4,
  exercise: 'Low',
  dietQuality: 'Fair',
  socialInteraction: 'Moderate',
  academicPressure: 'High',
  financialStress: 'Moderate',
  relationshipStatus: 'Single',
  livingSituation: 'Hostel',
  therapy: 'No',
  medication: 'No',
  substanceUse: 'Never',
  gpa: 3.0,
  yearOfStudy: 2,
  familyHistory: 'No',
};

// ─── Color Helpers ───────────────────────────────────────────────────────────
const RISK_COLORS: Record<string, string> = {
  Healthy: '#10b981',
  'At-Risk': '#f59e0b',
  Critical: '#ef4444',
};

const RISK_BG: Record<string, string> = {
  Healthy: 'bg-emerald-50 border-emerald-200',
  'At-Risk': 'bg-amber-50 border-amber-200',
  Critical: 'bg-red-50 border-red-200',
};

const RISK_TEXT: Record<string, string> = {
  Healthy: 'text-emerald-700',
  'At-Risk': 'text-amber-700',
  Critical: 'text-red-700',
};

const RISK_BADGE: Record<string, string> = {
  Healthy: 'bg-emerald-100 text-emerald-800',
  'At-Risk': 'bg-amber-100 text-amber-800',
  Critical: 'bg-red-100 text-red-800',
};

const scoreColor = (v: number) =>
    v >= 70 ? '#10b981' : v >= 45 ? '#f59e0b' : '#ef4444';

// ─── Reusable Components ─────────────────────────────────────────────────────
function SliderField({ label, icon: Icon, field, min, max, step = 1, unit = '', formData, onChange }: any) {
  const val = formData[field] as number;
  const pct = ((val - min) / (max - min)) * 100;

  return (
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            <Icon size={15} className="text-teal-500" />
            {label}
          </label>
          <span className="text-sm font-black bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-lg">
          {val}{unit}
        </span>
        </div>
        <div className="relative h-2 bg-slate-100 rounded-full">
          <div
              className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-teal-400 to-teal-600 transition-all"
              style={{ width: `${pct}%` }}
          />
          <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={e => onChange(field, parseFloat(e.target.value))}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-2"
          />
        </div>
      </div>
  );
}

function PillSelect({ label, field, options, formData, onChange }: any) {
  return (
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-600">{label}</label>
        <div className="flex flex-wrap gap-2">
          {options.map((opt: string) => (
              <button
                  key={opt}
                  type="button"
                  onClick={() => onChange(field, opt)}
                  className={cn(
                      'px-3 py-1.5 rounded-xl text-sm font-semibold border transition-all',
                      formData[field] === opt
                          ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-teal-300 hover:bg-teal-50'
                  )}
              >
                {opt}
              </button>
          ))}
        </div>
      </div>
  );
}

// ─── Enhanced Results Page ───────────────────────────────────────────────────
function ResultsPage({
                       result,
                       formData,
                       onReset,
                     }: { result: PredictionResult; formData: PredictionData; onReset: () => void }) {
  const color = RISK_COLORS[result.mhCategory] ?? '#6b7280';
  const riskLevel = result.riskLevel || 'Moderate';

  const radarData = [
    { subject: 'MH Score', value: result.mhScore },
    { subject: 'Sleep', value: result.sleepQualityScore },
    { subject: 'Productivity', value: result.productivityImpact },
    { subject: 'Low Stress', value: Math.max(0, 100 - result.stressSeverity * 10) },
    { subject: 'Social Health', value: Math.max(0, 100 - result.socialIsolationScore * 10) },
  ];

  const metrics = [
    { label: 'Mental Health', value: result.mhScore, unit: '', color, icon: BrainCircuit },
    { label: 'Sleep Quality', value: result.sleepQualityScore, unit: '/10', color: '#3b82f6', icon: Moon },
    { label: 'Productivity', value: result.productivityImpact, unit: '%', color: '#8b5cf6', icon: Zap },
    { label: 'Stress Severity', value: result.stressSeverity, unit: '/10', color: '#ef4444', icon: AlertCircle },
    { label: 'Social Isolation', value: result.socialIsolationScore, unit: '/10', color: '#ec4899', icon: Users },
  ];

  const clsTags = [
    { label: 'Depression Status', value: result.depressionStatus },
    { label: 'Stress Level', value: result.stressLevel },
    { label: 'Anxiety Risk', value: result.anxietyRisk },
    { label: 'MH Category', value: result.mhCategory },
  ];

  return (
      <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
        {/* Hero Section */}
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn('rounded-3xl border-2 overflow-hidden shadow-2xl', RISK_BG[result.mhCategory])}
        >
          <div className="p-10 md:p-16 flex flex-col lg:flex-row items-center gap-12">
            <div className="relative flex-shrink-0">
              <svg width="180" height="180" viewBox="0 0 180 180">
                <circle cx="90" cy="90" r="78" fill="none" stroke="#e2e8f0" strokeWidth="14" />
                <circle
                    cx="90" cy="90" r="78"
                    fill="none"
                    stroke={color}
                    strokeWidth="14"
                    strokeDasharray={`${(result.mhScore / 100) * 490} 490`}
                    strokeLinecap="round"
                    transform="rotate(-90 90 90)"
                />
                <text x="90" y="98" textAnchor="middle" fontSize="42" fontWeight="900" fill={color}>
                  {Math.round(result.mhScore)}
                </text>
                <text x="90" y="125" textAnchor="middle" fontSize="14" fill="#64748b">/100</text>
              </svg>
            </div>

            <div className="text-center lg:text-left flex-1">
              <p className="uppercase tracking-[3px] text-sm font-bold text-slate-500 mb-2">NIBM ML ASSESSMENT</p>
              <h1 className={cn('text-5xl md:text-6xl font-black', RISK_TEXT[result.mhCategory])}>
                {result.mhCategory}
              </h1>
              <div className="inline-flex items-center gap-3 mt-4">
              <span className={cn('px-6 py-2 rounded-full text-lg font-bold', RISK_BADGE[result.mhCategory])}>
                {riskLevel} Risk
              </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Classification Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {clsTags.map((tag, i) => (
              <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm"
              >
                <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold">{tag.label}</p>
                <p className="text-2xl font-bold mt-2 text-slate-800">{tag.value}</p>
              </motion.div>
          ))}
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {metrics.map((m, i) => (
              <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 + i * 0.05 }}
                  className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <m.icon size={32} style={{ color: m.color }} />
                  <span className="text-xs font-mono text-slate-400">{m.unit}</span>
                </div>
                <div className="text-4xl font-black mt-4 mb-1">{m.value}</div>
                <div className="text-sm text-slate-500">{m.label}</div>
                <div className="mt-4 h-2 bg-slate-100 rounded-full">
                  <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.min(m.value * (m.unit === '%' ? 1 : 10), 100)}%`, background: m.color }}
                  />
                </div>
              </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <BrainCircuit className="text-teal-500" /> Wellness Radar
            </h3>
            <ResponsiveContainer width="100%" height={340}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 12 }} />
                <PolarRadiusAxis domain={[0, 100]} />
                <Radar name="Score" dataKey="value" stroke={color} fill={color} fillOpacity={0.25} strokeWidth={3} />
              </RadarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <Zap className="text-teal-500" /> Score Breakdown
            </h3>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={metrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Bar dataKey="value" radius={[12, 12, 0, 0]}>
                  {metrics.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* Recommendations */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl p-10 border border-slate-100 shadow-sm">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Heart className="text-teal-500" /> Personalized Recommendations
          </h3>
          <div className="space-y-6">
            {result.recommendations?.map((rec, i) => (
                <div key={i} className="flex gap-5 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-3xl flex-shrink-0">💡</div>
                  <p className="text-slate-700 leading-relaxed pt-1">{rec}</p>
                </div>
            ))}
          </div>
        </motion.div>

        {/* Reset */}
        <div className="flex justify-center pt-6">
          <button
              onClick={onReset}
              className="flex items-center gap-3 px-10 py-4 bg-slate-900 hover:bg-black text-white rounded-2xl font-semibold transition-all active:scale-95 shadow-lg"
          >
            <RotateCcw size={18} /> Start New Assessment
          </button>
        </div>
      </div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function Predictor() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<PredictionData>(DEFAULT);

  const set = (field: keyof PredictionData, value: string | number) =>
      setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = await getMentalHealthPrediction(formData);

    if (data) {
      setResult(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setError('Failed to connect to backend. Make sure FastAPI is running on http://127.0.0.1:8000');
    }
    setLoading(false);
  };

  if (result) return <ResultsPage result={result} formData={formData} onReset={() => setResult(null)} />;

  return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-100 px-4 py-1.5 rounded-full text-sm font-semibold text-teal-700 mb-2">
            <BrainCircuit size={14} /> FastAPI + ML Backend
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">Predict Your Mental Status</h2>
          <p className="text-slate-500 max-w-lg mx-auto">
            Fill in your lifestyle details. Our Multi-Output ML Model will give you detailed insights.
          </p>
        </div>

        {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex gap-3 items-start text-red-700">
              <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
              <p>{error}</p>
            </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
          <div className="p-8 md:p-12 space-y-14">
            {/* Demographics */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="bg-blue-100 p-2 rounded-xl text-blue-600"><Users size={18} /></div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">Demographics</h3>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <SliderField label="Age" icon={GraduationCap} field="age" min={17} max={30} formData={formData} onChange={set} />
                <SliderField label="GPA" icon={BookOpen} field="gpa" min={1.5} max={4.0} step={0.1} formData={formData} onChange={set} />
                <SliderField label="Year of Study" icon={GraduationCap} field="yearOfStudy" min={1} max={5} formData={formData} onChange={set} />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <PillSelect label="Gender" field="gender" options={['Male', 'Female', 'Non-binary']} formData={formData} onChange={set} />
                <PillSelect label="Relationship Status" field="relationshipStatus" options={['Single', 'In Relationship', 'Complicated']} formData={formData} onChange={set} />
                <PillSelect label="Living Situation" field="livingSituation" options={['With Family', 'Hostel', 'Alone', 'With Friends']} formData={formData} onChange={set} />
                <PillSelect label="Family History" field="familyHistory" options={['Yes', 'No']} formData={formData} onChange={set} />
              </div>
            </section>

            {/* Daily Habits */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="bg-teal-100 p-2 rounded-xl text-teal-600"><Zap size={18} /></div>
                <div><h3 className="text-lg font-bold text-slate-800">Daily Habits</h3></div>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <SliderField label="Sleep Hours" icon={Moon} field="sleepHours" min={3} max={10} step={0.5} unit="h" formData={formData} onChange={set} />
                <SliderField label="Study Hours" icon={BookOpen} field="studyHours" min={0} max={12} step={0.5} unit="h" formData={formData} onChange={set} />
                <SliderField label="Screen Time" icon={Monitor} field="screenTime" min={0} max={12} step={0.5} unit="h" formData={formData} onChange={set} />
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <PillSelect label="Exercise" field="exercise" options={['None', 'Low', 'Moderate', 'High']} formData={formData} onChange={set} />
                <PillSelect label="Diet Quality" field="dietQuality" options={['Poor', 'Fair', 'Good', 'Excellent']} formData={formData} onChange={set} />
              </div>
            </section>

            {/* Psychosocial & Health */}
            <section className="space-y-8">
              <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
                <div className="bg-purple-100 p-2 rounded-xl text-purple-600"><Heart size={18} /></div>
                <div><h3 className="text-lg font-bold text-slate-800">Psychosocial & Health</h3></div>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <PillSelect label="Social Interaction" field="socialInteraction" options={['Very Low', 'Low', 'Moderate', 'High']} formData={formData} onChange={set} />
                <PillSelect label="Academic Pressure" field="academicPressure" options={['Low', 'Moderate', 'High', 'Very High']} formData={formData} onChange={set} />
                <PillSelect label="Financial Stress" field="financialStress" options={['None', 'Low', 'Moderate', 'High']} formData={formData} onChange={set} />
                <PillSelect label="Therapy" field="therapy" options={['Yes', 'No']} formData={formData} onChange={set} />
                <PillSelect label="Medication" field="medication" options={['Yes', 'No']} formData={formData} onChange={set} />
                <PillSelect label="Substance Use" field="substanceUse" options={['Never', 'Occasionally', 'Regularly']} formData={formData} onChange={set} />
              </div>
            </section>

            {/* Submit */}
            <div className="pt-6">
              <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-6 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-2xl font-bold text-xl hover:from-teal-700 hover:to-teal-600 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl"
              >
                {loading ? (
                    <><Loader2 className="animate-spin" size={24} /> Analysing with ML Model...</>
                ) : (
                    <><BrainCircuit size={24} /> Predict My Mental Health</>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
  );
}