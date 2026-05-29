import React from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const LanguageSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname(); // e.g. /cs/... or /en/...

  const switchLang = (lang: 'cs' | 'en') => {
    const parts = pathname.split('/');
    // Ensure first segment (after leading empty string) is the language code
    if (parts.length > 1) {
      parts[1] = lang;
    } else {
      parts[1] = lang;
    }
    const newPath = parts.join('/') || '/';
    router.push(newPath);
  };

  return (
    <div className="flex gap-2">
      <button
        className="px-3 py-1 rounded bg-[#E30613] text-white text-sm font-medium"
        onClick={() => switchLang('cs')}
      >
        CZ
      </button>
      <button
        className="px-3 py-1 rounded bg-[#E30613] text-white text-sm font-medium"
        onClick={() => switchLang('en')}
      >
        EN
      </button>
    </div>
  );
};
