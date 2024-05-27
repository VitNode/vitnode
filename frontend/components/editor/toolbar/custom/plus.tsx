import {
  BadgePlus,
  ChevronDownIcon,
  List,
  ListOrdered,
  Strikethrough
} from "lucide-react";
import { useTranslations } from "next-intl";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ToggleToolbarEditor } from "../toggle";
import { ButtonToolbarEditor } from "../button";

import { useEditorState } from "../../hooks/use-editor-state";

export const PlusToolbarEditor = () => {
  const t = useTranslations("core.editor");
  const { editor } = useEditorState();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor
          name={t("extra_tools")}
          active={
            editor.isActive("strike") ||
            editor.isActive("bulletList") ||
            editor.isActive("orderedList")
          }
          className="h-9 [&>svg:not(:last-child)]:size-5 [&>svg:last-child]:size-4 w-14 p-0 justify-center gap-1"
        >
          <BadgePlus />
          <ChevronDownIcon className="opacity-50" />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent className="p-2 flex flex-wrap gap-1 max-w-80 w-fit">
        <ToggleToolbarEditor
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive("bulletList")}
          onPressedChange={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List />
        </ToggleToolbarEditor>

        <ToggleToolbarEditor
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered />
        </ToggleToolbarEditor>
      </PopoverContent>
    </Popover>
  );
};
