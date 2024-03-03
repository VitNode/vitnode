"use client";

import { useTranslations } from "next-intl";
import { useSelectedLayoutSegments } from "next/navigation";

import { Breadcrumbs } from "@/components/ui/breadcrumbs";

export const BreadcrumbsLayoutSettings = () => {
  const t = useTranslations("core.settings");
  const segments = useSelectedLayoutSegments();

  const items = segments.map(segment => ({
    id: segment,
    href: `/settings/${segment}`,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    text: t(`${segment}.title`)
  }));

  return (
    <Breadcrumbs
      items={[
        {
          id: "settings",
          href: "/settings",
          text: t("overview.title")
        },
        ...items
      ]}
    />
  );
};
