import { Node as ReactNodeTipTap, mergeAttributes } from "@tiptap/react";

import { renderReactNode } from "./client";

export interface FilesHandlerAttributes {
  dir_folder: string;
  file_name_original: string;
  file_size: number;
  id: number;
  mimetype: string;
  file_alt?: string;
}

declare module "@tiptap/react" {
  interface Commands<ReturnType> {
    files: {
      insertFile: (options: FilesHandlerAttributes) => ReturnType;
    };
  }
}

export const FilesHandler = ReactNodeTipTap.create<FilesHandlerAttributes>({
  name: "files",
  group: "inline",
  inline: true,
  atom: true,
  selectable: true,
  draggable: true,
  isolating: false,

  addAttributes() {
    return {
      file_name_original: {
        default: ""
      },
      dir_folder: {
        default: ""
      },
      file_alt: {
        default: ""
      },
      file_size: {
        default: 0
      },
      mimetype: {
        default: ""
      },
      id: {
        default: 0
      }
    };
  },

  addNodeView() {
    return renderReactNode();
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "button",
      mergeAttributes(HTMLAttributes, {
        ["data-type"]: "file",
        type: "button"
      })
    ];
  },

  addCommands() {
    return {
      insertFile:
        options =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options
          });
        }
    };
  }
});
