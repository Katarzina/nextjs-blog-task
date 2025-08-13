'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const scrollPositions: Record<string, number> = {};

export function useScrollRestoration() {
  const pathname = usePathname();

  useEffect(() => {
    // Restore scroll position when navigating back
    if (scrollPositions[pathname]) {
      window.scrollTo(0, scrollPositions[pathname]);
    }

    // Save scroll position before navigating away
    const handleScroll = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    const handleBeforeUnload = () => {
      scrollPositions[pathname] = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pathname]);
}