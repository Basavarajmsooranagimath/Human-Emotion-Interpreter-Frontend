import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Heart, Calendar } from 'lucide-react';

interface HistoryEntry {
  text: string;
  emotion: string;
  emoji: string;
  confidence: number;
  timestamp: string;
}

export function InsightsPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('emotionHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  // Emotion distribution data
  const emotionCounts = history.reduce((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(emotionCounts).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ['#a78bfa', '#f472b6', '#60a5fa', '#34d399', '#fbbf24', '#fb923c'];

  // Mood trend data (last 7 days)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const last7Days = getLast7Days();
  const moodTrendData = last7Days.map((date) => {
    const dayEntries = history.filter((entry) =>
      entry.timestamp.startsWith(date)
    );
    const avgConfidence = dayEntries.length > 0
      ? dayEntries.reduce((sum, e) => sum + e.confidence, 0) / dayEntries.length
      : 0;

    return {
      date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: Math.round(avgConfidence),
      entries: dayEntries.length,
    };
  });

  const totalEntries = history.length;
  const avgConfidence = totalEntries > 0
    ? Math.round(history.reduce((sum, e) => sum + e.confidence, 0) / totalEntries)
    : 0;
  const mostCommonEmotion = Object.entries(emotionCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Emotional Insights
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Understand your emotional patterns over time
          </p>
        </div>

        {totalEntries === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-12 border border-white/20 dark:border-gray-800/50 shadow-2xl text-center"
          >
            <div className="text-6xl mb-4">📊</div>
            <h2 className="mb-2 text-gray-800 dark:text-white">No data yet</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start expressing your emotions to see insights here
            </p>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {/* Stats cards */}
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 border border-white/20 dark:border-gray-800/50 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total Entries</p>
                    <p className="text-3xl text-gray-800 dark:text-white">{totalEntries}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 border border-white/20 dark:border-gray-800/50 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avg Confidence</p>
                    <p className="text-3xl text-gray-800 dark:text-white">{avgConfidence}%</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 border border-white/20 dark:border-gray-800/50 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-500">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Most Common</p>
                    <p className="text-2xl text-gray-800 dark:text-white">{mostCommonEmotion}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Emotion Distribution */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-xl"
              >
                <h2 className="mb-6 text-gray-800 dark:text-white">Emotion Distribution</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              {/* Mood Trends */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-xl"
              >
                <h2 className="mb-6 text-gray-800 dark:text-white">Mood Trends (Last 7 Days)</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={moodTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="date"
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      stroke="#9ca3af"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="mood"
                      stroke="url(#colorGradient)"
                      strokeWidth={3}
                      dot={{ fill: '#a78bfa', r: 5 }}
                      activeDot={{ r: 7 }}
                    />
                    <defs>
                      <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#a78bfa" />
                        <stop offset="100%" stopColor="#f472b6" />
                      </linearGradient>
                    </defs>
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* Legend for emotions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 border border-white/20 dark:border-gray-800/50 shadow-xl"
            >
              <h3 className="mb-4 text-gray-800 dark:text-white">Emotion Breakdown</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(emotionCounts).map(([emotion, count], index) => (
                  <div key={emotion} className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-gray-700 dark:text-gray-300">
                      {emotion}: {count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
