import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import {
  Brain,
  History,
  TrendingUp,
  Settings,
  LogOut,
  Menu,
  X,
  Moon,
  Sun,
} from 'lucide-react';
import { useTheme } from './ThemeProvider';

export function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { theme, toggleTheme } = useTheme();

  const menuItems = [
    { path: '/app', icon: Brain, label: 'Analyze Emotion' },
    { path: '/app/history', icon: History, label: 'History' },
    { path: '/app/insights', icon: TrendingUp, label: 'Insights' },
    { path: '/app/settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 dark:from-gray-900 dark:via-purple-950 dark:to-gray-900 transition-colors duration-500">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 md:hidden p-3 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border border-white/20 dark:border-gray-800/50 shadow-lg"
      >
        {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 768) && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-72 z-40 p-6 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-r border-white/20 dark:border-gray-800/50 shadow-2xl"
          >
            <div className="flex flex-col h-full">
              {/* Logo */}
              <div className="mb-8 pt-12 md:pt-0">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500">
                    <span className="text-3xl">💭</span>
                  </div>
                  <div>
                    <h2 className="text-gray-800 dark:text-white">Emotion</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Interpreter</p>
                  </div>
                </div>
              </div>

              {/* Menu items */}
              <nav className="flex-1 space-y-2">
                {menuItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.path}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        navigate(item.path);
                        if (window.innerWidth < 768) setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                          : 'hover:bg-white/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  );
                })}
              </nav>

              {/* Bottom actions */}
              <div className="space-y-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={toggleTheme}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-white/50 dark:hover:bg-gray-800/50 text-gray-700 dark:text-gray-300 transition-all duration-300"
                >
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-5 h-5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5" />
                      <span>Light Mode</span>
                    </>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 transition-all duration-300"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </motion.button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main
        className={`transition-all duration-300 ${
          sidebarOpen ? 'md:ml-72' : 'ml-0'
        } min-h-screen p-4 md:p-8`}
      >
        <Outlet />
      </main>
    </div>
  );
}
