"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import type { PermissionsForumForums } from "@/graphql/hooks";
import { Link, usePathname } from "@/i18n";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  permissions: Pick<PermissionsForumForums, "can_create">;
}

export const ActionsForumsForum = ({
  permissions
}: Props): JSX.Element | null => {
  const t = useTranslations("forum.topics.create");
  const pathname = usePathname();

  if (!permissions.can_create) return null;

  return (
    <Link className={buttonVariants()} href={`${pathname}/create`}>
      <Plus />
      {t("title")}
    </Link>
  );
};
