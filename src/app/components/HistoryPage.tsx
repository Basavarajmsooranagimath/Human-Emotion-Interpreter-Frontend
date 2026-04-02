import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp, Calendar, Clock } from 'lucide-react';

interface HistoryEntry {
  text: string;
  emotion: string;
  emoji: string;
  confidence: number;
  message: string;
  color: string;
  timestamp: string;
}

export function HistoryPage() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('emotionHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRelativeTime = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    return formatDate(timestamp);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            Your Emotional Journey
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            A timeline of your thoughts and feelings
          </p>
        </div>

        {history.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-12 border border-white/20 dark:border-gray-800/50 shadow-2xl text-center"
          >
            <div className="text-6xl mb-4">📝</div>
            <h2 className="mb-2 text-gray-800 dark:text-white">No entries yet</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Start expressing your emotions to see your history here
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {history.map((entry, index) => (
              <motion.div
                key={`${entry.timestamp}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
                className="relative"
              >
                {/* Timeline line */}
                {index < history.length - 1 && (
                  <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-purple-300 to-pink-300 dark:from-purple-700 dark:to-pink-700 -mb-4" />
                )}

                <div className="flex gap-4">
                  {/* Timeline dot */}
                  <div className="flex-shrink-0 mt-6">
                    <motion.div
                      className={`w-16 h-16 rounded-full bg-gradient-to-br ${entry.color} flex items-center justify-center text-3xl shadow-lg`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {entry.emoji}
                    </motion.div>
                  </div>

                  {/* Card */}
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="flex-1 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-6 border border-white/20 dark:border-gray-800/50 shadow-xl cursor-pointer"
                    onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-gray-800 dark:text-white">{entry.message}</h3>
                          <span className={`px-3 py-1 rounded-full text-sm bg-gradient-to-r ${entry.color} text-white`}>
                            {entry.emotion}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {getRelativeTime(entry.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatTime(entry.timestamp)}
                          </span>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>

                    <AnimatePresence>
                      {expandedIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-gray-200 dark:border-gray-700 mt-4">
                            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed whitespace-pre-wrap">
                              {entry.text}
                            </p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600 dark:text-gray-400">
                                Confidence
                              </span>
                              <span className="text-gray-800 dark:text-white">
                                {entry.confidence}%
                              </span>
                            </div>
                            <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-2">
                              <div
                                className={`h-full bg-gradient-to-r ${entry.color} rounded-full`}
                                style={{ width: `${entry.confidence}%` }}
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
