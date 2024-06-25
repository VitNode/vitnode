import { ChevronLeft } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  getHSLFromString,
  getStringFromHSL,
  isColorBrightness,
} from "@vitnode/shared";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "vitnode-frontend/components/ui/form";
import { Button } from "vitnode-frontend/components/ui/button";
import { ColorInput } from "vitnode-frontend/components/ui/color-input";
import { Separator } from "vitnode-frontend/components/ui/separator";

import { ThemeEditorTab, useThemeEditor } from "../../hooks/use-theme-editor";

export const ColorTabThemeEditor = () => {
  const t = useTranslations("core.theme_editor.colors");
  const tCore = useTranslations("core");
  const { activeTheme, changeColor, form, setActiveTab } = useThemeEditor();

  return (
    <div>
      <div className="p-2">
        <Button
          className="w-full justify-start"
          variant="ghost"
          size="sm"
          onClick={() => setActiveTab(ThemeEditorTab.Main)}
        >
          <ChevronLeft />
          <span>{tCore("go_back")}</span>
        </Button>
      </div>

      <Separator />

      <div className="space-y-2 p-5">
        <FormField
          control={form.control}
          name="colors.primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("primary")}</FormLabel>
              <FormControl>
                <ColorInput
                  {...field}
                  key={`color_primary__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val);
                    if (!hslFromColor) return;

                    changeColor({
                      name: "primary",
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: "primary-foreground",
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
                  value={getStringFromHSL(field.value[activeTheme])}
                  disableRemoveColor
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
              <FormLabel>{t("secondary")}</FormLabel>
              <FormControl>
                <ColorInput
                  {...field}
                  key={`color_secondary__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val);
                    if (!hslFromColor) return;

                    changeColor({
                      name: "secondary",
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: "secondary-foreground",
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
                  value={getStringFromHSL(field.value[activeTheme])}
                  disableRemoveColor
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
              <FormLabel>{t("cover")}</FormLabel>
              <FormControl>
                <ColorInput
                  {...field}
                  key={`color_cover__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val);
                    if (!hslFromColor) return;

                    changeColor({
                      name: "cover",
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: "cover-foreground",
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
                      form.getValues("colors.muted")[activeTheme];

                    changeColor({
                      name: "muted",
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorMuted.l,
                      },
                    });

                    const colorMutedForeground = form.getValues(
                      "colors.muted-foreground",
                    )[activeTheme];

                    changeColor({
                      name: "muted-foreground",
                      hslColor: {
                        h: hslFromColor.h,
                        s: colorMutedForeground.s,
                        l: colorMutedForeground.l,
                      },
                    });

                    const colorAccent =
                      form.getValues("colors.accent")[activeTheme];

                    changeColor({
                      name: "accent",
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorAccent.l,
                      },
                    });

                    const colorBackground =
                      form.getValues("colors.background")[activeTheme];

                    changeColor({
                      name: "background",
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorBackground.l,
                      },
                    });

                    const colorCard =
                      form.getValues("colors.card")[activeTheme];

                    changeColor({
                      name: "card",
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 2),
                        l: colorCard.l,
                      },
                    });

                    const colorBorder =
                      form.getValues("colors.border")[activeTheme];

                    changeColor({
                      name: "border",
                      hslColor: {
                        h: hslFromColor.h,
                        s: Math.floor(hslFromColor.s / 4),
                        l: colorBorder.l,
                      },
                    });
                  }}
                  value={getStringFromHSL(field.value[activeTheme])}
                  disableRemoveColor
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
              <FormLabel>{t("destructive")}</FormLabel>
              <FormControl>
                <ColorInput
                  {...field}
                  key={`color_destructive__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val);
                    if (!hslFromColor) return;

                    changeColor({
                      name: "destructive",
                      hslColor: hslFromColor,
                    });

                    changeColor({
                      name: "destructive-foreground",
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
                  value={getStringFromHSL(field.value[activeTheme])}
                  disableRemoveColor
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
