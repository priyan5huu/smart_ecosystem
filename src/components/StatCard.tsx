import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useAnimatedValue } from '@/hooks/useCounterAnimation';
import { useEffect, useState } from 'react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: number;
  unit: string;
  trend?: 'up' | 'down';
  color?: 'blue' | 'purple' | 'pink';
  index?: number;
}

export const StatCard = ({
  icon: Icon,
  title,
  value,
  unit,
  trend,
  color = 'blue',
  index = 0
}: StatCardProps) => {
  const displayValue = useAnimatedValue(value, 0.8, 0);
  const [isUpdating, setIsUpdating] = useState(false);

  // Flash effect when value changes
  useEffect(() => {
    setIsUpdating(true);
    const timer = setTimeout(() => setIsUpdating(false), 300);
    return () => clearTimeout(timer);
  }, [value]);

  const colorClasses = {
    blue: {
      icon: 'bg-blue-500/10 text-blue-400',
      glow: 'glow-blue',
      text: 'text-blue-400',
      border: 'border-blue-500/30',
    },
    purple: {
      icon: 'bg-purple-500/10 text-purple-400',
      glow: 'glow-purple',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
    },
    pink: {
      icon: 'bg-pink-500/10 text-pink-400',
      glow: 'glow-pink',
      text: 'text-pink-400',
      border: 'border-pink-500/30',
    },
  };

  const colors = colorClasses[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`glass p-6 rounded-xl border ${colors.border} hover:${colors.glow} transition-all duration-300 cursor-pointer group relative overflow-hidden`}
    >
      {/* Background gradient on hover */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-br ${color === 'blue' ? 'from-blue-500/5 to-transparent' :
            color === 'purple' ? 'from-purple-500/5 to-transparent' :
              'from-pink-500/5 to-transparent'
          } opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          {/* Icon with pulse animation */}
          <motion.div
            className={`p-3 rounded-xl ${colors.icon} group-hover:scale-110 transition-transform duration-300`}
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Icon className="w-6 h-6" />
          </motion.div>

          {/* Trend indicator */}
          {trend && (
            <motion.div
              animate={{
                y: trend === 'up' ? [-2, 2, -2] : [2, -2, 2]
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: 'easeInOut'
              }}
              className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 ${trend === 'up'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
                }`}
            >
              <span>{trend === 'up' ? '↑' : '↓'}</span>
              <span>{trend === 'up' ? 'UP' : 'DOWN'}</span>
            </motion.div>
          )}
        </div>

        <div className="space-y-2">
          {/* Title */}
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </h3>

          {/* Value with flash effect */}
          <div className="flex items-baseline gap-2">
            <motion.span
              animate={isUpdating ? {
                scale: [1, 1.1, 1],
                color: [
                  'rgb(255, 255, 255)',
                  color === 'blue' ? 'rgb(96, 165, 250)' :
                    color === 'purple' ? 'rgb(192, 132, 252)' :
                      'rgb(244, 114, 182)',
                  'rgb(255, 255, 255)'
                ]
              } : {}}
              transition={{ duration: 0.3 }}
              className={`text-4xl font-bold ${colors.text}`}
            >
              {displayValue.toLocaleString()}
            </motion.span>
            <span className="text-sm text-muted-foreground font-medium">{unit}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${color === 'blue' ? 'from-blue-500 to-cyan-400' :
                color === 'purple' ? 'from-purple-500 to-pink-400' :
                  'from-pink-500 to-rose-400'
              }`}
            initial={{ width: 0 }}
            animate={{ width: '75%' }}
            transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
          />
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
      />
    </motion.div>
  );
};
