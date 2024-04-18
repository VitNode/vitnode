import { type Element } from "html-react-parser";
import { Fragment, createElement } from "react";

import { lowlight } from "../extensions/extensions";

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
    return createElement(Fragment, null, node.value);
  }

  const children = (node.children ?? []).map(child => renderElement(child));
  const props = {
    className: node.properties?.className?.join(" ")
  };

  return createElement(node.tagName, props, ...children);
};

export const changeCodeBlock = ({ children }: Element) => {
  const element = children[0] as Element;
  if (element.name !== "code") {
    return;
  }

  const language = element.attribs.class
    .replace("language-", "")
    .replace("react", "");
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
    { className: "bg-muted p-5 rounded-md overflow-auto" },
    content
  );
};
