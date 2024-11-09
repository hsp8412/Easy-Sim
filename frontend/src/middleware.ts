import {NextRequest, NextResponse} from "next/server";

export function middleware(req: NextRequest) {
  console.log("Middleware executed for:", req.nextUrl.pathname);
  const token = req.cookies.get("jwt_token");
  if (!token) {
    console.log("No token found; redirecting to /login");
    return NextResponse.redirect(new URL("/login", req.url));
  }
  console.log("Token found; proceeding to requested page");
  return NextResponse.next();
}

export const config = {
  matcher: ["/user/:path*"],
};
