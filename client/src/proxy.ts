import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async  function proxy(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  const { pathname } = request.nextUrl;

  const isAuthPage = pathname.startsWith("/login");
  const isProtectedPage = pathname.startsWith("/dashboard");

  if (isProtectedPage && !accessToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && accessToken) {
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    const redirectDestination = callbackUrl || "/";
    return NextResponse.redirect(new URL(redirectDestination, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
