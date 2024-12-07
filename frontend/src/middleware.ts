import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);

export async function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("jwt_token");
  const adminCookie = req.cookies.get("admin_token");
  const carrierCookie = req.cookies.get("carrier_token");

  const requestedPath = req.nextUrl.pathname;

  if (requestedPath.startsWith("/admin")) {
    if (!adminCookie) {
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    }
  } else if (requestedPath.startsWith("/carrier")) {
    if (!carrierCookie) {
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    }
  } else {
    if (!userCookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}

export const config = {
  matcher: ["/profile", "/admin/:path*", "/carrier/:path*"],
};
