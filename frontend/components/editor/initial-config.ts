import type { InitialConfigType } from "@lexical/react/LexicalComposer";
import { HorizontalRuleNode } from "@lexical/react/LexicalHorizontalRuleNode";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";

import { themeEditor } from "./theme-editor";
import { EmojiNode } from "./nodes/EmojiNode";

export const initialConfigEditor: Omit<InitialConfigType, "namespace"> = {
  theme: themeEditor,
  onError: error => {
    // eslint-disable-next-line no-console
    console.error(error);
  },
  nodes: [
    HorizontalRuleNode,
    CodeNode,
    HeadingNode,
    LinkNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    AutoLinkNode,
    CodeHighlightNode,
    EmojiNode
  ]
};
