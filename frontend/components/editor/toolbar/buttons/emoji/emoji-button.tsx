import { Smile } from "lucide-react";
import { useTranslations } from "next-intl";
import { Suspense, lazy, useState, type ComponentType } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/loader";
import type { ContentEmojiButtonEditorProps } from "./content";

const ContentEmojiButtonEditor = lazy(
  (): Promise<{
    default: ComponentType<ContentEmojiButtonEditorProps>;
  }> =>
    import("./content").then(
      (
        module
      ): {
        default: ComponentType<ContentEmojiButtonEditorProps>;
      } => ({
        default: module.ContentEmojiButtonEditor
      })
    )
);

export const EmojiButtonEditor = (): JSX.Element => {
  const t = useTranslations("core.editor.emoji");
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          ariaLabel={t("title")}
        >
          <Smile />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0 w-[23rem] overflow-y-auto">
        <Suspense fallback={<Loader className="p-4" />}>
          <ContentEmojiButtonEditor setOpen={setOpen} />
        </Suspense>
      </PopoverContent>
    </Popover>
  );
};
