import { auth } from "@/auth"
import { NextResponse } from "next/server"


const ADMIN_ONLY_ROUTES = [
  "/admin/usuarios",
]

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const pathname = req.nextUrl.pathname
  const isProtectedRoute = pathname.startsWith("/admin")
  const isAuthRoute = pathname === "/login";
  
  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/admin/solicitacoes", req.nextUrl))
    }
    return
  }
  
  if (!isProtectedRoute) return

  if (!isLoggedIn) {
    const loginUrl = new URL("/login", req.nextUrl)
    loginUrl.searchParams.set("callbackUrl", pathname)
    return NextResponse.redirect(loginUrl)
  }

  const isAdminOnly = ADMIN_ONLY_ROUTES.some((route) => pathname.startsWith(route))

  if (isAdminOnly && req.auth?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/admin/solicitacoes", req.nextUrl))
  }
})

export const config = {
  matcher: ["/admin/:path*", "/login"],
}