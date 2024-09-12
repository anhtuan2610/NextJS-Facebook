import { NextResponse, NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("jwt")?.value;
  const url = new URL(request.url);

  if (token) {
    if (url.pathname === "/login") {
      return NextResponse.redirect(new URL("/home", request.url));
    }
  } else {
    if (url.pathname === "/home") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/home"],
};
