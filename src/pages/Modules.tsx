import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  Car,
  Lightbulb,
  Zap,
  Droplets,
  Wind,
  AlertCircle,
  Activity,
  Radio,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const modules = [
  {
    icon: Car,
    title: 'Traffic Control',
    description: 'Real-time traffic monitoring and signal optimization',
    status: 'Active',
    color: 'blue',
    stats: { active: '23/23', efficiency: 94 },
  },
  {
    icon: Lightbulb,
    title: 'Smart Lighting',
    description: 'Intelligent street lighting with adaptive brightness',
    status: 'Active',
    color: 'purple',
    stats: { active: '1,234/1,260', efficiency: 98 },
  },
  {
    icon: Zap,
    title: 'Energy Grid',
    description: 'Power distribution and renewable energy integration',
    status: 'Active',
    color: 'blue',
    stats: { active: '12/12', efficiency: 89 },
  },
  {
    icon: Droplets,
    title: 'Water System',
    description: 'Water quality monitoring and distribution management',
    status: 'Active',
    color: 'purple',
    stats: { active: '45/48', efficiency: 94 },
  },
  {
    icon: Wind,
    title: 'Pollution Monitor',
    description: 'Air quality sensors and environmental tracking',
    status: 'Warning',
    color: 'pink',
    stats: { active: '156/160', efficiency: 76 },
  },
  {
    icon: AlertCircle,
    title: 'Emergency Alerts',
    description: 'City-wide alert system and emergency response',
    status: 'Active',
    color: 'blue',
    stats: { active: '89/89', efficiency: 100 },
  },
  {
    icon: Activity,
    title: 'IoT Sensors',
    description: 'Connected device network and data collection',
    status: 'Active',
    color: 'purple',
    stats: { active: '2,341/2,450', efficiency: 96 },
  },
  {
    icon: Radio,
    title: 'Communication',
    description: '5G network infrastructure and connectivity',
    status: 'Active',
    color: 'blue',
    stats: { active: '67/67', efficiency: 99 },
  },
];

// Circular progress component
const CircularProgress = ({ value, color }: { value: number; color: string }) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const colorMap = {
    blue: 'rgb(59, 130, 246)',
    purple: 'rgb(168, 85, 247)',
    pink: 'rgb(236, 72, 153)',
  };

  return (
    <div className="relative w-24 h-24">
      <svg className="transform -rotate-90 w-24 h-24">
        {/* Background circle */}
        <circle
          cx="48"
          cy="48"
          r={radius}
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="6"
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          stroke={colorMap[color as keyof typeof colorMap]}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            strokeDasharray: circumference,
            filter: `drop-shadow(0 0 8px ${colorMap[color as keyof typeof colorMap]}40)`,
          }}
        />
      </svg>
      {/* Percentage text */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className={`text-lg font-bold ${color === 'blue' ? 'text-blue-400' :
            color === 'purple' ? 'text-purple-400' :
              'text-pink-400'
            }`}
        >
          {value}%
        </motion.span>
      </div>
    </div>
  );
};

const Modules = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power3.out',
      });
    }
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 page-content">
      <div className="container mx-auto px-6 space-y-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-6xl font-bold gradient-text">CITY MODULES</h1>
          <p className="text-xl text-muted-foreground">Infrastructure management and control systems</p>

          {/* Stats summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-6 mt-6"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-green-500/30">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <span className="text-green-400 font-bold">{modules.filter(m => m.status === 'Active').length} Active</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-yellow-500/30">
              <AlertCircle className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-400 font-bold">{modules.filter(m => m.status === 'Warning').length} Warning</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Modules Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((module, index) => {
            const Icon = module.icon;
            const colorClasses = {
              blue: {
                text: 'text-blue-400',
                border: 'border-blue-500/30',
                glow: 'hover:glow-blue',
                bg: 'from-blue-500/5',
              },
              purple: {
                text: 'text-purple-400',
                border: 'border-purple-500/30',
                glow: 'hover:glow-purple',
                bg: 'from-purple-500/5',
              },
              pink: {
                text: 'text-pink-400',
                border: 'border-pink-500/30',
                glow: 'hover:glow-pink',
                bg: 'from-pink-500/5',
              },
            };

            const colors = colorClasses[module.color as keyof typeof colorClasses];

            return (
              <motion.div
                key={module.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02, y: -4 }}
                className={`glass-strong p-6 rounded-xl border ${colors.border} ${colors.glow} transition-all duration-300 cursor-pointer group relative overflow-hidden`}
              >
                {/* Animated background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative z-10 space-y-4">
                  {/* Icon and Status */}
                  <div className="flex items-start justify-between">
                    <motion.div
                      className={`p-3 rounded-xl glass border ${colors.border} ${colors.text}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      <Icon className="w-7 h-7" />
                    </motion.div>

                    {/* Status badge with glow */}
                    <motion.div
                      className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${module.status === 'Active'
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-1.5 h-1.5 rounded-full ${module.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'
                          }`}
                      />
                      {module.status}
                    </motion.div>
                  </div>

                  {/* Title and Description */}
                  <div>
                    <h3 className={`text-lg font-bold mb-2 ${colors.text}`}>
                      {module.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {module.description}
                    </p>
                  </div>

                  {/* Circular Progress and Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="space-y-2 flex-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Active:</span>
                        <span className={`font-bold ${colors.text}`}>{module.stats.active}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Efficiency:</span>
                        <span className={`font-bold ${colors.text}`}>{module.stats.efficiency}%</span>
                      </div>
                    </div>

                    {/* Circular progress */}
                    <div className="ml-4">
                      <CircularProgress value={module.stats.efficiency} color={module.color} />
                    </div>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="outline"
                    className={`w-full border ${colors.border} hover:${colors.glow} hover:bg-transparent group-hover:scale-105 transition-all`}
                  >
                    <span className={colors.text}>MANAGE MODULE</span>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Modules;
