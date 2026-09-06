import type { Editor } from "@tiptap/react";

import { useMemo } from "react";

import { Separator } from "@/components/ui/separator";

import { AlignmentAction } from "./actions/alignment-action";
import { AudioAction } from "./actions/audio-action";
import { BlocksAction } from "./actions/blocks-action";
import { BoldAction } from "./actions/bold-action";
import { ColorAction } from "./actions/color-action";
import { EmojiAction } from "./actions/emoji-action";
import { FontSizeAction } from "./actions/font-size-action";
import { HeadingsAction } from "./actions/headings-action";
import { ItalicAction } from "./actions/italic-action";
import { ListAction } from "./actions/list-action";
import { TableAction } from "./actions/table-action";
import { TextFormatMore } from "./actions/text-format-more/text-format-more";
import { UnderlineAction } from "./actions/underline-action";
import { UndoRedoActions } from "./actions/undo-redo-actions";
import { ToolbarEditorContext } from "./use-toolbar-editor";

export const TipTapToolbar = ({ editor }: { editor: Editor }) => {
  const contextValue = useMemo(() => ({ editor }), [editor]);

  return (
    <ToolbarEditorContext value={contextValue}>
      <div className="bg-card sticky top-0 z-10 flex min-h-14 flex-wrap items-center gap-1 border-b p-2 [&>div[data-slot='separator']]:mx-1 [&>div[data-slot='separator']]:h-6">
        <UndoRedoActions />
        <Separator orientation="vertical" />
        <HeadingsAction />
        <FontSizeAction />
        <Separator orientation="vertical" />
        <BoldAction />
        <ItalicAction />
        <UnderlineAction />
        <TextFormatMore />
        <ColorAction />
        <AlignmentAction />
        <Separator orientation="vertical" />
        <ListAction />
        <BlocksAction />
        <Separator orientation="vertical" />
        <TableAction />
        <EmojiAction />
        <AudioAction />
      </div>
    </ToolbarEditorContext>
  );
};
