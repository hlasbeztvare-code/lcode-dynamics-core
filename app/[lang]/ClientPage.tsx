'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingBag, 
  Cpu, 
  Check, 
  ArrowRight, 
  Lock, 
  Menu,
  X,
  Layers,
  Link as LinkIcon,
  Briefcase,
  Layers3,
  Phone,
  ArrowUpRight
} from 'lucide-react'
import dynamic from 'next/dynamic'
import ServiceCard from '@/components/ServiceCard'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import Image from 'next/image'

import HeroMonolith from '@/components/HeroMonolith'
import ManifestoSidebar from '@/components/ManifestoSidebar'
import ReviewsSection from '@/components/ReviewsSection'

const PricingCalculator = dynamic(() => import('@/components/PricingCalculator'), { ssr: false })
const ContactForm = dynamic(() => import('@/components/ContactForm'), { ssr: false })

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

interface CalcModule {
  id: string
  name: string
  price: number
  description: string
}

interface PageProps {
  params: {
    lang: string
  }
}

// Complete localized copywriting dictionary with updated technical copy deck

const translations = {
  cs: {
    navAbout: 'O NÁS',
    navServices: 'SLUŽBY',
    navStudy: 'REFERENCE',
    navCaseStudies: 'STUDIE',
    navTeam: 'TÝM',
    navCalc: 'KALKULAČKA',
    navContact: 'KONTAKT',
    
    // Hero Section Copy
    heroTitlePart1: 'Stavíme ',
    heroTitleAccent: 'nekompromisní',
    heroTitlePart2: ' e-commerce architekturu.',
    heroDesc: 'Odstraňujeme latenci serverů, optimalizujeme Core Web Vitals a přecházíme na moderní headless a edge performance řešení. Vaše Google Ads kampaně konečně přestanou pálit rozpočet v pomalých košících.',
    heroCTA: 'CHCI TECHNICAL AUDIT PRO SVŮJ E-SHOP — ZASTAVIT ZTRÁTU KONVERZÍ',

    // Services
    servicesTag: '// NAŠE CORE ZAMĚŘENÍ',
    servicesTitle: 'Řešení bez rychlostních limitů',
    servicesDesc: 'Navrhujeme a vyvíjíme digitální monolity a headless frontendy na hraně sítě. Překonáváme limity standardních šablon.',
    
    service1Title: 'Edge Performance',
    service1Desc: 'Globální routování a mezinárodní cachování statického i dynamického obsahu. Radikální zrychlení odezvy a okamžitý nárůst ROAS.',
    service1Tag: '01',
    
    service2Title: 'Headless Front-end',
    service2Desc: 'Kompletní oddělení prezentační vrstvy. Multijazyčné a multidoménové systémy s prémiovým globálním UX bez limitů šablon.',
    service2Tag: '02',
    
    service3Title: 'Custom Full-Stack',
    service3Desc: 'Propojení přes pokročilé API, centralizovaná administrace, synchronizace skladů, ERP a komplexní logistiky pod jeden backend.',
    service3Tag: '03',
    
    service4Title: 'System Bypass',
    service4Desc: 'Ohýbáme uzavřené krabicové e-shopové platformy (Shoptet, Shopify). Implementujeme logiku, která překonává vestavěné limity platformy.',
    service4Tag: '04',

    // References Grid
    refTag: '// KLIENTSKÉ REFERENCE',
    refTitle: 'Projekty se stoprocentní spolehlivostí',
    refDesc: 'Naše řešení denně odbavují tisíce objednávek a synchronizují miliony datových bodů. Zde jsou vybrané systémy, které jsme navrhli a implementovali:',
    
    ref1Title: 'Aura Design — 3D Konfigurátor & Headless Shopify',
    ref1Desc: 'Vývoj pokročilého konfigurátoru nábytku a přechod na headless frontend na Shopify. Zvýšení konverzí o 35 % a zkrácení doby načtení (LCP) na 0.6s.',
    ref1Tag: '3D CONFIGURATOR // LUXURY',
    
    ref2Title: 'ElectroHub — Helios ERP k Shoptet API Bridge',
    ref2Desc: 'Návrh a nasazení stabilního synchronizačního můstku na Edge Workers. Real-time synchronizace více než 150 000 produktů a okamžité zpracování objednávek.',
    ref2Tag: 'SYSTEM BYPASS // ENTERPRISE',

    // Case Studies Section
    caseStudiesTag: '// PŘÍPADOVÉ STUDIE',
    caseStudiesTitle: 'Výsledky, které mluví za vše',
    caseStudiesDesc: 'Každý projekt je postaven na měřitelných výsledcích. Žádné sliby — jen čísla.',

    // Case Study - Fitness 77
    caseTag: '// PŘÍPADOVÁ STUDIE: FITNESS 77',
    caseTitle: 'Fitness 77 — Headless transformace s odezvou pod 200ms',
    caseDesc: 'Pro předního prodejce sportovní výživy Fitness 77 jsme navrhli a implementovali kompletní headless transformaci. Původní pomalé šablonové řešení jsme nahradili robustním Next.js frontendem hostovaným na Edge serverech, který komunikuje přes Shoptet API. Veškerá data jsou v reálném čase synchronizována.',
    caseSpeed: 'SPEED INDEX',
    caseSpeedDesc: 'Průměrná doba odezvy (TTFB)',
    caseConv: 'CONVERSIONS',
    caseConvDesc: 'Nárůst konverzního poměru',
    caseServer: 'SERVER TIME',
    caseServerDesc: 'Edge rendering doba na globální CDN',
    caseStability: 'STABILITY',
    caseStabilityDesc: 'Provozní spolehlivost bez výpadků',

    // Case Study - Fotofiltry
    casePhotoTag: '// PŘÍPADOVÁ STUDIE: FOTOFILTRY.CZ',
    casePhotoTitle: 'Fotofiltry.cz — Custom Next.js storefront & Shoptet Bypass',
    casePhotoDesc: 'Pro specialistu na fotografické filtry Fotofiltry.cz jsme vybudovali kompletní custom frontend oddělený od Shoptet šablony. Implementovali jsme pokročilou filtraci produktů, dynamické kategorie a plně synchronizované sklady přes vlastní API bridge. Výsledek: dramaticky rychlejší web a nárůst organické návštěvnosti.',
    casePhotoSpeed: 'LCP',
    casePhotoSpeedDesc: 'Largest Contentful Paint po optimalizaci',
    casePhotoConv: 'ORGANIC',
    casePhotoConvDesc: 'Nárůst organické návštěvnosti',
    casePhotoServer: 'EDGE TIME',
    casePhotoServerDesc: 'Průměrná odezva z Edge serverů',
    casePhotoStability: 'UPTIME',
    casePhotoStabilityDesc: 'Nepřetržitý provoz bez výpadků',

    // Tech Stack List
    techTag: '// INFRASTRUKTURA BEZ LIMITŮ',
    techTitle: 'Infrastruktura bez limitů',
    techDesc: 'Neklonujeme staré postupy. Pracujeme s technologiemi, které pohánějí moderní globální web.',
    
    // Team
    teamTag: '// L-CODE PARTNEŘI',
    teamTitle: 'Lidé za projektem',
    teamDesc: 'Jsme inženýrský tým s hlubokým zaměřením na optimalizaci výkonu a moderní webovou estetiku. Žádní junioři, žádné zbytečné mítinky — jen čisté výsledky.',
    janRole: 'FOUNDER & ARCHITECT',
    janDesc: 'Navrhuje bezhlavé digitální systémy a dohlíží na luxusní vizuální prezentaci. Zajišťuje, aby každý projekt překonal estetické standardy.',
    josefRole: 'CORE ENGINEER',
    josefDesc: 'Vyvíjí spolehlivé synchronizační můstky a řídí integraci na ERP systémy. Specialista na optimální datové přenosy a bezpečnost.',

    // Calculator - Lean & Mean
    calcTag: '// STRATEGIE LEAN & MEAN',
    calcTitle: 'Špičkový kód bez agenturní přirážky.',
    calcDesc: 'Neplatíte nám drahé kanceláře v centru, zbytečné manažery ani nekonečné schvalovací schůzky. Jsme programátoři, kteří znají hodnotu své práce, ale staví řešení, která si na sebe okamžitě vydělají. Vyberte si jen to, co váš e-shop reálně posune dál:',
    
    calcMod1Name: 'Custom úpravy & Zrychlení',
    calcMod1Desc: 'Vysekneme úpravy šablon, vyčistíme skripty a zrychlíme stávající web tam, kde ostatní končí.',
    
    calcMod2Name: 'Interaktivní Konfigurátor',
    calcMod2Desc: 'Komplexní produktové konfigurátory na míru. Zvýšíme konverze a zjednodušíme lidem nákup.',
    
    calcMod3Name: 'System Bypass & API Sync',
    calcMod3Desc: 'Propojíme externí systémy, zautomatizujeme sklady a ohneme limity Shoptetu přes Edge Workers.',
    
    calcMod4Name: 'Next.js Headless Jádro',
    calcMod4Desc: 'Kompletní odpojení od staré šablony. Brutálně rychlý, samostatný frontend na světové úrovni.',
    
    calcMod5Name: 'SEO & Core Web Vitals Audit',
    calcMod5Desc: 'Hloubková analýza a technické SEO pro maximální nárůst organické návštěvnosti.',
    
    calcMod6Name: 'Měsíční správa & SLA',
    calcMod6Desc: 'Garantovaná podpora, monitoring chyb a průběžný vývoj (cena měsíčně).',
    
    calcBudgetLabel: 'Transparentní investice do výkonu',
    calcCurrency: 'Kč',
    calcShieldTitle: '[ BUDGET SHIELD: AKTIVNÍ ]',

    // Contact Form
    contactTag: '// ZAPOČNĚME SPOLUPRÁCI',
    contactTitle: 'Napište nám',
    contactDesc: 'Máte zájem o headless e-commerce, luxusní design systém nebo datovou integraci? Vyplňte formulář a my se vám ozveme zpět.',
    formLabelName: 'Jméno a příjmení *',
    formPlaceholderName: 'Jan Novák',
    formLabelEmail: 'E-mail *',
    formPlaceholderEmail: 'jan.novak@firma.cz',
    formLabelCompany: 'Firma / E-shop',
    formPlaceholderCompany: 'Firma s.r.o.',
    formLabelMessage: 'Zpráva o vašem projektu',
    formPlaceholderMessage: 'Dobrý den, máme zájem o kompletní refaktoring našeho e-shopu do headless architektury...',
    formBtnSubmit: 'ODESLAT POPTÁVKU',
    formBtnSubmitting: 'ODESÍLÁM...',
    formSuccess: 'Poptávka byla úspěšně odeslána. Naši partneři se vám ozvou během několika hodin.',
    formErrorDefault: 'Vyplňte prosím alespoň jméno a e-mail.',
    footerFounder: 'Jan Lančarič',
    footerFounderRole: 'Senior Developer & Founder',
    footerPhone: '+420 608 960 305',
    footerPartner: 'Josef Dlouhý',
    footerPartnerRole: 'Core Partner & Architect',
  },
  en: {
    navAbout: 'ABOUT US',
    navServices: 'SERVICES',
    navStudy: 'REFERENCES',
    navCaseStudies: 'STUDIES',
    navTeam: 'TEAM',
    navCalc: 'CALCULATOR',
    navContact: 'CONTACT',
    
    // Hero Section Copy
    heroTitlePart1: 'We build ',
    heroTitleAccent: 'uncompromising',
    heroTitlePart2: ' e-commerce architecture.',
    heroDesc: 'We eliminate server latency, optimize Core Web Vitals, and migrate stores to modern headless and edge performance architectures. Stop burning your Google Ads budget on slow checkout baskets.',
    heroCTA: 'I WANT A TECHNICAL AUDIT — STOP CONVERSION LOSS',

    // Services
    servicesTag: '// OUR CORE FOCUS',
    servicesTitle: 'Solutions without speed limits',
    servicesDesc: 'We design and develop digital monoliths and headless frontends at the edge of the network. Decoupling presentation layers to outperform templates.',
    
    service1Title: 'Edge Performance',
    service1Desc: 'Global routing and international caching of static and dynamic assets. Blazing-fast response times and immediate ROAS growth.',
    service1Tag: '01',
    
    service2Title: 'Headless Front-end',
    service2Desc: 'Complete decoupling of the presentation layer. Multi-language and multi-domain store systems with premium global UX without template limits.',
    service2Tag: '02',
    
    service3Title: 'Custom Full-Stack',
    service3Desc: 'Decoupled API connectivity, centralized administration, real-time warehouse sync, ERP bridges, and automated logistic flows.',
    service3Tag: '03',
    
    service4Title: 'System Bypass',
    service4Desc: 'Bending closed platform constraints (Shoptet, Shopify). We implement customized logic that bypasses native platform limitations.',
    service4Tag: '04',

    // References Grid
    refTag: '// CLIENT REFERENCES',
    refTitle: 'Projects Built for Absolute Reliability',
    refDesc: 'Our digital solutions process thousands of daily orders and sync millions of data points. Here are selected custom systems we have designed and built:',
    
    ref1Title: 'Aura Design — 3D Configurator & Headless Shopify',
    ref1Desc: 'Developed a custom 3D furniture configurator and migrated to a headless Shopify storefront. Boosted conversions by 35% and cut LCP to 0.6s.',
    ref1Tag: '3D CONFIGURATOR // LUXURY',
    
    ref2Title: 'ElectroHub — Helios ERP to Shoptet API Bridge',
    ref2Desc: 'Designed and deployed a robust synchronization bridge on Edge Workers. Real-time sync of 150,000+ products and instant order routing.',
    ref2Tag: 'SYSTEM BYPASS // ENTERPRISE',

    // Case Studies Section
    caseStudiesTag: '// CASE STUDIES',
    caseStudiesTitle: 'Results that speak for themselves',
    caseStudiesDesc: 'Every project is built on measurable outcomes. No promises — just numbers.',

    // Case Study - Fitness 77
    caseTag: '// CASE STUDY: FITNESS 77',
    caseTitle: 'Fitness 77 — Headless transformation with under 200ms response',
    caseDesc: 'For the leading sports nutrition retailer Fitness 77, we designed and implemented a full headless transformation. We replaced the slow template-based store with a robust Next.js frontend hosted on Edge nodes, communicating via Shoptet API. All databases are synced in real-time.',
    caseSpeed: 'SPEED INDEX',
    caseSpeedDesc: 'Average time to first byte (TTFB)',
    caseConv: 'CONVERSIONS',
    caseConvDesc: 'Conversion rate increase',
    caseServer: 'SERVER TIME',
    caseServerDesc: 'Edge rendering duration on global CDN',
    caseStability: 'STABILITY',
    caseStabilityDesc: 'Uptime reliability with zero outages',

    // Case Study - Fotofiltry
    casePhotoTag: '// CASE STUDY: FOTOFILTRY.CZ',
    casePhotoTitle: 'Fotofiltry.cz — Custom Next.js storefront & Shoptet Bypass',
    casePhotoDesc: 'For photography filter specialist Fotofiltry.cz, we built a complete custom frontend decoupled from Shoptet templates. We implemented advanced product filtering, dynamic categories, and fully synchronized inventory via a custom API bridge. The result: dramatically faster site and a surge in organic traffic.',
    casePhotoSpeed: 'LCP',
    casePhotoSpeedDesc: 'Largest Contentful Paint after optimization',
    casePhotoConv: 'ORGANIC',
    casePhotoConvDesc: 'Organic traffic increase',
    casePhotoServer: 'EDGE TIME',
    casePhotoServerDesc: 'Average response time from Edge servers',
    casePhotoStability: 'UPTIME',
    casePhotoStabilityDesc: 'Continuous uptime with zero outages',

    // Tech Stack List
    techTag: '// INFRASTRUCTURE WITHOUT LIMITS',
    techTitle: 'Infrastructure Without Limits',
    techDesc: 'We do not clone outdated processes. We work with the bleeding-edge technologies powering the modern global web.',

    // Team
    teamTag: '// L-CODE PARTNERS',
    teamTitle: 'People Behind The Project',
    teamDesc: 'We are an engineering-first team focused deeply on performance optimization and modern design aesthetics. No juniors, no useless meetings — just clean results.',
    janRole: 'FOUNDER & ARCHITECT',
    janDesc: 'Designs headless digital infrastructures and oversees luxury visual art direction. Ensures every project exceeds premium aesthetic guidelines.',
    josefRole: 'CORE ENGINEER',
    josefDesc: 'Develops robust database sync bridges and oversees ERP integrations. Specialist in optimized data streams, low latency, and security.',

    // Calculator - Lean & Mean
    calcTag: '// LEAN & MEAN STRATEGY',
    calcTitle: 'World-class code without agency premiums.',
    calcDesc: 'We don\'t charge you for expensive city-center offices, bloated managers, or endless approval meetings. We are engineers who know the value of our work and build solutions that pay for themselves instantly. Select only what your e-shop realistically needs to grow:',
    
    calcMod1Name: 'Custom Fixes & Speedup',
    calcMod1Desc: 'We execute custom template modifications, optimize script execution, and accelerate your existing web pages where others fail.',
    
    calcMod2Name: 'Interactive Configurator',
    calcMod2Desc: 'Bespoke, high-end product builders. We raise conversion metrics and simplify buyer journeys.',
    
    calcMod3Name: 'System Bypass & API Sync',
    calcMod3Desc: 'We connect external frameworks, automate inventory flows, and bypass Shoptet constraints via Edge Workers.',
    
    calcMod4Name: 'Next.js Headless Core',
    calcMod4Desc: 'Full decoupling from old templates. Blazing-fast, standalone frontend optimized for global CDNs.',
    
    calcMod5Name: 'SEO & Core Web Vitals Audit',
    calcMod5Desc: 'In-depth technical SEO analysis and CWV fixes for maximum organic growth.',
    
    calcMod6Name: 'Monthly Maintenance & SLA',
    calcMod6Desc: 'Guaranteed support, bug monitoring, and continuous development (monthly fee).',
    
    calcBudgetLabel: 'Transparent performance investments',
    calcCurrency: 'USD',
    calcShieldTitle: '[ BUDGET SHIELD: ACTIVE ]',

    // Contact Form
    contactTag: '// INITIATE ENGAGEMENT',
    contactTitle: 'Get In Touch',
    contactDesc: 'Interested in headless e-commerce, custom visual design systems, or deep API synchronizations? Submit the form and we will reach out.',
    formLabelName: 'Full Name *',
    formPlaceholderName: 'John Doe',
    formLabelEmail: 'Email Address *',
    formPlaceholderEmail: 'john.doe@company.com',
    formLabelCompany: 'Company / E-shop',
    formPlaceholderCompany: 'Company Ltd.',
    formLabelMessage: 'Project Details',
    formPlaceholderMessage: 'Hello, we are interested in a complete headless refactoring of our current store...',
    formBtnSubmit: 'SUBMIT INQUIRY',
    formBtnSubmitting: 'SUBMITTING...',
    formSuccess: 'Inquiry submitted successfully. Our partners will reach out to you within a few business hours.',
    formErrorDefault: 'Please fill in at least name and email.',
    footerFounder: 'Jan Lančarič',
    footerFounderRole: 'Senior Developer & Founder',
    footerPhone: '+420 608 960 305',
    footerPartner: 'Josef Dlouhý',
    footerPartnerRole: 'Core Partner & Architect',
  }
}

// Generate calculator modules dynamically depending on locale
const getCalculatorModules = (isEn: boolean): CalcModule[] => [
  { 
    id: 'headless', 
    name: isEn ? 'Headless Core' : 'Headless Jádro', 
    price: 500000, 
    description: isEn ? 'Ultra-fast Next.js core hosted on global Edge CDN.' : 'Ultrarychlé Next.js jádro na Edge síti.' 
  },
  { 
    id: 'configurator', 
    name: isEn ? 'Bespoke Configurator' : 'Pokročilý konfigurátor na míru', 
    price: 350000, 
    description: isEn ? 'Interactive product builder with real-time price updates.' : 'Interaktivní produktový konfigurátor s dynamickým přepočtem.' 
  },
  { 
    id: 'sync', 
    name: isEn ? 'Shoptet API Sync' : 'Shoptet API Sync', 
    price: 200000, 
    description: isEn ? 'Blazing fast products, inventory, and order syncing.' : 'Blesková synchronizace produktů, cen a skladů.' 
  },
  { 
    id: 'edge', 
    name: isEn ? 'Edge Caching' : 'Edge Caching', 
    price: 100000, 
    description: isEn ? 'Milliseconds page response speeds from any global location.' : 'Odezva webu v milisekundách z jakéhokoliv místa.' 
  },
]

const TECH_STACK_TAGS = [
  'Edge Caching',
  'Headless Architecture',
  'Next.js / Nuxt',
  'Custom API Integrations',
  'Serverless Cloud',
  'Shoptet Premium API',
  'Zero-Downtime Deployment'
]

export default function Page({ params }: PageProps) {
  const lang = params.lang === 'en' ? 'en' : 'cs'
  const isEn = lang === 'en'
  const t = translations[lang]

  // Navigation Menu Mobile State
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showArrow, setShowArrow] = useState(false)

  // Navigation Menu Mobile State
  useEffect(() => {
    // Set the language on the html element so CSS overrides (e.g., html[lang="en"]) work
    document.documentElement.lang = lang;

    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E30613] selection:text-white font-sans overflow-x-hidden relative">
      
      {/* Celostránkové ambientní nasvícení */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_center,_rgba(227,6,19,0.12)_0%,_rgba(227,6,19,0.03)_50%,_transparent_100%)] mix-blend-screen" />
      
      {/* Transparent Header without the bar */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-transparent ${
        scrolled ? 'py-3' : 'py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <motion.a 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            href="#" 
            className="flex items-center gap-2.5"
            style={{ willChange: "transform, opacity" }}
          >
            <Image src="/logo-nav.svg" alt="L-Code Logo" width={56} height={56} priority className="w-12 h-12 md:w-14 md:h-14 rounded-xl filter drop-shadow-[0_0_15px_rgba(227,6,19,0.3)]" />
            <span className="font-display font-black tracking-[0.1em] text-2xl md:text-3xl uppercase text-white flex items-center gap-3">
              L-CODE DYNAMICS
              <span className="w-3 h-3 rounded-full bg-[#E30613] inline-block animate-pulse shadow-[0_0_10px_rgba(227,6,19,0.8)]" />
            </span>
          </motion.a>
          <LanguageSwitcher />

          {/* Desktop Navigation removed from header and moved to right side */}

          {/* Mobile Hamburger Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-white"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Right-Side Desktop Navigation (Fixed) */}
      <nav className="hidden xl:flex fixed right-10 top-1/2 -translate-y-1/2 z-50 flex-col items-end gap-6 mix-blend-difference pointer-events-auto">
        {[
          { 
            href: '#', 
            label: t.navAbout, 
            onClick: (e: React.MouseEvent) => { 
              e.preventDefault(); 
              window.scrollTo({ top: window.innerHeight * 0.8, behavior: 'smooth' });
              setShowArrow(true); 
              setTimeout(() => setShowArrow(false), 2500);
            } 
          },
          { href: '#sluzby', label: t.navServices },
          { href: '#tym', label: t.navTeam },
          { href: '#pripadove-studie', label: t.navCaseStudies },
          { href: '#reference', label: t.navStudy },
          { href: '#kalkulacka', label: t.navCalc },
          { href: '#kontakt', label: t.navContact, isAction: true }
        ].map((item, i) => (
          <motion.a
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
            href={item.href}
            onClick={item.onClick}
            className={item.isAction 
              ? "font-display text-2xl md:text-3xl font-black bg-[#E30613] text-white px-6 py-3 mt-4 uppercase hover:bg-white hover:text-[#E30613] hover:-translate-x-2 transition-all duration-300 drop-shadow-[0_0_30px_rgba(227,6,19,0.8)] rounded-md"
              : "font-display text-4xl font-bold text-white uppercase opacity-70 hover:opacity-100 hover:text-[#E30613] transition-all duration-300 hover:-translate-x-2 drop-shadow-lg"
            }
          >
            {item.label}
          </motion.a>
        ))}
      </nav>

      {/* Left-Side Manifesto (Fixed with Typewriter) */}
      <ManifestoSidebar lang={lang} />

      {/* Hand-drawn Arrow when clicking O NÁS */}
      <AnimatePresence>
        {showArrow && (
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="fixed top-[45%] left-[360px] z-[100] pointer-events-none drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          >
            <svg width="120" height="80" viewBox="0 0 120 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M110 60 Q 80 80, 20 40" stroke="white" strokeWidth="4" strokeLinecap="round" strokeDasharray="8 8" fill="none" className="animate-[dash_1s_linear_forwards]" />
              <path d="M35 25 L10 40 L35 55" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[70px] z-40 bg-[#0d0d0d] border-b border-white/[0.06] p-6 flex flex-col gap-4 md:hidden"
          >
            <a onClick={() => setMobileMenuOpen(false)} href="#" className="font-mono text-xs tracking-wider text-white hover:text-white py-2 uppercase">{t.navAbout}</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#sluzby" className="font-mono text-xs tracking-wider text-white hover:text-white py-2 uppercase">{t.navServices}</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#tym" className="font-mono text-xs tracking-wider text-white hover:text-white py-2 uppercase">{t.navTeam}</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#pripadove-studie" className="font-mono text-xs tracking-wider text-white hover:text-white py-2 uppercase">{t.navCaseStudies}</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#reference" className="font-mono text-xs tracking-wider text-white hover:text-white py-2 uppercase">{t.navStudy}</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#kalkulacka" className="font-mono text-xs tracking-wider text-white hover:text-white py-2 uppercase">{t.navCalc}</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#kontakt" className="w-full text-center py-3 bg-[#E30613] text-white font-mono text-xs tracking-wider uppercase">{t.navContact}</a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Hero Monolith Section */}
      <HeroMonolith lang={lang} />
      
      {/* Moved Stats and CTAs from HeroMonolith */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12 relative z-10 border-b border-white/[0.04]">
        {/* Red divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ transformOrigin: 'left', height: 1, background: 'linear-gradient(90deg, #E30613, rgba(227,6,19,0.3), transparent)', marginBottom: '2.5rem' }}
        />

        {/* Sub-copy + Stats row */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 mb-12 w-full">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.38 }}
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.75, maxWidth: 600, fontWeight: 300, textAlign: 'left' }}
            className="flex-1 text-white/45"
          >
            {isEn
              ? 'We engineer digital storefronts at the edge of the network. Bypassing platform constraints through pure logic and custom-built integration bridges.'
              : 'Stavíme a programujeme digitální storefronty na hraně sítě. Ohýbáme limity uzavřených platforem pomocí čisté logiky a custom synchronizačních můstků.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            style={{ display: 'flex', gap: 0, alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}
            className="flex-1 lg:justify-end"
          >
            {[
              { value: '4×', label: isEn ? 'Performance' : 'Výkon' },
              { value: '150K+', label: isEn ? 'Products Synced' : 'Produktů' },
              { value: '12ms', label: isEn ? 'Edge Latency' : 'Edge latence' },
            ].map((s, i) => (
              <div key={i} className="border-l border-white/10" style={{ paddingLeft: i === 0 ? 0 : 24, paddingRight: 24, borderLeft: i === 0 ? 'none' : undefined }}>
                <div className="text-white font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1 }}>{s.value}</div>
                <div className="text-white/75 font-mono uppercase font-medium mt-2" style={{ fontSize: 16, letterSpacing: '0.15em' }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', width: '100%' }}>
          <motion.button
            initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
            onClick={() => scrollToSection('kontakt')}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ff1a2a'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(227,6,19,0.5), 0 0 80px rgba(227,6,19,0.25)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E30613'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(227,6,19,0.3)' }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '1rem 2.5rem',
              background: '#E30613', color: '#ffffff',
              fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              border: 'none', cursor: 'pointer',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
              boxShadow: '0 0 24px rgba(227,6,19,0.3)',
              transition: 'background 0.2s ease, box-shadow 0.3s ease',
            }}
          >
            {isEn ? 'Start Project' : 'Spustit projekt'}
            <ArrowUpRight size={14} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.57 }}
            onClick={() => scrollToSection('reference')}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '1rem 2.5rem',
              background: 'transparent',
              fontFamily: 'monospace', fontSize: 13, fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              cursor: 'pointer',
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
            className="text-white/60 border border-white/10 hover:border-white/50 hover:text-white transition-colors duration-200"
          >
            {isEn ? 'Our Work' : 'Naše výsledky'}
          </motion.button>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10 border-b border-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight uppercase leading-[1.05] text-white mb-6">
              {t.heroTitlePart1}
              <span className="text-[#E30613]">{t.heroTitleAccent}</span>
              <br className="hidden md:block" />
              {t.heroTitlePart2}
            </h2>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="lg:col-span-5"
          >
            <p className="text-white/80 font-light leading-relaxed text-base md:text-lg mb-8">
              {t.heroDesc}
            </p>
          </motion.div>
        </div>

        {/* CTA bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8"
        >
          <button 
            onClick={() => scrollToSection('kontakt')}
            className="w-full bg-[#E30613] hover:bg-[#ff1a2a] text-white py-8 px-6 text-sm md:text-lg font-bold tracking-widest text-center uppercase shadow-[0_0_60px_rgba(227,6,19,0.25)] hover:shadow-[0_0_80px_rgba(227,6,19,0.4)] hover:scale-[1.005] transition-all duration-300 flex items-center justify-center gap-3 cursor-pointer"
          >
            {t.heroCTA}
            <ArrowRight size={18} />
          </button>
        </motion.div>
      </section>

      {/* Founders & Team Section */}
      <section id="tym" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/[0.04]">
        <div className="mb-16 text-center max-w-2xl mx-auto overflow-hidden">
          <motion.span 
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3"
          >
            {t.teamTag}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white mb-6"
          >
            {t.teamTitle}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-white/80 font-light leading-relaxed"
          >
            {t.teamDesc}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="group border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-500 hover:border-[#E30613]/30 hover:bg-white/10"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden flex-shrink-0 bg-white/10 border border-white/10">
              <Image src="/jan.jpeg" alt="Jan Lančarič" width={208} height={208} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#E30613] tracking-widest block uppercase mb-1">{t.janRole}</span>
              <h3 className="font-display text-3xl font-bold text-white group-hover:text-[#E30613] transition-colors duration-500">Jan Lančarič</h3>
              <p className="text-sm md:text-base text-white mt-1 mb-3">CEO, Headless & UX Architect</p>
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">{t.janDesc}</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="group border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] p-6 flex flex-col sm:flex-row items-center gap-6 transition-all duration-500 hover:border-[#E30613]/30 hover:bg-white/10"
          >
            <div className="w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden flex-shrink-0 bg-white/10 border border-white/10">
              <Image src="/josef.webp" alt="Josef Dlouhý" width={208} height={208} className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-500" />
            </div>
            <div>
              <span className="font-mono text-[9px] text-[#E30613] tracking-widest block uppercase mb-1">{t.josefRole}</span>
              <h3 className="font-display text-3xl font-bold text-white group-hover:text-[#E30613] transition-colors duration-500">Josef Dlouhý</h3>
              <p className="text-sm md:text-base text-white mt-1 mb-3">Technical Partner, Integrations Specialist</p>
              <p className="text-sm md:text-base text-white/80 font-light leading-relaxed">{t.josefDesc}</p>
            </div>
          </motion.div>

        </div>
      </section>

      
      {/* Services Bento Grid Section */}
      <section id="sluzby" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3">
              {t.servicesTag}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white mt-0">
              {renderRedWord(t.servicesTitle)}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 flex items-center"
          >
            <p className="text-white/80 font-light leading-relaxed text-sm md:text-base">
              {t.servicesDesc}
            </p>
          </motion.div>
        </div>

        {/* Bento Grid with staggered entrances */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <ServiceCard
              title={t.service1Title}
              description={t.service1Desc}
              icon={<Layers3 size={22} />}
              tag={t.service1Tag}
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <ServiceCard
              title={t.service2Title}
              description={t.service2Desc}
              icon={<ShoppingBag size={22} />}
              tag={t.service2Tag}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            <ServiceCard
              title={t.service3Title}
              description={t.service3Desc}
              icon={<Cpu size={22} />}
              tag={t.service3Tag}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          >
            <ServiceCard
              title={t.service4Title}
              description={t.service4Desc}
              icon={<Lock size={22} />}
              tag={t.service4Tag}
            />
          </motion.div>
        </div>
      </section>

      {/* References Grid Section */}
      <section id="reference" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-t border-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3">
              {t.refTag}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white mt-0">
              {renderRedWord(t.refTitle)}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 flex items-center"
          >
            <p className="text-white/80 font-light leading-relaxed text-sm md:text-base">
              {t.refDesc}
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <ServiceCard
              title={t.ref1Title}
              description={t.ref1Desc}
              icon={<Briefcase size={22} />}
              tag={t.ref1Tag}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <ServiceCard
              title={t.ref2Title}
              description={t.ref2Desc}
              icon={<Briefcase size={22} />}
              tag={t.ref2Tag}
            />
          </motion.div>
        </div>
      </section>

      {/* Tech Stack List Section */}
      <section id="architektura" className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32 border-b border-white/[0.04]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5"
          >
            <span className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3">
              {t.techTag}
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white mt-0">
              {renderRedWord(t.techTitle)}
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 flex items-center"
          >
            <p className="text-white/80 font-light leading-relaxed text-sm md:text-base">
              {t.techDesc}
            </p>
          </motion.div>
        </div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.06 } }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 max-w-4xl"
        >
          {TECH_STACK_TAGS.map((tag, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, x: 45 },
                visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 120, damping: 14 } }
              }}
              whileHover={{ scale: 1.05, borderColor: '#E30613', color: '#E30613' }}
              className="px-5 py-3 border border-white/10 bg-white/[0.03] font-mono text-[10px] md:text-xs text-white tracking-wider cursor-default transition-all duration-300"
            >
              {tag}
            </motion.div>
          ))}
        </motion.div>
      </section>


      {/* Case Studies Section */}
      <section id="pripadove-studie" className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 py-24 md:py-32">
        <div className="mb-16 md:mb-24 text-center">
          <motion.span
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3"
          >
            {t.caseStudiesTag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-3xl md:text-5xl font-display font-extrabold tracking-tight uppercase text-white mb-4"
          >
            {renderRedWord(t.caseStudiesTitle)}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-white/80 font-light text-sm md:text-base max-w-xl mx-auto"
          >
            {t.caseStudiesDesc}
          </motion.p>
        </div>

        {/* Fitness 77 */}
        <div className="case-overlay border border-white/[0.08] rounded-2xl overflow-hidden mb-8 relative">
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#E30613]/8 blur-[80px] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <span className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3">{t.caseTag}</span>
              <h3 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight uppercase mb-4 leading-tight">{t.caseTitle}</h3>
              <p className="text-white/80 font-light leading-relaxed mb-6 text-sm md:text-base">{t.caseDesc}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">NEXT.JS APP ROUTER</span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">SHOPTET API</span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">VERCEL EDGE ENGINE</span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">PRISMA CLIENT</span>
              </div>
            </motion.div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { label: t.caseSpeed, value: '0.18s', desc: t.caseSpeedDesc },
                { label: t.caseConv, value: '+64%', desc: t.caseConvDesc },
                { label: t.caseServer, value: '120ms', desc: t.caseServerDesc },
                { label: t.caseStability, value: '99.9%', desc: t.caseStabilityDesc },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <span className="font-mono text-[10px] text-white tracking-widest uppercase block mb-2">{m.label}</span>
                  <div className="font-display text-3xl md:text-4xl font-black text-[#E30613] tracking-tight">{m.value}</div>
                  <p className="text-xs text-white mt-2 font-bold">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Fotofiltry.cz */}
        <div className="case-overlay border border-white/[0.08] rounded-2xl overflow-hidden relative">
          <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-[#E30613]/6 blur-[90px] pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7"
            >
              <span className="font-mono text-[9px] text-[#E30613] tracking-[0.3em] uppercase block mb-3">{t.casePhotoTag}</span>
              <h3 className="text-2xl md:text-4xl font-display font-extrabold tracking-tight uppercase mb-4 leading-tight">{t.casePhotoTitle}</h3>
              <p className="text-white/80 font-light leading-relaxed mb-6 text-sm md:text-base">{t.casePhotoDesc}</p>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">NEXT.JS</span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">SHOPTET BYPASS</span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">CUSTOM API BRIDGE</span>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 font-mono text-[9px] text-white tracking-wider">EDGE CDN</span>
              </div>
            </motion.div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-4">
              {[
                { label: t.casePhotoSpeed, value: '0.9s', desc: t.casePhotoSpeedDesc },
                { label: t.casePhotoConv, value: '+118%', desc: t.casePhotoConvDesc },
                { label: t.casePhotoServer, value: '98ms', desc: t.casePhotoServerDesc },
                { label: t.casePhotoStability, value: '99.9%', desc: t.casePhotoStabilityDesc },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9, x: 40 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col justify-center shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  <span className="font-mono text-[10px] text-white tracking-widest uppercase block mb-2">{m.label}</span>
                  <div className="font-display text-3xl md:text-4xl font-black text-[#E30613] tracking-tight">{m.value}</div>
                  <p className="text-xs text-white mt-2 font-bold">{m.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ReviewsSection renderRedWord={renderRedWord} lang={lang} />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-24 flex justify-center">
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          onClick={() => scrollToSection('kontakt')}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#ff1a2a'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 40px rgba(227,6,19,0.5), 0 0 80px rgba(227,6,19,0.25)' }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#E30613'; (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 0 24px rgba(227,6,19,0.3)' }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '1.25rem 3rem',
            background: '#E30613', color: '#fff',
            fontFamily: 'monospace', fontSize: 14, fontWeight: 700,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer',
            clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            boxShadow: '0 0 24px rgba(227,6,19,0.3)',
            transition: 'background 0.2s ease, box-shadow 0.3s ease',
          }}
        >
          {isEn ? 'Request Technical E-shop Audit' : 'Chci technický audit pro svůj e-shop'}
          <ArrowUpRight size={16} />
        </motion.button>
      </div>

      <PricingCalculator t={t} isEn={isEn} />

      {/* Lead Capture Form Section */}
      <ContactForm t={t} />

      {/* Footer / Kontakt */}
      <footer id="kontakt" className="border-t border-white/10 bg-[#050505] text-white font-sans py-20 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#E30613]/5 blur-[120px] pointer-events-none rounded-full" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-16 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8 mb-16">
            
            {/* Column 1: Logo & Tagline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-start gap-4"
            >
              <Image src="/logo-footer.png" alt="L-Code Dynamics" width={300} height={80} className="h-20 w-auto object-contain mb-2" />
              <p className="text-white/60 text-sm font-light leading-relaxed">
                Zero Error Tolerance // Architecture<br/>
                Engineered in Prague, Czechia.
              </p>
            </motion.div>

            {/* Column 2: Navigation / Quick Links */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col items-start gap-4"
            >
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E30613] mb-2">{t.navServices}</h4>
              <nav className="flex flex-col gap-3">
                <a href="#sluzby" className="text-white/80 hover:text-white text-sm font-light transition-colors">Performance E-commerce</a>
                <a href="#reference" className="text-white/80 hover:text-white text-sm font-light transition-colors">{t.navStudy}</a>
                <a href="#tym" className="text-white/80 hover:text-white text-sm font-light transition-colors">{t.navTeam}</a>
              </nav>
            </motion.div>

            {/* Column 3: Contact 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-start gap-4"
            >
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E30613] mb-2">Jan Lančarič</h4>
              <div className="flex flex-col gap-1">
                <span className="text-white text-sm font-medium">CEO & Architect</span>
                <a href="mailto:ceo@l-code-dynamics.com" className="text-white/60 hover:text-white text-sm font-light transition-colors mt-2">ceo@l-code-dynamics.com</a>
                <a href="tel:+420776880075" className="text-white/60 hover:text-white text-sm font-light transition-colors">+420 776 880 075</a>
              </div>
            </motion.div>

            {/* Column 4: Contact 2 & HQ */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col items-start gap-4"
            >
              <h4 className="font-mono text-xs tracking-[0.2em] uppercase text-[#E30613] mb-2">Josef Dlouhý</h4>
              <div className="flex flex-col gap-1 mb-4">
                <span className="text-white text-sm font-medium">Core Engineer</span>
                <a href="mailto:josef.dlouhy@l-code-dynamics.com" className="text-white/60 hover:text-white text-sm font-light transition-colors mt-2">josef.dlouhy@l-code-dynamics.com</a>
                <a href="tel:+420774153355" className="text-white/60 hover:text-white text-sm font-light transition-colors">+420 774 153 355</a>
              </div>
              
              <div className="text-white/60 text-xs font-light mt-auto">
                IČO: 879 57 167<br/>
                Litvínovská 26, Prosek<br/>
                Praha 9, 190 00
              </div>
            </motion.div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-[10px] text-white/40 font-mono tracking-wider uppercase">
              © {new Date().getFullYear()} L-Code Dynamics. {t.footerPartner ? `${t.footerPartner}: ${t.footerPartnerRole}` : 'Všechna práva vyhrazena.'}
            </div>
            <div className="flex gap-4">
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
