import type { Editor } from "@tiptap/react";
import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";

interface Props {
  children: ReactNode;
  editor: Editor;
  name: string;
  onPressedChange: () => void;
}

export const ToggleToolbarEditor = ({
  children,
  editor,
  name,
  onPressedChange
}: Props) => {
  const t = useTranslations("core.editor");

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <Toggle
              pressed={editor.isActive(name)}
              onPressedChange={onPressedChange}
            >
              {children}
            </Toggle>
          </div>
        </TooltipTrigger>

        {/* eslint-disable-next-line react/jsx-no-comment-textnodes, @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error */}
        <TooltipContent>{t(name)}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
