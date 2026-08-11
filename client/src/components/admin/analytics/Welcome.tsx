"use client";

import { useAuthStore } from "@/lib/auth/store";

export function Welcome() {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <h1 className="font-display text-3xl font-bold">Overview</h1>

      <p className="mt-1 text-muted-foreground">Welcome back, {user?.name}</p>
    </div>
  );
}
