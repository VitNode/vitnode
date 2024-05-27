import { Editor } from "@tiptap/react";
import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Pilcrow
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useGlobals } from "@/hooks/core/use-globals";

interface Props {
  editor: Editor;
}

const getHeadingIcon = (level: number) => {
  switch (level) {
    case 1:
      return <Heading1 />;
    case 2:
      return <Heading2 />;
    case 3:
      return <Heading3 />;
    case 4:
      return <Heading4 />;
    case 5:
      return <Heading5 />;
    case 6:
      return <Heading6 />;
  }
};

export const HeadingToolbarEditor = ({ editor }: Props) => {
  const t = useTranslations("core.editor.heading");
  const { config } = useGlobals();
  const allowH1 = config.editor.allow_head_h1;

  const value = React.useMemo(() => {
    const findActiveHeading = [...Array(6).keys()].find(i =>
      editor.isActive("heading", { level: i + 1 })
    );

    if (findActiveHeading !== undefined) {
      return `h${findActiveHeading + 1}`;
    }

    return "paragraph";
  }, [
    editor.isActive("paragraph"),
    editor.isActive("heading", { level: 1 }),
    editor.isActive("heading", { level: 2 }),
    editor.isActive("heading", { level: 3 }),
    editor.isActive("heading", { level: 4 }),
    editor.isActive("heading", { level: 5 }),
    editor.isActive("heading", { level: 6 })
  ]);

  return (
    <Select
      value={value}
      onValueChange={val => {
        if (val === "paragraph") {
          editor.chain().setParagraph().run();

          return;
        }

        const level = Number(val.replace("h", "")) as 1 | 2 | 3 | 4 | 5 | 6;
        editor.chain().setHeading({ level }).run();
      }}
    >
      <SelectTrigger className="w-[180px] shadow-none border-0 hover:bg-muted h-9">
        <SelectValue />
      </SelectTrigger>
      <SelectContent onCloseAutoFocus={() => editor.commands.focus()}>
        <SelectItem value="paragraph">
          <span className="flex gap-1 [&>svg]:size-5 flex-wrap">
            <Pilcrow /> {t("paragraph")}
          </span>
        </SelectItem>
        {[...Array(allowH1 ? 6 : 5).keys()].map(i => (
          <SelectItem key={i} value={`h${i + (allowH1 ? 1 : 2)}`}>
            <span className="flex gap-1 [&>svg]:size-5 flex-wrap">
              {getHeadingIcon(i + (allowH1 ? 1 : 2))}
              {/* eslint-disable-next-line react/jsx-no-comment-textnodes, @typescript-eslint/ban-ts-comment */}
              {/* @ts-expect-error */}
              {t(`h${i + (allowH1 ? 1 : 2)}`)}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
