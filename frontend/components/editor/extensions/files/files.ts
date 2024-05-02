import { Node as ReactNodeTipTap, mergeAttributes } from "@tiptap/react";

import { renderReactNode } from "./client";

export const acceptMimeTypeImage = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif"
];

export const acceptMimeTypeVideo = ["video/mp4", "video/webm", "video/ogg"];

export interface FilesHandlerAttributes {
  dir_folder: string;
  file_name: string;
  file_name_original: string;
  file_size: number;
  id: number;
  mimetype: string;
  file_alt?: string;
  height?: number;
  width?: number;
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
  // content: "inline*",
  atom: true,
  selectable: true,
  draggable: true,
  isolating: false,

  priority: 10000,

  addAttributes() {
    return {
      file_name_original: {
        default: ""
      },
      file_name: {
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
      },
      width: {
        default: 0
      },
      height: {
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
