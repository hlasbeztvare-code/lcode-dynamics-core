'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function QuantumSingularity({ className, text }: { className?: string, text?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // Ambient Light
    const ambient = new THREE.AmbientLight(0xFF0033, 0.4);
    scene.add(ambient);

    // Neon Lines (PCB traces)
    const lines: THREE.Line[] = [];
    for (let i = 0; i < 35; i++) {
      const points = [];
      for (let j = 0; j < 8; j++) {
        points.push(new THREE.Vector3(
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 4
        ));
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ 
        color: 0xFF0033,
        linewidth: 4,
        transparent: true,
        opacity: 0.9
      });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
      lines.push(line);
    }

    // Particles removed per user request

    let animationFrameId: number;
    let isVisible = false;

    // Camera target for mouse interpolation
    const cameraTarget = new THREE.Vector2(0, 0);

    const animate = () => {
      if (isVisible) {
        // Rotate lines slowly
        lines.forEach((line, i) => {
          line.rotation.z += 0.0003 * (i % 2 ? 1 : -1);
        });

        // Optional static camera position if we want to fix lookAt
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(mountRef.current);

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      if (w === 0 || h === 0) return;
      
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(mountRef.current);
    handleResize();

    return () => {
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Cleanup geometries and materials
      lines.forEach(line => {
        line.geometry.dispose();
        (line.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [text]);

  return <div ref={mountRef} className={className} style={{ width: '100%', height: '100%', minHeight: '300px' }} />;
}
