// "use client";
//
// import { useEffect, type ReactNode } from "react";
// import { useAuthStore } from "@/lib/auth/store";
//
// export function AuthProvider({ children }: { children: ReactNode }) {
//   const refresh = useAuthStore((state) => state.refresh);
//   const status = useAuthStore((state) => state.status);
//   const accessToken = useAuthStore((state) => state.accessToken);
//
//   useEffect(() => {
//     if (status === "idle" && accessToken) {
//       refresh().catch(() => {});
//     }
//   }, [refresh, status, accessToken]);
//
//   return <>{children}</>;
// }
