import { useTranslations } from "next-intl";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "../ui/button";
import { cx } from "@/functions/classnames";

interface Props {
  className?: string;
}

export const Pagination = ({ className }: Props) => {
  const t = useTranslations("core");

  return (
    <div className={cx("flex", className)}>
      <Button variant="ghost">
        <ChevronLeftIcon /> {t("pagination.previous")}
      </Button>
      <Button variant="ghost">
        {t("pagination.next")} <ChevronRightIcon />
      </Button>
    </div>
  );
};
