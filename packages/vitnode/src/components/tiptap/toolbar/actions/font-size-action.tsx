import { useEditorState } from "@tiptap/react";
import { ChevronDown, TypeIcon } from "lucide-react";
import { useTranslations } from "use-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SUPPORTED_FONT_SIZES } from "../../extension";
import { useToolbarEditor } from "../use-toolbar-editor";

const DEFAULT_VALUE = "default";

export const FontSizeAction = () => {
  const t = useTranslations("core.global.editor");
  const { editor } = useToolbarEditor();
  const activeValue = useEditorState({
    editor,
    selector: ctx => {
      const fontSize: unknown = ctx.editor.getAttributes("textStyle").fontSize;

      return typeof fontSize === "string" && fontSize.length > 0
        ? fontSize
        : DEFAULT_VALUE;
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={t("font_size.label")}
            className="w-28 justify-between"
            size="sm"
            variant="ghost"
          />
        }
      >
        <TypeIcon />
        {activeValue === DEFAULT_VALUE ? t("font_size.default") : activeValue}

        <ChevronDown className="ml-auto" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-40">
        <DropdownMenuRadioGroup value={activeValue}>
          <DropdownMenuRadioItem
            onClick={() => editor.chain().focus().unsetFontSize().run()}
            value={DEFAULT_VALUE}
          >
            {t("font_size.default")}
          </DropdownMenuRadioItem>

          {SUPPORTED_FONT_SIZES.map(size => (
            <DropdownMenuRadioItem
              key={size}
              onClick={() => editor.chain().focus().setFontSize(size).run()}
              value={size}
            >
              <span style={{ fontSize: size }}>{size}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
