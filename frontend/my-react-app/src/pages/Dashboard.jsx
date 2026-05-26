import React, { useState, useEffect } from 'react';

import { 
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
  LineChart, Line, Tooltip 
} from 'recharts';
import { 
  Brain, Trophy, Target, Clock, Play, Lightbulb,
  TrendingUp, Award, Flame
} from 'lucide-react';

const Dashboard = () => {
  const [currentStreak, setCurrentStreak] = useState(12);
  const [userPoints, setUserPoints] = useState(1250);
  const [userLevel, setUserLevel] = useState(24);
  const [dailyGoal, setDailyGoal] = useState({ current: 2.5, total: 4, percentage: 62 });
  const [viewMode, setViewMode] = useState('weekly'); // weekly or monthly

  // Progress Analytics Data
  const weeklyData = [
    { day: 'Mon', theory: 3.5, practical: 0, total: 3.5 },
    { day: 'Tue', theory: 0, practical: 2.8, total: 2.8 },
    { day: 'Wed', theory: 4.2, practical: 0, total: 4.2 },
    { day: 'Thu', theory: 0, practical: 3.0, total: 3.0 },
    { day: 'Fri', theory: 3.8, practical: 0, total: 3.8 },
    { day: 'Sat', theory: 0, practical: 5.5, total: 5.5 },
    { day: 'Sun', theory: 3.2, practical: 0, total: 3.2 },
  ];

  // Learning Modules
  const learningModules = [
    {
      id: 1,
      category: 'AI SYSTEMS',
      title: 'Quantum Neural Gates',
      description: 'Exploring the intersection of quantum computing and deep learning models.',
      module: 4,
      total: 12,
      color: 'from-purple-600 to-blue-600'
    },
    {
      id: 2,
      category: 'DATA SCIENCE',
      title: 'Algorithmic Bias Patterns',
      description: 'Identifying and mitigating unconscious bias in training datasets.',
      module: 2,
      total: 8,
      color: 'from-cyan-600 to-blue-700'
    },
    {
      id: 3,
      category: 'CYBER SECURITY',
      title: 'Zero Trust Architecture',
      description: 'Implementing cryptographic verification across decentralized networks.',
      module: 7,
      total: 15,
      color: 'from-indigo-600 to-purple-700'
    },
  ];

  // AI Recommendation
  const aiRecommendation = {
    topic: 'Advanced Backprop',
    difficulty: 'HARD',
    match: 98
  };

  const [focusTime, setFocusTime] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [audioMode, setAudioMode] = useState('Neural Waves');

  useEffect(() => {
    // Load data from localStorage
    const savedStreak = localStorage.getItem('currentStreak');
    const savedPoints = localStorage.getItem('userPoints');
    const savedLevel = localStorage.getItem('userLevel');
    
    if (savedStreak) setCurrentStreak(parseInt(savedStreak));
    if (savedPoints) setUserPoints(parseInt(savedPoints));
    if (savedLevel) setUserLevel(parseInt(savedLevel));
  }, []);

  useEffect(() => {
    // Save to localStorage
    localStorage.setItem('currentStreak', currentStreak);
    localStorage.setItem('userPoints', userPoints);
    localStorage.setItem('userLevel', userLevel);
  }, [currentStreak, userPoints, userLevel]);

  // Timer logic
  useEffect(() => {
    let interval;
    if (isTimerRunning && focusTime > 0) {
      interval = setInterval(() => {
        setFocusTime(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, focusTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // const maxValue = Math.max(...weeklyData.map(d => d.total));

  return (
    <div className="min-h-screen bg-[#0a0b0f] text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, Scholar</h1>
          <p className="text-gray-400">Your AI Mentor has prepared 3 new learning paths for your current track.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 bg-[#1a1c24] px-4 py-2 rounded-lg">
            <Flame className="text-orange-500" size={20} />
            <div>
              <div className="text-xs text-gray-400">CURRENT STREAK</div>
              <div className="text-xl font-bold">{currentStreak} Days</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Trophy className="text-yellow-500" size={20} />
              <span className="text-sm">Level {userLevel}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="text-cyan-400" size={20} />
              <span className="text-sm">{userPoints.toLocaleString()} pts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Progress Analytics + Continue Learning */}
        <div className="col-span-2 space-y-6">
          {/* Progress Analytics */}
          <div className="bg-[#13151d] rounded-2xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Progress Analytics</h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('weekly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'weekly' 
                      ? 'bg-[#1f2937] text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Weekly
                </button>
                <button
                  onClick={() => setViewMode('monthly')}
                  className={`px-4 py-2 rounded-lg text-sm transition-all ${
                    viewMode === 'monthly' 
                      ? 'bg-[#1f2937] text-white' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
              </div>
            </div>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData}>
                  <XAxis 
                    dataKey="day" 
                    stroke="#6B7280"
                    tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  />
                  <Bar dataKey="total" radius={[8, 8, 0, 0]}>
                    {weeklyData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`}
                        fill={entry.practical > 0 ? '#22D3EE' : '#A78BFA'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#A78BFA]"></div>
                <span className="text-sm text-gray-400">Theory Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#22D3EE]"></div>
                <span className="text-sm text-gray-400">Practical Labs</span>
              </div>
              <div className="flex items-center gap-2 text-cyan-400">
                <TrendingUp size={16} />
                <span className="text-sm font-semibold">+12% from last week</span>
              </div>
            </div>
          </div>

          {/* Continue Learning */}
          <div>
            <h2 className="text-xl font-bold mb-4">Continue Learning</h2>
            <div className="grid grid-cols-3 gap-4">
              {learningModules.map((module) => (
                <div
                  key={module.id}
                  className="bg-[#13151d] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all cursor-pointer group"
                >
                  <div className={`h-32 bg-gradient-to-br ${module.color} relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity">
                      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`pattern-${module.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1" fill="white" opacity="0.3"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#pattern-${module.id})`}/>
                      </svg>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="text-xs font-semibold text-cyan-400 mb-2">{module.category}</div>
                    <h3 className="font-bold mb-2 text-sm">{module.title}</h3>
                    <p className="text-xs text-gray-400 mb-4 line-clamp-2">{module.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Module {module.module} of {module.total}</span>
                      <button className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center hover:bg-cyan-400 transition-colors">
                        <Play size={14} fill="white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Focus Mode */}
          <div className="bg-gradient-to-br from-[#1a1c2e] to-[#13151d] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">Deep Focus Mode</h2>
            <p className="text-sm text-gray-400 mb-6">
              Activate an AI-curated focus session with binaural beats and notification suppression.
            </p>
            
            <div className="flex items-center gap-8">
              <div>
                <div className="text-6xl font-bold tracking-tight mb-2">{formatTime(focusTime)}</div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">Recommended Time</div>
              </div>
              
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="px-8 py-4 bg-[#A78BFA] hover:bg-[#9375ea] rounded-xl font-semibold transition-all transform hover:scale-105 active:scale-95"
              >
                {isTimerRunning ? 'Pause Session' : 'Start Session'}
              </button>

              <div className="flex-1">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Background Audio</span>
                  <span className="text-sm font-semibold text-cyan-400">{audioMode}</span>
                </div>
                <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
                </div>
                <div className="flex gap-2 mt-3">
                  {['Lo-Fi', 'White Noise', 'Neural'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setAudioMode(mode === 'Neural' ? 'Neural Waves' : mode)}
                      className={`px-3 py-1 rounded-md text-xs transition-all ${
                        audioMode.includes(mode)
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50'
                          : 'bg-gray-800/50 text-gray-400 hover:text-white'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - AI Recommendation + Daily Goal */}
        <div className="space-y-6">
          {/* AI Recommendation */}
          <div className="bg-[#13151d] rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="text-cyan-400" size={24} />
              <h2 className="text-xl font-bold">AI Recommendation</h2>
            </div>
            
            <p className="text-sm text-gray-400 mb-6">
              Based on your performance in "Neural Architecture", you should explore:
            </p>

            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30 rounded-xl p-5 mb-4">
              <div className="text-lg font-bold mb-2">{aiRecommendation.topic}</div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded border border-red-500/50">
                    DIFFICULTY: {aiRecommendation.difficulty}
                  </span>
                </div>
                <div className="text-2xl font-bold text-cyan-400">{aiRecommendation.match}% <span className="text-sm text-gray-400">MATCH</span></div>
              </div>
            </div>

            <button className="w-full py-3 bg-[#1f2937] hover:bg-[#2d3748] rounded-xl font-semibold transition-all border border-gray-700">
              Start Optimized Path
            </button>
          </div>

          {/* Daily Goal */}
          <div className="bg-[#13151d] rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-6">Daily Goal</h2>
            
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-gray-400">{dailyGoal.current} / {dailyGoal.total} hours</span>
              <span className="text-2xl font-bold text-cyan-400">{dailyGoal.percentage}%</span>
            </div>

            <div className="h-2 bg-gray-800 rounded-full overflow-hidden mb-4">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${dailyGoal.percentage}%` }}
              ></div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Target size={16} className="text-cyan-400" />
              <span>Keep it up! You're on track for today.</span>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-br from-cyan-900/20 to-purple-900/20 border border-cyan-500/20 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wider">This Week</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Hours Studied</span>
                <span className="text-xl font-bold">26.8h</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Modules Completed</span>
                <span className="text-xl font-bold">8</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-300">Accuracy Rate</span>
                <span className="text-xl font-bold text-green-400">94%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




