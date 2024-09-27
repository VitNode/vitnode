'use client';

import { Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import { useGlobalData } from '../../hooks/use-global-data';
import { usePathname, useRouter } from '../../navigation';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export const LanguageSwitcher = () => {
  const t = useTranslations('core');
  const { languages } = useGlobalData();
  const locale = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();
  const enableLocales = languages.filter(lang => lang.enabled);

  if (enableLocales.length <= 1) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ariaLabel={t('user-bar.language.change')}
          size="icon"
          variant="ghost"
        >
          <Languages className="size-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuRadioGroup
          onValueChange={id => {
            replace(pathname, { locale: id });
          }}
          value={locale}
        >
          {enableLocales.map(language => (
            <DropdownMenuRadioItem key={language.code} value={language.code}>
              {language.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
