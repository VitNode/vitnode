import { useLocale } from "next-intl";
import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import { generateHTML } from "@tiptap/html";
import Image from "next/image";
import { cn } from "vitnode-frontend/helpers/classnames";

import { TextLanguage } from "@/graphql/hooks";
import { extensionsEditor } from "../extensions/extensions";
import { changeCodeBlock } from "./code-block";
import { FileDownloadButton } from "./file-download-button";

interface Props {
  value: TextLanguage[];
  allowDownloadAttachments?: boolean;
  className?: string;
}

export const ReadOnlyEditor = async ({
  allowDownloadAttachments,
  className,
  value,
}: Props) => {
  const locale = useLocale();

  const currentValue = (): string => {
    const current =
      value.find(item => item.language_code === locale)?.value ?? "";

    if (current) {
      return current;
    }

    const currentEnglish = value.find(
      item => item.language_code === "en",
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
      return generateHTML(JSON.parse(currentValue()), extensionsEditor({}));
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
              height: "auto",
            }}
            width={500}
            height={300}
          />
        );
      }

      if (name === "pre" && children.length > 0) {
        return changeCodeBlock(domNode);
      }

      if (name === "button" && domNode.attribs["data-type"] === "file") {
        return (
          <FileDownloadButton
            file_name_original={domNode.attribs["file_name_original"]}
            mimetype={domNode.attribs["mimetype"]}
            file_size={parseInt(domNode.attribs["file_size"], 10)}
            id={+domNode.attribs["id"]}
            width={+domNode.attribs["width"]}
            height={+domNode.attribs["height"]}
            dir_folder={domNode.attribs["dir_folder"]}
            file_name={domNode.attribs["file_name"]}
            file_alt={domNode.attribs["file_alt"]}
            security_key={domNode.attribs["security_key"]}
            allowDownloadAttachments={allowDownloadAttachments}
          />
        );
      }
    },
  };

  return (
    <div
      className={cn(
        "break-words [&>*:not(:last-child)]:mb-[0.5rem]",
        className,
      )}
    >
      {parse(getText(), options)}
    </div>
  );
};
