import { EditorContent, useEditor } from "@tiptap/react";
import { useTranslations } from "use-intl";

import { useEditorConfig } from "@/components/editor-provider";
import { cn } from "@/lib/utils";

import { Loader } from "../ui/loader";
import { TipTapDragHandle } from "./drag-handle";
import { createTipTapExtensions } from "./extension";
import { TipTapToolbar } from "./toolbar/tiptap-toolbar";

export type TipTapEditorProps = Omit<
  React.ComponentProps<"div">,
  "onChange"
> & {
  disableScroll?: boolean;
  onChange?: (value: string) => void;
  placeholder?: string;
  value?: string;
};

export const TipTapEditor = ({
  className,
  disableScroll,
  placeholder,
  value = "",
  onChange,
  onBlur,
  ...props
}: TipTapEditorProps) => {
  const t = useTranslations("core.global.editor");
  const { emojis } = useEditorConfig();
  const editor = useEditor({
    extensions: createTipTapExtensions({
      customEmojis: emojis,
      placeholder: placeholder ?? t("placeholder"),
    }),
    editorProps: {
      attributes: {
        class: "max-w-full focus:outline-none p-6",
      },
    },
    content: value,
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      onChange?.(currentEditor.getHTML());
    },
  });

  if (!editor) return <Loader />;

  return (
    <div
      className={cn(
        "bg-card relative w-full rounded-md border shadow-xs",
        { "max-h-80 overflow-hidden overflow-y-scroll": !disableScroll },
        className,
      )}
      onBlur={onBlur}
      {...props}
    >
      <TipTapToolbar editor={editor} />
      <TipTapDragHandle editor={editor} />
      <EditorContent
        className="w-full min-w-full cursor-text"
        editor={editor}
      />
    </div>
  );
};
