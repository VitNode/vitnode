import * as React from "react";
import { useTranslations } from "next-intl";
import {
  Code,
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
  SelectTrigger
} from "@/components/ui/select";

import { useEditorState } from "../../hooks/use-editor-state";

const getHeadingIcon = (level: number) => {
  switch (level) {
    case 0:
      return <Pilcrow />;
    case 1:
      return <Code />;
    case 2:
      return <Heading1 />;
    case 3:
      return <Heading2 />;
    case 4:
      return <Heading3 />;
    case 5:
      return <Heading4 />;
    case 6:
      return <Heading5 />;
    case 7:
      return <Heading6 />;
  }
};

export const HeadingToolbarEditor = () => {
  const t = useTranslations("core.editor.heading");
  const { editor } = useEditorState();

  const value = React.useMemo(() => {
    const findActiveHeading = [...Array(6).keys()].find(i =>
      editor.isActive("heading", { level: i + 1 })
    );

    if (findActiveHeading !== undefined) {
      return findActiveHeading + 2;
    }

    if (editor.isActive("codeBlock")) {
      return 1;
    }

    return 0;
  }, [
    editor.isActive("paragraph"),
    editor.isActive("codeBlock"),
    editor.isActive("heading", { level: 1 }),
    editor.isActive("heading", { level: 2 }),
    editor.isActive("heading", { level: 3 }),
    editor.isActive("heading", { level: 4 }),
    editor.isActive("heading", { level: 5 }),
    editor.isActive("heading", { level: 6 })
  ]);

  return (
    <Select
      value={value.toString()}
      onValueChange={val => {
        const value = Number(val);
        if (value === 0) {
          editor.chain().setParagraph().run();

          return;
        }

        if (value === 1) {
          editor.chain().setCodeBlock().run();

          return;
        }

        const level = (value - 1) as 1 | 2 | 3 | 4 | 5 | 6;
        editor.chain().setHeading({ level }).run();
      }}
    >
      <SelectTrigger className="shadow-none border-0 hover:bg-muted h-9 [&>svg:not(:last-child)]:size-5 w-14 p-0 justify-center gap-1">
        {getHeadingIcon(value)}
      </SelectTrigger>

      <SelectContent onCloseAutoFocus={() => editor.commands.focus()}>
        <SelectItem value="0">
          <span className="flex gap-2 items-center [&>svg]:size-4 flex-wrap">
            <Pilcrow /> {t("paragraph")}
          </span>
        </SelectItem>

        <SelectItem value="1">
          <span className="flex gap-2 items-center [&>svg]:size-4 flex-wrap">
            <Code /> {t("code_block.title")}
          </span>
        </SelectItem>

        {[...Array(6).keys()].map(i => {
          const current = i + 1;

          return (
            <SelectItem key={i} value={(i + 2).toString()}>
              <span className="flex gap-2 items-center [&>svg]:size-4 flex-wrap">
                {getHeadingIcon(i + 2)}
                {/* eslint-disable-next-line react/jsx-no-comment-textnodes, @typescript-eslint/ban-ts-comment */}
                {/* @ts-expect-error */}
                {t(`h${current}`)}
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
