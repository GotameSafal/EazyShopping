import { NextResponse } from "next/server";
export async function middleware(req) {
  const path = req.nextUrl.pathname;
  const publicPath = path === "/login" || path === "/signin";
  const token = req.cookies.get("EazyShopping")?.value || "";

  if (publicPath && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if(!token && !publicPath){
    return NextResponse.redirect(new URL('/login', req.url))
  }
  if (path.startsWith("/admin")) {
    try {
      const data = await (
        await fetch(`${process.env.BACKEND_URL}/me`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
      ).json();
      if (data?.user?.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
      }
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }
}
export const config = {
  matcher: [
    "/login",
    "/signin",
    "/cart",
    "/dashboard",
    '/shipping',
    "/accounts",
    "/orders",
    "/admin/:path*",
  ],
};
