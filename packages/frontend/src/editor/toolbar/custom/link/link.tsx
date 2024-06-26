import { LinkIcon } from "lucide-react";
import * as React from "react";

import { ButtonToolbarEditor } from "../../button";
import { useEditorState } from "../../../hooks/use-editor-state";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../../components/ui/popover";
import { Loader } from "../../../../components/ui/loader";

const Content = React.lazy(async () =>
  import("./content").then(module => ({
    default: module.ContentLinkToolbarEditor,
  })),
);

export const LinkToolbarEditor = () => {
  const [open, setOpen] = React.useState(false);
  const { editor } = useEditorState();

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
          <Content setOpen={setOpen} />
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
};
