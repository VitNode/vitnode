import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export const SubmitDeleteActionsTableModeratorsStaffAdmin = () => {
  const t = useTranslations("admin.members.staff.moderators.delete");
  const { pending } = useFormStatus();

  return (
    <Button variant="destructive" type="submit" loading={pending}>
      {t("submit")}
    </Button>
  );
};
