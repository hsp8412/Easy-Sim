import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("jwt_token");

  const requestedPath = req.nextUrl.pathname;

  if (!tokenCookie) {
    if (requestedPath.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    } else if (requestedPath.startsWith("/carrier")) {
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    } else {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  const token = tokenCookie.value;

  if (secret) {
    try {
      const {payload} = await jwtVerify(token, secret);
      // console.log(payload);
      const userRole: "admin" | "user" | "carrier" = payload.role as any;
      if (requestedPath.startsWith("/admin") && userRole !== "admin") {
        return NextResponse.redirect(new URL("/carrier-login", req.url));
      }
      if (requestedPath.startsWith("/carrier") && userRole !== "carrier") {
        return NextResponse.redirect(new URL("/carrier-login", req.url));
      }
      if (
        !requestedPath.startsWith("/carrier") &&
        !requestedPath.startsWith("/admin") &&
        userRole != "user"
      ) {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    } catch (err: any) {
      console.error("Token verification failed:", err.message);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  console.log("No secret found");
  return NextResponse.redirect(new URL("/login", req.url));
}

export const config = {
  matcher: ["/profile", "/admin/:path*", "/carrier/:path*"],
};
