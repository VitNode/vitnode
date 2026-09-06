import { useEditorState } from "@tiptap/react";
import { BaselineIcon, XIcon } from "lucide-react";
import React from "react";
import { useTranslations } from "use-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TooltipWithContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import { useToolbarEditor } from "../use-toolbar-editor";

const HexColorPicker = React.lazy(async () => ({
  default: (await import("react-colorful")).HexColorPicker,
}));

const PRESET_COLORS = [
  "#dc2626",
  "#ea580c",
  "#ca8a04",
  "#16a34a",
  "#0d9488",
  "#2563eb",
  "#db2777",
  "#525252",
];

export const ColorAction = () => {
  const t = useTranslations("core.global.editor.color");
  const { editor } = useToolbarEditor();
  const activeColor = useEditorState({
    editor,
    selector: ctx => {
      const color: unknown = ctx.editor.getAttributes("textStyle").color;

      return typeof color === "string" ? color : "";
    },
  });

  const setColor = (color: string) => {
    editor.chain().focus().setColor(color).run();
  };

  return (
    <Popover>
      <TooltipWithContent text={t("label")}>
        <PopoverTrigger
          render={
            <Button
              aria-label={t("label")}
              className="flex-col gap-0.5"
              size="icon-sm"
              variant="ghost"
            />
          }
        >
          <BaselineIcon className="-mb-0.5" />
          <span
            className="border-input h-1 w-4.5 rounded-full border"
            style={{ backgroundColor: activeColor || "currentColor" }}
          />
        </PopoverTrigger>
      </TooltipWithContent>

      <PopoverContent className="w-auto gap-3">
        <React.Suspense
          fallback={
            <div className="flex size-50 items-center justify-center">
              <Loader />
            </div>
          }
        >
          <HexColorPicker
            color={activeColor || "#000000"}
            onChange={setColor}
          />
        </React.Suspense>

        <div className="grid grid-cols-8 gap-1.5">
          {PRESET_COLORS.map(color => (
            <button
              aria-label={color}
              className={cn(
                "size-5 rounded-full ring-1 ring-black/10 transition-transform hover:scale-110",
                activeColor.toLowerCase() === color && "ring-foreground ring-2",
              )}
              key={color}
              onClick={() => setColor(color)}
              style={{ backgroundColor: color }}
              type="button"
            />
          ))}
        </div>

        <Input
          className="w-50"
          onChange={event => setColor(event.target.value)}
          placeholder="#2563eb"
          value={activeColor}
        />

        <Button
          className="w-50"
          disabled={!activeColor}
          onClick={() => editor.chain().focus().unsetColor().run()}
          size="sm"
          type="button"
          variant="ghost"
        >
          <XIcon />
          {t("reset")}
        </Button>
      </PopoverContent>
    </Popover>
  );
};
