import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/StatCard';
import { Activity, Zap, Droplets, Wind, Car, Lightbulb, Radio, Cpu, Wifi } from 'lucide-react';

const LiveData = () => {
  const [data, setData] = useState({
    traffic: 1247,
    energy: 89,
    water: 94,
    airQuality: 42,
    lighting: 1234,
    iot: 2341,
    network: 67,
    cpu: 45,
  });

  const [logs, setLogs] = useState<string[]>([]);

  useEffect(() => {
    // Update data every 2 seconds
    const interval = setInterval(() => {
      setData(prev => ({
        traffic: prev.traffic + Math.floor(Math.random() * 20) - 10,
        energy: Math.max(60, Math.min(100, prev.energy + Math.floor(Math.random() * 6) - 3)),
        water: Math.max(80, Math.min(100, prev.water + Math.floor(Math.random() * 4) - 2)),
        airQuality: Math.max(20, Math.min(80, prev.airQuality + Math.floor(Math.random() * 8) - 4)),
        lighting: prev.lighting + Math.floor(Math.random() * 10) - 5,
        iot: prev.iot + Math.floor(Math.random() * 20) - 10,
        network: Math.max(50, Math.min(70, prev.network + Math.floor(Math.random() * 4) - 2)),
        cpu: Math.max(20, Math.min(80, prev.cpu + Math.floor(Math.random() * 10) - 5)),
      }));

      // Add new log entry
      const logMessages = [
        'System check complete • All modules operational',
        'Traffic flow optimized • Reduced congestion by 12%',
        'Energy consumption within normal parameters',
        'IoT sensors reporting nominal status',
        'Network latency: 23ms • Connection stable',
        'Air quality sensors calibrated successfully',
        'Smart lighting adjusted for optimal efficiency',
        'Water system pressure normalized',
      ];

      const newLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      setLogs(prev => [newLog, ...prev].slice(0, 12));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-12 page-content">
      <div className="container mx-auto px-6 space-y-12">
        {/* Header with live indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4"
        >
          <h1 className="text-6xl font-bold gradient-text">LIVE DATA STREAM</h1>
          <p className="text-xl text-muted-foreground">Real-time metrics updating every 2 seconds</p>

          {/* Live indicator */}
          <div className="flex items-center justify-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-3 h-3 rounded-full bg-green-400"
            />
            <span className="text-green-400 font-bold text-lg flex items-center gap-2">
              <Wifi className="w-5 h-5" />
              LIVE STREAMING
            </span>
          </div>
        </motion.div>

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Activity}
            title="Traffic Flow"
            value={data.traffic}
            unit="veh/min"
            trend={data.traffic > 1247 ? 'up' : 'down'}
            color="blue"
            index={0}
          />
          <StatCard
            icon={Zap}
            title="Energy Usage"
            value={data.energy}
            unit="MW"
            trend={data.energy < 89 ? 'down' : 'up'}
            color="purple"
            index={1}
          />
          <StatCard
            icon={Droplets}
            title="Water System"
            value={data.water}
            unit="%"
            trend={data.water > 94 ? 'up' : 'down'}
            color="blue"
            index={2}
          />
          <StatCard
            icon={Wind}
            title="Air Quality"
            value={data.airQuality}
            unit="AQI"
            trend={data.airQuality < 42 ? 'down' : 'up'}
            color="pink"
            index={3}
          />
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={Lightbulb}
            title="Smart Lights"
            value={data.lighting}
            unit="active"
            trend={data.lighting > 1234 ? 'up' : 'down'}
            color="purple"
            index={4}
          />
          <StatCard
            icon={Radio}
            title="IoT Devices"
            value={data.iot}
            unit="online"
            trend={data.iot > 2341 ? 'up' : 'down'}
            color="blue"
            index={5}
          />
          <StatCard
            icon={Activity}
            title="Network Load"
            value={data.network}
            unit="%"
            trend={data.network < 67 ? 'down' : 'up'}
            color="pink"
            index={6}
          />
          <StatCard
            icon={Cpu}
            title="System Load"
            value={data.cpu}
            unit="%"
            trend={data.cpu < 45 ? 'down' : 'up'}
            color="purple"
            index={7}
          />
        </div>

        {/* Data Stream Log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-strong p-8 rounded-xl border border-blue-500/30"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-neon-blue flex items-center gap-3">
              <Activity className="w-7 h-7" />
              DATA STREAM LOG
            </h2>
            <div className="px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-500/30 font-mono text-sm">
              <span className="text-blue-400">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          {/* Log entries */}
          <div className="space-y-2 font-mono text-sm max-h-96 overflow-y-auto custom-scrollbar">
            {logs.length === 0 ? (
              <div className="text-muted-foreground text-center py-8">
                Waiting for data stream...
              </div>
            ) : (
              logs.map((log, i) => (
                <motion.div
                  key={`${log}-${i}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start gap-4 p-3 rounded-lg bg-white/5 border border-blue-500/10 hover:border-blue-500/30 transition-colors"
                >
                  <span className="text-purple-400 shrink-0">
                    [{new Date().toLocaleTimeString()}]
                  </span>
                  <span className="text-blue-400 shrink-0">●</span>
                  <span className="text-blue-300/90 flex-1">{log}</span>
                  <span className="text-green-400 shrink-0">✓</span>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* System Health Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-strong p-6 rounded-xl border border-green-500/30 hover:glow-blue transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">System Uptime</p>
                <p className="text-2xl font-bold text-green-400">99.98%</p>
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center"
              >
                <Activity className="w-6 h-6 text-green-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="glass-strong p-6 rounded-xl border border-blue-500/30 hover:glow-purple transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Data Points/sec</p>
                <p className="text-2xl font-bold text-blue-400">2,847</p>
              </div>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center"
              >
                <Zap className="w-6 h-6 text-blue-400" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="glass-strong p-6 rounded-xl border border-purple-500/30 hover:glow-pink transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Response Time</p>
                <p className="text-2xl font-bold text-purple-400">23ms</p>
              </div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center"
              >
                <Wifi className="w-6 h-6 text-purple-400" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;
