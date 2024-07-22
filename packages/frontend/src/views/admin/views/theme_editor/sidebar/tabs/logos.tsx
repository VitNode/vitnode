import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { FilesInput } from '@/components/ui/files-input';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const LogosTabThemeEditor = () => {
  const { form, setActiveTab } = useThemeEditor();
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

      <div className="space-y-2 p-5 pt-0">
        <FormField
          control={form.control}
          name="logos.light"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('light')}</FormLabel>
              <FormControl>
                <FilesInput
                  id="logos.light"
                  {...field}
                  acceptExtensions={['png', 'jpg', 'jpeg', 'svg', 'webp']}
                  maxFileSizeInMb={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logos.dark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('dark')}</FormLabel>
              <FormControl>
                <FilesInput
                  id="logos.dark"
                  {...field}
                  acceptExtensions={['png', 'jpg', 'jpeg', 'svg', 'webp']}
                  maxFileSizeInMb={2}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
