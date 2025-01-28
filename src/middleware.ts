import {
    convexAuthNextjsMiddleware,
    createRouteMatcher,
    isAuthenticatedNextjs,
    nextjsMiddlewareRedirect
} from "@convex-dev/auth/nextjs/server";

const isPublicPage = createRouteMatcher(["/auth(.*)"]); // Erlaubt "/auth" und alle Unterseiten

export default convexAuthNextjsMiddleware(async (request) => {
    try {
        const isAuthenticated = await isAuthenticatedNextjs(); // `await` verwenden

        // Wenn der Nutzer auf eine private Seite zugreifen möchte und nicht eingeloggt ist
        if (!isPublicPage(request) && !isAuthenticated) {
            return nextjsMiddlewareRedirect(request, "/auth");
        }

        // Wenn der Nutzer auf eine Auth-Seite zugreifen möchte und bereits eingeloggt ist
        if (isPublicPage(request) && isAuthenticated) {
            return nextjsMiddlewareRedirect(request, "/");
        }

        // Weiterleitung zulassen
        return undefined;
    } catch (error) {
        // Fehlerbehandlung: Weiterleitung zur Startseite oder Auth-Seite
        console.error("Fehler in der Middleware:", error);
        return nextjsMiddlewareRedirect(request, "/auth");
    }
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
