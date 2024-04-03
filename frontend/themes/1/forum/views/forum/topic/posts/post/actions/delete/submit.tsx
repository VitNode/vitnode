import { useTranslations } from "next-intl";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

export const SubmitDeleteActionPost = () => {
  const t = useTranslations("forum.topics.post.actions.delete");
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" loading={pending}>
      {t("delete")}
    </Button>
  );
};
