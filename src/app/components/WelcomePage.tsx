import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Heart, Sparkles, Shield } from 'lucide-react';

export function WelcomePage() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Heart,
      title: 'Understand Your Emotions',
      description: 'Express yourself freely and discover the emotions behind your words',
    },
    {
      icon: Sparkles,
      title: 'Gain Insights',
      description: 'Track patterns and understand your emotional journey over time',
    },
    {
      icon: Shield,
      title: 'Safe & Private',
      description: 'Your thoughts are yours alone, in a judgment-free space',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 70%, rgba(219, 39, 119, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 30% 30%, rgba(139, 92, 246, 0.3) 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="text-8xl">🌸</div>
          </motion.div>
          <h1 className="text-5xl mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 dark:from-purple-400 dark:via-pink-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Welcome to Your Emotional Journey
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A calm, reflective space where you can express your thoughts and understand your emotions better
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="backdrop-blur-xl bg-white/60 dark:bg-gray-900/60 rounded-3xl p-8 border border-white/30 dark:border-gray-800/50 shadow-xl"
            >
              <div className="inline-flex p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-3 text-gray-800 dark:text-gray-100">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/app')}
            className="px-12 py-5 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl transition-all duration-300"
          >
            Start Expressing
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
