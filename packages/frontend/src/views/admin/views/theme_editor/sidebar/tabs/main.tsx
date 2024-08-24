import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const MainTabThemeEditor = () => {
  const t = useTranslations('admin.theme_editor');
  const { setActiveTab, form } = useThemeEditor();

  return (
    <>
      <h1 className="px-3 text-lg font-bold">{t('title')}</h1>

      <div className="mt-4 space-y-1">
        {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-condition */}
        {form.watch('colors.primary') && (
          <Button
            className="w-full justify-start"
            onClick={() => {
              setActiveTab(ThemeEditorTab.Colors);
            }}
            variant="ghost"
          >
            <span>{t('colors.title')}</span>
            <ChevronRight className="text-muted-foreground ml-auto" />
          </Button>
        )}

        <Button
          className="w-full justify-start"
          onClick={() => {
            setActiveTab(ThemeEditorTab.Logos);
          }}
          variant="ghost"
        >
          <span>{t('logos.title')}</span>
          <ChevronRight className="text-muted-foreground ml-auto" />
        </Button>
      </div>
    </>
  );
};
