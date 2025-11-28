import { motion } from 'framer-motion';
import NeonCrystalCity from '@/components/ui/neon-crystal-city';
import { Button } from '@/components/ui/button';
import { ArrowRight, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import gsap from 'gsap';

const Landing = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);

  useEffect(() => {
    // Simple fade in animations
    gsap.from('.hero-title', {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
    });

    gsap.from('.hero-subtitle', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.3,
      ease: 'power3.out',
    });

    gsap.from('.hero-cta', {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay: 0.6,
      ease: 'power3.out',
    });
  }, []);

  const handleInteract = () => {
    if (!started) setStarted(true);
  };

  return (
    <div
      className="relative min-h-screen overflow-hidden"
      onMouseMove={handleInteract}
      onTouchStart={handleInteract}
    >
      {/* WebGL Background */}
      <div className="fixed inset-0 z-0">
        <NeonCrystalCity
          cameraSpeed={3}
          tileSize={2}
          unionK={0.5}
          maxSteps={100}
          maxDist={100}
          surfDist={0.001}
        />
      </div>

      {!started && (
        <motion.div
          className="fixed inset-0 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-muted-foreground"
            >
              Move your pointer to begin
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-8 max-w-5xl mx-auto">
            {/* Icon */}
            <motion.div
              className="hero-icon inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-2xl glass-strong flex items-center justify-center shadow-soft">
                  <Zap className="w-10 h-10 text-blue-400" />
                </div>
              </div>
            </motion.div>

            {/* Title */}
            <div className="hero-title">
              <h1 className="text-6xl md:text-8xl font-bold mb-4 tracking-tight">
                <span className="gradient-text inline-block">
                  Smart City Control
                </span>
              </h1>

              <div className="hero-subtitle text-2xl md:text-3xl font-light text-muted-foreground">
                Real-time Infrastructure Management
              </div>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Monitor and optimize your city's infrastructure with advanced analytics
              and real-time insights.
            </p>

            {/* CTA Button */}
            <div className="hero-cta flex items-center justify-center gap-4">
              <Button
                onClick={() => navigate('/dashboard')}
                size="lg"
                className="group px-8 py-6 text-lg font-semibold hover-lift shadow-soft"
              >
                Enter Dashboard
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Feature tags */}
            {started && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="flex flex-wrap items-center justify-center gap-3 text-sm"
              >
                {['Traffic', 'Energy', 'IoT', 'Environment', 'Security'].map((tag) => (
                  <div
                    key={tag}
                    className="px-4 py-2 rounded-full glass border border-blue-500/30 text-blue-400"
                  >
                    {tag}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Ambient glow */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
};

export default Landing;
