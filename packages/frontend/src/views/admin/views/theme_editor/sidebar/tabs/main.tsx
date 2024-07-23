import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const MainTabThemeEditor = () => {
  const t = useTranslations('admin.theme_editor');
  const { setActiveTab, form } = useThemeEditor();

  return (
    <>
      <h1 className="px-3 text-lg font-bold">{t('title')}</h1>

      <div className="mt-4 space-y-1">
        {form.watch('colors.primary') && (
          <Button
            className="w-full justify-start"
            variant="ghost"
            onClick={() => setActiveTab(ThemeEditorTab.Colors)}
          >
            <span>{t('colors.title')}</span>
            <ChevronRight className="text-muted-foreground ml-auto" />
          </Button>
        )}

        <Button
          className="w-full justify-start"
          variant="ghost"
          onClick={() => setActiveTab(ThemeEditorTab.Logos)}
        >
          <span>{t('logos.title')}</span>
          <ChevronRight className="text-muted-foreground ml-auto" />
        </Button>
      </div>
    </>
  );
};
