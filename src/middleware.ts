import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "./server/shared/jwtTokenControl";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  if (path.startsWith("/api/")) {
    const authHeader = request.headers.get("authorization");
    const accessToken = authHeader?.split(" ")[1];

    if (!accessToken) {
      console.log("No token provided");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const result = await isAuthenticated(request)
    if (result) {
      return NextResponse.next();
    } else {
      return NextResponse.json({ error: "forbidden" }, { status: 401 });
    }
  }


  return NextResponse.next();
  //   const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'

  //   // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  //   const token = request.cookies.get('token')?.value || ''

  //   if(isPublicPath && token) {
  //     return NextResponse.redirect(new URL('/', request.nextUrl))
  //   }

  //   if (!isPublicPath && !token) {
  //     return NextResponse.redirect(new URL('/login', request.nextUrl))
  //   }
}

// See "Matching Paths" below to learn more
export const config = {
  // matcher: ["/((?!api|_next/static|_next/image|.*\.png$|.*\.jpg$|favicon.ico)).*"]
  // matcher: ["/((?!api/(login|signup)|_next/static|_next/image|.*\\.png$|.*\\.jpg$|favicon\\.ico)).*"]
  matcher: [
    '/((?!api/signup|api/login|_next/static|_next/image|favicon.ico|[^/]*\\.png|[^/]*\\.jpg).*)',
  ],
};
