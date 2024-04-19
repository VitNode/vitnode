import { type Element } from "html-react-parser";
import { Fragment, createElement } from "react";

import { cn } from "@/functions/classnames";
import { generateRandomString } from "@/functions/generate-random-string";
import { lowlight } from "../extensions/code/code";

export const classNameCodeBlock = cn(
  "bg-muted p-5 rounded-md overflow-auto text-sm block whitespace-pre-wrap",
  "[&_.hljs-keyword]:text-red-500",
  "[&_.hljs-string]:text-blue-700 dark:[&_.hljs-string]:text-blue-400",
  "[&_.hljs-title]:text-purple-600 dark:[&_.hljs-title]:text-purple-400",
  "[&_.hljs-number]:text-sky-600 dark:[&_.hljs-number]:text-sky-500",
  "[&_.hljs-name]:text-yellow-700 dark:[&_.hljs-name]:text-yellow-500",
  String.raw`[&_.hljs-built\_in]:text-green-700 dark:[&_.hljs-built\_in]:text-green-400`,
  "[&_.hljs-variable]:text-muted-foreground"
);

interface Node {
  type: "text";
  value: string;
}

interface WithTagName {
  children: Node[];
  properties: {
    className?: string[];
  };
  tagName: string;
  type: string;
  value?: never;
}

const renderElement = (node: Node | WithTagName): JSX.Element => {
  if (node.value !== undefined) {
    return createElement(
      Fragment,
      { key: `${new Date().getTime()}-${generateRandomString(10)}` },
      node.value
    );
  }

  const children = (node.children ?? []).map(child => renderElement(child));

  return createElement(
    node.tagName,
    {
      className: node.properties?.className?.join(" "),
      key: `${node.tagName}-${new Date().getTime()}-${generateRandomString(10)}`
    },
    ...children
  );
};

export const changeCodeBlock = ({ children }: Element) => {
  const element = children[0] as Element;
  if (element.name !== "code") {
    return;
  }

  const language =
    (element?.attribs?.class ?? "")
      .replace("language-", "")
      .replace("react", "") || "plaintext";
  const text = (
    element.children[0] as {
      data: string;
    }
  ).data;

  const highlighted = lowlight.highlight(language, text);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const content = highlighted.children.map(renderElement);

  return createElement(
    "pre",
    {
      className: classNameCodeBlock
    },
    createElement(
      "code",
      {
        className: element?.attribs?.class
      },
      content
    )
  );
};
