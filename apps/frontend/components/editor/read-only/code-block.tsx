import { Element } from "html-react-parser";
import * as React from "react";
import { generateRandomString } from "@vitnode/shared";
import { cn } from "@vitnode/frontend/helpers";

import { classNameCodeBlock, lowlight } from "../extensions/code/code";

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
    return React.createElement(
      React.Fragment,
      { key: `${new Date().getTime()}-${generateRandomString(10)}` },
      node.value
    );
  }

  const children = (node.children ?? []).map(child => renderElement(child));

  return React.createElement(
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
  const text =
    (
      element.children[0] as {
        data: string;
      }
    )?.data ?? "";

  const highlighted = lowlight.highlight(language, text);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const content = highlighted.children.map(renderElement);

  return React.createElement(
    "pre",
    {
      className: cn(classNameCodeBlock, "bg-muted rounded-md")
    },
    React.createElement(
      "code",
      {
        className: element?.attribs?.class
      },
      content
    )
  );
};
