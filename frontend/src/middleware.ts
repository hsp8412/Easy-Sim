import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);

export async function middleware(req: NextRequest) {
  const tokenCookie = req.cookies.get("jwt_token");

  if (!tokenCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const token = tokenCookie.value;

  if (secret) {
    try {
      await jwtVerify(token, secret);
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
  matcher: ["/user/:path*"],
};
