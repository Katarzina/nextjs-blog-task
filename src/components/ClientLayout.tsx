'use client';

import { useScrollRestoration } from '@/hooks/useScrollRestoration';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  useScrollRestoration();
  return <>{children}</>;
}