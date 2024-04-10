import { TextAlign } from "@tiptap/extension-text-align";
import { Underline } from "@tiptap/extension-underline";
import { mergeAttributes, type Extensions } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { all, createLowlight } from "lowlight";
import { Link } from "@tiptap/extension-link";
import { Heading } from "@tiptap/extension-heading";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";

import type { ConfigType } from "@/config/get-config-file";

const lowlight = createLowlight(all);

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
  CodeBlockLowlight.configure({
    lowlight,
    HTMLAttributes: {
      class: "bg-muted p-5 rounded-md overflow-auto"
    }
  }),
  Link.extend({ inclusive: false }),
  Color,
  TextStyle
];

export const headingExtensionEditor = ({
  allowH1
}: {
  allowH1: ConfigType["editor"]["allow_head_h1"];
}) =>
  Heading.extend({
    levels: [1, 2],
    renderHTML({ HTMLAttributes, node }) {
      const level = this.options.levels.includes(node.attrs.level)
        ? node.attrs.level
        : this.options.levels[0];
      const classes: { [index: number]: string } = {
        1: "text-4xl font-extrabold",
        2: "text-3xl font-bold",
        3: "text-2xl font-bold",
        4: "text-xl font-bold",
        5: "text-lg font-bold",
        6: "text-base font-bold"
      };

      return [
        `h${level}`,
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
          class: `${classes[level]} [&:not(:last-child)]:mb-[0.5rem]`
        }),
        0
      ];
    }
  }).configure({
    levels: allowH1 ? [1, 2, 3, 4, 5, 6] : [2, 3, 4, 5, 6]
  });
