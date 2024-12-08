import {NextRequest, NextResponse} from "next/server";
import {jwtVerify} from "jose";

// Decode the secret from the environment variable
const secret = new TextEncoder().encode(process.env.JWT_PRIVATE_KEY);

export async function middleware(req: NextRequest) {
  const userCookie = req.cookies.get("jwt_token");
  const adminCookie = req.cookies.get("admin_token");
  const carrierCookie = req.cookies.get("carrier_token");

  const requestedPath = req.nextUrl.pathname;

  // Check if the user is accessing an admin route
  if (requestedPath.startsWith("/admin")) {
    if (!adminCookie) {
      // If no admin token, redirect to login
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    }

    try {
      // Verify the admin token using the secret
      await jwtVerify(adminCookie.value, secret);
    } catch (error) {
      // If the token is invalid or expired, redirect to login
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    }
  }
  // Check if the user is accessing a carrier route
  else if (requestedPath.startsWith("/carrier")) {
    if (!carrierCookie) {
      // If no carrier token, redirect to login
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    }

    try {
      // Verify the carrier token using the secret
      await jwtVerify(carrierCookie.value, secret);
    } catch (error) {
      // If the token is invalid or expired, redirect to login
      return NextResponse.redirect(new URL("/carrier-login", req.url));
    }
  }
  // Check for other routes (e.g., profile, user routes)
  else {
    if (!userCookie) {
      // If no user token, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      // Verify the user token using the secret
      await jwtVerify(userCookie.value, secret);
    } catch (error) {
      // If the token is invalid or expired, redirect to login
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // If everything is fine, allow the request to proceed
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/admin/:path*", "/carrier/:path*"],
};
