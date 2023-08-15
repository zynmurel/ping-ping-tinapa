import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: ["/", "/api/trpc/example.hello"],
  afterAuth(auth, req, evt) {
    // if (
    //   auth.userId &&
    //   req.cookies.get("key")?.value === "value" &&
    //   !req.nextUrl.pathname.includes("/consumer")
    // ) {
    //   const orgSelection = new URL("/consumer", req.url);
    //   return NextResponse.redirect(orgSelection);
    // }
    if (!auth.userId && req.nextUrl.pathname.includes("/user")) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }
  },
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
