import { useTranslations } from "next-intl";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { FormSignUp } from "./form/form-sign-up";
import { Link } from "@/i18n";

export default function SignUpView(): JSX.Element {
  const t = useTranslations("core.sign_up");

  return (
    <div className="max-w-[32rem] mx-auto py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>
            {t.rich("desc", {
              link: (): JSX.Element => <Link href="/login">{t("sign_in")}</Link>
            })}
          </CardDescription>
        </CardHeader>

        <FormSignUp />
      </Card>
    </div>
  );
}
