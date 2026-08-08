import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/dashboard");

  if (isProtectedPage && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && token) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    const redirectDestination = callbackUrl || "/";
    return NextResponse.redirect(new URL(redirectDestination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
