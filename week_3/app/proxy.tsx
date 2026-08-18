import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/","/employees"];
const publicRoutes = ["/login"];

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.some(
    (route) => path === route || path.startsWith(route)
  );

  const isPublicRoute = publicRoutes.includes(path);

  const cookie = req.cookies.get("session")?.value;

  const session = await decrypt(cookie); //decrypt the session of admin if he logged in(session created when the user is logged in)

  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(
      new URL("/login", req.url)
    );
  }

  if (isPublicRoute && session?.userId) {
    return NextResponse.redirect(
      new URL("/dashboard", req.url)
    );
  }

  return NextResponse.next();
}