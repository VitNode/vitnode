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
import { FileInput, FilesInputValue } from '@/components/ui/file-input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { cn } from '@/helpers/classnames';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const LogosTabThemeEditor = () => {
  const { form, setActiveTab, iframeRef } = useThemeEditor();
  const t = useTranslations('admin.theme_editor.logos');
  const tCore = useTranslations('core');

  enum ids {
    light = 'vitnode_logo_light',
    dark = 'vitnode_logo_dark',
    mobile_light = 'vitnode_logo_mobile_light',
    mobile_dark = 'vitnode_logo_mobile_dark',
  }

  const updateLogo = ({
    file,
    id,
  }: {
    file: FilesInputValue | null;
    id: ids;
  }) => {
    const iFrame = iframeRef?.current?.contentWindow?.document;
    const logoElement = iFrame?.querySelector<HTMLElement>('#vitnode_logo');
    if (!logoElement) return;

    const commonClassName = 'w-[--logo-mobile-width] sm:w-[--logo-width]';
    const classNames = {
      vitnode_logo_light: cn(commonClassName, {
        'dark:hidden': form.watch('logos.dark'),
        'hidden sm:block':
          form.watch('logos.mobile_light') || form.watch('logos.mobile_dark'),
      }),
      vitnode_logo_dark: cn(commonClassName, {
        'hidden dark:block': form.watch('logos.light'),
        'hidden sm:block': !form.watch('logos.light'),
        'dark:hidden dark:sm:block':
          form.watch('logos.mobile_dark') || form.watch('logos.mobile_light'),
      }),
      vitnode_logo_mobile_light: cn(commonClassName, {
        'block sm:hidden':
          form.watch('logos.light') || form.watch('logos.dark'),
        'dark:hidden': form.watch('logos.mobile_dark'),
      }),
      vitnode_logo_mobile_dark: cn(commonClassName, {
        'block sm:hidden dark:block dark:sm:hidden':
          form.watch('logos.light') || form.watch('logos.dark'),
        'hidden dark:block': form.watch('logos.mobile_light'),
      }),
    };

    for (const keyFromFor in ids) {
      const key = ids[keyFromFor] as ids;
      const element = iFrame?.querySelector<HTMLImageElement>(`img#${key}`);

      if (key === id) {
        if (!file || !(file instanceof File)) {
          element?.remove();
        } else {
          if (element) {
            element.srcset = URL.createObjectURL(file);
          } else {
            const img = document.createElement('img');
            img.id = key;
            img.srcset = URL.createObjectURL(file);
            img.className = classNames[key];
            img.alt = '';

            logoElement.appendChild(img);
          }
        }
      }

      // Update rest of the logos
      if (element) {
        switch (key) {
          case ids.light:
            element.className = classNames.vitnode_logo_light;
            break;
          case ids.dark:
            element.className = classNames.vitnode_logo_dark;
            break;
          case ids.mobile_light:
            element.className = classNames.vitnode_logo_mobile_light;
            break;
          case ids.mobile_dark:
            element.className = classNames.vitnode_logo_mobile_dark;
            break;
        }
      }
    }

    // Check if there are no logos, replace the logo with text
    let hasLogos = false;
    for (const keyFromFor in ids) {
      const key = ids[keyFromFor] as ids;
      const element = iFrame?.querySelector<HTMLImageElement>(`img#${key}`);
      if (element) {
        hasLogos = true;
        break;
      }
    }

    const textElement =
      iFrame?.querySelector<HTMLElement>('#vitnode_logo_text');

    if (hasLogos) {
      textElement?.remove();

      return;
    }
    if (textElement) return;

    const span = document.createElement('span');
    span.id = 'vitnode_logo_text';
    span.textContent = form.watch('logos.text');
    span.className =
      'text-foreground inline-block whitespace-nowrap text-xl font-bold';
    logoElement.appendChild(span);
  };

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
                <Input
                  {...field}
                  onChange={e => {
                    field.onChange(e);
                    const textElement =
                      iframeRef?.current?.contentWindow?.document.querySelector<HTMLElement>(
                        '#vitnode_logo_text',
                      );
                    if (!textElement) return;
                    textElement.textContent = e.target.value;
                  }}
                />
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
                <FileInput
                  id="logos.light"
                  {...field}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.light });
                  }}
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
                <FileInput
                  id="logos.dark"
                  {...field}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.dark });
                  }}
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
                  onValueChange={e => {
                    field.onChange(e[0]);
                    const logoElement =
                      iframeRef?.current?.contentWindow?.document.querySelector<HTMLElement>(
                        '#vitnode_logo',
                      );

                    logoElement?.style.setProperty(
                      '--logo-width',
                      `${e[0]}rem`,
                    );
                  }}
                  value={[field.value]}
                  min={1}
                  max={30}
                  step={0.5}
                />
              </FormControl>
              <p className="text-muted-foreground mt-2 text-sm">
                {field.value}rem
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
                <FileInput
                  id="logos.mobile_light"
                  {...field}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.mobile_light });
                  }}
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
                <FileInput
                  id="logos.mobile_dark"
                  {...field}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.mobile_dark });
                  }}
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
                  onValueChange={e => {
                    field.onChange(e[0]);
                    const logoElement =
                      iframeRef?.current?.contentWindow?.document.querySelector<HTMLElement>(
                        '#vitnode_logo',
                      );

                    logoElement?.style.setProperty(
                      '--logo-mobile-width',
                      `${e[0]}rem`,
                    );
                  }}
                  value={[field.value]}
                  min={1}
                  max={20}
                  step={0.5}
                />
              </FormControl>
              <p className="text-muted-foreground mt-2 text-sm">
                {field.value}rem
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
