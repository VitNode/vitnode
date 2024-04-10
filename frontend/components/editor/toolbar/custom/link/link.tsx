import { LinkIcon } from "lucide-react";
import type { Editor } from "@tiptap/react";
import { Suspense, lazy, useState } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Loader } from "@/components/loader";

import { ButtonToolbarEditor } from "../../button";

const Content = lazy(() =>
  import("./content").then(module => ({
    default: module.ContentLinkToolbarEditor
  }))
);

interface Props {
  editor: Editor;
}

export const LinkToolbarEditor = ({ editor }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <ButtonToolbarEditor name="link.title" active={editor.isActive("link")}>
          <LinkIcon />
        </ButtonToolbarEditor>
      </PopoverTrigger>

      <PopoverContent
        className="w-80"
        onCloseAutoFocus={() => editor.commands.focus()}
      >
        <Suspense fallback={<Loader />}>
          <Content editor={editor} setOpen={setOpen} />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
};
