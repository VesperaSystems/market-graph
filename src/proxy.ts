import { NextResponse, type NextRequest } from "next/server";
import { COMPANY_HOST, PRODUCT_HOST, isCompanyHost, normalizeHost } from "@/lib/domain";

const companyOnlyPaths = new Set(["/", "/about", "/research", "/careers", "/contact"]);
const publicProductPaths = new Set(["/demo", "/login"]);

function isStaticPath(pathname: string) {
  return pathname.startsWith("/_next") || pathname.includes(".") || pathname.startsWith("/favicon") || pathname.startsWith("/apple-icon") || pathname.startsWith("/icon");
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isStaticPath(pathname) || pathname.startsWith("/api/")) return NextResponse.next();

  const host = normalizeHost(request.headers.get("host"));
  const companyHost = isCompanyHost(host);

  if (companyHost && !companyOnlyPaths.has(pathname)) {
    const destination = new URL(request.url);
    destination.hostname = PRODUCT_HOST;
    destination.protocol = "https:";
    destination.port = "";
    return NextResponse.redirect(destination);
  }

  if (!companyHost && pathname === "/contact") {
    return NextResponse.redirect(new URL("https://vesperasystems.com/contact", request.url));
  }

  const response = NextResponse.next();
  if (!companyHost && !publicProductPaths.has(pathname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  response.headers.set("x-vespera-host", companyHost ? COMPANY_HOST : PRODUCT_HOST);
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"],
};
