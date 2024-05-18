import { ChevronLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { ColorInput } from "@/components/color/color-input";
import { Separator } from "@/components/ui/separator";
import {
  getHSLFromString,
  getStringFromHSL,
  isColorBrightness
} from "@/functions/colors";

import { ThemeEditorTab, useThemeEditor } from "../../hooks/use-theme-editor";

export const ColorTabThemeEditor = () => {
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
          <span>Back</span>
        </Button>
      </div>

      <Separator />

      <div className="p-5">
        <FormField
          control={form.control}
          name="colors.primary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Primary</FormLabel>
              <FormControl>
                <ColorInput
                  {...field}
                  key={`color_primary__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val);
                    if (!hslFromColor) return;

                    changeColor({
                      name: "primary",
                      hslColor: hslFromColor
                    });

                    changeColor({
                      name: "primary-foreground",
                      hslColor: isColorBrightness(hslFromColor)
                        ? {
                            h: 210,
                            s: 40,
                            l: 2
                          }
                        : {
                            h: 210,
                            s: 40,
                            l: 98
                          }
                    });

                    // const backgroundHSL =
                    //   form.getValues("colors.background")[activeTheme];

                    // changeColor({
                    //   name: "background",
                    //   hslColor: {
                    //     h: hslFromColor.h,
                    //     s: backgroundHSL.s,
                    //     l: backgroundHSL.l
                    //   }
                    // });
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
              <FormLabel>Secondary</FormLabel>
              <FormControl>
                <ColorInput
                  {...field}
                  key={`color_secondary__${activeTheme}`}
                  onChange={val => {
                    const hslFromColor = getHSLFromString(val);
                    if (!hslFromColor) return;

                    changeColor({
                      name: "secondary",
                      hslColor: hslFromColor
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
