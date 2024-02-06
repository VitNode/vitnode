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

export const LanguageSwitcher = () => {
  const t = useTranslations("core");
  const { languages } = useGlobals();
  const locale = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();
  const enableLocales = languages.filter(lang => lang.enabled);

  if (enableLocales.length <= 1) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          tooltip={t("user-bar.language.change")}
        >
          <Languages className="size-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={id => {
            replace(pathname, { locale: id });
          }}
        >
          {enableLocales.map(language => (
            <DropdownMenuRadioItem key={language.id} value={language.code}>
              {language.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
