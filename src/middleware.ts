import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "super-secret-jwt-key-change-in-production-123456"
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin route protection
  if (pathname.startsWith("/admin")) {
    // Allow login page without auth
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    try {
      await jwtVerify(token, JWT_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Visitor tracking for public pages (not admin, not api, not static files)
  const isPublicPage =
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    !pathname.startsWith("/_next") &&
    !pathname.startsWith("/favicon") &&
    !pathname.startsWith("/images") &&
    !pathname.startsWith("/robots.txt") &&
    !pathname.startsWith("/sitemap.xml") &&
    !pathname.startsWith("/file.svg") &&
    !pathname.startsWith("/globe.svg") &&
    !pathname.startsWith("/window.svg") &&
    !pathname.startsWith("/next.svg") &&
    !pathname.startsWith("/vercel.svg");

  if (isPublicPage) {
    const ua = request.headers.get("user-agent") || "";
    let deviceType = "desktop";
    if (/tablet|ipad|playbook|silk/i.test(ua)) {
      deviceType = "tablet";
    } else if (/mobile|iphone|ipod|android|blackberry|windows phone/i.test(ua)) {
      deviceType = "mobile";
    }

    const body = JSON.stringify({
      page: pathname,
      referrer: request.headers.get("referer") || null,
      country: (request as any).geo?.country || null,
      city: (request as any).geo?.city || null,
      deviceType,
    });

    // Fire-and-forget — do not await
    fetch(`${request.nextUrl.origin}/api/track-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Apply to all routes except static files and images
    "/((?!_next/static|_next/image|favicon.ico|images|robots.txt|sitemap.xml).*)",
  ],
};
