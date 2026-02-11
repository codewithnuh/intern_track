import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isDashboardAdmin = createRouteMatcher(["/dashboard/admin(.*)"]);
const isDashboardIntern = createRouteMatcher(["/dashboard/intern(.*)"]);
const isPendingPage = createRouteMatcher(["/dashboard/intern/pending(.*)"]);
const isRejectedPage = createRouteMatcher(["/dashboard/intern/rejected(.*)"]);
const isOnboardingPage = createRouteMatcher([
  "/dashboard/intern/onboarding(.*)",
]);
export default clerkMiddleware(async (auth, req) => {
  const { sessionClaims } = await auth();

  if (!sessionClaims) return NextResponse.next();
  const role = sessionClaims?.metadata.role;
  const status = sessionClaims?.metadata.status;
  const isAnyInternStatusPage = (req: NextRequest) =>
    isPendingPage(req) || isRejectedPage(req) || isOnboardingPage(req);
  if (role === "ADMIN") {
    if (!isDashboardAdmin(req)) {
      return NextResponse.redirect(new URL("/dashboard/admin", req.url));
    }
  }
  if (role === "INTERN") {
    switch (status) {
      case "PENDING_ONBOARDING":
        if (!isOnboardingPage(req)) {
          return NextResponse.redirect(
            new URL("/dashboard/intern/onboarding", req.url),
          );
        }
        break;
      case "PENDING_APPROVAL":
        if (!isPendingPage(req)) {
          return NextResponse.redirect(
            new URL("/dashboard/intern/pending", req.url),
          );
        }
        break;
      case "REJECTED":
        if (!isRejectedPage(req)) {
          return NextResponse.redirect(
            new URL("/dashboard/intern/rejected", req.url),
          );
        }
        break;
      case "ACTIVE":
        if (!isDashboardIntern(req) || isAnyInternStatusPage(req)) {
          return NextResponse.redirect(new URL("/dashboard/intern", req.url));
        }
        break;
      default:
        return NextResponse.next();
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
