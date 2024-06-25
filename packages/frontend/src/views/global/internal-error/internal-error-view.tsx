"use client";

import { RefreshCcw, RotateCcw, WifiOff } from "lucide-react";
import { useTranslations } from "next-intl";

import { mutationClearCache } from "./mutation-clear-cache";
import { PoweredByVitNode } from "../powered-by";

import { useRouter } from "../../../navigation";
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../components";

interface Props {
  showPoweredBy?: boolean;
}

export const InternalErrorView = ({ showPoweredBy }: Props) => {
  const t = useTranslations("core");
  const { back } = useRouter();
  const DEV_MODE = process.env.NODE_ENV === "development";

  return (
    <div className="mx-auto my-10 max-w-2xl px-4">
      <Card>
        <CardHeader className="items-center pb-2">
          <WifiOff className="size-16" />
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-4 text-center">
          <span className="text-muted-foreground">{t("errors.title")}</span>

          <p className="mt-1 text-xl font-semibold tracking-tight">
            {t("errors.no_connection_api")}
          </p>

          {DEV_MODE && (
            <p className="text-muted-foreground mt-10 max-w-96 text-sm">
              {t("errors.no_connection_api_dev")}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col flex-wrap items-stretch justify-center gap-2 sm:flex-row">
          <Button onClick={back} variant="ghost">
            <RotateCcw /> {t("go_back")}
          </Button>

          <Button
            onClick={() => {
              if (DEV_MODE) {
                mutationClearCache();
              }

              window.location.reload();
            }}
          >
            <RefreshCcw />
            {t(DEV_MODE ? "clear_cache_and_reload" : "reload_page")}
          </Button>
        </CardFooter>
      </Card>
      <div className="text-muted-foreground pt-2 text-right italic">
        {t.rich("errors.code", {
          code: () => <span className="font-semibold">{500}</span>,
        })}
      </div>

      {showPoweredBy && (
        <footer className="p-5 text-center text-sm">
          <PoweredByVitNode className="text-muted-foreground no-underline" />
        </footer>
      )}
    </div>
  );
};
