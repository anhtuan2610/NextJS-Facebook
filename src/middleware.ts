import { jwtDecode } from "jwt-decode";
import { NextResponse, NextRequest } from "next/server";
import { getUser } from "./services/auth-api";

export async function middleware(request: NextRequest) {
  const url = new URL(request.url);
  const accessToken = request.cookies.get("accessToken")?.value;
  const response = await getUser({ token: accessToken });
  console.log(response);
  
  
  if (accessToken) {
    try {
      const decodedToken = jwtDecode(accessToken);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp && decodedToken.exp > currentTime) {
        // token còn hạn
        if (url.pathname === "/login") {
          return NextResponse.redirect(new URL("/home", request.url));
        }
      } else if (url.pathname === "/home") {
        // token hết hạn
        return NextResponse.redirect(new URL("/login", request.url));
      }
    } catch (error) {
      console.error("Token không hợp lệ:", error);
    }
  } else {
    if (url.pathname !== "/login") {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/home"],
};
