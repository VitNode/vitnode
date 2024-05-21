import type { Editor } from "@tiptap/react";
import { Suspense, lazy } from "react";
import { SmileIcon } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Loader } from "@/components/loader";

import { ButtonToolbarEditor } from "../../button";

const Content = lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentEmojiToolbarEditor
  }))
);

interface Props {
  editor: Editor;
}

export const EmojiToolbarEditor = ({ editor }: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor name="emoji.title">
          <SmileIcon />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent
        className="w-72 p-0"
        onCloseAutoFocus={() => editor.commands.focus()}
      >
        <Suspense fallback={<Loader className="p-2" />}>
          <Content editor={editor} />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
};
