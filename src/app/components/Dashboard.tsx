import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles } from 'lucide-react';
import { predictSentiment } from '../../services/api';

interface EmotionResult {
  emotion: string;
  emoji: string;
  confidence: number;
  message: string;
  color: string;
  sentiment: string;
  response_time_ms: number;
}

export function Dashboard() {
  const [text, setText] = useState('');
  const [result, setResult] = useState<EmotionResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const mapSentimentToResult = (
    sentiment: string,
    confidence: number,
    response_time_ms: number
  ): EmotionResult => {
    const normalized = sentiment.toLowerCase();
    if (normalized.includes('positive')) {
      return {
        emotion: 'Positive',
        message: 'You seem to be feeling positive',
        emoji: '😊',
        color: 'from-yellow-400 to-orange-400',
        confidence,
        sentiment,
        response_time_ms,
      };
    }
    if (normalized.includes('negative')) {
      return {
        emotion: 'Negative',
        message: 'You may be experiencing difficult emotions',
        emoji: '😡',
        color: 'from-red-400 to-orange-400',
        confidence,
        sentiment,
        response_time_ms,
      };
    }
    return {
      emotion: 'Neutral',
      message: 'Your emotional tone appears balanced',
      emoji: '😐',
      color: 'from-green-400 to-teal-400',
      confidence,
      sentiment,
      response_time_ms,
    };
  };

  const analyzeEmotion = async () => {
    if (!text.trim()) {
      setError('Please enter your text before analyzing.');
      return;
    }

    setIsAnalyzing(true);
    setResult(null);
    setError('');

    try {
      const data = await predictSentiment(text.trim());
      if (data?.status === 'failed' || data?.error) {
        setError('Network issue detected. Please check your internet connection and try again.');
        return;
      }
      const detectedEmotion = mapSentimentToResult(
        data.sentiment ?? 'Neutral 😐',
        Number(data.confidence ?? 0),
        Number(data.response_time_ms ?? 0),
      );

      const history = JSON.parse(localStorage.getItem('emotionHistory') || '[]');
      history.unshift({
        text,
        ...detectedEmotion,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('emotionHistory', JSON.stringify(history.slice(0, 50)));

      setResult(detectedEmotion);
    } catch (err) {
      setError('Unable to analyze sentiment right now. Please try again in a moment.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
            How are you feeling today?
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Express yourself freely, and let's understand your emotions together
          </p>
        </div>

        {/* Input area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-2xl mb-6"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write what's on your mind..."
            className="w-full h-48 bg-transparent border-none outline-none resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && e.metaKey) {
                analyzeEmotion();
              }
            }}
          />
          <div className="flex justify-end mt-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={analyzeEmotion}
              disabled={!text.trim() || isAnalyzing}
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-lg transition-all duration-300 flex items-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Understand My Emotion</span>
                </>
              )}
            </motion.button>
          </div>
          {error && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </motion.div>

        {/* Result card */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-2xl"
            >
              {/* Animated glow */}
              <motion.div
                className={`absolute inset-0 opacity-20 bg-gradient-to-r ${result.color}`}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200 }}
                      className="text-6xl"
                    >
                      {result.emoji}
                    </motion.div>
                    <div>
                      <h2 className="text-3xl mb-1 text-gray-800 dark:text-white">
                        {result.message}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400">
                        Emotion: {result.emotion}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Sentiment</span>
                    <span className="text-gray-800 dark:text-white">{result.sentiment}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Confidence</span>
                    <span className="text-gray-800 dark:text-white">
                      {result.confidence.toFixed(2)}%
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Response Time</span>
                    <span className="text-gray-800 dark:text-white">{result.response_time_ms.toFixed(1)} ms</span>
                  </div>
                  <div className="relative h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${result.confidence}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${result.color} rounded-full`}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
