import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/app/lib/session";

const protectedRoutes = ["/dashboard", "/employees"];
const publicRoutes = ["/login"];

export async function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const isProtectedRoute = protectedRoutes.some(
        (route) => path === route || path.startsWith(route)
    );
    const isPublicRoute = publicRoutes.includes(path);
    const session = await decrypt(request.cookies.get("session")?.value);

    if (isProtectedRoute && !session?.email) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isPublicRoute && session?.email) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*", "/employees/:path*"],
};