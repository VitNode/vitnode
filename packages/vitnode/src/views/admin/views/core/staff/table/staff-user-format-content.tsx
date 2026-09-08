import { useLocale } from "use-intl";

import type { RoleNameEntry } from "@/components/role-name";

import { Avatar } from "@/components/avatar";
import { resolveRoleName } from "@/components/role-name";
import { UserFormat } from "@/components/user-format";

export const StaffUserFormatContent = ({
  user,
}: {
  user: {
    avatarColor: string;
    name: string;
    nameCode: string;
    role: {
      color: null | string;
      id: number;
      name: RoleNameEntry[];
      prefix?: null | string;
    };
  };
}) => {
  const locale = useLocale();
  const roleName = resolveRoleName(user.role, locale);

  return (
    <div className="flex items-center gap-3">
      <Avatar size={32} user={user} />

      <div className="flex flex-col">
        <UserFormat format user={user} />
        <span className="text-muted-foreground text-sm">
          @{user.nameCode}
          {roleName ? ` · ${roleName}` : ""}
        </span>
      </div>
    </div>
  );
};
