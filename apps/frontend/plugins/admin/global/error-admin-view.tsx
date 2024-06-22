import { AlertTriangle, Home } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@vitnode/frontend/navigation";
import { cn } from "@vitnode/frontend/helpers";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ErrorViewProps } from "@/components/views/error-view-ssr";

export const ErrorAdminView = ({ className, code }: ErrorViewProps) => {
  const t = useTranslations("core");

  return (
    <div className={cn("mx-auto my-10 max-w-2xl px-4", className)}>
      <Card>
        <CardHeader className="items-center pb-2">
          <AlertTriangle className="size-16" />
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-4 text-center">
          <span className="text-muted-foreground">{t("errors.title")}</span>
          <p className="mt-1 text-xl font-semibold tracking-tight">
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {t(`errors.${code}`)}
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            <Home className="size-5" /> {t("errors.actions.back_home")}
          </Link>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground pt-2 text-right italic">
        {t.rich("errors.code", {
          code: () => (
            <span className="font-semibold">{code.toLocaleLowerCase()}</span>
          ),
        })}
      </div>
    </div>
  );
};
