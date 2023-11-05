'use client';

import { Check, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useSessionAdmin } from '@/admin/hooks/use-session-admin';

import { useSession } from '../../hooks/core/use-session';
import { usePathname, useRouter } from '../../i18n';

export const LanguageSwitcher = () => {
  const t = useTranslations('core');
  const { languages } = useSession();
  const { languages: languagesAdmin } = useSessionAdmin();
  const locale = useLocale();
  const { replace } = useRouter();
  const pathname = usePathname();
  const enableLocales = [...languages, ...languagesAdmin].filter(lang => lang.enabled);

  if (enableLocales.length <= 1) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Languages className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{t('user-bar.language.change')}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {enableLocales.map(language => (
          <DropdownMenuItem
            key={language.id}
            onClick={() => replace(pathname, { locale: language.id })}
          >
            {locale === language.id && <Check className="mr-2 h-4 w-4" />}
            <span>{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
