import type {
  PermissionsStaffArgs,
  StaffPermissionSet,
} from "@/api/lib/permission-staff";

import {
  AdminStaffPermissionGate,
  AdminStaffPermissionProvider,
  useAdminStaffPermission,
  useAdminStaffPermissions,
} from "@/components/staff-permission/provider";

import type { AdminAccessState, AdminSessionApi } from "./session-api";

import { useAdminSessionQuery } from "./session-query";
import { adminPermissionsOf, hasAdminPermission } from "./state";

export const AdminPermissionsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useAdminSessionQuery();

  return (
    <AdminStaffPermissionProvider value={adminPermissionsOf(data)}>
      {children}
    </AdminStaffPermissionProvider>
  );
};

export const useAdminAccess = (): AdminAccessState =>
  useAdminSessionQuery().data;

export const useAdminUser = (): AdminSessionApi["user"] | null => {
  const access = useAdminAccess();

  return access.status === "granted" ? access.session.user : null;
};

export const useAdminPermissions: () => StaffPermissionSet =
  useAdminStaffPermissions;

export const useAdminPermission: (args: PermissionsStaffArgs) => boolean =
  useAdminStaffPermission;

export { AdminStaffPermissionGate as AdminPermissionGate };

export { hasAdminPermission };
