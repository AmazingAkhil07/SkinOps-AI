'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BootSequenceLoader from '@/components/shell/BootSequenceLoader';
import CinematicLoadingScreen from '@/components/shell/CinematicLoadingScreen';
import RootShell from '@/components/shell/RootShell';
import HUDPanel from '@/components/hud/HUDPanel';
import DiagnosticMeter from '@/components/hud/DiagnosticMeter';
import { staggerContainerVariants, staggerItemVariants } from '@/lib/motion/animations';
import { hudTheme } from '@/lib/theme/hudTheme';

export default function Home() {
  const [bootComplete, setBootComplete] = useState(false);
  const [showLoadingScreen, setShowLoadingScreen] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [appReady, setAppReady] = useState(false);

  const handleBootComplete = () => {
    setBootComplete(true);
    setShowLoadingScreen(true);
  };

  // Simulate analysis progress
  React.useEffect(() => {
    if (showLoadingScreen && loadingProgress < 100) {
      const timer = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => {
              setShowLoadingScreen(false);
              setAppReady(true);
            }, 800);
            return 100;
          }
          return prev + 5;
        });
      }, 100);
      return () => clearInterval(timer);
    }
  }, [showLoadingScreen, loadingProgress]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!bootComplete && (
          <BootSequenceLoader key="boot" onComplete={handleBootComplete} duration={3} />
        )}

        {showLoadingScreen && (
          <CinematicLoadingScreen 
            key="loading"
            status={loadingProgress < 50 ? "DECRYPTING BIO-METRICS" : "ANALYZING TISSUE DENSITY"}
            progress={loadingProgress}
            subtitle="Optimization sequence active..."
          />
        )}
      </AnimatePresence>

      {appReady && (
        <RootShell>
          <motion.div 
            className="min-h-screen p-8"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main Title */}
            <motion.div className="mb-12" variants={staggerItemVariants}>
              <h1 
                className="text-5xl font-bold tracking-widest mb-2"
                style={{ color: hudTheme.colors.accent.primary }}
              >
                SKINOPS
              </h1>
              <p 
                className="text-sm tracking-widest uppercase"
                style={{ color: hudTheme.colors.text.secondary }}
              >
                Men's Skin Performance Decision Engine • Clinical Decision Support
              </p>
            </motion.div>

            {/* System Status Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={staggerItemVariants}>
                <HUDPanel 
                  title="System Status"
                  subtitle="v0.1.0"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between text-xs">
                      <span style={{ color: hudTheme.colors.text.secondary }}>
                        Engine Status
                      </span>
                      <span style={{ color: hudTheme.colors.status.success }}>
                        OPERATIONAL
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: hudTheme.colors.text.secondary }}>
                        API Connection
                      </span>
                      <span style={{ color: hudTheme.colors.status.success }}>
                        CONNECTED
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span style={{ color: hudTheme.colors.text.secondary }}>
                        Clinical Protocols
                      </span>
                      <span style={{ color: hudTheme.colors.status.success }}>
                        VERIFIED
                      </span>
                    </div>
                  </div>
                </HUDPanel>
              </motion.div>

              <motion.div variants={staggerItemVariants}>
                <HUDPanel 
                  title="Assessment Engine"
                  subtitle="Phase 2"
                >
                  <div className="space-y-3 text-xs">
                    <p style={{ color: hudTheme.colors.text.secondary }}>
                      Cinematic Diagnostic Shell
                    </p>
                    <p style={{ color: hudTheme.colors.text.muted }}>
                      Boot sequence, loading screens, and HUD framework initialized.
                    </p>
                    <p style={{ color: hudTheme.colors.text.muted }}>
                      Ready for Phase 3: Advanced animations
                    </p>
                  </div>
                </HUDPanel>
              </motion.div>

              <motion.div variants={staggerItemVariants}>
                <HUDPanel 
                  title="CDS Compliance"
                  variant="success"
                  subtitle="Verified"
                >
                  <div className="space-y-2 text-xs">
                    <div>
                      ✓ Non-diagnostic system
                    </div>
                    <div>
                      ✓ HCP support tool
                    </div>
                    <div>
                      ✓ Disclaimers active
                    </div>
                    <div>
                      ✓ Override capable
                    </div>
                  </div>
                </HUDPanel>
              </motion.div>
            </motion.div>

            {/* Demo Meters Panel */}
            <motion.div variants={staggerItemVariants}>
              <HUDPanel 
                title="Diagnostic Meter Examples"
                subtitle="Demo"
              >
                <div className="space-y-4">
                  <DiagnosticMeter 
                    label="System Health"
                    value={92}
                    variant="success"
                  />
                  <DiagnosticMeter 
                    label="Assessment Progress"
                    value={65}
                    variant="primary"
                  />
                  <DiagnosticMeter 
                    label="Data Confidence"
                    value={78}
                    variant="success"
                  />
                  <DiagnosticMeter 
                    label="Warning Level"
                    value={45}
                    variant="warning"
                  />
                </div>
              </HUDPanel>
            </motion.div>

            {/* Feature List */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8"
              variants={staggerContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={staggerItemVariants}>
                <HUDPanel title="Phase 2 Deliverables">
                  <ul className="space-y-2 text-xs">
                    <li>✓ Boot Sequence Loader</li>
                    <li>✓ Cinematic Loading Screen</li>
                    <li>✓ HUD Panel System</li>
                    <li>✓ Diagnostic Meters</li>
                    <li>✓ Motion Framework</li>
                    <li>✓ Theme System (Steel/Graphite)</li>
                    <li>✓ Root Shell Layout</li>
                  </ul>
                </HUDPanel>
              </motion.div>

              <motion.div variants={staggerItemVariants}>
                <HUDPanel title="Next: Phase 3">
                  <div className="text-xs space-y-2">
                    <p style={{ color: hudTheme.colors.text.secondary }}>
                      Advanced Animation Layer
                    </p>
                    <ul className="space-y-1" style={{ color: hudTheme.colors.text.muted }}>
                      <li>→ Rotating scan rings</li>
                      <li>→ Pulse bars</li>
                      <li>→ Sweep beams</li>
                      <li>→ Diagnostic grid overlays</li>
                      <li>→ HUD flicker effects</li>
                    </ul>
                  </div>
                </HUDPanel>
              </motion.div>
            </motion.div>

            {/* Footer */}
            <motion.div
              className="mt-12 pt-8 border-t text-center text-xs tracking-widest uppercase"
              style={{ color: hudTheme.colors.text.muted, borderColor: hudTheme.colors.border }}
              variants={staggerItemVariants}
            >
              <p>
                Clinical Decision Support • Non-Diagnostic • Healthcare Professional Tool
              </p>
              <p className="mt-2">
                Phase 2: Cinematic UX Shell - Complete
              </p>
            </motion.div>
          </motion.div>
        </RootShell>
      )}
    </>
  );
}
