'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/cs');
  }, [router]);

  return (
    <div style={{ background: '#050505', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '13px', letterSpacing: '0.2em' }}>
        Redirecting...
      </div>
    </div>
  );
}
