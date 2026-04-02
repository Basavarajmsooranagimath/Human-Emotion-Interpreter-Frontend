import { motion } from 'motion/react';
import { Moon, Sun, Trash2, User, Bell, Lock, Download } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { useState } from 'react';

export function SettingsPage() {
  const { theme, toggleTheme } = useTheme();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleClearHistory = () => {
    localStorage.removeItem('emotionHistory');
    setShowDeleteConfirm(false);
    window.location.reload();
  };

  const handleExportData = () => {
    const history = localStorage.getItem('emotionHistory') || '[]';
    const blob = new Blob([history], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'emotion-history.json';
    a.click();
    URL.revokeObjectURL(url);
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
            Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Customize your experience
          </p>
        </div>

        <div className="space-y-6">
          {/* Appearance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-xl"
          >
            <h2 className="mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
              <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                {theme === 'light' ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-white" />}
              </div>
              Appearance
            </h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-800 dark:text-white mb-1">Dark Mode</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Switch between light and dark themes
                </p>
              </div>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className={`relative w-16 h-8 rounded-full transition-colors duration-300 ${
                  theme === 'dark' ? 'bg-gradient-to-r from-purple-500 to-pink-500' : 'bg-gray-300'
                }`}
              >
                <motion.div
                  className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-md"
                  animate={{ left: theme === 'dark' ? '36px' : '4px' }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              </motion.button>
            </div>
          </motion.div>

          {/* Account */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-xl"
          >
            <h2 className="mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
              <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <User className="w-5 h-5 text-white" />
              </div>
              Account
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl">
                  JD
                </div>
                <div>
                  <p className="text-gray-800 dark:text-white">John Doe</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">john.doe@example.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Privacy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-xl"
          >
            <h2 className="mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
              <div className="p-2 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500">
                <Lock className="w-5 h-5 text-white" />
              </div>
              Privacy & Data
            </h2>
            <div className="space-y-4">
              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleExportData}
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <div className="text-left">
                    <p className="text-gray-800 dark:text-white">Export Your Data</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Download all your emotion entries
                    </p>
                  </div>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
                  <div className="text-left">
                    <p className="text-red-600 dark:text-red-400">Clear All History</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Permanently delete all your entries
                    </p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Notifications */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-xl"
          >
            <h2 className="mb-6 flex items-center gap-3 text-gray-800 dark:text-white">
              <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500 to-red-500">
                <Bell className="w-5 h-5 text-white" />
              </div>
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-800 dark:text-white mb-1">Daily Reminders</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get reminded to check in with your emotions
                  </p>
                </div>
                <button className="relative w-16 h-8 rounded-full bg-gray-300 transition-colors duration-300">
                  <div className="absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Delete confirmation modal */}
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowDeleteConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 rounded-3xl p-8 border border-white/20 dark:border-gray-800/50 shadow-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="inline-block p-4 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                  <Trash2 className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h2 className="mb-2 text-gray-800 dark:text-white">Clear All History?</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  This action cannot be undone. All your emotion entries will be permanently deleted.
                </p>
              </div>
              <div className="flex gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 py-3 rounded-2xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleClearHistory}
                  className="flex-1 py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white transition-all duration-300"
                >
                  Delete All
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
