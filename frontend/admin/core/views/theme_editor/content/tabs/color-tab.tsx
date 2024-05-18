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
import { getStringFromHSL } from "@/functions/colors";

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
                    changeColor({
                      name: "primary",
                      color: val
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
