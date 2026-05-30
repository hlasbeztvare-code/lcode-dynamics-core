'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import Image from 'next/image';

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

export default function ContactForm({ t }: { t: any }) {
  // Lead Form States
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle Form Submission
  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          company: formCompany,
          message: formMessage,
        })
      });

      if (!res.ok) {
        throw new Error('Something went wrong');
      }

      setFormStatus('success');
      setFormName('');
      setFormEmail('');
      setFormCompany('');
      setFormMessage('');
      
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
      
    } catch (error) {
      console.error(error);
      setFormStatus('error');
      setErrorMessage(t.formError || 'Error sending message. Please try again.');
    }
  };

  return (
    <>
      <section id="kontakt" className="max-w-4xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/[0.04]">
        <div className="mb-12 text-center overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3"
          >
            {t.contactTag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white mb-6"
          >
            {renderRedWord(t.contactTitle)}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-white font-bold leading-relaxed max-w-xl mx-auto"
          >
            {t.contactDesc}
          </motion.p>
        </div>

        {/* Lead Form */}
        <motion.form 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          onSubmit={handleSubmitLead} 
          className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-3xl flex flex-col gap-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-mono text-[9px] text-white tracking-widest uppercase">{t.formLabelName}</label>
              <input
                id="name"
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder={t.formPlaceholderName}
                required
                disabled={formStatus === 'loading'}
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E30613] focus:bg-white/20 transition-all disabled:opacity-40 shadow-inner"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-[9px] text-white tracking-widest uppercase">{t.formLabelEmail}</label>
              <input
                id="email"
                type="email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                placeholder={t.formPlaceholderEmail}
                required
                disabled={formStatus === 'loading'}
                className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E30613] focus:bg-white/20 transition-all disabled:opacity-40 shadow-inner"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="company" className="font-mono text-[9px] text-white tracking-widest uppercase">{t.formLabelCompany}</label>
            <input
              id="company"
              type="text"
              value={formCompany}
              onChange={(e) => setFormCompany(e.target.value)}
              placeholder={t.formPlaceholderCompany}
              disabled={formStatus === 'loading'}
              className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E30613] focus:bg-white/20 transition-all disabled:opacity-40 shadow-inner"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="message" className="font-mono text-[9px] text-white tracking-widest uppercase">{t.formLabelMessage}</label>
            <textarea
              id="message"
              rows={4}
              value={formMessage}
              onChange={(e) => setFormMessage(e.target.value)}
              placeholder={t.formPlaceholderMessage}
              disabled={formStatus === 'loading'}
              className="w-full px-5 py-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-[#E30613] focus:bg-white/20 transition-all resize-none disabled:opacity-40 shadow-inner"
            />
          </div>

          {/* Feedback Messages */}
          <AnimatePresence>
            {formStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold"
              >
                {errorMessage}
              </motion.div>
            )}

            {formStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-xs font-bold flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                {t.formSuccess}
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={formStatus === 'loading'}
            className="w-full py-4 rounded-full bg-black text-white hover:bg-[#E30613] font-mono text-[10px] tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-gray-200 disabled:text-white"
          >
            {formStatus === 'loading' ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                {t.formBtnSubmitting}
              </>
            ) : (
              <>
                <Send size={10} />
                {t.formBtnSubmit}
              </>
            )}
          </button>
        </motion.form>
      </section>

    </>
  );
}
