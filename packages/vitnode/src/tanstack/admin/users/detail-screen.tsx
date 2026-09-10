import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { useTranslations } from "use-intl";

import type { AuthLinkComponent } from "@/views/auth/auth-link";
import type { SearchFeedLinkComponent } from "@/views/search/search-feed-content";

import { useAdminStaffPermissions } from "@/components/staff-permission/provider";
import { UserDetailContent } from "@/views/admin/views/core/users/detail/user-detail-content";
import { canEditAdminUser } from "@/views/admin/views/core/users/detail/user-query";
import { searchAdminRolesInBrowser } from "@/views/admin/views/core/users/roles/roles-query";
import { SearchFeedContent } from "@/views/search/search-feed-content";
import { searchFeedQueryOptions } from "@/views/search/search-feed-query";

import type { AdminUserRouteData } from "./detail-route";

import { RouteMessages } from "../../i18n/route-messages";
import { ADMIN_USER_NAMESPACES } from "./detail-route";
import { adminUserQuery, useAdminUserMutations } from "./query";

export interface AdminUserRouteProps extends AdminUserRouteData {
  LinkComponent: AuthLinkComponent;
}

const UserTimeline = ({
  LinkComponent,
  locale,
  userId,
}: {
  LinkComponent: SearchFeedLinkComponent;
  locale: string;
  userId: number;
}) => (
  <SearchFeedContent
    LinkComponent={LinkComponent}
    queryOptions={searchFeedQueryOptions({
      locale,
      params: { authorId: String(userId), sort: "newest" },
    })}
    variant="timeline"
  />
);

const AdminUserScreen = ({
  adminUserId,
  id,
  LinkComponent,
  locale,
}: AdminUserRouteProps) => {
  const t = useTranslations("admin.user.show.images");
  const { data: user } = useSuspenseQuery(adminUserQuery({ adminUserId, id }));
  const { onRemoveImage, onUpdate, onUpdateRoles, onUploadImage } =
    useAdminUserMutations();
  const permissions = useAdminStaffPermissions();

  return (
    <div className="p-4">
      <UserDetailContent
        canEdit={canEditAdminUser(permissions, { isAdmin: user.isAdmin })}
        LinkComponent={LinkComponent}
        onRemoveImage={async (userId, kind) => {
          await onRemoveImage(userId, kind);
          toast.success(t(`${kind}.removed`), {
            description: t("removedDesc"),
          });
        }}
        onUpdate={onUpdate}
        onUpdateRoles={onUpdateRoles}
        onUploadImage={async (userId, kind, file) => {
          await onUploadImage(userId, kind, file);
          toast.success(t(`${kind}.uploaded`), {
            description: t("uploadedDesc"),
          });
        }}
        searchRoles={searchAdminRolesInBrowser}
        timeline={
          <UserTimeline
            LinkComponent={LinkComponent}
            locale={locale}
            userId={user.id}
          />
        }
        user={user}
      />
    </div>
  );
};

export const AdminUserRouteContent = (props: AdminUserRouteProps) => (
  <RouteMessages namespaces={ADMIN_USER_NAMESPACES}>
    <AdminUserScreen {...props} />
  </RouteMessages>
);
