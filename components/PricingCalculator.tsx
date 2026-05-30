'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const renderRedWord = (text: string) => {
  if (!text) return null;
  const words = text.split(' ');
  if (words.length <= 1) return <span className="text-[#E30613]">{text}</span>;
  const lastWord = words.pop();
  return (
    <>
      {words.join(' ')} <span className="text-[#E30613]">{lastWord}</span>
    </>
  );
};

export default function PricingCalculator({ t, isEn }: { t: any, isEn: boolean }) {
  // Pricing Calculator States (Modules)
  const [modules, setModules] = useState({
    customFixes: false,
    configurator: false,
    shoptetBypass: false,
    headlessCore: false,
    seoAudit: false,
    maintenance: false,
  });

  // Dynamic Price Calculation
  const calculatePrice = () => {
    let base = 0;
    if (modules.customFixes) base += isEn ? 2500 : 15000;
    if (modules.configurator) base += isEn ? 4500 : 28000;
    if (modules.shoptetBypass) base += isEn ? 3800 : 22000;
    if (modules.headlessCore) base += isEn ? 12000 : 75000;
    if (modules.seoAudit) base += isEn ? 1500 : 9000;
    if (modules.maintenance) base += isEn ? 1200 : 8000;
    return base;
  };

  const [targetPrice, setTargetPrice] = useState(0);
  const [displayedPrice, setDisplayedPrice] = useState(0);

  // Sync target price when modules state updates
  useEffect(() => {
    setTargetPrice(calculatePrice());
  }, [modules, isEn]);

  // Animate displayed price smoothly (Easing out counter)
  useEffect(() => {
    let start = displayedPrice;
    const end = targetPrice;
    if (start === end) return;

    const duration = 800;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress); // Ease out quad
      const current = Math.floor(start + (end - start) * easeProgress);
      setDisplayedPrice(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [targetPrice]);

  return (
    <section id="kalkulacka" className="w-full relative z-10 border-t border-white/[0.04] bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="mb-12">
          <motion.span 
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3"
          >
            {t.calcTag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="text-3xl md:text-5xl font-display font-black uppercase tracking-tight mb-6"
          >
            {renderRedWord(t.calcTitle)}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-white font-bold text-sm leading-relaxed"
          >
            {t.calcDesc}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
        >
          {/* KARTA 1 */}
          <div 
            onClick={() => setModules({...modules, customFixes: !modules.customFixes})} 
            className={`p-5 border cursor-pointer select-none transition-all duration-300 rounded-xl ${modules.customFixes ? 'border-[#E30613] bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(227,6,19,0.2)]' : 'border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/30'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-wide">{t.calcMod1Name}</span>
              <span className="text-xs text-[#E30613] font-mono">+{isEn ? '2,500' : '15 000'} {t.calcCurrency}</span>
            </div>
            <p className="text-xs text-neutral-500 leading-normal font-bold">
              {t.calcMod1Desc}
            </p>
          </div>

          {/* KARTA 2 */}
          <div 
            onClick={() => setModules({...modules, configurator: !modules.configurator})} 
            className={`p-5 border cursor-pointer select-none transition-all duration-300 rounded-xl ${modules.configurator ? 'border-[#E30613] bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(227,6,19,0.2)]' : 'border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/30'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-wide">{t.calcMod2Name}</span>
              <span className="text-xs text-[#E30613] font-mono">+{isEn ? '4,500' : '28 000'} {t.calcCurrency}</span>
            </div>
            <p className="text-xs text-neutral-500 leading-normal font-bold">
              {t.calcMod2Desc}
            </p>
          </div>

          {/* KARTA 3 */}
          <div 
            onClick={() => setModules({...modules, shoptetBypass: !modules.shoptetBypass})} 
            className={`p-5 border cursor-pointer select-none transition-all duration-300 rounded-xl ${modules.shoptetBypass ? 'border-[#E30613] bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(227,6,19,0.2)]' : 'border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/30'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-wide">{t.calcMod3Name}</span>
              <span className="text-xs text-[#E30613] font-mono">+{isEn ? '3,800' : '22 000'} {t.calcCurrency}</span>
            </div>
            <p className="text-xs text-neutral-500 leading-normal font-bold">
              {t.calcMod3Desc}
            </p>
          </div>

          {/* KARTA 4 */}
          <div 
            onClick={() => setModules({...modules, headlessCore: !modules.headlessCore})} 
            className={`p-5 border cursor-pointer select-none transition-all duration-300 rounded-xl ${modules.headlessCore ? 'border-[#E30613] bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(227,6,19,0.2)]' : 'border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/30'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-wide">{t.calcMod4Name}</span>
              <span className="text-xs text-[#E30613] font-mono">+{isEn ? '12,000' : '75 000'} {t.calcCurrency}</span>
            </div>
            <p className="text-xs text-neutral-500 leading-normal font-bold">
              {t.calcMod4Desc}
            </p>
          </div>

          {/* KARTA 5 */}
          <div 
            onClick={() => setModules({...modules, seoAudit: !modules.seoAudit})} 
            className={`p-5 border cursor-pointer select-none transition-all duration-300 rounded-xl ${modules.seoAudit ? 'border-[#E30613] bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(227,6,19,0.2)]' : 'border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/30'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-wide">{t.calcMod5Name}</span>
              <span className="text-xs text-[#E30613] font-mono">+{isEn ? '1,500' : '9 000'} {t.calcCurrency}</span>
            </div>
            <p className="text-xs text-neutral-500 leading-normal font-bold">
              {t.calcMod5Desc}
            </p>
          </div>

          {/* KARTA 6 */}
          <div 
            onClick={() => setModules({...modules, maintenance: !modules.maintenance})} 
            className={`p-5 border cursor-pointer select-none transition-all duration-300 rounded-xl ${modules.maintenance ? 'border-[#E30613] bg-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(227,6,19,0.2)]' : 'border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:border-white/30'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold uppercase tracking-wide">{t.calcMod6Name}</span>
              <span className="text-xs text-[#E30613] font-mono">+{isEn ? '1,200' : '8 000'} {t.calcCurrency}/{isEn ? 'mo' : 'měs'}</span>
            </div>
            <p className="text-xs text-neutral-500 leading-normal font-bold">
              {t.calcMod6Desc}
            </p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
        >
          <div>
            <span className="text-xs text-white font-bold uppercase tracking-wider block mb-1">
              {t.calcBudgetLabel}
            </span>
            <span className="text-4xl font-black tracking-tight text-white">
              {displayedPrice.toLocaleString(isEn ? 'en-US' : 'cs-CZ')} {t.calcCurrency}
            </span>
          </div>
          <div className="bg-[#E30613]/10 border border-[#E30613] text-[#E30613] text-[10px] font-bold tracking-widest uppercase px-4 py-2">
            {t.calcShieldTitle}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
