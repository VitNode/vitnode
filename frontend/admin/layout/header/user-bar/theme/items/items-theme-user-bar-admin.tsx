import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';
import { Check } from 'lucide-react';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';

export const ItemsThemeUserBarAdmin = () => {
  const t = useTranslations('core');
  const { setTheme, theme } = useTheme();

  return (
    <>
      <DropdownMenuItem onClick={() => setTheme('light')}>
        {theme === 'light' && <Check className="mr-2 h-4 w-4" />}
        <span>{t('user-bar.theme.light')}</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('dark')}>
        {theme === 'dark' && <Check className="mr-2 h-4 w-4" />}
        <span>{t('user-bar.theme.dark')}</span>
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => setTheme('system')}>
        {theme === 'system' && <Check className="mr-2 h-4 w-4" />}
        <span>{t('user-bar.theme.system')}</span>
      </DropdownMenuItem>
    </>
  );
};
