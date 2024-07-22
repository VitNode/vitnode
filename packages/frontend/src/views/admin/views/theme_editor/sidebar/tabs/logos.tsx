import { ChevronLeft } from 'lucide-react';
import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';
import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export const LogosTabThemeEditor = () => {
  const { activeTheme, changeColor, form, setActiveTab } = useThemeEditor();
  const t = useTranslations('admin.theme_editor.logos');
  const tCore = useTranslations('core');

  return (
    <div>
      <div className="flex items-center gap-2 p-2">
        <Button
          variant="ghost"
          size="icon"
          ariaLabel={tCore('go_back')}
          onClick={() => setActiveTab(ThemeEditorTab.Main)}
        >
          <ChevronLeft />
        </Button>

        <h2 className="font-bold">{t('title')}</h2>
      </div>
    </div>
  );
};
