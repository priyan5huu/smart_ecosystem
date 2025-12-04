import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
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
  CheckCircle,
  X,
  TrendingUp,
  TrendingDown,
  Settings,
  Power,
  BarChart3,
  Navigation,
  Sun,
  Moon,
  Battery,
  Wifi,
  Bell,
  MapPin,
  Shield,
  RefreshCw,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';

interface DiagnosticResult {
  test: string;
  status: 'passed' | 'warning' | 'failed';
  message: string;
  value?: string;
}

interface ModuleData {
  icon: any;
  title: string;
  description: string;
  status: 'Active' | 'Warning' | 'Inactive';
  color: string;
  stats: { active: string; efficiency: number };
  details: {
    uptime: string;
    lastMaintenance: string;
    nextMaintenance: string;
    powerConsumption: string;
  };
  // MVP Feature Data
  featureData?: {
    // Traffic Control
    trafficLights?: { id: string; status: 'red' | 'yellow' | 'green'; location: string }[];
    vehicleCount?: number;
    avgSpeed?: number;

    // Smart Lighting
    brightness?: number;
    energySaved?: number;
    autoMode?: boolean;

    // Energy Grid
    solarPower?: number;
    windPower?: number;
    gridPower?: number;
    batteryLevel?: number;

    // Water System
    flowRate?: number;
    pressure?: number;
    quality?: number;
    leaksDetected?: number;

    // Pollution Monitor
    aqi?: number;
    pm25?: number;
    co2?: number;
    temperature?: number;

    // Emergency Alerts
    activeAlerts?: { id: string; type: string; location: string; severity: 'low' | 'medium' | 'high' }[];

    // IoT Sensors
    sensorReadings?: { id: string; type: string; value: number; unit: string }[];

    // Communication
    bandwidth?: number;
    latency?: number;
    connectedDevices?: number;
  };
}

const initialModules: ModuleData[] = [
  {
    icon: Car,
    title: 'Traffic Control',
    description: 'Real-time traffic monitoring and signal optimization',
    status: 'Active',
    color: 'blue',
    stats: { active: '23/23', efficiency: 94 },
    details: {
      uptime: '99.8%',
      lastMaintenance: '2 days ago',
      nextMaintenance: '28 days',
      powerConsumption: '12.4 kW',
    },
    featureData: {
      trafficLights: [
        { id: 'TL-001', status: 'green', location: 'Main St & 1st Ave' },
        { id: 'TL-002', status: 'red', location: 'Park Ave & 5th St' },
        { id: 'TL-003', status: 'green', location: 'Broadway & Central' },
        { id: 'TL-004', status: 'yellow', location: 'Market St & Oak' },
      ],
      vehicleCount: 1247,
      avgSpeed: 42,
    },
  },
  {
    icon: Lightbulb,
    title: 'Smart Lighting',
    description: 'Intelligent street lighting with adaptive brightness',
    status: 'Active',
    color: 'purple',
    stats: { active: '1,234/1,260', efficiency: 98 },
    details: {
      uptime: '99.9%',
      lastMaintenance: '5 days ago',
      nextMaintenance: '25 days',
      powerConsumption: '45.2 kW',
    },
    featureData: {
      brightness: 75,
      energySaved: 34,
      autoMode: true,
    },
  },
  {
    icon: Zap,
    title: 'Energy Grid',
    description: 'Power distribution and renewable energy integration',
    status: 'Active',
    color: 'blue',
    stats: { active: '12/12', efficiency: 89 },
    details: {
      uptime: '99.5%',
      lastMaintenance: '1 day ago',
      nextMaintenance: '29 days',
      powerConsumption: '234.5 kW',
    },
    featureData: {
      solarPower: 145,
      windPower: 89,
      gridPower: 234,
      batteryLevel: 78,
    },
  },
  {
    icon: Droplets,
    title: 'Water System',
    description: 'Water quality monitoring and distribution management',
    status: 'Active',
    color: 'purple',
    stats: { active: '45/48', efficiency: 94 },
    details: {
      uptime: '98.7%',
      lastMaintenance: '3 days ago',
      nextMaintenance: '27 days',
      powerConsumption: '67.8 kW',
    },
    featureData: {
      flowRate: 1250,
      pressure: 65,
      quality: 98,
      leaksDetected: 2,
    },
  },
  {
    icon: Wind,
    title: 'Pollution Monitor',
    description: 'Air quality sensors and environmental tracking',
    status: 'Warning',
    color: 'pink',
    stats: { active: '156/160', efficiency: 76 },
    details: {
      uptime: '97.2%',
      lastMaintenance: '7 days ago',
      nextMaintenance: '23 days',
      powerConsumption: '8.9 kW',
    },
    featureData: {
      aqi: 87,
      pm25: 45,
      co2: 412,
      temperature: 24,
    },
  },
  {
    icon: AlertCircle,
    title: 'Emergency Alerts',
    description: 'City-wide alert system and emergency response',
    status: 'Active',
    color: 'blue',
    stats: { active: '89/89', efficiency: 100 },
    details: {
      uptime: '100%',
      lastMaintenance: '1 day ago',
      nextMaintenance: '29 days',
      powerConsumption: '3.2 kW',
    },
    featureData: {
      activeAlerts: [
        { id: 'AL-001', type: 'Traffic Incident', location: 'Highway 101', severity: 'medium' },
        { id: 'AL-002', type: 'Weather Warning', location: 'Downtown', severity: 'low' },
      ],
    },
  },
  {
    icon: Activity,
    title: 'IoT Sensors',
    description: 'Connected device network and data collection',
    status: 'Active',
    color: 'purple',
    stats: { active: '2,341/2,450', efficiency: 96 },
    details: {
      uptime: '99.6%',
      lastMaintenance: '4 days ago',
      nextMaintenance: '26 days',
      powerConsumption: '15.7 kW',
    },
    featureData: {
      sensorReadings: [
        { id: 'S-001', type: 'Temperature', value: 24, unit: '°C' },
        { id: 'S-002', type: 'Humidity', value: 62, unit: '%' },
        { id: 'S-003', type: 'Noise Level', value: 58, unit: 'dB' },
        { id: 'S-004', type: 'Vibration', value: 0.3, unit: 'mm/s' },
      ],
    },
  },
  {
    icon: Radio,
    title: 'Communication',
    description: '5G network infrastructure and connectivity',
    status: 'Active',
    color: 'blue',
    stats: { active: '67/67', efficiency: 99 },
    details: {
      uptime: '99.9%',
      lastMaintenance: '2 days ago',
      nextMaintenance: '28 days',
      powerConsumption: '89.3 kW',
    },
    featureData: {
      bandwidth: 8.4,
      latency: 12,
      connectedDevices: 12456,
    },
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

// Diagnostic Modal Component
const DiagnosticModal = ({
  module,
  onClose,
}: {
  module: ModuleData;
  onClose: () => void;
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTest, setCurrentTest] = useState('');
  const [results, setResults] = useState<DiagnosticResult[]>([]);
  const [healthScore, setHealthScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const colorClasses = {
    blue: {
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
    },
    purple: {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    pink: {
      text: 'text-pink-400',
      border: 'border-pink-500/30',
      bg: 'bg-pink-500/10',
    },
  };

  const colors = colorClasses[module.color as keyof typeof colorClasses];

  const runDiagnostics = async () => {
    setIsRunning(true);
    setProgress(0);
    setResults([]);
    setCompleted(false);

    const tests = [
      { name: 'System Connectivity', duration: 800 },
      { name: 'Performance Analysis', duration: 1000 },
      { name: 'Resource Utilization', duration: 700 },
      { name: 'Security Check', duration: 900 },
      { name: 'Data Integrity', duration: 600 },
    ];

    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      setCurrentTest(test.name);

      await new Promise(resolve => setTimeout(resolve, test.duration));

      // Generate test result based on module status and efficiency
      const efficiency = module.stats.efficiency;
      const isActive = module.status === 'Active';

      let status: 'passed' | 'warning' | 'failed';
      let message: string;
      let value: string | undefined;

      if (test.name === 'System Connectivity') {
        status = isActive ? 'passed' : 'failed';
        message = isActive ? 'All systems connected and responding' : 'Connection issues detected';
        value = isActive ? '100%' : '0%';
      } else if (test.name === 'Performance Analysis') {
        status = efficiency >= 85 ? 'passed' : efficiency >= 70 ? 'warning' : 'failed';
        message = efficiency >= 85 ? 'Performance within optimal range' :
          efficiency >= 70 ? 'Performance below optimal levels' :
            'Critical performance issues detected';
        value = `${efficiency}%`;
      } else if (test.name === 'Resource Utilization') {
        const utilization = Math.floor(60 + Math.random() * 30);
        status = utilization < 85 ? 'passed' : 'warning';
        message = utilization < 85 ? 'Resource usage is optimal' : 'High resource consumption detected';
        value = `${utilization}%`;
      } else if (test.name === 'Security Check') {
        status = 'passed';
        message = 'No security vulnerabilities detected';
        value = 'Secure';
      } else {
        const integrity = Math.floor(95 + Math.random() * 5);
        status = integrity >= 98 ? 'passed' : 'warning';
        message = integrity >= 98 ? 'Data integrity verified' : 'Minor data inconsistencies found';
        value = `${integrity}%`;
      }

      setResults(prev => [...prev, { test: test.name, status, message, value }]);
      setProgress(((i + 1) / tests.length) * 100);
    }

    // Calculate health score
    const passedTests = results.filter(r => r.status === 'passed').length + 1;
    const warningTests = results.filter(r => r.status === 'warning').length;
    const score = Math.floor((passedTests / tests.length) * 100 - (warningTests * 5));
    setHealthScore(score);

    setIsRunning(false);
    setCompleted(true);
    setCurrentTest('');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`glass-strong p-8 rounded-2xl border ${colors.border} max-w-3xl w-full max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl glass border ${colors.border} ${colors.text}`}>
              <Shield className="w-8 h-8" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${colors.text}`}>System Diagnostics</h2>
              <p className="text-muted-foreground">{module.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Health Score Display (when completed) */}
        {completed && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl ${colors.bg} border ${colors.border} mb-6`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Health Score</p>
                <div className="flex items-center gap-3">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200 }}
                    className={`text-5xl font-bold ${healthScore >= 90 ? 'text-green-400' :
                      healthScore >= 70 ? 'text-yellow-400' :
                        'text-red-400'
                      }`}
                  >
                    {healthScore}
                  </motion.span>
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
              </div>
              <div className={`px-4 py-2 rounded-lg ${healthScore >= 90 ? 'bg-green-500/20 border border-green-500/30' :
                healthScore >= 70 ? 'bg-yellow-500/20 border border-yellow-500/30' :
                  'bg-red-500/20 border border-red-500/30'
                }`}>
                <p className={`text-sm font-bold ${healthScore >= 90 ? 'text-green-400' :
                  healthScore >= 70 ? 'text-yellow-400' :
                    'text-red-400'
                  }`}>
                  {healthScore >= 90 ? 'EXCELLENT' :
                    healthScore >= 70 ? 'GOOD' :
                      'NEEDS ATTENTION'}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Progress Bar */}
        {isRunning && (
          <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border} mb-6`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                >
                  <RefreshCw className={`w-5 h-5 ${colors.text}`} />
                </motion.div>
                <span className="font-bold">Running Diagnostics...</span>
              </div>
              <span className={`text-lg font-bold ${colors.text}`}>{Math.floor(progress)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
              <motion.div
                className={`h-full bg-gradient-to-r ${module.color === 'blue' ? 'from-blue-500 to-cyan-400' :
                  module.color === 'purple' ? 'from-purple-500 to-pink-400' :
                    'from-pink-500 to-rose-400'
                  }`}
                style={{ width: `${progress}%`, filter: 'drop-shadow(0 0 8px currentColor)' }}
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
              />
            </div>
            {currentTest && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-muted-foreground"
              >
                Testing: {currentTest}
              </motion.p>
            )}
          </div>
        )}

        {/* Test Results */}
        {results.length > 0 && (
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className={`w-5 h-5 ${colors.text}`} />
              <h3 className="font-bold text-lg">Diagnostic Results</h3>
            </div>
            {results.map((result, index) => (
              <motion.div
                key={result.test}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass p-4 rounded-xl border ${result.status === 'passed' ? 'border-green-500/30' :
                  result.status === 'warning' ? 'border-yellow-500/30' :
                    'border-red-500/30'
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3 flex-1">
                    <div className={`p-2 rounded-lg ${result.status === 'passed' ? 'bg-green-500/20' :
                      result.status === 'warning' ? 'bg-yellow-500/20' :
                        'bg-red-500/20'
                      }`}>
                      {result.status === 'passed' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : result.status === 'warning' ? (
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                      ) : (
                        <X className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold mb-1">{result.test}</p>
                      <p className="text-sm text-muted-foreground">{result.message}</p>
                    </div>
                  </div>
                  {result.value && (
                    <span className={`text-lg font-bold ${result.status === 'passed' ? 'text-green-400' :
                      result.status === 'warning' ? 'text-yellow-400' :
                        'text-red-400'
                      }`}>
                      {result.value}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className={`flex-1 border ${colors.border} hover:${colors.bg}`}
            onClick={onClose}
            disabled={isRunning}
          >
            {completed ? 'Close' : 'Cancel'}
          </Button>
          <Button
            className={`flex-1 ${colors.bg} border ${colors.border} hover:opacity-80`}
            onClick={runDiagnostics}
            disabled={isRunning}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isRunning ? 'animate-spin' : ''}`} />
            <span className={colors.text}>
              {isRunning ? 'Running...' : completed ? 'Run Again' : 'Start Diagnostics'}
            </span>
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Module Detail Modal
const ModuleDetailModal = ({
  module,
  onClose,
  onToggle,
  onEfficiencyChange
}: {
  module: ModuleData;
  onClose: () => void;
  onToggle: () => void;
  onEfficiencyChange: (value: number) => void;
}) => {
  const [efficiency, setEfficiency] = useState(module.stats.efficiency);
  const [showDiagnostics, setShowDiagnostics] = useState(false);
  const isActive = module.status === 'Active';

  const colorClasses = {
    blue: {
      text: 'text-blue-400',
      border: 'border-blue-500/30',
      bg: 'bg-blue-500/10',
    },
    purple: {
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      bg: 'bg-purple-500/10',
    },
    pink: {
      text: 'text-pink-400',
      border: 'border-pink-500/30',
      bg: 'bg-pink-500/10',
    },
  };

  const colors = colorClasses[module.color as keyof typeof colorClasses];
  const Icon = module.icon;

  const handleEfficiencyChange = (value: number[]) => {
    setEfficiency(value[0]);
    onEfficiencyChange(value[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className={`glass-strong p-8 rounded-2xl border ${colors.border} max-w-2xl w-full max-h-[90vh] overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className={`p-4 rounded-xl glass border ${colors.border} ${colors.text}`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${colors.text}`}>{module.title}</h2>
              <p className="text-muted-foreground">{module.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Status Toggle */}
        <div className={`p-4 rounded-xl ${colors.bg} border ${colors.border} mb-6`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Power className={`w-5 h-5 ${colors.text}`} />
              <div>
                <p className="font-bold">Module Status</p>
                <p className="text-sm text-muted-foreground">
                  {isActive ? 'System is operational' : 'System is offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-bold ${isActive ? 'text-green-400' : 'text-red-400'}`}>
                {isActive ? 'ACTIVE' : 'INACTIVE'}
              </span>
              <Switch
                checked={isActive}
                onCheckedChange={onToggle}
                className="data-[state=checked]:bg-green-500"
              />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-green-400" />
              <p className="text-sm text-muted-foreground">Uptime</p>
            </div>
            <p className="text-2xl font-bold text-green-400">{module.details.uptime}</p>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              <p className="text-sm text-muted-foreground">Power Usage</p>
            </div>
            <p className="text-2xl font-bold text-yellow-400">{module.details.powerConsumption}</p>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-blue-400" />
              <p className="text-sm text-muted-foreground">Last Maintenance</p>
            </div>
            <p className="text-lg font-bold text-blue-400">{module.details.lastMaintenance}</p>
          </div>

          <div className="glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-purple-400" />
              <p className="text-sm text-muted-foreground">Next Maintenance</p>
            </div>
            <p className="text-lg font-bold text-purple-400">{module.details.nextMaintenance}</p>
          </div>
        </div>

        {/* Efficiency Control */}
        <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border} mb-6`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <BarChart3 className={`w-5 h-5 ${colors.text}`} />
              <p className="font-bold">Efficiency Control</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-3xl font-bold ${colors.text}`}>{efficiency}%</span>
              {efficiency > module.stats.efficiency ? (
                <TrendingUp className="w-5 h-5 text-green-400" />
              ) : efficiency < module.stats.efficiency ? (
                <TrendingDown className="w-5 h-5 text-red-400" />
              ) : null}
            </div>
          </div>
          <Slider
            value={[efficiency]}
            onValueChange={handleEfficiencyChange}
            max={100}
            min={0}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Active Devices */}
        <div className="glass p-4 rounded-xl border border-white/10 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Devices</p>
              <p className={`text-2xl font-bold ${colors.text}`}>{module.stats.active}</p>
            </div>
            <CircularProgress value={efficiency} color={module.color} />
          </div>
        </div>

        {/* MVP FEATURES SECTION */}
        {module.featureData && (
          <div className="space-y-6 mb-6">
            {/* Traffic Control Features */}
            {module.title === 'Traffic Control' && module.featureData.trafficLights && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Navigation className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="font-bold text-lg">Live Traffic Signals</h3>
                </div>
                <div className="space-y-3">
                  {module.featureData.trafficLights.map((light) => (
                    <div key={light.id} className="flex items-center justify-between glass p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-bold text-sm">{light.id}</p>
                          <p className="text-xs text-muted-foreground">{light.location}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`px-3 py-1 rounded-full text-xs font-bold ${light.status === 'green' ? 'bg-green-500/20 text-green-400' :
                          light.status === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }`}
                      >
                        {light.status.toUpperCase()}
                      </motion.div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Vehicles/Hour</p>
                    <p className={`text-xl font-bold ${colors.text}`}>{module.featureData.vehicleCount}</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Avg Speed</p>
                    <p className={`text-xl font-bold ${colors.text}`}>{module.featureData.avgSpeed} km/h</p>
                  </div>
                </div>
              </div>
            )}

            {/* Smart Lighting Features */}
            {module.title === 'Smart Lighting' && module.featureData.brightness !== undefined && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Sun className={`w-5 h-5 ${colors.text}`} />
                    <h3 className="font-bold text-lg">Brightness Control</h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Auto Mode</span>
                    <Switch checked={module.featureData.autoMode} />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Current Brightness</span>
                      <span className={`text-lg font-bold ${colors.text}`}>{module.featureData.brightness}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${module.featureData.brightness}%` }}
                        className={`h-full bg-gradient-to-r from-purple-500 to-purple-300`}
                        style={{ filter: 'drop-shadow(0 0 8px rgb(168, 85, 247))' }}
                      />
                    </div>
                  </div>
                  <div className="glass p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Moon className="w-4 h-4 text-green-400" />
                        <span className="text-sm">Energy Saved Today</span>
                      </div>
                      <span className="text-xl font-bold text-green-400">{module.featureData.energySaved}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Energy Grid Features */}
            {module.title === 'Energy Grid' && module.featureData.solarPower !== undefined && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Battery className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="font-bold text-lg">Power Distribution</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass p-3 rounded-lg border border-yellow-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Sun className="w-4 h-4 text-yellow-400" />
                      <p className="text-xs text-muted-foreground">Solar</p>
                    </div>
                    <p className="text-xl font-bold text-yellow-400">{module.featureData.solarPower} kW</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-cyan-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Wind className="w-4 h-4 text-cyan-400" />
                      <p className="text-xs text-muted-foreground">Wind</p>
                    </div>
                    <p className="text-xl font-bold text-cyan-400">{module.featureData.windPower} kW</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-blue-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-blue-400" />
                      <p className="text-xs text-muted-foreground">Grid</p>
                    </div>
                    <p className="text-xl font-bold text-blue-400">{module.featureData.gridPower} kW</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-green-500/30">
                    <div className="flex items-center gap-2 mb-1">
                      <Battery className="w-4 h-4 text-green-400" />
                      <p className="text-xs text-muted-foreground">Battery</p>
                    </div>
                    <p className="text-xl font-bold text-green-400">{module.featureData.batteryLevel}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Water System Features */}
            {module.title === 'Water System' && module.featureData.flowRate !== undefined && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="font-bold text-lg">Water Monitoring</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Flow Rate</p>
                    <p className={`text-xl font-bold ${colors.text}`}>{module.featureData.flowRate} L/min</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Pressure</p>
                    <p className={`text-xl font-bold ${colors.text}`}>{module.featureData.pressure} PSI</p>
                  </div>
                  <div className="glass p-3 rounded-lg border border-green-500/30">
                    <p className="text-xs text-muted-foreground mb-1">Quality</p>
                    <p className="text-xl font-bold text-green-400">{module.featureData.quality}%</p>
                  </div>
                  <div className={`glass p-3 rounded-lg border ${module.featureData.leaksDetected > 0 ? 'border-red-500/30' : 'border-green-500/30'}`}>
                    <p className="text-xs text-muted-foreground mb-1">Leaks</p>
                    <p className={`text-xl font-bold ${module.featureData.leaksDetected > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {module.featureData.leaksDetected}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Pollution Monitor Features */}
            {module.title === 'Pollution Monitor' && module.featureData.aqi !== undefined && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Wind className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="font-bold text-lg">Air Quality Index</h3>
                </div>
                <div className="glass p-4 rounded-lg mb-3 border border-yellow-500/30">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Current AQI</span>
                    <span className="text-3xl font-bold text-yellow-400">{module.featureData.aqi}</span>
                  </div>
                  <p className="text-xs text-yellow-400 mt-1">Moderate - Sensitive groups should limit outdoor activity</p>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">PM2.5</p>
                    <p className="text-lg font-bold text-orange-400">{module.featureData.pm25} μg/m³</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">CO₂</p>
                    <p className="text-lg font-bold text-blue-400">{module.featureData.co2} ppm</p>
                  </div>
                  <div className="glass p-3 rounded-lg">
                    <p className="text-xs text-muted-foreground mb-1">Temp</p>
                    <p className="text-lg font-bold text-green-400">{module.featureData.temperature}°C</p>
                  </div>
                </div>
              </div>
            )}

            {/* Emergency Alerts Features */}
            {module.title === 'Emergency Alerts' && module.featureData.activeAlerts && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Bell className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="font-bold text-lg">Active Alerts</h3>
                </div>
                <div className="space-y-3">
                  {module.featureData.activeAlerts.map((alert) => (
                    <div key={alert.id} className={`glass p-4 rounded-lg border ${alert.severity === 'high' ? 'border-red-500/30' :
                      alert.severity === 'medium' ? 'border-yellow-500/30' :
                        'border-blue-500/30'
                      }`}>
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <AlertCircle className={`w-4 h-4 ${alert.severity === 'high' ? 'text-red-400' :
                            alert.severity === 'medium' ? 'text-yellow-400' :
                              'text-blue-400'
                            }`} />
                          <span className="font-bold text-sm">{alert.type}</span>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${alert.severity === 'high' ? 'bg-red-500/20 text-red-400' :
                          alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-blue-500/20 text-blue-400'
                          }`}>
                          {alert.severity.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{alert.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* IoT Sensors Features */}
            {module.title === 'IoT Sensors' && module.featureData.sensorReadings && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Activity className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="font-bold text-lg">Live Sensor Data</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {module.featureData.sensorReadings.map((sensor) => (
                    <div key={sensor.id} className="glass p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">{sensor.type}</p>
                      <p className={`text-xl font-bold ${colors.text}`}>
                        {sensor.value} {sensor.unit}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{sensor.id}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Communication Features */}
            {module.title === 'Communication' && module.featureData.bandwidth !== undefined && (
              <div className={`p-6 rounded-xl ${colors.bg} border ${colors.border}`}>
                <div className="flex items-center gap-2 mb-4">
                  <Wifi className={`w-5 h-5 ${colors.text}`} />
                  <h3 className="font-bold text-lg">Network Statistics</h3>
                </div>
                <div className="space-y-3">
                  <div className="glass p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Bandwidth Usage</span>
                      <span className={`text-2xl font-bold ${colors.text}`}>{module.featureData.bandwidth} Gbps</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(module.featureData.bandwidth / 10) * 100}%` }}
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
                        style={{ filter: 'drop-shadow(0 0 8px rgb(59, 130, 246))' }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="glass p-3 rounded-lg border border-green-500/30">
                      <p className="text-xs text-muted-foreground mb-1">Latency</p>
                      <p className="text-xl font-bold text-green-400">{module.featureData.latency} ms</p>
                    </div>
                    <div className="glass p-3 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Devices</p>
                      <p className={`text-xl font-bold ${colors.text}`}>{module.featureData.connectedDevices.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            className={`flex-1 border ${colors.border} hover:${colors.bg}`}
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className={`flex-1 ${colors.bg} border ${colors.border} hover:opacity-80`}
            onClick={() => setShowDiagnostics(true)}
          >
            <span className={colors.text}>Run Diagnostics</span>
          </Button>
        </div>
      </motion.div>

      {/* Diagnostic Modal */}
      <AnimatePresence>
        {showDiagnostics && (
          <DiagnosticModal
            module={module}
            onClose={() => setShowDiagnostics(false)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const Modules = () => {
  const gridRef = useRef<HTMLDivElement>(null);
  const [modules, setModules] = useState(initialModules);
  const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);

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

  // Real-time simulation - Update module data every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setModules(prev => prev.map(module => {
        if (module.status !== 'Active') return module;

        const updatedFeatureData = { ...module.featureData };

        // Traffic Control - Cycle traffic lights
        if (module.title === 'Traffic Control' && updatedFeatureData.trafficLights) {
          updatedFeatureData.trafficLights = updatedFeatureData.trafficLights.map(light => {
            const statuses: ('red' | 'yellow' | 'green')[] = ['red', 'yellow', 'green'];
            const currentIndex = statuses.indexOf(light.status);
            const nextStatus = statuses[(currentIndex + 1) % statuses.length];
            return { ...light, status: nextStatus };
          });
          updatedFeatureData.vehicleCount = Math.floor(1200 + Math.random() * 100);
          updatedFeatureData.avgSpeed = Math.floor(38 + Math.random() * 10);
        }

        // Smart Lighting - Adjust brightness based on time simulation
        if (module.title === 'Smart Lighting' && updatedFeatureData.brightness !== undefined) {
          const change = Math.floor(Math.random() * 10) - 5;
          updatedFeatureData.brightness = Math.max(50, Math.min(100, updatedFeatureData.brightness + change));
          updatedFeatureData.energySaved = Math.floor(30 + Math.random() * 10);
        }

        // Energy Grid - Fluctuate power sources
        if (module.title === 'Energy Grid' && updatedFeatureData.solarPower !== undefined) {
          updatedFeatureData.solarPower = Math.floor(140 + Math.random() * 20);
          updatedFeatureData.windPower = Math.floor(80 + Math.random() * 20);
          updatedFeatureData.gridPower = Math.floor(220 + Math.random() * 30);
          updatedFeatureData.batteryLevel = Math.max(70, Math.min(85, updatedFeatureData.batteryLevel! + (Math.random() > 0.5 ? 1 : -1)));
        }

        // Water System - Vary flow and pressure
        if (module.title === 'Water System' && updatedFeatureData.flowRate !== undefined) {
          updatedFeatureData.flowRate = Math.floor(1200 + Math.random() * 100);
          updatedFeatureData.pressure = Math.floor(60 + Math.random() * 10);
        }

        // Pollution Monitor - Update air quality
        if (module.title === 'Pollution Monitor' && updatedFeatureData.aqi !== undefined) {
          updatedFeatureData.aqi = Math.floor(80 + Math.random() * 15);
          updatedFeatureData.pm25 = Math.floor(40 + Math.random() * 10);
          updatedFeatureData.co2 = Math.floor(400 + Math.random() * 20);
          updatedFeatureData.temperature = Math.floor(22 + Math.random() * 4);
        }

        // IoT Sensors - Update sensor readings
        if (module.title === 'IoT Sensors' && updatedFeatureData.sensorReadings) {
          updatedFeatureData.sensorReadings = updatedFeatureData.sensorReadings.map(sensor => ({
            ...sensor,
            value: sensor.type === 'Temperature' ? Math.floor(22 + Math.random() * 4) :
              sensor.type === 'Humidity' ? Math.floor(58 + Math.random() * 8) :
                sensor.type === 'Noise Level' ? Math.floor(50 + Math.random() * 15) :
                  parseFloat((0.2 + Math.random() * 0.3).toFixed(1))
          }));
        }

        // Communication - Update network stats
        if (module.title === 'Communication' && updatedFeatureData.bandwidth !== undefined) {
          updatedFeatureData.bandwidth = parseFloat((8 + Math.random() * 1.5).toFixed(1));
          updatedFeatureData.latency = Math.floor(10 + Math.random() * 5);
          updatedFeatureData.connectedDevices = Math.floor(12400 + Math.random() * 100);
        }

        return {
          ...module,
          featureData: updatedFeatureData
        };
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const handleToggleModule = (index: number) => {
    setModules(prev => prev.map((m, i) => {
      if (i === index) {
        return {
          ...m,
          status: m.status === 'Active' ? 'Inactive' : 'Active',
        };
      }
      return m;
    }));
  };

  const handleEfficiencyChange = (index: number, value: number) => {
    setModules(prev => prev.map((m, i) => {
      if (i === index) {
        return {
          ...m,
          stats: { ...m.stats, efficiency: value },
        };
      }
      return m;
    }));
  };

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
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg glass border border-red-500/30">
              <Power className="w-5 h-5 text-red-400" />
              <span className="text-red-400 font-bold">{modules.filter(m => m.status === 'Inactive').length} Inactive</span>
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
                        : module.status === 'Warning'
                          ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                        }`}
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`w-1.5 h-1.5 rounded-full ${module.status === 'Active'
                          ? 'bg-green-400'
                          : module.status === 'Warning'
                            ? 'bg-yellow-400'
                            : 'bg-red-400'
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
                    onClick={() => setSelectedModule(module)}
                  >
                    <span className={colors.text}>MANAGE MODULE</span>
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Module Detail Modal */}
      <AnimatePresence>
        {selectedModule && (
          <ModuleDetailModal
            module={selectedModule}
            onClose={() => setSelectedModule(null)}
            onToggle={() => {
              const index = modules.findIndex(m => m.title === selectedModule.title);
              handleToggleModule(index);
              setSelectedModule({
                ...selectedModule,
                status: selectedModule.status === 'Active' ? 'Inactive' : 'Active',
              });
            }}
            onEfficiencyChange={(value) => {
              const index = modules.findIndex(m => m.title === selectedModule.title);
              handleEfficiencyChange(index, value);
              setSelectedModule({
                ...selectedModule,
                stats: { ...selectedModule.stats, efficiency: value },
              });
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Modules;
