import { useLocale } from "next-intl";
import parse, { Element, type HTMLReactParserOptions } from "html-react-parser";
import { generateHTML } from "@tiptap/html";
import Image from "next/image";

import type { TextLanguage } from "@/graphql/hooks";
import { cn } from "@/functions/classnames";
import { extensionsEditor } from "../extensions/extensions";
import { HeadingExtensionEditor } from "../extensions/heading";
import { changeCodeBlock } from "./code-block";

interface Props {
  value: TextLanguage[];
  className?: string;
}

export const ReadOnlyEditor = async ({ className, value }: Props) => {
  const locale = useLocale();

  const currentValue = (): string => {
    const current =
      value.find(item => item.language_code === locale)?.value ?? "";

    if (current) {
      return current;
    }

    const currentEnglish = value.find(
      item => item.language_code === "en"
    )?.value;

    if (currentEnglish) {
      return currentEnglish;
    }

    if (value.length > 0) {
      return value[0].value;
    }

    return "";
  };

  const getText = (): string => {
    try {
      return generateHTML(JSON.parse(currentValue()), [
        ...extensionsEditor,
        HeadingExtensionEditor({ allowH1: true })
      ]);
    } catch (e) {
      return currentValue();
    }
  };

  const options: HTMLReactParserOptions = {
    replace: domNode => {
      if (!(domNode instanceof Element && domNode.attribs)) {
        return;
      }

      const { children, name } = domNode;

      if (name === "img") {
        return (
          <Image
            src={domNode.attribs.src}
            alt=""
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto"
            }}
            width={500}
            height={300}
          />
        );
      }

      if (name === "pre" && children.length > 0) {
        return changeCodeBlock(domNode);
      }
    }
  };

  return (
    <div className={cn("break-all", className)}>
      {parse(getText(), options)}
    </div>
  );
};
