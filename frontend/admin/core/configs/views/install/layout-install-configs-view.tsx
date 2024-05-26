"use client";

import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { useSelectedLayoutSegment } from "next/navigation";

import { Steps, ItemStepProps } from "@/components/steps/steps";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";

interface Props {
  children: ReactNode;
}

export const LayoutInstallConfigsView = ({ children }: Props) => {
  const t = useTranslations("admin.configs.install");
  const segment = useSelectedLayoutSegment();

  const stepsNumber: Record<string, number> = {
    license: 2,
    database: 3,
    account: 4
  };

  const activeStep = segment ? stepsNumber[segment] : 1;

  const items: ItemStepProps[] = [
    {
      id: "welcome",
      title: t("steps.welcome.title"),
      description: t("steps.welcome.desc"),
      checked: activeStep >= 2
    },
    {
      id: "license",
      title: t("steps.license.title"),
      description: t("steps.license.desc"),
      checked: activeStep >= 3
    },
    {
      id: "database",
      title: t("steps.database.title"),
      description: t("steps.database.desc"),
      checked: activeStep >= 4
    },
    {
      id: "account",
      title: t("steps.account.title"),
      description: t("steps.account.desc"),
      checked: activeStep >= 5
    }
  ];

  return (
    <Card className="hidden sm:flex">
      <Steps className="p-5 max-w-[16rem] pr-0" items={items} />

      <div className="flex-grow">
        <CardHeader>
          <CardDescription>{t("title", { name: "VitNode" })}</CardDescription>
          <CardTitle>
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/* @ts-expect-error */}
            {t(`steps.${items.at(activeStep - 1)?.id}.title`)}
          </CardTitle>
        </CardHeader>
        {children}
      </div>
    </Card>
  );
};
