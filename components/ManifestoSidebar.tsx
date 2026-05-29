'use client'
import React, { useEffect, useState, useMemo } from 'react'
import { motion, useScroll } from 'framer-motion'

const manifestoLines = [
  { text: "Kdo jsme?", type: "heading" },
  { text: "Ahoj, jsme L-Code Dynamics. Nejsme korporát plný manažerů v oblecích, co tráví půlku dne na schůzkách o ničem. Jsme technologické studio, které staví weby, e-commerce řešení a digitální systémy tak, jak se to dělat má – čistě, logicky a bez kompromisů.", type: "p" },
  { text: "Celé to vzniklo z jednoduchého důvodu: už nás nebavilo koukat na pomalé, přeplácané weby a systémy, které drží pohromadě jen silou vůle a při větším náporu lehnou. Řekli jsme si, že to budeme dělat jinak. Na 300 %.", type: "p" },
  { text: "Jak přemýšlíme", type: "subheading" },
  { text: "Architektura: Když pro vás píšeme kód, nepřemýšlíme jen nad tím, aby to fungovalo dnes. Díváme se dopředu. Naše systémy jsou neprůstřelné a připravené na růst vašeho byznysu.", type: "bold-prefix" },
  { text: "Žádný balast: Držíme věci „lean & mean“. Neplýtváme vaším rozpočtem na nesmysly, soustředíme se na to, co vám reálně vydělá peníze.", type: "bold-prefix" },
  { text: "Logika: Kód není jen shluk znaků. Je to řemeslo. Píšeme ho tak čistě, že v něm není místo pro chyby.", type: "bold-prefix" },
  { text: "Psychologie a marketing: Kód je k ničemu, pokud web neumí prodat. Rozumíme brandingu, lidskému chování a tomu, jak vyvolat na internetu rozruch.", type: "bold-prefix" },
  { text: "Co děláme", type: "subheading" },
  { text: "Pohybujeme se na špičce technologií. Od superrychlých headless e-shopů přes dynamické weby pro umělce, DJe a osobní značky, až po složité backendy běžící na pozadí.", type: "p" },
  { text: "Proč do toho jít s námi?", type: "subheading" },
  { text: "Když se na něčem domluvíme, tak to platí. Jednáme na rovinu, na nic si nehrajeme a nekrmíme vás prázdnými frázemi. Pokud chcete někoho, kdo vám bezhlavě odkývá nefunkční drobnosti, nejsme ti praví.", type: "p" },
  { text: "Pokud ale chcete partnera, který se na váš projekt podívá očima seniorního vývojáře a dodá produkt světové úrovně, jste tady správně.", type: "p" },
  { text: "Pojďme postavit něco, co má hlavu a patu.", type: "final" }
];

export default function ManifestoSidebar() {
  const { scrollY } = useScroll();
  const [isTyping, setIsTyping] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  const [isNearFooter, setIsNearFooter] = useState(false);

  // Total characters calculation
  const totalChars = useMemo(() => manifestoLines.reduce((acc, line) => acc + line.text.length, 0), []);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      // Start typing if we scroll down to the solutions section (#sluzby)
      const sluzbySection = document.getElementById('sluzby');
      if (sluzbySection) {
        const sluzbyTop = sluzbySection.offsetTop;
        if (latest > sluzbyTop - window.innerHeight * 0.5 && !isTyping) {
          setIsTyping(true);
        }
      } else {
        // Fallback if not found
        if (latest > 2500 && !isTyping) {
          setIsTyping(true);
        }
      }
      
      // Hide if we are near the bottom (last 900px, which covers contact section and footer)
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      if (maxScroll - latest < 900) {
        setIsNearFooter(true);
      } else {
        setIsNearFooter(false);
      }
    });
  }, [scrollY, isTyping]);

  useEffect(() => {
    if (!isTyping) return;
    
    // Typing animation loop
    let animationFrameId: number;
    let lastUpdate = performance.now();
    
    const speedMsPerChar = 30; // "Jako na stroji, ale 5x rychleji" - cca 30ms na znak
    
    const updateTyping = (time: number) => {
      const delta = time - lastUpdate;
      if (delta > speedMsPerChar) {
        const charsToAdd = Math.floor(delta / speedMsPerChar);
        lastUpdate = time;
        
        setCharIndex((prev) => {
          if (prev >= totalChars) return prev;
          return prev + charsToAdd;
        });
      }
      animationFrameId = requestAnimationFrame(updateTyping);
    };
    
    animationFrameId = requestAnimationFrame(updateTyping);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isTyping, totalChars]);

  // Render logic based on current charIndex
  let charsRendered = 0;

  return (
    <aside 
      className={`hidden xl:flex fixed left-10 top-1/2 -translate-y-1/2 z-40 w-80 max-h-[80vh] overflow-y-auto flex-col gap-4 pointer-events-auto pr-4 scrollbar-hide transition-all duration-700 ${(isTyping && !isNearFooter) ? 'opacity-100 translate-y-[-50%]' : 'opacity-0 translate-y-[-40%] pointer-events-none'}`}
      style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style>{`.scrollbar-hide::-webkit-scrollbar { display: none; }`}</style>
      
      {manifestoLines.map((line, i) => {
        // If we haven't reached this line yet, don't render it
        if (charsRendered >= charIndex) return null;

        const charsForThisLine = Math.min(line.text.length, charIndex - charsRendered);
        const textToRender = line.text.slice(0, charsForThisLine);
        charsRendered += line.text.length; // Add total length of this line for the next iteration

        // Render based on type
        if (line.type === 'heading') {
          return (
             <span key={i} className="font-mono text-[10px] text-[#E30613] tracking-[0.3em] uppercase mb-1 mt-2">
               {textToRender}
               {charsForThisLine < line.text.length && <span className="animate-pulse bg-[#E30613] text-transparent">_</span>}
             </span>
          );
        }
        
        if (line.type === 'subheading') {
          return (
             <h3 key={i} className="text-white/70 font-light font-bold text-xs mt-2 uppercase tracking-wide">
               {textToRender}
               {charsForThisLine < line.text.length && <span className="animate-pulse bg-white/80 text-transparent">_</span>}
             </h3>
          );
        }

        if (line.type === 'bold-prefix') {
          // split by colon to make prefix bold
          const colonIdx = line.text.indexOf(':');
          if (colonIdx === -1) return <p key={i} className="text-white/70 font-light text-xs leading-relaxed font-sans">{textToRender}</p>;
          
          const isTypingPrefix = charsForThisLine <= colonIdx + 1;
          
          if (isTypingPrefix) {
            return (
              <p key={i} className="text-white/70 font-light text-xs leading-relaxed font-sans">
                <strong className="text-white/90 font-medium">{textToRender}</strong>
                {charsForThisLine < line.text.length && <span className="animate-pulse bg-white/60 text-transparent">_</span>}
              </p>
            );
          } else {
            const prefix = line.text.slice(0, colonIdx + 1);
            const rest = textToRender.slice(colonIdx + 1);
            return (
              <p key={i} className="text-white/70 font-light text-xs leading-relaxed font-sans">
                <strong className="text-white/90 font-medium">{prefix}</strong>
                {rest}
                {charsForThisLine < line.text.length && <span className="animate-pulse bg-white/60 text-transparent">_</span>}
              </p>
            );
          }
        }

        if (line.type === 'final') {
          return (
             <p key={i} className="text-[#E30613] font-bold text-xs uppercase tracking-widest mt-4">
               {textToRender}
               {charsForThisLine < line.text.length && <span className="animate-pulse bg-[#E30613] text-transparent">_</span>}
             </p>
          );
        }

        // default 'p'
        return (
          <p key={i} className="text-white/70 font-light text-xs leading-relaxed font-sans">
            {textToRender}
            {charsForThisLine < line.text.length && <span className="animate-pulse bg-white/60 text-transparent">_</span>}
          </p>
        );
      })}
    </aside>
  );
}
