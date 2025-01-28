import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth(.*)"]); // Erlaubt "/auth" und alle Unterseiten

export default convexAuthNextjsMiddleware(async (request) => {
    console.log("🔍 Middleware prüft Route:", request.nextUrl.pathname);

    try {
        const isAuthenticated = await isAuthenticatedNextjs(); // WICHTIG: Hier `await` nutzen!
        console.log("✅ Auth-Status:", isAuthenticated);

        if (!isPublicPage(request) && !isAuthenticated) {
            console.log("🚫 Nicht eingeloggt – Weiterleitung nach /auth");
            return nextjsMiddlewareRedirect(request, "/auth");
        }

        console.log("✅ Zugriff erlaubt:", request.nextUrl.pathname);
        return undefined; // Weiterleitung zulassen
    } catch (error) {
        console.error("❌ Fehler in Middleware:", error);
        return nextjsMiddlewareRedirect(request, "/auth");
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
