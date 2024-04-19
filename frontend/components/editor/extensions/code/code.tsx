import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";

import { renderReactNode } from "./client";

export const lowlight = createLowlight(all);

lowlight.register({ js });
lowlight.register({ ts });
lowlight.register({ html });
lowlight.register({ css });

export const CodeBlockLowlightSSR = CodeBlockLowlight.extend({
  addNodeView() {
    return renderReactNode();
  }
}).configure({
  lowlight: lowlight,
  languageClassPrefix: "language-"
});
