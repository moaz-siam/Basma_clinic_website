import { NextResponse } from "next/server";
import { jwtVerify } from "jose";
// المسارات العامة (مسموح الدخول بدون تسجيل دخول)
const publicRoutes = ["/", "/auth/login", "/auth/register"];
const protectedRoutes = {
  "/dashboard/admin": ["admin"],
  "/dashboard/doctor": ["doctor"],
  "/dashboard/patient": ["patient"],
  "/dashboard/pharmacy": ["pharmacist"],
};
export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isPublicRoute = publicRoutes.includes(pathname);
  const token = request.cookies.get("token")?.value;
  // مثال على اسم التوكن

  // 🛡️ إذا المستخدم غير مسجل دخول ويحاول دخول صفحة خاصة
  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }
  if (
    (token && pathname.startsWith("auth/login")) ||
    (token && pathname.startsWith("auth/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard/patient", request.url));
  }

  if (token) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      const { payload } = await jwtVerify(token, secret);
      const userRole = payload.role;
      // 

      for (const [routePrefix, allowedRoles] of Object.entries(
        protectedRoutes
      )) {
        if (pathname.startsWith(routePrefix)) {
          if (!allowedRoles.includes(userRole)) {
            return NextResponse.redirect(new URL("/unauthorized", request.url));
          }
        }
      }
      // يمكنك تخزين البيانات في الهيدر أو تعديل الطلب حسب الحاجة
      const response = NextResponse.next();

      return response;
    } catch (err) {
      
      const res = NextResponse.redirect(new URL("/auth/login", request.url));
      res.cookies.set("token", "", {
        maxAge: -1,
        path: "/",
      });
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  // عشان تحدد وين يشتغل الـ middleware
  matcher: ["/", "/login", "/register", "/dashboard/:path*"],
};
