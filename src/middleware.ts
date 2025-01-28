import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth(.*)"]); // Erlaubt "/auth" und alle Unterseiten

export default convexAuthNextjsMiddleware(async (request) => {
    try {
        const isAuthenticated = await isAuthenticatedNextjs();

        if (!isPublicPage(request) && !isAuthenticated) {
            return nextjsMiddlewareRedirect(request, "/auth");
        }

        return undefined; // Weiterleitung zulassen
    } catch {
        return nextjsMiddlewareRedirect(request, "/auth");
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
