/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Thoughts from './pages/Thoughts';
import Music from './pages/Music';
import Moments from './pages/Moments';
import Projects from './pages/Projects';
import Admin from './pages/Admin';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <Home />
            </PageWrapper>
          }
        />
        <Route
          path="/thoughts"
          element={
            <PageWrapper>
              <Thoughts />
            </PageWrapper>
          }
        />
        <Route
          path="/music"
          element={
            <PageWrapper>
              <Music />
            </PageWrapper>
          }
        />
        <Route
          path="/moments"
          element={
            <PageWrapper>
              <Moments />
            </PageWrapper>
          }
        />
        <Route
          
          path="/projects"
          element={
            <PageWrapper>
              <Projects />
            </PageWrapper>
          }
        />
        <Route
          path="/admin"
          element={
            <PageWrapper>
              <Admin />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-bg pixel-grid">
        <Navbar />
        <main className="pb-24 md:pb-0 md:pl-20">
          <AnimatedRoutes />
        </main>
        
        {/* Decorative Pixel Elements */}
        <div className="fixed top-4 right-4 font-mono text-[10px] text-text-secondary/20 pointer-events-none hidden md:block">
          SYS_ARCH_001 // MOEZ.LOVE
        </div>
        <div className="fixed bottom-4 right-4 font-mono text-[10px] text-text-secondary/20 pointer-events-none hidden md:block">
          EST_2024 // VAULT_001
        </div>
      </div>
    </Router>
  );
}
