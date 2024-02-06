"use client";

import { AlertTriangle, Home } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Link } from "@/i18n";
import { buttonVariants } from "@/components/ui/button";
import { cx } from "@/functions/classnames";

export interface ErrorViewProps {
  code: "403" | "404" | "500" | string;
  className?: string;
}

export default function ErrorView({ className, code }: ErrorViewProps) {
  const t = useTranslations("core");

  return (
    <div className={cx("mx-auto max-w-2xl px-4", className)}>
      <Card>
        <CardHeader className="items-center pb-2">
          <AlertTriangle className="w-16 h-16" />
        </CardHeader>
        <CardContent className="flex flex-col items-center text-center pb-4">
          <span className="text-muted-foreground">{t("errors.title")}</span>
          {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
          {/* @ts-expect-error */}
          <p className="text-xl font-semibold tracking-tight mt-1">
            {t(`errors.${code}`)}
          </p>
        </CardContent>

        <CardFooter className="justify-center">
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            <Home className="w-5 h-5" /> {t("errors.actions.back_home")}
          </Link>
        </CardFooter>
      </Card>
      <div className="text-right pt-2 text-muted-foreground italic">
        {t.rich("errors.code", {
          code: () => (
            <span className="font-semibold">{code.toLocaleLowerCase()}</span>
          )
        })}
      </div>
    </div>
  );
}
