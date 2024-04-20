import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { type Extensions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

import { ImageExtensionEditor } from "./image/image";
import { CodeBlockLowlightExtensionEditor } from "./code/code";
import { EmojiExtensionEditor } from "./emoji/emoji";
import { MentionExtensionEditor } from "./mentions/emoji";

export const extensionsEditor: Extensions = [
  StarterKit.configure({
    heading: false,
    paragraph: {
      HTMLAttributes: {
        class: "[&:not(:last-child)]:mb-[0.5rem]"
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
    },
    horizontalRule: {
      HTMLAttributes: {
        class: "border-t border-muted-foreground/20 my-4"
      }
    },
    codeBlock: false,
    code: {
      HTMLAttributes: {
        class: "px-[.2em] py-[.4em] bg-muted-foreground/20 rounded-md"
      }
    }
  }),
  Underline,
  TextAlign.configure({
    types: ["heading", "paragraph"]
  }),
  CodeBlockLowlightExtensionEditor,
  Link.extend({ inclusive: false }),
  Color,
  TextStyle,
  ImageExtensionEditor,
  EmojiExtensionEditor,
  MentionExtensionEditor
];
