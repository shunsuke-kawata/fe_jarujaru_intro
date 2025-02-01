import { getCookie, setCookie } from "cookies-next";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const referer = request.headers.get("referer");

  // Cookieからユーザー情報を取得　未ログインの場合はnull　requestにはCookieが含まれていないため、getCookieの第二引数にrequestを渡す
  const userId = getCookie("userId", {
    req: request,
    res: NextResponse.next(),
  }) as string | null;
  const username = getCookie("username", {
    req: request,
    res: NextResponse.next(),
  }) as string | null;

  console.log("middleware", pathname, referer, userId, username);

  //ユーザ認証用の変数
  const isAuthenticated = userId && username;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/top", request.nextUrl));
  }

  if (pathname === "/question") {
    if (isAuthenticated) {
      return referer
        ? NextResponse.next()
        : NextResponse.redirect(new URL("/select", request.nextUrl));
    }
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  //認証が非必要なページ
  if (
    (pathname === "/select" || pathname.startsWith("/user")) &&
    !isAuthenticated
  ) {
    return NextResponse.redirect(new URL("/auth/login", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
