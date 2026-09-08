import { useTranslations } from "use-intl";

import { ErrorContent } from "@/views/error/error-content";

import { RouteMessages } from "../i18n/route-messages";
import { PROFILE_NAMESPACES } from "./route";

const ProfileNotFoundContent = ({ actions }: { actions?: React.ReactNode }) => {
  const t = useTranslations("core.profile.notFound");

  return (
    <ErrorContent
      actions={actions}
      code={404}
      description={t("desc")}
      title={t("title")}
    />
  );
};

export const ProfileNotFound = ({ actions }: { actions?: React.ReactNode }) => (
  <RouteMessages namespaces={PROFILE_NAMESPACES}>
    <ProfileNotFoundContent actions={actions} />
  </RouteMessages>
);
