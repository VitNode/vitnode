import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { Extensions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Link } from "@tiptap/extension-link";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

import { CodeBlockLowlightExtensionEditor } from "./code/code";
import { MentionExtensionEditor } from "./mentions/emoji";
import { FilesHandler, FilesHandlerArgs } from "./files/files";
import { HeadingExtensionEditor } from "./heading";

interface Args extends FilesHandlerArgs {
  allowH1: boolean;
}

export const extensionsEditor = ({
  allowH1,
  uploadFiles
}: Args): Extensions => [
  StarterKit.configure({
    heading: false,
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
  Link.extend({ inclusive: false }).configure({
    openOnClick: "whenNotEditable"
  }),
  Color,
  TextStyle,
  MentionExtensionEditor,
  FilesHandler({ uploadFiles }),
  HeadingExtensionEditor({ allowH1 })
];
