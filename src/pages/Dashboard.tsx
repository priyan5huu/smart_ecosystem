import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StatCard } from '@/components/StatCard';
import {
  Activity,
  Zap,
  Droplets,
  Wind,
  Car,
  Lightbulb,
  AlertTriangle,
  TrendingUp,
  CheckCircle2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

gsap.registerPlugin(ScrollTrigger);

const energyData = [
  { time: '00:00', value: 45 },
  { time: '04:00', value: 32 },
  { time: '08:00', value: 68 },
  { time: '12:00', value: 89 },
  { time: '16:00', value: 92 },
  { time: '20:00', value: 76 },
  { time: '24:00', value: 54 },
];

const Dashboard = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const modulesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stagger animation for stat cards
    if (statsRef.current) {
      gsap.from(statsRef.current.children, {
        scrollTrigger: {
          trigger: statsRef.current,
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }

    // Chart animation
    if (chartRef.current) {
      gsap.from(chartRef.current, {
        scrollTrigger: {
          trigger: chartRef.current,
          start: 'top 80%',
        },
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
      });
    }

    // Module cards stagger
    if (modulesRef.current) {
      gsap.from(modulesRef.current.children, {
        scrollTrigger: {
          trigger: modulesRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
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
          className="text-center space-y-3"
        >
          <h1 className="text-5xl font-bold gradient-text">System Overview</h1>
          <p className="text-lg text-muted-foreground">Real-time city infrastructure monitoring</p>
        </motion.div>

        {/* System Status Banner */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-strong p-6 rounded-xl border-l-4 border-green-500"
        >
          <div className="flex items-center gap-4">
            <CheckCircle2 className="w-8 h-8 text-green-400" />
            <div className="flex-1">
              <h3 className="font-bold text-xl text-green-400">
                System Status: Optimal
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                All systems operational • Last updated 2 seconds ago
              </p>
            </div>
            <div className="px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/30">
              <span className="text-green-400 font-bold">100%</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Activity}
            title="Traffic Flow"
            value={1247}
            unit="vehicles/min"
            trend="up"
            color="blue"
            index={0}
          />
          <StatCard
            icon={Zap}
            title="Energy Usage"
            value={89}
            unit="MW"
            trend="down"
            color="purple"
            index={1}
          />
          <StatCard
            icon={Droplets}
            title="Water System"
            value={94}
            unit="%"
            trend="up"
            color="blue"
            index={2}
          />
          <StatCard
            icon={Wind}
            title="Air Quality"
            value={42}
            unit="AQI"
            trend="down"
            color="pink"
            index={3}
          />
        </div>

        {/* Chart Section */}
        <div ref={chartRef} className="glass-strong p-8 rounded-xl border border-blue-500/30">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-neon-blue flex items-center gap-3">
                <TrendingUp className="w-7 h-7" />
                ENERGY CONSUMPTION
              </h2>
              <p className="text-muted-foreground mt-2">Last 24 hours</p>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={energyData}>
              <defs>
                <linearGradient id="energyGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth={1}
              />
              <XAxis
                dataKey="time"
                stroke="rgb(59, 130, 246)"
                style={{ fontSize: '13px', fontWeight: 500 }}
                tickLine={false}
              />
              <YAxis
                stroke="rgb(59, 130, 246)"
                style={{ fontSize: '13px', fontWeight: 500 }}
                tickLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(17, 24, 39, 0.95)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '12px',
                  backdropFilter: 'blur(12px)',
                }}
                labelStyle={{ color: 'rgb(59, 130, 246)', fontWeight: 'bold' }}
                itemStyle={{ color: 'rgb(147, 197, 253)' }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="rgb(59, 130, 246)"
                strokeWidth={3}
                dot={{
                  fill: 'rgb(59, 130, 246)',
                  r: 6,
                  strokeWidth: 2,
                  stroke: 'rgb(17, 24, 39)'
                }}
                activeDot={{
                  r: 8,
                  fill: 'rgb(168, 85, 247)',
                  stroke: 'rgb(17, 24, 39)',
                  strokeWidth: 2
                }}
                fill="url(#energyGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Module Status Grid */}
        <div ref={modulesRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="glass-strong p-6 rounded-xl cursor-pointer border border-blue-500/30 hover:glow-blue transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <Car className="w-10 h-10 text-neon-blue mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-blue-400">Traffic Control</h3>
              <p className="text-muted-foreground text-sm mb-4">23 intersections • 45 cameras active</p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Efficiency</span>
                  <span className="text-blue-400 font-bold">87%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '87%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="glass-strong p-6 rounded-xl cursor-pointer border border-purple-500/30 hover:glow-purple transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <Lightbulb className="w-10 h-10 text-neon-purple mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-purple-400">Smart Lighting</h3>
              <p className="text-muted-foreground text-sm mb-4">1,234 lights • 98% operational</p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Efficiency</span>
                  <span className="text-purple-400 font-bold">98%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '98%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.4 }}
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-400 relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="glass-strong p-6 rounded-xl cursor-pointer border border-pink-500/30 hover:glow-pink transition-all duration-300 group relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <Wind className="w-10 h-10 text-neon-pink mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold mb-2 text-pink-400">Air Quality Monitor</h3>
              <p className="text-muted-foreground text-sm mb-4">156 sensors • Good quality</p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Efficiency</span>
                  <span className="text-pink-400 font-bold">76%</span>
                </div>
                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: '76%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-400 relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-white/30"
                      animate={{ x: ['-100%', '200%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
