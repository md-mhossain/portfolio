'use client';

import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/lib/auth/store';
import { setAccessToken } from '@/lib/api/client';

export function AuthProvider({ children }: { children: ReactNode }) {
  const refresh = useAuthStore((state) => state.refresh);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (accessToken) {
      setAccessToken(accessToken);
      void refresh();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{children}</>;
}
