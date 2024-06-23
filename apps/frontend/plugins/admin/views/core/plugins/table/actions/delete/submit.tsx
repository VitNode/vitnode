import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";
import { Button } from "vitnode-frontend/components";

export const SubmitContentDeletePluginActionsAdmin = () => {
  const t = useTranslations("admin.core.plugins.delete");
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" loading={pending}>
      {t("submit")}
    </Button>
  );
};
