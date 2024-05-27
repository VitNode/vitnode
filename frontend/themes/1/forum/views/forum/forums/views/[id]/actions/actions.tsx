"use client";

import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";

import { PermissionsForumForums } from "@/graphql/hooks";
import { Link, usePathname } from "@/utils/i18n";
import { buttonVariants } from "@/components/ui/button";

interface Props {
  permissions: Pick<PermissionsForumForums, "can_create">;
}

export const ActionsForumsForum = ({ permissions }: Props) => {
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
