import { LinkIcon } from "lucide-react";
import { Editor } from "@tiptap/react";
import * as React from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Loader } from "@/components/loader";

import { ButtonToolbarEditor } from "../../button";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentLinkToolbarEditor
  }))
);

interface Props {
  editor: Editor;
}

export const LinkToolbarEditor = ({ editor }: Props) => {
  const [open, setOpen] = React.useState(false);

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
        <React.Suspense fallback={<Loader />}>
          <Content editor={editor} setOpen={setOpen} />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
