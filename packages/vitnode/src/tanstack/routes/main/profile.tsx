import { createRoute, lazyRouteComponent } from "@tanstack/react-router";

import type { ProfileLoaderContext } from "../../profile/route";
import type { CoreRouteFactory } from "../types";

import { ProfilePendingSkeleton } from "../../pending";
import { loadProfileRoute } from "../../profile/route";
import { routeContext } from "../types";

export const profileRoute: CoreRouteFactory = ({ pageHead, parentRoute }) => {
  const route = createRoute({
    getParentRoute: () => parentRoute,
    // `head` after `loader`, always.
    loader: async ({ context, params }) =>
      await loadProfileRoute({
        ...routeContext<ProfileLoaderContext>(context),
        nameCode: params.nameCode,
      }),
    head: ({ loaderData }) =>
      pageHead({ robots: "index, follow", ...loaderData }),
    path: "/users/$nameCode",
    pendingComponent: ProfilePendingSkeleton,

    notFoundComponent: lazyRouteComponent(async () => {
      const [{ ProfileNotFound }, { ErrorActions }] = await Promise.all([
        import("../../profile/not-found"),
        import("../../layout/error-actions"),
      ]);

      return {
        default: function ProfileNotFoundScreen() {
          return <ProfileNotFound actions={<ErrorActions />} />;
        },
      };
    }),
  });

  route.update({
    component: lazyRouteComponent(async () => {
      const { ProfileRouteContent } = await import("../../profile/screen");

      return {
        default: function ProfileRoute() {
          return (
            <ProfileRouteContent nameCode={route.useLoaderData().nameCode} />
          );
        },
      };
    }),
  });

  return route;
};
