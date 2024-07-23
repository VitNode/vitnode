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
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const LogosTabThemeEditor = () => {
  const { form, setActiveTab } = useThemeEditor();
  const t = useTranslations('admin.theme_editor.logos');
  const tCore = useTranslations('core');

  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="size-8"
          size="icon"
          ariaLabel={tCore('go_back')}
          onClick={() => setActiveTab(ThemeEditorTab.Main)}
        >
          <ChevronLeft />
        </Button>

        <h2 className="font-bold">{t('title')}</h2>
      </div>

      <div className="space-y-4 py-4">
        <FormField
          control={form.control}
          name="logos.text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('text')}</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="logos.width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('width')}</FormLabel>
              <FormControl>
                <Slider
                  onValueChange={e => field.onChange(e[0])}
                  value={[field.value]}
                  min={10}
                  max={300}
                  step={1}
                />
              </FormControl>
              <p className="text-muted-foreground mt-2 text-sm">
                {field.value}px
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <Separator />

        <FormField
          control={form.control}
          name="logos.mobile_light"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('mobile_light')}</FormLabel>
              <FormControl>
                <FilesInput
                  id="logos.mobile_light"
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
          name="logos.mobile_dark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('mobile_dark')}</FormLabel>
              <FormControl>
                <FilesInput
                  id="logos.mobile_dark"
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
          name="logos.mobile_width"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('mobile_width')}</FormLabel>
              <FormControl>
                <Slider
                  onValueChange={e => field.onChange(e[0])}
                  value={[field.value]}
                  min={10}
                  max={300}
                  step={1}
                />
              </FormControl>
              <p className="text-muted-foreground mt-2 text-sm">
                {field.value}px
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
