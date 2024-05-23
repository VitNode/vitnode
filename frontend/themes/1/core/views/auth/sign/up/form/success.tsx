import { Mailbox } from "lucide-react";
import { useTranslations } from "next-intl";

import { buttonVariants } from "@/components/ui/button";
import { Link } from "@/utils/i18n";

interface Props {
  name: string;
}

export const SuccessFormSignUp = ({ name }: Props) => {
  const t = useTranslations("core.sign_up.form.success");

  return (
    <div className="p-5 pt-0 flex flex-col items-center justify-center text-center mx-16">
      <Mailbox className="size-20" />
      <span className="text-xl font-semibold">
        {t.rich("title", {
          name: () => <span className="text-primary">{name}</span>
        })}
      </span>
      <p className="mt-2 mb-4 text-muted-foreground">{t("desc")}</p>

      <Link
        href="/login"
        className={buttonVariants({
          className: "px-10"
        })}
      >
        {t("sign_in")}
      </Link>
    </div>
  );
};
