import { motion } from 'framer-motion';
import { NavLink } from './NavLink';
import { Activity, BarChart3, Home, Radio, Zap } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/dashboard', icon: Activity, label: 'Dashboard' },
    { to: '/modules', icon: BarChart3, label: 'Modules' },
    { to: '/live-data', icon: Radio, label: 'Live Data' },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-40 glass-strong border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            <motion.div
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-neon"
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <div className="text-xl font-bold gradient-text">Smart City</div>
              <div className="text-xs text-muted-foreground">Control Hub</div>
            </div>
          </motion.div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="relative px-4 py-2 rounded-lg transition-all duration-300"
                >
                  <motion.div
                    className={`flex items-center gap-2 relative z-10 ${isActive ? 'text-blue-400' : 'text-muted-foreground'
                      }`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.div>

                  {/* Active indicator with glow */}
                  {isActive && (
                    <>
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-blue-500/10 rounded-lg neon-border"
                        initial={false}
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                      <motion.div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
                        initial={{ opacity: 0, scaleX: 0 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    </>
                  )}

                  {/* Hover effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 bg-white/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity"
                      whileHover={{ opacity: 1 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.nav>
  );
};
