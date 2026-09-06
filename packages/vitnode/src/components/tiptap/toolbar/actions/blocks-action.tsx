import { useEditorState } from "@tiptap/react";
import { CodeIcon, MinusIcon, QuoteIcon } from "lucide-react";
import { useTranslations } from "use-intl";

import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { TooltipWithContent } from "@/components/ui/tooltip";

import { useToolbarEditor } from "../use-toolbar-editor";
import { TooltipShortcut } from "./utils/tooltip-shortcut";

export const BlocksAction = () => {
  const t = useTranslations("core.global.editor");
  const { editor } = useToolbarEditor();
  const { isBlockquote, isCodeBlock } = useEditorState({
    editor,
    selector: ctx => {
      return {
        isBlockquote: ctx.editor.isActive("blockquote"),
        isCodeBlock: ctx.editor.isActive("codeBlock"),
      };
    },
  });

  return (
    <>
      <TooltipWithContent
        text={
          <>
            {t("blockquote")}
            <TooltipShortcut>+Shift+B</TooltipShortcut>
          </>
        }
      >
        <div>
          <Toggle
            aria-label={t("blockquote")}
            className="size-8"
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            pressed={isBlockquote}
            size="sm"
          >
            <QuoteIcon />
          </Toggle>
        </div>
      </TooltipWithContent>

      <TooltipWithContent
        text={
          <>
            {t("code_block")}
            <TooltipShortcut>+Alt+C</TooltipShortcut>
          </>
        }
      >
        <div>
          <Toggle
            aria-label={t("code_block")}
            className="size-8"
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            pressed={isCodeBlock}
            size="sm"
          >
            <CodeIcon />
          </Toggle>
        </div>
      </TooltipWithContent>

      <TooltipWithContent text={t("horizontal_rule")}>
        <Button
          aria-label={t("horizontal_rule")}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          size="icon-sm"
          variant="ghost"
        >
          <MinusIcon />
        </Button>
      </TooltipWithContent>
    </>
  );
};
