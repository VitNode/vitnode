import { Button } from '@/components/ui/button';
import { FileInput, FilesInputValue } from '@/components/ui/file-input';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/helpers/classnames';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const LogosTabThemeEditor = () => {
  const { form, setActiveTab, iframeRef } = useThemeEditor();
  const t = useTranslations('admin.theme_editor.logos');
  const tCore = useTranslations('core.global');

  enum ids {
    dark = 'vitnode_logo_dark',
    light = 'vitnode_logo_light',
    mobile_dark = 'vitnode_logo_mobile_dark',
    mobile_light = 'vitnode_logo_mobile_light',
  }

  const updateLogo = ({
    file: files,
    id,
  }: {
    file: FilesInputValue[];
    id: ids;
  }) => {
    const file = files[0];
    const iFrame = iframeRef?.current?.contentWindow?.document;
    const logoElement = iFrame?.querySelector<HTMLElement>('#vitnode_logo');
    if (!logoElement) return;

    const stateLogos = {
      light: form.watch('logos.light'),
      dark: form.watch('logos.dark'),
      mobile_light: form.watch('logos.mobile_light'),
      mobile_dark: form.watch('logos.mobile_dark'),
    };

    const commonClassName = 'w-[--logo-mobile-width] sm:w-[--logo-width]';
    const classNames = {
      vitnode_logo_light: cn(commonClassName, {
        'dark:hidden': stateLogos.dark.length,
        'hidden sm:block': stateLogos.mobile_light.length
          ? stateLogos.mobile_light
          : stateLogos.mobile_dark,
      }),
      vitnode_logo_dark: cn(commonClassName, {
        'hidden dark:block': stateLogos.light,
        'hidden sm:block': !stateLogos.light,
        'dark:hidden dark:sm:block': stateLogos.mobile_dark.length
          ? stateLogos.mobile_dark
          : stateLogos.mobile_light,
      }),
      vitnode_logo_mobile_light: cn(commonClassName, {
        'block sm:hidden': stateLogos.light.length
          ? stateLogos.light
          : stateLogos.dark,

        'dark:hidden': stateLogos.mobile_dark,
      }),
      vitnode_logo_mobile_dark: cn(commonClassName, {
        'block sm:hidden dark:block dark:sm:hidden': stateLogos.light.length
          ? stateLogos.light
          : stateLogos.dark,
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
          case ids.dark:
            element.className = classNames.vitnode_logo_dark;
            break;
          case ids.light:
            element.className = classNames.vitnode_logo_light;
            break;
          case ids.mobile_dark:
            element.className = classNames.vitnode_logo_mobile_dark;
            break;
          case ids.mobile_light:
            element.className = classNames.vitnode_logo_mobile_light;
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
          ariaLabel={tCore('go_back')}
          className="size-8"
          onClick={() => {
            setActiveTab(ThemeEditorTab.Main);
          }}
          size="icon"
          variant="ghost"
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
                  acceptExtensions={['png', 'jpg', 'jpeg', 'svg', 'webp']}
                  maxFileSizeInMb={2}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.light });
                  }}
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
                  acceptExtensions={['png', 'jpg', 'jpeg', 'svg', 'webp']}
                  maxFileSizeInMb={2}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.dark });
                  }}
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
                  max={30}
                  min={1}
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
                  step={0.5}
                  value={[field.value]}
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
                  acceptExtensions={['png', 'jpg', 'jpeg', 'svg', 'webp']}
                  maxFileSizeInMb={2}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.mobile_light });
                  }}
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
                  acceptExtensions={['png', 'jpg', 'jpeg', 'svg', 'webp']}
                  maxFileSizeInMb={2}
                  onChange={file => {
                    field.onChange(file);
                    updateLogo({ file, id: ids.mobile_dark });
                  }}
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
                  max={20}
                  min={1}
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
                  step={0.5}
                  value={[field.value]}
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
