import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl; //URLのパス
  const referer = request.headers.get("referer"); //リファラー（遷移元URL）

  //トップページを使用しない
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/top", request.nextUrl));
  } else if (pathname === "/question") {
    if (!referer) {
      return NextResponse.redirect(new URL("/select", request.nextUrl));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
