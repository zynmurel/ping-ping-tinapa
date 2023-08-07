import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/nextjs/middleware for more information about configuring your middleware

export default authMiddleware({
  publicRoutes: ["/", "/api/trpc/example.hello"],
  afterAuth(auth, req, evt) {
    // redirect them to organization selection page
    console.log(req.cookies.get("key")?.value);
    if (
      auth.userId &&
      req.cookies.get("key")?.value === "value" &&
      !req.nextUrl.pathname.includes("/consumer")
    ) {
      const orgSelection = new URL("/consumer", req.url);
      return NextResponse.redirect(orgSelection);
    }
    if (!auth.userId && req.nextUrl.pathname.includes("/consumer")) {
      console.log("Sean");
      const orgSelection = new URL("/sign-in", req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
