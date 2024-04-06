import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import type { Extensions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export const extensionsEditor: Extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6]
    }
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"]
  })
];
