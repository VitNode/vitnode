import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const MainTabThemeEditor = () => {
  const t = useTranslations('core.theme_editor');
  const { setActiveTab } = useThemeEditor();

  return (
    <div>
      <h1 className="p-5 pb-0 text-lg font-bold">{t('title')}</h1>

      <div className="p-2 py-5">
        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={() => setActiveTab(ThemeEditorTab.Colors)}
        >
          <span>{t('colors.title')}</span>
          <ChevronRight className="text-muted-foreground ml-auto" />
        </Button>
      </div>
    </div>
  );
};
