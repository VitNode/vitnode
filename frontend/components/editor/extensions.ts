import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import type { Extensions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";

export const extensionsEditor: Extensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3, 4, 5, 6]
    },
    paragraph: {
      HTMLAttributes: {
        class: "[&:not(:last-child)]:mb-[1em]"
      }
    },
    bulletList: {
      HTMLAttributes: {
        class: "list-disc"
      }
    },
    listItem: {
      HTMLAttributes: {
        class:
          "ml-[2em] [&>p:first-of-type]:mb-0 [&:not(:first-child)]:mt-[.25em]"
      }
    },
    orderedList: {
      HTMLAttributes: {
        class: "list-decimal"
      }
    },
    blockquote: {
      HTMLAttributes: {
        class:
          "border-l-[.25em] border-muted-foreground ml-4 [&:not(:last-child)]:mb-4 px-[1em] text-muted-foreground [&>p:nth-last-child(n)]:mb-0"
      }
    }
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"]
  })
];
