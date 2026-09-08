import { useSuspenseQuery } from "@tanstack/react-query";

import { ProfileContent } from "@/views/profile/profile-content";

import { RouteMessages } from "../i18n/route-messages";
import { userProfileQuery } from "./query";
import { PROFILE_NAMESPACES } from "./route";

export interface ProfileRouteProps {
  children?: React.ReactNode;
  nameCode: string;
}

export const ProfileRouteContent = ({
  children,
  nameCode,
}: ProfileRouteProps) => {
  const { data: user } = useSuspenseQuery(userProfileQuery(nameCode));

  return (
    <RouteMessages namespaces={PROFILE_NAMESPACES}>
      <ProfileContent user={user}>{children}</ProfileContent>
    </RouteMessages>
  );
};
