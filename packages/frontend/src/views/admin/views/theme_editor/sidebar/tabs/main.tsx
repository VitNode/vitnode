import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { CONFIG } from '@/helpers/config-with-env';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const MainTabThemeEditor = () => {
  const t = useTranslations('admin.theme_editor');
  const { setActiveTab, form } = useThemeEditor();

  return (
    <>
      <h1 className="px-3 text-lg font-bold">{t('title')}</h1>

      {!CONFIG.node_development && (
        <Alert className="mt-5" variant="warn">
          <AlertTitle>{t('dev_mode_disabled.title')}</AlertTitle>
          <AlertDescription>{t('dev_mode_disabled.desc')}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4 space-y-1">
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

        <Button
          className="w-full justify-start"
          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          disabled={!form.watch('colors.primary') || !CONFIG.node_development}
          onClick={() => {
            setActiveTab(ThemeEditorTab.Colors);
          }}
          variant="ghost"
        >
          <span>{t('colors.title')}</span>
          <ChevronRight className="text-muted-foreground ml-auto" />
        </Button>
      </div>
    </>
  );
};
