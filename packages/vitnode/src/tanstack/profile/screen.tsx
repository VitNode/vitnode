import {
  useQuery,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";
import { useTranslations } from "use-intl";

import type { UserImageEditor } from "@/views/profile/images/types";

import {
  removeOwnUserImage,
  uploadOwnUserImage,
  userImagePolicyQueryOptions,
} from "@/views/profile/images/self-images-query";
import { ProfileContent } from "@/views/profile/profile-content";
import { userProfileQueryKey } from "@/views/profile/profile-query";

import { invalidateSession, useSessionQuery } from "../auth/session-query";
import { RouteMessages } from "../i18n/route-messages";
import { userProfileQuery } from "./query";
import { PROFILE_NAMESPACES } from "./route";

export interface ProfileRouteProps {
  children?: React.ReactNode;
  nameCode: string;
}

const useOwnProfileEditor = ({
  isOwner,
  nameCode,
}: {
  isOwner: boolean;
  nameCode: string;
}): undefined | UserImageEditor => {
  const t = useTranslations("core.profile.images");
  const queryClient = useQueryClient();
  const { data: policy } = useQuery({
    ...userImagePolicyQueryOptions(),
    enabled: isOwner,
  });

  const refresh = React.useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({
        queryKey: userProfileQueryKey(nameCode),
      }),
      invalidateSession(queryClient),
    ]);
  }, [nameCode, queryClient]);

  return React.useMemo(() => {
    if (!isOwner || !policy) return undefined;

    return {
      onRemove: async kind => {
        await removeOwnUserImage(kind);
        await refresh();
        toast.success(t(`${kind}.removed`), { description: t("removedDesc") });
      },
      onUpload: async (kind, file) => {
        await uploadOwnUserImage(kind, file);
        await refresh();
        toast.success(t(`${kind}.uploaded`), {
          description: t("uploadedDesc"),
        });
      },
      policy,
    };
  }, [isOwner, policy, refresh, t]);
};

const ProfileScreen = ({ children, nameCode }: ProfileRouteProps) => {
  const { data: user } = useSuspenseQuery(userProfileQuery(nameCode));
  const { data: session } = useSessionQuery();
  const isOwner = session?.user?.id === user.id;
  const editor = useOwnProfileEditor({ isOwner, nameCode });

  return (
    <ProfileContent editor={editor} user={user}>
      {children}
    </ProfileContent>
  );
};

export const ProfileRouteContent = ({
  children,
  nameCode,
}: ProfileRouteProps) => (
  <RouteMessages namespaces={PROFILE_NAMESPACES}>
    <ProfileScreen nameCode={nameCode}>{children}</ProfileScreen>
  </RouteMessages>
);
