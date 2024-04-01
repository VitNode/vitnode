/* eslint-disable no-console */
"use client";

import { Languages } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n";
import { useGlobals } from "@/hooks/core/use-globals";
import { useSession } from "@/hooks/core/use-session";
import { CONFIG } from "@/config";

export const LanguageSwitcher = (): JSX.Element | null => {
  const t = useTranslations("core");
  const { languages } = useGlobals();
  const locale = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();
  const enableLocales = languages.filter((lang): boolean => lang.enabled);
  const { rebuild_required } = useSession();

  if (
    enableLocales.length <= 1 ||
    (rebuild_required.langs && !CONFIG.node_development)
  ) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          ariaLabel={t("user-bar.language.change")}
        >
          <Languages className="size-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(id): void => {
            replace(pathname, { locale: id });
          }}
        >
          {enableLocales.map(
            (language): JSX.Element => (
              <DropdownMenuRadioItem key={language.code} value={language.code}>
                {language.name}
              </DropdownMenuRadioItem>
            )
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
