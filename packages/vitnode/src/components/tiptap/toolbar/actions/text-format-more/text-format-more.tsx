import { useEditorState } from "@tiptap/react";
import { cn } from "cn";
import {
  CodeXmlIcon,
  EllipsisVerticalIcon,
  StrikethroughIcon,
} from "lucide-react";
import { useTranslations } from "use-intl";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CtrlOrCommandCharacter } from "@/lib/ctrl-or-command-character";

import { useToolbarEditor } from "../../use-toolbar-editor";

export const TextFormatMore = () => {
  const t = useTranslations("core.global.editor.text_format_more");
  const { editor } = useToolbarEditor();
  const { isCode, isStrike } = useEditorState({
    editor,
    selector: ctx => {
      return {
        isCode: ctx.editor.isActive("code"),
        isStrike: ctx.editor.isActive("strike"),
      };
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            aria-label={t("label")}
            className={cn({
              "bg-accent": isCode || isStrike,
            })}
            size="icon-sm"
            variant="ghost"
          />
        }
      >
        <EllipsisVerticalIcon />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-48">
        <DropdownMenuItem
          className={cn({
            "bg-accent": isStrike,
          })}
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
            editor.view.focus();
          }}
        >
          <StrikethroughIcon />
          {t("strike")}
          <DropdownMenuShortcut>
            <CtrlOrCommandCharacter />
            +S
          </DropdownMenuShortcut>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn({
            "bg-accent": isCode,
          })}
          onClick={() => {
            editor.chain().focus().toggleCode().run();
            editor.view.focus();
          }}
        >
          <CodeXmlIcon />
          {t("code")}
          <DropdownMenuShortcut>
            <CtrlOrCommandCharacter />
            +E
          </DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
