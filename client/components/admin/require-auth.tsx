'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/lib/auth/store';

interface RequireAuthProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function RequireAuth({ children, adminOnly = true }: RequireAuthProps) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const status = useAuthStore((state) => state.status);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login');
    } else if (status === 'authenticated' && adminOnly && user?.role !== 'ADMIN') {
      router.replace('/');
    }
  }, [status, user, adminOnly, router]);

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (status !== 'authenticated' || (adminOnly && user?.role !== 'ADMIN')) {
    return null;
  }

  return <>{children}</>;
}
