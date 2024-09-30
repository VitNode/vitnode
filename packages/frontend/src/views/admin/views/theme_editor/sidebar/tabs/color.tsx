import { Button } from '@/components/ui/button';
import { ColorPicker } from '@/components/ui/color-picker';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  getHSLFromString,
  getStringFromHSL,
  isColorBrightness,
} from '@/helpers/colors';
import { ChevronLeft } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { ThemeEditorTab, useThemeEditor } from '../../hooks/use-theme-editor';

export const ColorsTabThemeEditor = () => {
  const t = useTranslations('admin.theme_editor.colors');
  const tCore = useTranslations('core.global');
  const { activeTheme, changeColor, form, setActiveTab } = useThemeEditor();

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!form.watch('colors.primary')) return;

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
          name="colors.primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('primary')}</FormLabel>
              <FormControl>
                <ColorPicker
                  {...field}
                  className="w-full max-w-none"
                  key={`color_primary__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val ?? '');
                    if (!hslFromColor) return;

                    changeColor({
                      name: 'primary',
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: 'primary-foreground',
                      hslColor: isColorBrightness(hslFromColor)
                        ? {
                            h: hslFromColor.h,
                            s: 40,
                            l: 2,
                          }
                        : {
                            h: hslFromColor.h,
                            s: 40,
                            l: 98,
                          },
                    });
                  }}
                  required
                  value={getStringFromHSL(field.value[activeTheme])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colors.secondary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('secondary')}</FormLabel>
              <FormControl>
                <ColorPicker
                  {...field}
                  className="w-full max-w-none"
                  key={`color_secondary__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val ?? '');
                    if (!hslFromColor) return;

                    changeColor({
                      name: 'secondary',
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: 'secondary-foreground',
                      hslColor: isColorBrightness(hslFromColor)
                        ? {
                            h: 210,
                            s: 40,
                            l: 2,
                          }
                        : {
                            h: 210,
                            s: 40,
                            l: 98,
                          },
                    });
                  }}
                  required
                  value={getStringFromHSL(field.value[activeTheme])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colors.cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('cover')}</FormLabel>
              <FormControl>
                <ColorPicker
                  {...field}
                  className="w-full max-w-none"
                  key={`color_cover__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val ?? '');
                    if (!hslFromColor) return;

                    changeColor({
                      name: 'cover',
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: 'cover-foreground',
                      hslColor: isColorBrightness(hslFromColor)
                        ? {
                            h: 210,
                            s: 40,
                            l: 2,
                          }
                        : {
                            h: 210,
                            s: 40,
                            l: 98,
                          },
                    });

                    const colorMuted =
                      form.getValues('colors.muted')[activeTheme];

                    changeColor({
                      name: 'muted',
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorMuted.l,
                      },
                    });

                    const colorMutedForeground = form.getValues(
                      'colors.muted-foreground',
                    )[activeTheme];

                    changeColor({
                      name: 'muted-foreground',
                      hslColor: {
                        h: hslFromColor.h,
                        s: colorMutedForeground.s,
                        l: colorMutedForeground.l,
                      },
                    });

                    const colorAccent =
                      form.getValues('colors.accent')[activeTheme];

                    changeColor({
                      name: 'accent',
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorAccent.l,
                      },
                    });

                    const colorBackground =
                      form.getValues('colors.background')[activeTheme];

                    changeColor({
                      name: 'background',
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorBackground.l,
                      },
                    });

                    const colorCard =
                      form.getValues('colors.card')[activeTheme];

                    changeColor({
                      name: 'card',
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorCard.l,
                      },
                    });

                    const colorBorder =
                      form.getValues('colors.border')[activeTheme];

                    changeColor({
                      name: 'border',
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 4),
                        l: colorBorder.l,
                      },
                    });
                  }}
                  required
                  value={getStringFromHSL(field.value[activeTheme])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="colors.destructive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('destructive')}</FormLabel>
              <FormControl>
                <ColorPicker
                  {...field}
                  className="w-full max-w-none"
                  key={`color_destructive__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val ?? '');
                    if (!hslFromColor) return;

                    changeColor({
                      name: 'destructive',
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: 'destructive-foreground',
                      hslColor: isColorBrightness(hslFromColor)
                        ? {
                            h: 210,
                            s: 40,
                            l: 2,
                          }
                        : {
                            h: 210,
                            s: 40,
                            l: 98,
                          },
                    });
                  }}
                  required
                  value={getStringFromHSL(field.value[activeTheme])}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
};
