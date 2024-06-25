import { useTranslations } from "next-intl";
import { Link } from "vitnode-frontend/navigation";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "vitnode-frontend/components/ui/card";

import { FormSignIn } from "./form/form-sign-in";

export const SignInView = () => {
  const t = useTranslations("core.sign_in");

  return (
    <div className="mx-auto max-w-lg py-10">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
          <CardDescription>
            {t.rich("desc", {
              link: () => <Link href="/register">{t("sign_up")}</Link>,
            })}
          </CardDescription>
        </CardHeader>
        <FormSignIn />
      </Card>
    </div>
  );
};
