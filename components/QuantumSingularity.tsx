'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  precision highp float;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uInversion;
  uniform float uStartup;
  uniform float uDetonate;
  uniform float uArchitectMode; 
  uniform float uRiveActivity; // Restored for UI vibration
  uniform vec2 uVelocity;
  uniform float uGlassOpacity;
  uniform sampler2D uText;
  varying vec2 vUv;

  // Global variable for text depth to avoid up to 44 texture fetches per fragment
  float gTextDepth;

  mat2 rot(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
  }

  float map(vec3 p) {
    vec3 q = p;
    
    // Real 3D letter thickness (extrusion) using precomputed gTextDepth
    float thickness = 0.15;
    float textSdf = mix(100.0, abs(p.z - 0.3) - thickness, step(0.1, gTextDepth));
    
    float mDist = length(uMouse - 0.5);
    q.xy *= rot(uTime * 0.2 + mDist);
    q.xz *= rot(uTime * 0.1);
    
    vec2 m = (uMouse * 2.0 - 1.0) * vec2(uResolution.x/uResolution.y, 1.0);
    
    float noise = 0.0;
    float amp = 0.5;
    float freq = 1.8;
    vec3 pN = q;
    for(int i = 0; i < 2; i++) {
      noise += abs(sin(pN.x*freq + uTime*0.5)*cos(pN.y*freq)*sin(pN.z*freq)) * amp;
      pN *= 2.1;
      amp *= 0.48;
    }
    // Scale pN one more time for detonation consistency with original 4-octave version
    vec3 pNDet = pN * 2.1;
    
    float ripple = sin(length(p.xy - m) * 5.0 - uTime) * 0.15;
    float vibrate = sin(uTime * 60.0) * uRiveActivity * 0.03;
    float liquid = length(q) - 1.6 + (noise * 0.4) + ripple + vibrate;
    float cry = (abs(q.x) + abs(q.y) + abs(q.z)) * 0.7 - 1.2 + (sin(q.x * 12.0 + uTime) * 0.04) + vibrate;
    
    float obj = mix(liquid, cry, uInversion);
    
    // Detonation protocol (atomization)
    if (uDetonate > 0.001) {
      float force = uDetonate * 5.0;
      obj += sin(pNDet.x * 20.0 + uTime * 10.0) * force;
      obj += cos(pNDet.y * 15.0 - uTime * 8.0) * force;
      obj *= 1.0 + uDetonate * 2.0;
    }
    
    // Startup scale animation
    float scale = smoothstep(0.0, 1.0, uStartup);
    obj /= max(scale, 0.001);
    
    return min(obj, textSdf) * 0.75;
  }

  // Optimized normals: 3 samples instead of 6
  vec3 getNormal(vec3 p) {
    float d = map(p);
    vec2 e = vec2(0.01, 0.0);
    return normalize(vec3(
      d - map(p-e.xyy),
      d - map(p-e.yxy),
      d - map(p-e.yyx)
    ));
  }

  // Variable raymarching: returns vec4(col, mask)
  vec4 render(vec2 uv, int steps) {
    vec3 ro = vec3(0.0, 0.0, 3.5);
    vec3 rd = normalize(vec3(uv, -1.2));
    
    float t = 0.0;
    float glow = 0.0;
    vec3 p;
    float mask = 0.0;
    
    for(int i = 0; i < 20; i++) {
      if(i >= steps) break; 
      p = ro + rd * t;
      float d = map(p);
      
      float auraPulse = sin(uTime * 2.0) * 0.1 + 1.0;
      float mouseActivity = length(uVelocity) * 25.0;
      // Volume glow accumulation (Zvýšené vnitřní nasvícení)
      glow += (0.025 + mouseActivity * 0.02) * auraPulse / (abs(d) + 0.02);
      
      if(d < 0.0015 || t > 8.0) break;
      t += d;
    }
    
    vec3 col = vec3(0.0);
    
    // Calculate Text UV with aspect correction
    vec2 textUv = vUv;
    float aspect = uResolution.x / uResolution.y;
    textUv -= 0.5;
    textUv.x *= aspect;
    textUv *= 0.55; // Zvětší text na obrazovce (ještě více přes celé okno)
    textUv += 0.5; // Stred
    
    // Slide animation pro text
    float animTime = clamp(uTime * 0.7, 0.0, 1.0); // cca 1.4s dojezd
    float slideProgress = smoothstep(0.0, 1.0, animTime);
    
    // L-CODE je nahoře (vUv.y > 0.5), DYNAMICS dole
    float isTop = step(0.5, vUv.y);
    float isBottom = 1.0 - isTop;
    
    // L-CODE (top) přijíždí zleva -> posuneme UV pozitivně
    float topOffset = (1.0 - slideProgress) * 1.5;
    // DYNAMICS (bottom) přijíždí zprava -> posuneme UV negativně
    float bottomOffset = (1.0 - slideProgress) * -1.5;
    
    vec2 animatedTextUv = textUv;
    animatedTextUv.x += isTop * topOffset + isBottom * bottomOffset;

    // Entity fade in (objeví se až když je text na místě)
    float entityFade = smoothstep(1.2, 2.5, uTime);

    // Background depth
    if (t >= 8.0) {
      col = vec3(0.01, 0.02, 0.08) * glow * 0.3;
    }
    
    if(t < 8.0) {
      mask = 1.0 * entityFade;
      vec3 n = getNormal(p);
      animatedTextUv += n.xy * 0.04 * entityFade; // Distorze nabehne plynule s entitou

      vec3 viewDir = normalize(ro - p);
      
      // Hlavní bílé světlo a odlesky shora
      vec3 light1 = normalize(vec3(5, 10, 5));
      vec3 light2 = normalize(vec3(-8, -2, 4));
      vec3 light3 = normalize(vec3(6, -6, 3));
      
      // Extrémně ostré odlesky (blýskání) - skleněná struktura
      float spec1 = pow(max(dot(viewDir, reflect(-light1, n)), 0.0), 128.0);
      float spec2 = pow(max(dot(viewDir, reflect(-light2, n)), 0.0), 96.0);
      float spec3 = pow(max(dot(viewDir, reflect(-light3, n)), 0.0), 256.0); // Velmi ostrý mikro-odlesk
      
      float diff = max(dot(n, light1), 0.0) * 0.3;
      // Zvýrazněný okrajový odraz pro efekt "tlustého skla"
      float fres = pow(1.0 - max(dot(n, viewDir), 0.0), 5.0);
      
      // Změněno na krvavě červený základ
      vec3 base = vec3(0.5, 0.0, 0.01);
      col = base * diff;
      
      // Přidání krystalických odlesků
      col += vec3(3.0, 1.0, 1.0) * spec1 * 4.0;           // Ostrý světle červený odlesk
      col += vec3(5.0, 0.0, 0.0) * spec2 * 6.0;           // Čistě červené odlesky zespodu
      col += vec3(4.0, 4.0, 5.0) * spec3 * 5.0;           // Extrémně ostrý bílo-modravý záblesk povrchu
      
      // Zářivý skleněný okraj
      col += vec3(2.5, 0.05, 0.05) * fres * 3.5;
      
      // Fake environment mapping (lesklá povrchová blána)
      float env = pow(max(dot(reflect(-viewDir, n), vec3(0.0, 1.0, 0.0)), 0.0), 2.0);
      col += vec3(1.0, 0.2, 0.2) * env * 0.4;
      
      // Additive Bloom
      vec3 coreRedGlow = vec3(5.0, 0.0, 0.0) * glow * 0.35 * uArchitectMode;
      col += coreRedGlow; 
      col += pow(spec1, 16.0) * vec3(2.0, 0.1, 0.1) * 4.0;
      
      // Apply glass opacity
      col = mix(col, vec3(0.8, 0.0, 0.0), uGlassOpacity * 0.3); 
      
      // Ztmavení entity, než se text usadí na místě
      col *= entityFade;
    }

    // Sample the text texture with the sliding UVs
    vec4 textCol = texture2D(uText, animatedTextUv);
    
    // Detekce textu: červený kanál je u obou silný
    float textPresence = clamp(textCol.r * 2.0, 0.0, 1.0);
    
    // Bílá barva má modrý kanál blízko 1.0, červená má blízko 0.0
    bool isWhiteText = textCol.b > 0.5;
    
    vec3 deepRed = vec3(2.5, 0.02, 0.02);
    vec3 pureWhite = vec3(5.0, 5.0, 5.0); // Záměrně vysoká hodnota pro jasnou bílou přes tonemapping
    vec3 finalTextColor = isWhiteText ? pureWhite : deepRed;
    
    // Přepíšeme barvu pozadí barvou textu
    col = mix(col, finalTextColor, textPresence * 0.95);

    // Set alpha based on mask (0 for background, 0.35 for object) OR text presence
    float finalAlpha = max(max(mask, 0.0) * 0.35, textPresence);
    
    return vec4(col, finalAlpha);
  }

  void main() {
    bool isMobile = uResolution.y > uResolution.x;
    vec2 uv = vUv * 2.0 - 1.0;
    uv *= 0.95; // Zmensi entitu
    float aspect = uResolution.x / uResolution.y;
    
    if (isMobile) {
        // BEFEL: Entita +20% (Škálování 2.5), Text snížen o 30% (0.7)
        uv.x *= aspect;
        uv *= 2.5; 
        uv.y *= 0.7; 
    } else {
        uv.x *= aspect;
    }

    // Precompute text depth once per fragment to save GPU load
    vec2 texUv = vUv;
    float bend = length(uVelocity);
    texUv += (vUv - 0.5) * bend * 0.4;
    texUv += uVelocity * (1.0 - vUv.y) * 0.15;
    gTextDepth = texture2D(uText, texUv).r;

    // ARCHITEKT RENDER (capped to 20 steps pro absolutní plynulost)
    vec4 result = render(uv, 20); 
    vec3 col = result.rgb;
    float alpha = result.a;
    
    // VNITŘNÍ ZÁŘE: Agresivní luminiscence vázaná na masku objektu
    float innerGlow = 0.0;
    if (isMobile) {
        // Mobile internal glow focused on the core
        innerGlow = 0.5 / (0.1 + length(uv) * 2.0);
        innerGlow *= (alpha > 0.0 ? 1.0 : 0.0); // Rough mask check
    } else {
        innerGlow = 0.1 / (0.02 + length(uv) * 0.5);
    }
    
    vec3 glowCol = vec3(1.0) * innerGlow * 0.3; // Bez barvy (bila)
    col += glowCol * uArchitectMode; 
    
    // Maximální hloubka: Černo-modrá propast - predelano na cistou cernou
    float vig = length(vUv - 0.5);
    vec3 vigCol = vec4(vec3(0.0) * (1.0 - uArchitectMode), 1.0).rgb;
    col = mix(col, vigCol, smoothstep(0.1, 1.1, vig) * 0.98);

    // Tonemapping
    col = col / (col + vec3(1.0));
    col = pow(col, vec3(0.4545));
    
    gl_FragColor = vec4(col, alpha);
  }
`;

export function createUniforms(textTexture: THREE.Texture, width: number, height: number) {
  return {
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uResolution: { value: new THREE.Vector2(width, height) },
    uInversion: { value: 0 },
    uText: { value: textTexture },
    uStartup: { value: 0 },
    uVelocity: { value: new THREE.Vector2(0, 0) },
    uDetonate: { value: 0 },
    uArchitectMode: { value: 0 },
    uRiveActivity: { value: 0 },
    uGlassOpacity: { value: 0.2 },
  };
}

function createTextTexture(textToDraw: string) {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#000000'; // black background represents empty space
    ctx.fillRect(0, 0, 2048, 1024);
    
    if (!textToDraw) {
      const texture = new THREE.CanvasTexture(canvas);
      texture.minFilter = THREE.LinearFilter;
      return texture;
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Using Bebas Neue for massive, aggressive typography
    ctx.font = `400 180px 'Bebas Neue', sans-serif`;
    
    // Apply letter spacing if available
    if ('letterSpacing' in ctx) {
      (ctx as any).letterSpacing = '10px'; // Trochu dýchat, ale ne moc
    }

    // Only draw L-CODE DYNAMICS if textToDraw is exactly that or we want it by default.
    // But since user wants no text, we just don't draw it if textToDraw is empty.
    if (textToDraw === 'L-CODE') {
      const depth = 25; // Hloubka 3D efektu
      
      // --- L-CODE 3D Extrusion ---
      for (let i = depth; i >= 0; i--) {
        if (i === depth) {
          ctx.shadowColor = 'rgba(227, 6, 19, 0.6)';
          ctx.shadowBlur = 50;
        } else {
          ctx.shadowBlur = 0;
        }
        
        if (i === 0) {
          ctx.fillStyle = '#E30613';
        } else {
          const intensity = Math.max(30, 180 - i * 6);
          ctx.fillStyle = `rgb(${intensity}, 0, 0)`;
        }
        ctx.fillText('L-CODE', 1024 - i * 1.5, 460 + i * 1.5);
      }
      
      // --- DYNAMICS 3D Extrusion ---
      for (let i = depth; i >= 0; i--) {
        if (i === depth) {
          ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
          ctx.shadowBlur = 50;
        } else {
          ctx.shadowBlur = 0;
        }

        if (i === 0) {
          ctx.fillStyle = '#FFFFFF';
        } else {
          const intensity = Math.max(30, 200 - i * 7);
          ctx.fillStyle = `rgb(${intensity}, ${intensity}, ${intensity})`;
        }
        ctx.fillText('DYNAMICS', 1024 - i * 1.5, 580 + i * 1.5);
      }
    } else {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillText(textToDraw, 1024, 512);
    }
  } // <-- CHYBĚJÍCÍ ZÁVORKA
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export function QuantumSingularity({ className, text = "L-CODE" }: { className?: string, text?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    console.log("QuantumSingularity mounted with size:", width, height);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1)); // Vynucený výkon pro 60fps
    mountRef.current.appendChild(renderer.domElement);

    const texture = createTextTexture(text || "");
    const uniforms = createUniforms(texture, width, height);
    uniforms.uStartup.value = 1.0; // Automatically start up

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      transparent: true,
      extensions: {
        derivatives: true,
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let animationFrameId: number;
    let startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = (time - startTime) / 1000;
      uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      if (w === 0 || h === 0) return;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountRef.current);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      if (!mountRef.current) return;
      const rect = mountRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      
      const dx = x - uniforms.uMouse.value.x;
      const dy = y - uniforms.uMouse.value.y;
      
      uniforms.uMouse.value.set(x, y);
      
      // Update velocity smoothly
      uniforms.uVelocity.value.lerp(new THREE.Vector2(dx * 10, dy * 10), 0.1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, [text]);

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%', minHeight: '300px' }} />;
}
