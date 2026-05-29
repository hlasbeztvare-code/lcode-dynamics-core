'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { LiquidBackground } from '@/components/LiquidBackground';
import { QuantumSingularity } from '@/components/QuantumSingularity';

/* ─── Fade-in-up variant ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] } }),
};

/* ─── Animated stat counter ─── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let start = 0;
      const step = target / 60;
      const tick = () => {
        start += step;
        if (start >= target) { setCount(target); return; }
        setCount(Math.floor(start));
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Nav ─── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 clamp(1.5rem, 5vw, 4rem)',
        height: '72px',
        transition: 'background 0.4s ease, border-bottom 0.4s ease',
        backdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(180%)' : 'none',
        background: scrolled ? 'rgba(8,8,8,0.9)' : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: 32, height: 32, background: '#E30613',
          clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)',
        }} />
        <span className="font-display" style={{ fontSize: '1.4rem', letterSpacing: '0.08em', color: '#fff' }}>
          L‑CODE
        </span>
        <span style={{ fontSize: '13px', color: '#E30613', letterSpacing: '0.25em', alignSelf: 'flex-end', marginBottom: '4px' }}>
          DYNAMICS
        </span>
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {['Services', 'Process', 'About', 'Contact'].map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} style={{
            color: '#888', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            transition: 'color 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >{l}</a>
        ))}
        <a href="#contact" className="btn-primary" style={{ padding: '0.6rem 1.4rem', fontSize: '0.8rem' }}>
          Start Project
        </a>
      </div>
    </motion.nav>
  );
}

/* ─── Marquee strip ─── */
const TECH = ['TypeScript', 'React', 'Next.js', 'Node.js', 'PostgreSQL', 'Prisma', 'Docker', 'Kubernetes', 'AWS', 'Terraform', 'GraphQL', 'Redis', 'Rust', 'Go', 'Python'];
function Marquee() {
  const items = [...TECH, ...TECH];
  return (
    <div style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '1rem 0', background: '#0a0a0a' }}>
      <div className="marquee-track">
        {items.map((t, i) => (
          <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '1.5rem', padding: '0 2rem', whiteSpace: 'nowrap' }}>
            <span style={{ color: '#E30613', fontSize: '13px' }}>◆</span>
            <span style={{ color: '#555', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Service Card ─── */
function ServiceCard({ icon, title, desc, span = 4, tall = false }: { icon: string; title: string; desc: string; span?: number; tall?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        gridColumn: `span ${span}`,
        padding: 'clamp(1.5rem, 3vw, 2.5rem)',
        minHeight: tall ? '320px' : '220px',
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        position: 'relative', overflow: 'hidden', cursor: 'default',
        background: hovered ? 'rgba(227,6,19,0.06)' : 'rgba(255,255,255,0.02)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        transition: 'background 0.4s ease',
      }}
    >
      {/* Red corner accent on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scaleX: hovered ? 1 : 0 }}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#E30613', transformOrigin: 'left' }}
        transition={{ duration: 0.3 }}
      />
      <span style={{ fontSize: '2.5rem' }}>{icon}</span>
      <div>
        <h3 style={{ fontSize: 'clamp(1.1rem, 2vw, 1.35rem)', fontWeight: 700, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>{title}</h3>
        <p style={{ color: '#666', lineHeight: 1.7, fontSize: '0.9rem' }}>{desc}</p>
      </div>
    </motion.div>
  );
}

/* ─── MAIN PAGE ─── */
export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <main style={{ background: 'var(--bg)', color: 'var(--text)', minHeight: '100vh' }}>
      <Nav />

      {/* ══════════════ HERO ══════════════ */}
      <section
        ref={heroRef}
        className="hero-grid"
        style={{ position: 'relative', height: '100svh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}
      >
        {/* Liquid animated background */}
        <LiquidBackground isDarkMode />

        {/* Red radial glow */}
        <div style={{
          position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(227,6,19,0.12) 0%, transparent 65%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        <div style={{ position: 'relative', zIndex: 10, width: '100%', padding: '0 clamp(1.5rem, 5vw, 6rem)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <motion.div
            style={{ flex: 1, maxWidth: '800px', y: yText, opacity }}
          >
            {/* Eyebrow label */}
            <motion.div
              variants={fadeUp} initial="hidden" animate="show" custom={0.2}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}
            >
              <div style={{ width: 32, height: 1, background: '#E30613' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.3em', color: '#E30613', textTransform: 'uppercase' }}>
                Premium Software Studio · Praha
              </span>
            </motion.div>

            {/* Giant headline */}
            <div className="font-display" style={{ lineHeight: 0.9, marginBottom: '2.5rem' }}>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0.35}
                style={{
                  fontSize: 'clamp(5.5rem, 15vw, 15rem)',
                  color: '#fff',
                  display: 'block',
                }}
              >
                BEYOND
              </motion.div>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0.5}
                style={{
                  fontSize: 'clamp(5.5rem, 15vw, 15rem)',
                  color: 'transparent',
                  WebkitTextStroke: '2px rgba(255,255,255,0.2)',
                  display: 'block',
                }}
              >
                ORDINARY
              </motion.div>
              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0.65}
                style={{
                  fontSize: 'clamp(5.5rem, 15vw, 15rem)',
                  color: '#E30613',
                  display: 'block',
                }}
              >
                CODE.
              </motion.div>
            </div>

            {/* Sub + CTA row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '2rem' }}>
              <motion.p
                variants={fadeUp} initial="hidden" animate="show" custom={0.8}
                style={{ maxWidth: '420px', fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: '#888', lineHeight: 1.75 }}
              >
                Tvoříme software, který pohání firmy vpřed —<br />
                s precizností, rychlostí a bez kompromisů.
              </motion.p>

              <motion.div
                variants={fadeUp} initial="hidden" animate="show" custom={0.95}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <a href="#contact" className="btn-primary">Spustit projekt →</a>
                <a href="#services" className="btn-outline">Naše služby</a>
              </motion.div>
            </div>
          </motion.div>

          <div style={{ flex: 1, height: '80vh', position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
             <QuantumSingularity text="" />
          </div>
        </div>

        {/* Stats floating badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          style={{
            position: 'absolute', bottom: '3rem', left: 'clamp(1.5rem, 5vw, 6rem)',
            display: 'flex', gap: '1.5rem', flexWrap: 'wrap', zIndex: 10,
          }}
        >
          {[
            { value: 150, suffix: '+', label: 'Projektů' },
            { value: 8, suffix: 'let', label: 'Zkušeností' },
            { value: 99, suffix: '%', label: 'Klientů doporučí' },
          ].map(s => (
            <div key={s.label} className="glass" style={{ padding: '0.9rem 1.5rem', borderRadius: '0.4rem' }}>
              <div className="font-display" style={{ fontSize: '2rem', color: '#E30613', lineHeight: 1 }}>
                <Counter target={s.value} suffix={s.suffix} />
              </div>
            <div style={{ fontSize: '13px', color: '#666', marginTop: '0.2rem', letterSpacing: '0.08em' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          style={{ position: 'absolute', bottom: '3rem', right: 'clamp(1.5rem, 5vw, 6rem)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}
        >
          <div style={{ width: 1, height: 60, background: 'linear-gradient(to bottom, transparent, #E30613)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.2em', color: '#555', writingMode: 'vertical-rl' }}>SCROLL</span>
        </motion.div>
      </section>

      {/* ══════════════ MARQUEE ══════════════ */}
      <Marquee />

      {/* ══════════════ SERVICES ══════════════ */}
      <section id="services" style={{ padding: 'clamp(4rem, 10vw, 8rem) 0', background: '#080808' }}>
        <div style={{ padding: '0 clamp(1.5rem, 5vw, 6rem)', marginBottom: '3rem' }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.3em', color: '#E30613', textTransform: 'uppercase', marginBottom: '1rem' }}
          >
            Co děláme
          </motion.p>
          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#fff', lineHeight: 0.95 }}
          >
            NAŠE<br />
            <span style={{ color: 'transparent', WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>SLUŽBY</span>
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          <ServiceCard span={7} tall icon="⚡" title="Custom Software Development" desc="Aplikace šité na míru vašemu businessu. Od architektury po deployment — bez zbytečných kompromisů." />
          <ServiceCard span={5} tall icon="🏗️" title="Škálovatelná architektura" desc="Systémy navržené pro růst. Microservices, event-driven design, cloud-native." />
          <ServiceCard span={4} icon="🎨" title="UI/UX Engineering" desc="Rozhraní, která se cítí jako prémiový produkt." />
          <ServiceCard span={4} icon="🔄" title="DevOps & CI/CD" desc="Automatizované pipeline pro rychlé a bezpečné nasazení." />
          <ServiceCard span={4} icon="🔐" title="Security & Compliance" desc="GDPR, ISO, penetrační testování. Bezpečnost jako základ." />
          <ServiceCard span={6} icon="🌐" title="API & Integrace" desc="Bezešvé propojení vašich systémů, platforem a datových zdrojů." />
          <ServiceCard span={6} icon="📊" title="Data Engineering" desc="Datové pipeline, analytika, ML pipelines. Rozhodujte se na základě dat." />
        </div>
      </section>

      {/* ══════════════ PROCESS ══════════════ */}
      <section id="process" style={{ padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)', background: '#0d0d0d' }}>
        <div className="red-line" style={{ marginBottom: '4rem' }} />
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.3em', color: '#E30613', textTransform: 'uppercase', marginBottom: '1rem' }}
        >
          Jak pracujeme
        </motion.p>
        <motion.h2
          className="font-display"
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: '#fff', marginBottom: '4rem', lineHeight: 0.95 }}
        >
          NÁSOBÍME<br />VÁŠ ÚSPĚCH
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0', borderTop: '1px solid rgba(255,255,255,0.06)', borderLeft: '1px solid rgba(255,255,255,0.06)' }}>
          {[
            { n: '01', title: 'Discovery', desc: 'Pochopíme váš byznys, vaše problémy a vaše cíle.' },
            { n: '02', title: 'Architecture', desc: 'Navrhneme architekturu, která vydrží a roste s vámi.' },
            { n: '03', title: 'Execution', desc: 'Agilní vývoj s transparentní komunikací každý krok.' },
            { n: '04', title: 'Delivery', desc: 'Nasazení, monitoring, podpora. Nikdy vás nenecháme samotné.' },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              style={{
                padding: '2.5rem 2rem',
                borderRight: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div className="font-display" style={{ fontSize: '4rem', color: 'rgba(227,6,19,0.2)', lineHeight: 1, marginBottom: '1rem' }}>{step.n}</div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#fff', marginBottom: '0.6rem', letterSpacing: '0.02em' }}>{step.title}</h3>
              <p style={{ color: '#555', fontSize: '0.9rem', lineHeight: 1.7 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════ CTA BANNER ══════════════ */}
      <section id="contact" style={{ position: 'relative', overflow: 'hidden', padding: 'clamp(4rem, 10vw, 8rem) clamp(1.5rem, 5vw, 6rem)', background: '#080808' }}>
        <div className="red-line" style={{ marginBottom: '4rem' }} />

        {/* BG text */}
        <div className="font-display" style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          fontSize: 'clamp(8rem, 20vw, 22rem)', color: 'rgba(227,6,19,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none',
        }}>
          LET'S GO
        </div>

        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.3em', color: '#E30613', textTransform: 'uppercase', marginBottom: '1.5rem' }}
          >
            Máte projekt?
          </motion.p>
          <motion.h2
            className="font-display"
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)', color: '#fff', lineHeight: 0.95, marginBottom: '2rem' }}
          >
            POJĎME TO<br />
            <span style={{ color: '#E30613' }}>VYBUDOVAT.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            style={{ color: '#666', fontSize: '1.05rem', marginBottom: '3rem', maxWidth: '500px', margin: '0 auto 3rem' }}
          >
            Každý velký produkt začíná jedním rozhovorem. Řekněte nám o svém projektu.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <a href="mailto:hello@lcodedynamics.cz" className="btn-primary" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              hello@lcodedynamics.cz
            </a>
            <a href="tel:+420000000000" className="btn-outline" style={{ fontSize: '1rem', padding: '1rem 2.5rem' }}>
              +420 000 000 000
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer style={{
        padding: '2rem clamp(1.5rem, 5vw, 6rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        background: '#050505',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: 20, height: 20, background: '#E30613', clipPath: 'polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)' }} />
          <span className="font-display" style={{ fontSize: '1rem', letterSpacing: '0.1em', color: '#fff' }}>L‑CODE DYNAMICS</span>
        </div>
        <span style={{ color: '#333', fontSize: '0.8rem' }}>© {new Date().getFullYear()} L‑Code Dynamics. All rights reserved.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {['LinkedIn', 'GitHub', 'Twitter'].map(s => (
            <a key={s} href="#" style={{ color: '#444', fontSize: '0.8rem', textDecoration: 'none', letterSpacing: '0.05em', transition: 'color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#E30613')}
              onMouseLeave={e => (e.currentTarget.style.color = '#444')}
            >{s}</a>
          ))}
        </div>
      </footer>
    </main>
  );
}
